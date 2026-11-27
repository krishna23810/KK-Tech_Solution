import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({ children, Linkto, active, isWhite }) => {
    return (
        <Link to={Linkto}>
            <div className={`${active ? "bg-yellow-400" : "bg-gray-800"} 
        ${isWhite && "text-white"}    
            px-6 py-3 
            rounded-md gap-2 font-bold transition-all duration-300 hover:scale-105`}>
                {children}
            </div>
        </Link>
    )
}

export default Button;