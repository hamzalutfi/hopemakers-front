import React from "react";
import InputField from "../input/InputField";
import SubmitButton from "../input/SubmitButton";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ResetPassPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(endpoints.auth.forgotPassword, {
        email: values.email,
      });
      navigate(`/pages/confirm-password?email=${values.email}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-form-container !w-full dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-14 rounded-3xl bg-white dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-blue-500 dark:text-blue-400">
          {t("Forgot Password?")}
        </h2>

        <form className="w-full max-w-sm">
          <InputField
            name="email"
            type="email"
            onChange={handleChange}
            placeholder={t("Enter Your Email")}
            iconClasses="fa-solid fa-envelope text-blue-500"
          />

          <SubmitButton onClick={handleSubmit} title={t("Send Reset Link")} />
        </form>

        <div className="mt-4 w-full items-center justify-left text-sm text-gray-500 dark:text-gray-400">
          <p>
            {t("Dont Have An Account?")}
            <a href="/pages/sign-up" className="text-blue-500 hover:underline">
              {" "}
              {t("Sign Up")}
            </a>
          </p>
        </div>


      </div>
    </div>
  );
};

export default ResetPassPage;
