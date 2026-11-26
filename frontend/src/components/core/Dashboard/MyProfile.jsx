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
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-2">
            {/* Header Title & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-700/60">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">My Profile</h1>
                    <p className="text-sm text-gray-400 mt-0.5">View and manage your personal account details</p>
                </div>
                {user?.accountType && (
                    <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                        {user.accountType}
                    </span>
                )}
            </div>

            {/* Section 1: Hero Profile Card */}
            <div className="bg-gray-800/90 border border-gray-700/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all hover:border-gray-600/80">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="relative">
                            <img
                                src={avatarUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-yellow-400/30 shadow-md bg-gray-900"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-800 rounded-full" title="Active"></span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{fullName}</h2>
                            <p className="text-sm text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {user?.email}
                            </p>
                            <span className="inline-block mt-2 text-xs font-medium text-gray-300 bg-gray-700/70 px-2.5 py-0.5 rounded-md">
                                Role: {user?.accountType || "Student"}
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-xl text-sm transition-all duration-200 shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <FaEdit className="text-sm" />
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>

            {/* Section 2: About Card */}
            <div className="bg-gray-800/90 border border-gray-700/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all hover:border-gray-600/80">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        About Me
                    </h3>
                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </Link>
                </div>
                {user?.additionalInfo?.about ? (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {user.additionalInfo.about}
                    </p>
                ) : (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/40 border border-dashed border-gray-700/70">
                        <p className="text-sm text-gray-400 italic">
                            No bio added yet. Tell others a little bit about yourself!
                        </p>
                        <Link
                            to="/dashboard/settings"
                            className="text-xs text-yellow-400 hover:underline font-medium"
                        >
                            + Add Bio
                        </Link>
                    </div>
                )}
            </div>

            {/* Section 3: Personal Details Card */}
            <div className="bg-gray-800/90 border border-gray-700/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all hover:border-gray-600/80">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-white">Personal Details</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Your personal and contact information</p>
                    </div>
                    <Link
                        to="/dashboard/settings"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 block mb-1">First Name</span>
                        <p className="text-sm font-medium text-white">{user?.firstName || "—"}</p>
                    </div>

                    {/* Last Name */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 block mb-1">Last Name</span>
                        <p className="text-sm font-medium text-white">{user?.lastName || "—"}</p>
                    </div>

                    {/* Email */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            Email Address
                        </span>
                        <p className="text-sm font-medium text-white break-all">{user?.email || "—"}</p>
                    </div>

                    {/* Phone Number */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            Phone Number
                        </span>
                        <p className={`text-sm font-medium ${user?.additionalInfo?.phoneNumber ? "text-white" : "text-gray-500 italic"}`}>
                            {user?.additionalInfo?.phoneNumber || "Not provided"}
                        </p>
                    </div>

                    {/* Gender */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            Gender
                        </span>
                        <p className={`text-sm font-medium ${user?.additionalInfo?.gender ? "text-white capitalize" : "text-gray-500 italic"}`}>
                            {user?.additionalInfo?.gender || "Not provided"}
                        </p>
                    </div>

                    {/* Date of Birth */}
                    <div className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            Date of Birth
                        </span>
                        <p className={`text-sm font-medium ${formattedDob ? "text-white" : "text-gray-500 italic"}`}>
                            {formattedDob || "Not provided"}
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-5 p-3.5 rounded-xl bg-gray-900/40 border border-gray-700/40">
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        Address
                    </span>
                    <p className={`text-sm font-medium ${user?.additionalInfo?.address ? "text-white" : "text-gray-500 italic"}`}>
                        {user?.additionalInfo?.address || "Not provided"}
                    </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-5 border-t border-gray-700/60">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Social Profiles
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Facebook */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-700/40">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaFacebook className="text-blue-500 text-xl flex-shrink-0" />
                                <span className="text-xs text-gray-300 truncate">
                                    {user?.additionalInfo?.socialLinks?.facebook ? "Facebook" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.facebook ? (
                                <a
                                    href={user.additionalInfo.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 p-1"
                                    title="Open Facebook profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-gray-500">None</span>
                            )}
                        </div>

                        {/* Twitter */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-700/40">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaTwitter className="text-sky-400 text-xl flex-shrink-0" />
                                <span className="text-xs text-gray-300 truncate">
                                    {user?.additionalInfo?.socialLinks?.twitter ? "Twitter / X" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.twitter ? (
                                <a
                                    href={user.additionalInfo.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sky-400 hover:text-sky-300 p-1"
                                    title="Open Twitter profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-gray-500">None</span>
                            )}
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-700/40">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <FaLinkedin className="text-blue-400 text-xl flex-shrink-0" />
                                <span className="text-xs text-gray-300 truncate">
                                    {user?.additionalInfo?.socialLinks?.linkedin ? "LinkedIn" : "Not connected"}
                                </span>
                            </div>
                            {user?.additionalInfo?.socialLinks?.linkedin ? (
                                <a
                                    href={user.additionalInfo.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 p-1"
                                    title="Open LinkedIn profile"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-gray-500">None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
