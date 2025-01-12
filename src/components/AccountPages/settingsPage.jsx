import React from 'react';
import { useLanguage } from '../../Context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (e) => changeLanguage(e.target.value);

  const handleNotificationsChange = (e) => {
    localStorage.setItem('notifications', JSON.stringify(e.target.checked));
  };

  return (
    <main
      className={`flex flex-col w-full p-6 justify-center items-center  transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-200  border-t-2 border-blue-500' : 'bg-gray-50 text-gray-800'
      } ${language === 'ar' ? 'rtl' : 'ltr'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <h1 className="text-3xl font-bold mb-4 text-blue-500 dark:text-blue-400" tabIndex={0}>
        {t("settingsTitle")}
      </h1>

      {/* Language Settings */}
      <div
        className={`w-full lg:w-2/3 p-6 mb-6 shadow-md rounded-lg transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'
        }`}
      >
        <h2 className="text-xl font-bold mb-4" tabIndex={0} >{t("languagePreferences")}</h2>
        <label aria-describedby='info' htmlFor="language" className="block font-medium mb-2" tabIndex={0} >
          {t("selectLanguage")}
        </label>
        <select
        
        tabIndex={0}
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className={`w-full border p-2 rounded ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'
          }`}
        >
          <option id='info' value="en">English</option>
          <option id='info'  value="ar">العربية</option>
          
        </select>
      </div>

      {/* Theme Section */}
      <div
        className={`w-full lg:w-2/3 p-6 mb-6 shadow-md rounded-lg transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'
        }`}
      >
        <h2 tabIndex={0} className="text-xl font-bold mb-4">{t("apperance")}</h2>
        <div  className="flex items-center justify-between gap-4">
          <label tabIndex={0} htmlFor='darkMode'>{t("darkmode")}</label>
          <input
          id='darkMode'
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="toggle-checkbox"
            tabIndex={0}
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        className={`w-full lg:w-2/3 p-6 mb-6 shadow-md rounded-lg transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'
        }`}
      >
        <h2 className="text-xl font-bold mb-4" tabIndex={0}>{t("notificatioPreferences")}</h2>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="notifications" tabIndex={0}>{t("emailNotification")}</label>
          <input
          tabIndex={0}
            type="checkbox"
            id="notifications"
            defaultChecked={JSON.parse(localStorage.getItem('notifications')) || true}
            onChange={handleNotificationsChange}
            className="toggle-checkbox"
          />
        </div>
      </div>

      {/* Account Settings */}
      <div
        className={`w-full lg:w-2/3 p-6 mb-6 shadow-md rounded-lg transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'
        }`}
      >
        <h2 tabIndex={0} className="text-xl font-bold mb-4">{t("accountSettings")}</h2>
        <p tabIndex={0} className="text-sm mb-4">{t("manageAcc")}</p>
        <button
        tabIndex={0}
          className="px-6 py-2 rounded-lg transition-colors duration-300 
          bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t("editAcc")}
        </button>
      </div>
    </main>
  );
};

export default SettingsPage;
