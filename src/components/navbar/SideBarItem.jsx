
import React from 'react';

const SideBarItem = ({title , toggleSideBar}) => (
    <li className="py-2 border-b border-gray-700">
        <a
            href="#"
            className="flex items-center gap-2"
            onClick={toggleSideBar}
        >
            <i className="fa-solid fa-house"></i> {title}
        </a>
    </li>


);

export default SideBarItem;
