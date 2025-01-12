import React from "react";
import SideBarItem from "./SideBarItems";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";

const AccountPageSidebar = ({ isOpen }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  // const [isLogged, setIsLogged] = useState(true);
  // const [userType, setUserType] = useState("disabled");
  const { user, authenticated, logout: logoutApi } = useAuthContext();

  const logout = () => {
    // setIsLogged(!isLogged);
    logoutApi();
  };


  return (
    <aside
      className={`!min-h-screen !transition-all duration-1000 ${!isOpen ? "hidden" : ""
        }  ${theme === "dark"
          ? "bg-gray-900 border-blue-400 rtl:border-l-2 ltr:border-r-2 text-gray-200"
          : "bg-white text-gray-800"
        }`}
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="w-72 h-full p-6  lg:flex flex-col items-start hidden shadow-md justify-between">
        <div className="flex flex-col w-full space-y-4 sticky top-32" >
        <NavLink
      to={"/"}
      className={({ isActive }) =>
        `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
          isActive
            ? "bg-blue-500 text-white shadow-lg"
            : theme === "dark"
            ? "text-gray-300 hover:bg-gray-800"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
      aria-label={({ isActive }) => (isActive ? t("Selected Page") : t("Home Page"))}
      tabIndex={0}
    >
      <SideBarItem title={t("Home")} iconClasses={"fa-solid fa-house"} />
    </NavLink>

          {authenticated ? (
            <>
              <NavLink
                to="/pages/profile"
          tabIndex={0}

                className={({ isActive }) =>
                  `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                    ? "bg-blue-600 text-white shadow-lg" // Improved contrast for active state
                    : theme === "dark"
                      ? "text-gray-100 hover:bg-gray-700" // Refined for dark mode
                      : "text-gray-900 hover:bg-gray-200" // Refined for light mode
                  }`
                }
              >
                <SideBarItem
                  title={t("Profile")}
                  iconClasses={"fa-solid fa-user-circle"}
                />
              </NavLink>


              <NavLink
          tabIndex={0}

                to="/pages/settings"
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <SideBarItem
                  title={t("Settings")}
                  iconClasses={"fa-solid fa-gear"}
                />
              </NavLink>
              <NavLink
          tabIndex={0}

                to="/pages/security"
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <SideBarItem
                  title={t("Security")}
                  iconClasses={"fa-solid fa-shield"}
                />
              </NavLink>

              {
                user?.role === 'disabled' || user?.role === "assistant" ? <NavLink
          tabIndex={0}

                  to="/pages/requestNeed"
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
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

             {/* {user?.role === "donor" ? (
                <NavLink
          tabIndex={0}

                  to="/pages/donate-history"
                  className={({ isActive }) =>
                    `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
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
              )}*/}
            </>
          ) : (
            ""
          )}

          <NavLink
          tabIndex={0}

            to="/pages/donate"
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                ? "bg-blue-500 text-white shadow-lg"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <SideBarItem
              title={t("Donate")}
              iconClasses={"fa-solid fa-donate"}
            />
          </NavLink>

          <NavLink
          tabIndex={0}

            to="/pages/aboutus"
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                ? "bg-blue-500 text-white shadow-lg"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <SideBarItem
              title={t("About Us")}
              iconClasses={"fa-solid fa-circle fa-circle-info"}
            />
          </NavLink>


          {!authenticated ? (
    <NavLink
          tabIndex={0}

      to="/pages/login"
      className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${isActive
                ? "bg-blue-500 text-white shadow-lg"
                : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
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
          tabIndex={0}

      className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
        theme === "dark"
          ? "text-gray-300 hover:bg-gray-800" // Default state in dark mode
          : "text-gray-700 hover:bg-gray-100" // Default state in light mode
      }`}
      onClick={() => logout()}
    >
      <div className={theme === "dark" ? "!text-red-400" : "!text-red-500"}>
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

       

      </div>
    </aside>
  );
};

export default AccountPageSidebar;
