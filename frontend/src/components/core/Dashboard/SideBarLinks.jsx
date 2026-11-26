import React from 'react';
import * as Icons from "react-icons/vsc";
import { matchPath, useLocation, NavLink } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName] || Icons.VscCircle;
    const location = useLocation();

    const isActive = matchPath({ path: link.path }, location.pathname);

    return (
        <NavLink
            to={link.path}
            className={`relative flex items-center gap-x-3 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive
                    ? "bg-amber-50 text-amber-900 font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
        >
            <span
                className={`absolute inset-y-1 left-0 w-1 rounded-r-md bg-amber-500 transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                }`}
            />
            <Icon className={`text-lg flex-shrink-0 ${isActive ? "text-amber-600" : "text-slate-500"}`} />
            <span className="truncate">{link.name}</span>
        </NavLink>
    );
};

export default SidebarLink;
