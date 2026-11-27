import { useForm, Controller } from "react-hook-form";
import { sendOtpApi, signup } from "../services/operation/AuthApi";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/comman/logo-full-black.png";
import { Mail, User, Phone, Lock, ShieldCheck } from "lucide-react";

export default function Signup() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            accountType: "student",
            gender: "Male",
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        dispatch(
            signup(
                data.accountType,
                data.firstname,
                data.lastname,
                data.email,
                data.password,
                data.confirmPassword,
                data.otp,
                data.gender,
                data.contactNum,
                navigate
            )
        );
    };

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl p-8 sm:p-10 transition-all">
            {/* Brand Logo */}
            <div className="flex justify-center mb-5">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <span className="text-slate-950 font-black text-lg tracking-tighter">LS</span>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Lets<span className="text-amber-500">Skillo</span>
                    </span>
                </Link>
            </div>

            {/* Header Titles */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an Account</h1>
                <p className="text-sm text-slate-500 mt-1">Join Lets Skillo to start learning today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Account Type Selector Tabs */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        I want to join as
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-slate-100 border border-slate-200">
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                value="student"
                                className="sr-only peer"
                                {...register("accountType")}
                            />
                            <div className="text-center py-2 rounded-lg text-xs font-semibold text-slate-600 transition-all peer-checked:bg-white peer-checked:text-slate-950 peer-checked:shadow-sm">
                                Student
                            </div>
                        </label>
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                value="instructor"
                                className="sr-only peer"
                                {...register("accountType")}
                            />
                            <div className="text-center py-2 rounded-lg text-xs font-semibold text-slate-600 transition-all peer-checked:bg-white peer-checked:text-slate-950 peer-checked:shadow-sm">
                                Instructor
                            </div>
                        </label>
                    </div>
                </div>

                {/* First Name & Last Name (2 Cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                {...register("firstname", { required: "First name is required" })}
                                placeholder="John"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                        </div>
                        {errors.firstname && (
                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.firstname.message}</p>
                        )}
                    </div>

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
                                {...register("lastname", { required: "Last name is required" })}
                                placeholder="Doe"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                        </div>
                        {errors.lastname && (
                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.lastname.message}</p>
                        )}
                    </div>
                </div>

                {/* Email Address */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                        </span>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
                    )}
                </div>

                {/* Contact Number & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                {...register("contactNum", {
                                    required: "Phone number is required",
                                    minLength: { value: 10, message: "Must be at least 10 digits" },
                                })}
                                placeholder="9876543210"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                        </div>
                        {errors.contactNum && (
                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.contactNum.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Gender
                        </label>
                        <select
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Password & Confirm Password (2 Cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", { required: "Please confirm password" })}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                {/* OTP Verification Section */}
                <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            Verification Code (OTP)
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                const email = watch("email");
                                if (!email) {
                                    alert("Please enter a valid email address first.");
                                    return;
                                }
                                dispatch(sendOtpApi(email));
                            }}
                            className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            Send OTP to Email
                        </button>
                    </div>

                    <div className="flex items-center justify-center py-2">
                        <Controller
                            name="otp"
                            control={control}
                            rules={{ required: "OTP is required", minLength: 6, maxLength: 6 }}
                            render={({ field: { onChange, value } }) => (
                                <OtpInput
                                    value={value || ""}
                                    onChange={onChange}
                                    numInputs={6}
                                    renderSeparator={<span className="text-slate-300 mx-1">-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{
                                        width: "2.75rem",
                                        height: "2.75rem",
                                        fontSize: "1.25rem",
                                        borderRadius: "0.75rem",
                                        border: "1px solid #cbd5e1",
                                        backgroundColor: "#f8fafc",
                                        color: "#0f172a",
                                        textAlign: "center",
                                        fontWeight: "600",
                                    }}
                                />
                            )}
                        />
                    </div>
                    {errors.otp && (
                        <p className="text-xs text-rose-500 text-center font-medium">
                            {errors.otp.message || "OTP must be 6 digits"}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 mt-3"
                >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                {/* Switch to Login */}
                <div className="text-center pt-2">
                    <p className="text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
