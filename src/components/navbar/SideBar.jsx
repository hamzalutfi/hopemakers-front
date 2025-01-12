import React, { useState } from 'react';
import SideBarItem from './SideBarItem';

const SideBar = ({ toggleSideBar, isSideBarOpen }) => {


    return (
        <>
            {isSideBarOpen == true && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                    onClick={toggleSideBar}
                >
                    <div
                        className="w-64 bg-blue-400 text-white p-4 rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <h2 className="text-xl font-bold">Menu</h2>
                            <button onClick={toggleSideBar}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <ul className="pt-4 flex flex-col">
                            <SideBarItem title={"Home"} toggleSideBar={() => toggleSideBar()}/> 
                            <SideBarItem title={"Donate"} toggleSideBar={() => toggleSideBar()}/> 
                            <SideBarItem title={"Contact"} toggleSideBar={() => toggleSideBar()}/> 
                            <SideBarItem title={"About"} toggleSideBar={() => toggleSideBar()}/> 
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;
