import { apiConnector } from '../apiconnector';
import { coursesEndpoints } from '../apis';
import { toast } from 'react-hot-toast';
import { setMyCourse } from '../../slice/courseSlice';



const { GET_USER_ENROLLED_COURSES_API , GET_ALL_INSTRUCTOR_COURSES_API} = coursesEndpoints

export async function getUserEnrolledCourses(token, setEnrolledCourses) {
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,
            null,
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        if (typeof setEnrolledCourses === 'function') {
            setEnrolledCourses(response.data);
        }
        toast.success("Enrolled courses loaded successfully", {
            id: "enrolled-courses-toast"
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        toast.error('Failed to fetch enrolled courses');
    }
} 


export async function getAllInstructorCourses(token, dispatch) {
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        if (dispatch) {
            dispatch(setMyCourse(response.data));
        }
        localStorage.setItem("myCourses", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching instructor courses:', error);
        toast.error('Failed to fetch instructor courses');
    }
}
