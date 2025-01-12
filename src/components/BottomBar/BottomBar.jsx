import React, { useState, useRef, useEffect } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiShoppingCartLine, RiMenuLine } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import { LiaDonateSolid } from "react-icons/lia";
import { DiAptana } from "react-icons/di";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import SideBarItem from "../AccountPages/SideBarItems"
import { useLanguage } from "../../Context/LanguageContext";
import { CiMenuBurger } from "react-icons/ci";

const BottomBar = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
    const { theme } = useTheme();
    const { user, authenticated, logout: logoutApi } = useAuthContext();
    const logout = () => {
      // setIsLogged(!isLogged);
      logoutApi();
    };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 w-full bg-white border-t border-gray-300 shadow-lg flex justify-around py-2 text-sm text-gray-600 lg:hidden`}
      dir={language !== "en" ? "rtl" : "ltr"}
    >
      {/* Other Navigation Links */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all"
          }`
        }
      >
        <div className="flex flex-col items-center">
          <AiOutlineHome className="text-2xl" />
          <span>{t("Home")}</span>
        </div>
      </NavLink>

      <NavLink
        to="/pages/settings"
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all"
          }`
        }
      >
        <div className="flex flex-col items-center relative">
          <DiAptana className="text-2xl" />
          <span>{t("Settings")}</span>
        </div>
      </NavLink>

      <NavLink
        to="/pages/security"
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all"
          }`
        }
      >
        <div className="flex flex-col items-center">
          <MdOutlineSecurity className="text-2xl" />
          <span>{t("Security")}</span>
        </div>
      </NavLink>

      <NavLink
        to="/pages/donate"
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all"
          }`
        }
      >
        <div className="flex flex-col items-center relative">
          <LiaDonateSolid className="text-2xl" />
          <span>{t("Donate")}</span>
          <span className="absolute -top-1 ms-10 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </div>
      </NavLink>

      {/* Menu Button */}
      <div className="relative" ref={menuRef}>
        <div
          onClick={toggleMenu}
          className="flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex flex-col items-center">
          <CiMenuBurger className="text-2xl"/>

            <span>{t("Menu")}</span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute bottom-16 left-[-2rem] rtl:right-[-14rem] transform -translate-x-1/2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
          {authenticated ? (
            <>
              <NavLink
                to="/pages/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <SideBarItem
                  title={t("Profile")}
                  iconClasses={"fa-solid fa-user-circle"}
                />
              </NavLink>
              
            
             
              {
               user?.role === 'disabled' || user?.role === "assistant" ? <NavLink
                  to="/pages/requestNeed"
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <SideBarItem
                    title={t("Needs")}
                    iconClasses={"fa-regular fa-hand"}
                  />
                </NavLink> : ""
               }

              {user?.role === "donor" ? (
                <NavLink
                  to="/pages/donate-history"
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <SideBarItem
                    title={t("Donate History")}
                    iconClasses={"fa-regular fa-hand"}
                  />
                </NavLink>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {!authenticated ? (
            <NavLink
              to="/pages/login"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : theme === "dark"
                    ? "text-white bg-blue-500 hover:bg-blue-700"
                    : "text-white bg-blue-500 hover:bg-blue-700"
                }`
              }
            >
              <SideBarItem
                title={t("Login")}
                iconClasses={"fa-solid fa-right-to-bracket"}
              />
            </NavLink>
          ) : (
            ""
          )}

          {authenticated ? (
            <button
              className={
                "flex items-center space-x-4 px-4 py-3 rounded-lg transition-all hover:bg-gray-100"
              }
              onClick={() => logout()}
            >
              <div className="!text-red-500">
                <SideBarItem
                  title={t("Logout")}
                  iconClasses={"fa-solid fa-right-from-bracket"}
                />
              </div>
            </button>
          ) : (
            ""
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
