import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const SecurityPage = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const { t } = useTranslation();

  const [oldPasswordError, setOldPasswordError] = useState(""); // State to track old password error

  const handleSubmit = async (values) => {
    try {
      // Reset old password error before submitting
      setOldPasswordError("");

      // Send request to change the password
      await axiosInstance.patch(endpoints.auth.changePassword, {
        oldPassword: values.oldPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      navigate("/pages/login");
    } catch (error) {
      // Check for the specific error message (this depends on your backend)
      if (error.response && error.response.data.error === "Incorrect old password") {
        setOldPasswordError("The old password is incorrect");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <main className="flex flex-col !w-full p-6 !justify-center pt-20 items-center mb-14 lg:!mb-0 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-blue-500 dark:text-blue-400" tabIndex={0}>
        {t("Security")}
      </h1>

      {/* Change Password Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full lg:w-2/3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200" tabIndex={0}>
          {t("Change Password")}
        </h2>
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-4">
              <label htmlFor="oldPassword" className="block font-medium mb-1 dark:text-gray-200">
                {t("Old Password")}
              </label>
              <Field
                tabIndex={0}
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-sm"
              />
              {oldPasswordError && (
                <div className="text-red-500 text-sm mt-2">{oldPasswordError}</div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block font-medium mb-1 dark:text-gray-200">
                {t("New Password")}
              </label>
              <Field
                tabIndex={0}
                type="password"
                id="password"
                name="password"
                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block font-medium mb-1 dark:text-gray-200">
                {t("Confirm New Password")}
              </label>
              <Field
                tabIndex={0}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-4">
              <button
                tabIndex={0}
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                {t("Change Password")}
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Logout From All Devices Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full lg:w-2/3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200" tabIndex={0}>
          {t("Logout From Other Devices")}
        </h2>
        <button tabIndex={0} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500">
          {t("Logout From All Devices")}
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full lg:w-2/3">
        <h2  tabIndex={0} className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {t("Delete Your Account")}
        </h2>
        <button tabIndex={0} className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
          {t("Delete Account")}
        </button>
      </div>

      {/* Security Tips Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full lg:w-2/3">
        <h2 tabIndex={0} className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {t("Security Tips")}
        </h2>
        <ul tabIndex={0} className="mt-4 list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li tabIndex={0}>{t("Use a strong, unique password for each account.")}</li>
          <li tabIndex={0}>{t("Enable Two-Factor Authentication (2FA) for added security.")}</li>
          <li tabIndex={0}>{t("Monitor your login activity regularly.")}</li>
          <li tabIndex={0}>{t("Avoid using public Wi-Fi networks for sensitive actions.")}</li>
        </ul>
      </div>
    </main>
  );
};

export default SecurityPage;
