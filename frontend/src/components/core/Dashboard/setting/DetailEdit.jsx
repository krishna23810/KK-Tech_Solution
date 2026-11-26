import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setUser } from "../../../../slice/profileSlice";
import { getProfileDetails, updateProfileDetails } from "../../../../services/operation/UpdateData";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { User, Phone, Calendar, MapPin, FileText, Globe } from "lucide-react";

const DetailEdit = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                about: user.additionalInfo?.about || "",
                dateOfBirth: user.additionalInfo?.dateOfBirth
                    ? new Date(user.additionalInfo.dateOfBirth).toISOString().split("T")[0]
                    : "",
                phoneNumber: user.additionalInfo?.phoneNumber || "",
                address: user.additionalInfo?.address || "",
                facebook: user.additionalInfo?.socialLinks?.facebook || "",
                twitter: user.additionalInfo?.socialLinks?.twitter || "",
                linkedin: user.additionalInfo?.socialLinks?.linkedin || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            // Optimistic update
            const updatedUser = {
                ...user,
                firstName: data.firstName || user.firstName,
                lastName: data.lastName || user.lastName,
                additionalInfo: {
                    ...user.additionalInfo,
                    about: data.about || user.additionalInfo?.about,
                    dateOfBirth: data.dateOfBirth || user.additionalInfo?.dateOfBirth,
                    phoneNumber: data.phoneNumber || user.additionalInfo?.phoneNumber,
                    address: data.address || user.additionalInfo?.address,
                    socialLinks: {
                        facebook: data.facebook || user.additionalInfo?.socialLinks?.facebook,
                        twitter: data.twitter || user.additionalInfo?.socialLinks?.twitter,
                        linkedin: data.linkedin || user.additionalInfo?.socialLinks?.linkedin,
                    },
                },
            };

            dispatch(setUser(updatedUser));
            await dispatch(updateProfileDetails(data));
        } catch (error) {
            toast.error("Update failed");
            dispatch(getProfileDetails());
        }
    };

    const handleDiscard = () => {
        reset();
        toast("Changes reverted", { icon: "↩️" });
    };

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
            <div className="pb-4 mb-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Update your personal and contact details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            First Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="First Name"
                                {...register("firstName")}
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Last Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="Last Name"
                                {...register("lastName")}
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Phone className="w-4 h-4" />
                            </span>
                            <input
                                type="tel"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="+91 98765 43210"
                                {...register("phoneNumber")}
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Date of Birth
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Calendar className="w-4 h-4" />
                            </span>
                            <input
                                type="date"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                {...register("dateOfBirth")}
                            />
                        </div>
                    </div>
                </div>

                {/* About Bio */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Bio / About You
                    </label>
                    <div className="relative">
                        <textarea
                            rows={3}
                            className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all resize-none"
                            placeholder="Tell the community a little about yourself, your goals, and interests..."
                            {...register("about")}
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Address / Location
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <MapPin className="w-4 h-4" />
                        </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            placeholder="City, State, Country"
                            {...register("address")}
                        />
                    </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-slate-500" />
                        Social Profile Links
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Facebook */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <FaFacebook className="w-4 h-4 text-blue-600" />
                            </span>
                            <input
                                type="url"
                                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="Facebook Profile URL"
                                {...register("facebook")}
                            />
                        </div>

                        {/* Twitter */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <FaTwitter className="w-4 h-4 text-sky-500" />
                            </span>
                            <input
                                type="url"
                                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="Twitter / X Profile URL"
                                {...register("twitter")}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <FaLinkedin className="w-4 h-4 text-blue-700" />
                            </span>
                            <input
                                type="url"
                                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                placeholder="LinkedIn Profile URL"
                                {...register("linkedin")}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Action Buttons (Clean & in-flow) */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={handleDiscard}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DetailEdit;
