import React from "react";
import { logout } from "../../../services/operation/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SideBarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    if (authLoading || profileLoading) return <div className="p-4 text-slate-500">Loading...</div>;

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    const displayName = user?.firstName || user?.name || "User";

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-6 px-3">
            <div className="flex flex-col space-y-1">
                {/* User Greeting Header */}
                <div className="px-4 pb-4 mb-2 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">Dashboard</h2>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">Welcome back, {displayName}</p>
                </div>

                {/* Primary Nav Links */}
                <div className="space-y-1">
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        );
                    })}
                </div>
            </div>

            {/* Bottom Actions: Settings & Logout */}
            <div className="pt-4 border-t border-slate-200/80 space-y-1">
                <SidebarLink
                    key="settings"
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-x-3 px-5 py-2.5 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                >
                    <VscSignOut className="text-lg flex-shrink-0" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
