import { useForm } from "react-hook-form";
import { login } from "../services/operation/AuthApi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/comman/logo-full-black.png";
import { Mail, Lock } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        dispatch(login(data.email, data.password, navigate));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const preventPaste = (e) => {
        e.preventDefault();
        toast.error("Pasting password is disabled for security reasons.");
    };

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl p-6 transition-all">
            {/* Brand Logo */}
            <div className="flex justify-center mb-5">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="KK Tech Solution"
                        className="h-[120px] w-auto object-contain hover:opacity-90 transition-opacity"
                    />
                </Link>
            </div>

            {/* Header Titles */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                <p className="text-sm text-slate-500 mt-1">Enter your credentials to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input */}
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

                {/* Password Input */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                            Password
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
                            placeholder="••••••••"
                            onPaste={preventPaste}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 mt-2"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                {/* Switch to Signup */}
                <div className="text-center pt-2">
                    <p className="text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
