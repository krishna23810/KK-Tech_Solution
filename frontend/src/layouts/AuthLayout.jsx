import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/comman/NaveBar";

/**
 * AuthLayout - Authentication layout with top navigation bar,
 * centered responsive card container, and subtle footer.
 */
const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
            {/* Top Fixed Header */}
            <NavBar />

            {/* Centered Auth Card Container with 80px offset for the fixed navbar */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 mt-[80px]">
                <div className="w-full max-w-md my-6">
                    <Outlet />
                </div>
            </main>

            {/* Subtle Footer */}
            <footer className="py-4 text-center text-xs text-slate-400">
                <p>© {new Date().getFullYear()} KK TECH SOLUTION. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuthLayout;
