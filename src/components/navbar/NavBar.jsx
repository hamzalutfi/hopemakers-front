import React from "react";
import NavItem from "./NavItem";
import { useLanguage } from '../../Context/LanguageContext';
import { useTranslation } from "react-i18next";
import { useTheme } from '../../Context/ThemeContext';
import { GrLanguage } from "react-icons/gr";

const Navbar = ({ isOpen, toggleSidebar }) => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();
    { //const [isSidebarOpen, setIsSidebarOpen] = useState(false);


        // Function to toggle the sidebar's open/close state
       // const toggleSidebar = () => {
       //     setIsSidebarOpen(!isSidebarOpen);
     //   };


    /* const [isSelect, setIsSelected] = useState("Home");

    function chooseSelected(selectedField) {
        setIsSelected(selectedField);
    }*/}
    // State to toggle the sidebar


    return (
        <nav className="dark:bg-gray-800 dark:text-gray-200 p-4 bg-white text-lg font-bold sticky top-0 text-black shadow-lg flex items-center justify-between md:justify-between !z-30 " dir={language !== "en" ? "ltr" : "rtl"}>
            <header>
                <div className="flex items-center">
                    <a href="/" rel="noopener noreferrer">
                        <img
                            src="/1edited.png"
                            alt="Hope Makers Logo"
                            className="hover-image"
                            
                            tabIndex={0}
                        />
                    </a>
                </div>
            </header>

            <div className="hidden" onClick={toggleSidebar}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className="lg:pr-6 ">
                <ul className="flex gap-4 items-center text-white">


                    <li
                        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-200 transition-all duration-500 hover:scale-90"
                        onClick={toggleTheme}
                        tabIndex={0}
                        aria-label="Toggle theme">
                        <svg className="fill-blue-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </li>



                    <li
                    tabIndex={0}
                        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 text-blue-500"
                        onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
                        aria-label={`Switch to ${language === "en" ? "Arabic" : "English"} language`}
                    >
                        <GrLanguage size={28} aria-hidden="true" />
                    </li>


                    <li
                        onClick={toggleSidebar}
                        tabIndex={0}
                        className={`hidden lg:block top-4 left-4 z-50 p-2 rounded-full focus:outline-none transition-all ${theme === "dark"
                            ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                            : "text-blue-500 hover:bg-blue-600 hover:text-white"
                            }`}
                        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        {isOpen ? (
                            <i className="fa-solid fa-times" aria-hidden="true"></i> // Close Icon
                        ) : (
                            <i className="fa-solid fa-bars" aria-hidden="true"></i> // Menu Icon
                        )}
                    </li>



                </ul>
            </div>
            {/*<SideBar isSideBarOpen={isSidebarOpen} toggleSideBar={() => toggleSidebar()}/>*/}


        </nav>
    );
};

export default Navbar;