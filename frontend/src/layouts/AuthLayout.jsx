import React from "react";
import { Outlet } from "react-router-dom";

/**
 * AuthLayout - Minimalist, focused full-page container for authentication.
 * Provides a clean light background, centered responsive container, and simple copyright.
 */
const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
            {/* Centered Auth Card Container */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </main>

            {/* Minimal Subtle Footer */}
            <footer className="py-4 text-center text-xs text-slate-400">
                <p>© {new Date().getFullYear()} KK TECH SOLUTION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuthLayout;
