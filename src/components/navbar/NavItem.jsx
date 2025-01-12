import React from 'react';

const NavItem = ({ iconClasses, title, isSelected, onClick }) => (
    <li className="flex items-center">
        <a
            href="#"
            onClick={onClick}
            className={`p-2 rounded-2xl border-2 ${
                isSelected === title
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-500"
            } hover:text-white hover:bg-blue-500 flex items-center gap-2 transition-all duration-200`}
        >
            <i className={iconClasses}></i>
            {title}
        </a>
    </li>
);

export default NavItem;
