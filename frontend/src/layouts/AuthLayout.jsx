import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/comman/NaveBar";

/**
 * AuthLayout - Authentication layout with top navigation bar,
 * centered responsive card container, and subtle footer.
 * Uses pt-[80px] so the content fits within 100vh without unnecessary scrolling.
 */
const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col pt-[80px] bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
            {/* Top Fixed Header */}
            <NavBar />

            {/* Centered Auth Card Container */}
            <main className="flex-1 flex items-center justify-center px-4 py-4">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </main>

            {/* Subtle Footer */}
            <footer className="py-3 text-center text-xs text-slate-400">
                <p>© {new Date().getFullYear()} Lets Skillo. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuthLayout;
