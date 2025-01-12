import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 dark:bg-gray-800">
      {/* Top Section */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-blue-400">{t("Hope Makers")}</h1>
          <p className="text-sm mt-4 text-gray-400">
            {t("Empowering individuals with disabilities to access tools, support, and resources for a better future.")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-blue-400">{t("Quick Links")}</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/pages/profile"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                {t("My Profile")}
              </a>
            </li>
            <li>
              <a
                href="/pages/settings"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                {t("Settings")}
              </a>
            </li>
            <li>
              <a
                href="/pages/security"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                {t("Security")}
              </a>
            </li>
            <li>
              <a
                href="/pages/donate"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                {t("Donate")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-blue-400">{t("Contact Us")}</h2>
          <p className="text-sm text-gray-400">{t("Email: support@hopemakers.com")}</p>
          <p className="text-sm text-gray-400">{t("Phone: +962-79-000-0000")}</p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-300 transition"
            >
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-300 transition"
            >
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-blue-300 transition"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p className="text-gray-400">
          &copy; 2024 Hope Makers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
