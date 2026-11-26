import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/comman/NaveBar";
import Futter from "../components/comman/futter";

/**
 * MainLayout - Default layout for public and marketing pages.
 * Features fixed top navigation, flexible main outlet, and the global footer.
 */
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            {/* Top Fixed Header */}
            <NavBar />

            {/* Main Content Area with offset for 80px fixed navbar */}
            <main className="flex-1 mt-[80px]">
                <Outlet />
            </main>

            {/* Global Footer */}
            <Futter />
        </div>
    );
};

export default MainLayout;
