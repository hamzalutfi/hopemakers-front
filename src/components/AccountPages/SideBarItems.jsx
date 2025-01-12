import React from 'react';
const SideBarItem = ({title, iconClasses , liClasses}) => {

    return (
        <>

            <div className={liClasses ? liClasses : "px-2 flex items-center space-x-2 hover:cursor-pointer rtl:gap-2"}>
                <i className={iconClasses}></i>
                <span>{title}</span>
            </div>
        </>
    );
};

export default SideBarItem;
    