import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavBar from "../components/comman/NaveBar";
import Sidebar from "../components/core/Dashboard/SideBar";

/**
 * DashboardLayout - Shell for all authenticated /dashboard/* routes.
 * Features top navigation header, sticky/full-height sidebar, and independent scrollable outlet without marketing footer.
 */
const DashboardLayout = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">
            {/* Top Fixed Header (80px) */}
            <NavBar />

            {/* Dashboard Workspace - Flex fills the rest automatically! */}
            <div className="flex flex-1 overflow-hidden mt-[45px]">
                <Sidebar />
                <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto w-11/12 max-w-6xl py-6 flex flex-col gap-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
