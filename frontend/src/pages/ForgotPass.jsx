import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../services/operation/AuthApi";
import Logo from "../assets/comman/logo-full-black.png";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPass = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [emailId, setEmailId] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordToken(emailId, setEmailSent));
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

            {loading ? (
                <div className="py-12 flex flex-col items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Sending recovery email...</p>
                </div>
            ) : (
                <div>
                    {emailSent ? (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Check Your Email</h1>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                We sent a password reset link to <span className="font-semibold text-slate-900">{emailId}</span>. Please check your inbox and spam folder.
                            </p>
                            <button
                                onClick={() => setEmailSent(false)}
                                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Resend Email
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    Enter your registered email address and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleOnSubmit} className="space-y-4">
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
                                            required
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 rounded-xl font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm hover:shadow transition-all duration-200"
                                >
                                    Send Reset Link
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Back to Login Link */}
                    <div className="text-center pt-6 mt-6 border-t border-slate-100">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Login</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPass;
