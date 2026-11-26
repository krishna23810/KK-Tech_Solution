import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../../assets/comman/logo-full-black.png';
import { NavbarLinks } from '../../data/naveBar-kinl';
import { useSelector, useDispatch } from 'react-redux';
import { MdShoppingCart } from "react-icons/md";
import { apiConnector } from "../../services/apiconnector";
import { categoriesApi } from "../../services/apis";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import ProfileDropDown from './profileDropDown';
import { setCategory } from '../../slice/profileSlice';

const NavBar = () => {
    const { token } = useSelector((state) => state.auth);
    const { category } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);
    const profilePic =
        user?.additionalInfo?.profilePicture ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
            (user?.firstName || "U") + " " + (user?.lastName || "")
        )}`;
    const account = "Instructor";

    const dispatch = useDispatch();
    const getCategories = useCallback(async () => {
        try {
            const result = await apiConnector("GET", categoriesApi.CATEGORIES_API);
            if (result.status === 200) {
                dispatch(setCategory(result.data.categories));
                localStorage.setItem("category", JSON.stringify(result.data.categories));
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const refProfile = useRef();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileDropDown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refProfile.current && !refProfile.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    const location = useLocation();
    const currentPage = (route) => {
        return matchPath({ path: route, end: true }, location.pathname);
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-[80px] flex items-center justify-center bg-white border-b border-slate-200 shadow-sm z-50">
            <div className="w-11/12 max-w-7xl text-slate-800 p-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={Logo} alt="KK Tech Solution" className="h-10 w-auto object-contain" loading="lazy" />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-2">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="inline-block">
                                {link.title === "Catalog" ? (
                                    <div className="flex items-center gap-1 text-sm font-semibold px-4 py-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg relative group cursor-pointer transition-colors">
                                        <span>{link.title}</span>
                                        <IoCaretDownCircleOutline className="h-4 w-4 text-slate-500" />

                                        {/* Dropdown Menu */}
                                        <div className="invisible absolute -left-8 top-full mt-2 flex flex-col rounded-xl bg-white border border-slate-200 p-3 text-slate-800 shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 min-w-[200px] z-20">
                                            {category.length ? (
                                                category.map((sublink, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                        className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-900 transition-colors"
                                                    >
                                                        {sublink.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-400 p-2">No categories found</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                                            currentPage(link?.path)
                                                ? "bg-amber-400 text-slate-950 shadow-sm font-bold"
                                                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                                        }`}
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Actions: Cart & Profile / Auth */}
                <div className="flex items-center space-x-3 relative">
                    {token && user?.accountType !== account && (
                        <Link
                            to="/dashboard/cart"
                            className="relative p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Cart"
                        >
                            <MdShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {!token ? (
                        <div className="flex items-center space-x-2">
                            <Link
                                to="/signup"
                                className="text-sm font-semibold px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="text-sm font-semibold px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-lg shadow-sm transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={profileDropDown}
                                className="flex items-center focus:outline-none ring-2 ring-transparent hover:ring-amber-400 rounded-full transition-all"
                            >
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
                                />
                            </button>
                            <div
                                className={`profileDrop ${isProfileOpen ? "visible" : "invisible"}`}
                                ref={refProfile}
                            >
                                <ProfileDropDown />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
