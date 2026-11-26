import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/comman/logo-full-black.png";

/**
 * AuthLayout - Minimalist, focused layout for authentication pages
 * (Login, Signup, Forgot Password, Reset Password).
 */
const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
            {/* Minimal Header */}
            <header className="h-16 flex items-center px-6 sm:px-12 border-b border-slate-200/80 bg-white">
                <Link to="/" className="flex items-center">
                    <img src={Logo} alt="KK Tech Solution" className="h-9 w-auto object-contain" />
                </Link>
            </header>

            {/* Centered Auth Card Container */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200/80 bg-white">
                <p>© {new Date().getFullYear()} KK TECH SOLUTION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuthLayout;
