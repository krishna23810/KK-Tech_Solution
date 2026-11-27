import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePicture, deleteUserAccount } from "../../../../services/operation/UpdateData";
import DetailEdit from "./DetailEdit";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../../services/operation/AuthApi";
import { Camera, Lock, AlertTriangle, UploadCloud } from "lucide-react";

const Setting = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            dispatch(updateProfilePicture(selectedFile));
            setSelectedFile(null);
            setPreview(null);
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            dispatch(deleteUserAccount(navigate));
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(changePassword(data.oldPassword, data.newPassword, data.confirmNewPassword, reset));
    };

    const handleDiscardPassword = () => {
        reset();
    };

    const currentProfilePic =
        preview ||
        user?.additionalInfo?.profilePicture ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
            (user?.firstName || "U") + " " + (user?.lastName || "")
        )}`;

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-2">
            {/* Page Header */}
            <div className="pb-3 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings & Preferences</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Manage your personal information, security, and account settings
                </p>
            </div>

            {/* Section 1: Profile Picture Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
                <div className="pb-3 mb-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Profile Photo</h2>
                    <p className="text-xs text-slate-500 mt-0.5">This picture will appear on your public profile</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                        <img
                            src={currentProfilePic}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-400/20 shadow-md bg-slate-100"
                        />
                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="absolute bottom-0 right-0 p-2 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm transition-all"
                            title="Change photo"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center sm:items-start gap-3">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                            >
                                Select New Photo
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {selectedFile && (
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm transition-all"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    <span>Upload & Save</span>
                                </button>
                            )}
                        </div>

                        {selectedFile && (
                            <p className="text-xs text-slate-500 font-medium">
                                Ready to upload: <span className="text-slate-800">{selectedFile.name}</span>
                            </p>
                        )}
                        <p className="text-xs text-slate-400">Supported formats: JPG, PNG, WEBP (Max 2MB)</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Personal Details Edit Form */}
            <DetailEdit />

            {/* Section 3: Password & Security */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
                <div className="pb-3 mb-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-amber-500" />
                            Update Password
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Ensure your account is using a strong, unique password
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Old Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                {...register("oldPassword", { required: "Current password is required" })}
                            />
                            {errors.oldPassword && (
                                <p className="text-xs text-rose-500 mt-1">{errors.oldPassword.message}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                {...register("newPassword", { required: "New password is required" })}
                            />
                            {errors.newPassword && (
                                <p className="text-xs text-rose-500 mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                {...register("confirmNewPassword", { required: "Please confirm your password" })}
                            />
                            {errors.confirmNewPassword && (
                                <p className="text-xs text-rose-500 mt-1">
                                    {errors.confirmNewPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={handleDiscardPassword}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Section 4: Danger Zone (Delete Account) */}
            <div className="bg-rose-50/40 border border-rose-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-base font-bold text-rose-950">Danger Zone: Delete Account</h2>
                        <p className="text-xs text-rose-800/80 mt-1 leading-relaxed">
                            Deleting your account is permanent and cannot be undone. All your course progress,
                            enrolled certificates, and personal data will be completely wiped from Lets Skillo.
                        </p>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
                        >
                            Permanently Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
