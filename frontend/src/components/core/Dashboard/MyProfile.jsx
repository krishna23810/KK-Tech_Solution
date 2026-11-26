import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaEdit } from "react-icons/fa";
import { Mail, Phone, Calendar, MapPin, User, ExternalLink, Sparkles } from "lucide-react";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
    const avatarUrl =
        user?.additionalInfo?.profilePicture ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

    const formattedDob = user?.additionalInfo?.dateOfBirth
        ? new Date(user.additionalInfo.dateOfBirth).toISOString().split("T")[0]
        : null;

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            {/* Header Title & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
                    <p className="text-sm text-slate-500 mt-0.5">View and manage your personal account details</p>
                </div>
                {user?.accountType && (
                    <span className="self-start sm:self-auto px-3.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                        {user.accountType}
                    </span>
                )}
            </div>

            {/* Section 1: Hero Profile Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="relative">
                            <img
                                src={avatarUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-400/30 shadow-sm bg-slate-100"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Active"></span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
                            <p className="text-sm text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {user?.email}
                            </p>
                            <span className="inline-block mt-2 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                                Role: {user?.accountType || "Student"}
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <FaEdit className="text-sm" />
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>

            {/* Section 2: About Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        About Me
                    </h3>
                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </Link>
                </div>
                {user?.additionalInfo?.about ? (
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                        {user.additionalInfo.about}
                    </p>
                ) : (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                        <p className="text-sm text-slate-500 italic">
                            No bio added yet. Tell others a little bit about yourself!
                        </p>
                        <Link
                            to="/dashboard/settings"
                            className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                        >
                            + Add Bio
                        </Link>
                    </div>
                )}
            </div>

            {/* Section 3: Personal Details Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">Personal Details</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Your personal and contact information</p>
                    </div>
                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 block mb-1">First Name</span>
                        <p className="text-sm font-semibold text-slate-800">{user?.firstName || "—"}</p>
                    </div>

                    {/* Last Name */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 block mb-1">Last Name</span>
                        <p className="text-sm font-semibold text-slate-800">{user?.lastName || "—"}</p>
                    </div>

                    {/* Email */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            Email Address
                        </span>
                        <p className="text-sm font-semibold text-slate-800 break-all">{user?.email || "—"}</p>
                    </div>

                    {/* Phone Number */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            Phone Number
                        </span>
                        <p className={`text-sm font-semibold ${user?.additionalInfo?.phoneNumber ? "text-slate-800" : "text-slate-400 italic font-normal"}`}>
                            {user?.additionalInfo?.phoneNumber || "Not provided"}
                        </p>
                    </div>

                    {/* Gender */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            Gender
                        </span>
                        <p className={`text-sm font-semibold ${user?.additionalInfo?.gender ? "text-slate-800 capitalize" : "text-slate-400 italic font-normal"}`}>
                            {user?.additionalInfo?.gender || "Not provided"}
                        </p>
                    </div>

                    {/* Date of Birth */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Date of Birth
                        </span>
                        <p className={`text-sm font-semibold ${formattedDob ? "text-slate-800" : "text-slate-400 italic font-normal"}`}>
                            {formattedDob || "Not provided"}
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Address
                    </span>
                    <p className={`text-sm font-semibold ${user?.additionalInfo?.address ? "text-slate-800" : "text-slate-400 italic font-normal"}`}>
                        {user?.additionalInfo?.address || "Not provided"}
                    </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-5 border-t border-slate-200">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Social Profiles
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Facebook */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaFacebook className="text-blue-600 text-xl flex-shrink-0" />
                                <span className="text-xs font-medium text-slate-700 truncate">
                                    {user?.additionalInfo?.socialLinks?.facebook ? "Facebook" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.facebook ? (
                                <a
                                    href={user.additionalInfo.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 p-1"
                                    title="Open Facebook profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-slate-400">None</span>
                            )}
                        </div>

                        {/* Twitter */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaTwitter className="text-sky-500 text-xl flex-shrink-0" />
                                <span className="text-xs font-medium text-slate-700 truncate">
                                    {user?.additionalInfo?.socialLinks?.twitter ? "Twitter / X" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.twitter ? (
                                <a
                                    href={user.additionalInfo.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sky-500 hover:text-sky-600 p-1"
                                    title="Open Twitter profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-slate-400">None</span>
                            )}
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaLinkedin className="text-blue-700 text-xl flex-shrink-0" />
                                <span className="text-xs font-medium text-slate-700 truncate">
                                    {user?.additionalInfo?.socialLinks?.linkedin ? "LinkedIn" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.linkedin ? (
                                <a
                                    href={user.additionalInfo.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 hover:text-blue-800 p-1"
                                    title="Open LinkedIn profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-slate-400">None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
