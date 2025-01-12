import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../input/InputField";
import SubmitButton from "../input/SubmitButton";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { theme } = useTheme();
  const [loginError, setLoginError] = useState("");

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("Invalid email address"))
        .required(t("Email is required")),
      password: Yup.string()
        .min(6, t("Password must be at least 6 characters"))
        .required(t("Password is required")),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/");
      } catch (error) {
        // Assuming the server sends a response message for incorrect credentials
        setLoginError(t("Incorrect email or password"));
      }
    },
  });

  return (
    <div
      className={`signup-form-container justify-center min-h-screen flex items-center ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "lg:bg-gray-100"
      }`}
    >
      <div
        className={`flex flex-row gap-36 lg:border-2 lg:p-10 lg:rounded-3xl ${
          theme === "dark"
            ? "lg:border-gray-700 lg:bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900"
            : "lg:border-blue-300 lg:bg-gradient-to-r from-purple-200 to-blue-300"
        }`}
      >
        <div className="rounded-3xl hidden lg:block">
          <img src="/disabled2.png" alt="Sign In Illustration" />
        </div>
        <div
          className={`flex flex-col justify-center items-center p-14 rounded-3xl ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">{t("Sign In")}</h2>

          <form
            className="w-full max-w-sm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="mb-4">
              <InputField
                name="email"
                type="email"
                placeholder={t("Enter Your Email")}
                iconClasses={`fa-solid fa-envelope ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <InputField
                name="password"
                type="password"
                placeholder={t("Enter Your Password")}
                iconClasses={`fa-solid fa-lock ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {loginError && (
              <div className="text-red-500 text-sm mb-4">{loginError}</div>
            )}

            <div className="flex items-center justify-left mb-3">
              <a
                href="/pages/reset-password"
                className={`underline ${
                  theme === "dark"
                    ? "text-blue-400 hover:text-blue-500"
                    : "text-blue-500 hover:text-blue-800"
                }`}
              >
                {t("Forgot Password?")}
              </a>
            </div>

            <SubmitButton
              disabled={!formik.isValid || !formik.dirty}
              title={t("Submit")}
            />
          </form>

          <div className="mt-4 w-full items-center justify-left">
            <p>
              {t("Dont Have An Account?")}{" "}
              <a href="/pages/sign-up">
                <span
                  className={`hover:underline ${
                    theme === "dark"
                      ? "text-blue-400 hover:text-blue-500"
                      : "text-blue-500 hover:text-blue-800"
                  }`}
                >
                  {t("Sign Up")}
                </span>
              </a>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
