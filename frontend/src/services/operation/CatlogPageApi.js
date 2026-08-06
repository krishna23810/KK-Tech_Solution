import { apiConnector } from "../apiconnector";
import { categoriesApi } from "../apis";

// const {
//     CATEGORIES_PAGE_API
// } = categoriesApi;

const CatalogPageApi = async (categoryId) => {
    let result = [];
    try {
        const respond = await apiConnector("POST", categoriesApi.CATEGORIES_PAGE_API, { categoryId });
        if (!respond.data.success) {
            throw new Error("Failed to fetch catalog data");
        }

        result = respond.data.data;
        
    } catch (error) {
        console.error("Error fetching catalog data:", error);
    }
    return result;
};

export default CatalogPageApi;
