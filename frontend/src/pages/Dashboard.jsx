import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (authLoading || profileLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] mt-[80px] flex items-center justify-center text-slate-500 bg-slate-50">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative flex min-h-[calc(100vh-80px)] bg-slate-50">
            <Sidebar />
            <div className="flex-1 min-w-0 h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-6 bg-slate-50 mt-[20px]">
                <div className="mx-auto w-11/12 max-w-6xl py-6 flex flex-col gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
