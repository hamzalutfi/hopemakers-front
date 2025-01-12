import React from "react";
import InputField from "../input/InputField";
import SubmitButton from "../input/SubmitButton";
import OTPInput from "./OtpForm";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EnterNewPass = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const email = params.get("email");
  const navigate = useNavigate();

  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
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
      await axiosInstance.patch(endpoints.auth.resetpassword, {
        email,
        password: values.password,
        token: otp.join(""),
        confirmPassword: values.confirmPassword,
      });
      navigate("/pages/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-form-container dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-14 rounded-3xl bg-white dark:bg-gray-800 dark:text-gray-200 overflow-hidden">
        <h2 className="text-4xl font-bold mb-6 text-blue-500 dark:text-blue-400">
          {t("Reset Password")}
        </h2>

        <form className="w-full max-w-sm">
          {/* OTP Input */}
          <OTPInput otp={otp} setOtp={setOtp} className="max-w-sm mb-3" />

          {/* Password Input */}
          <InputField
            onChange={handleChange}
            name="password"
            type="password"
            placeholder={t("Enter Your Password")}
            iconClasses="fa-solid fa-lock text-blue-500"
          />

          {/* Confirm Password Input */}
          <InputField
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            placeholder={t("Confirm your password")}
            iconClasses="fa-solid fa-check text-blue-500"
          />

          {/* Submit Button */}
          <SubmitButton onClick={handleSubmit} title={t("Submit")} />
        </form>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:underline mr-4">
            {t("Privacy Policy")}
          </a>
          <a href="#" className="hover:underline mr-4">
            {t("Community Guidelines")}
          </a>
          <a href="#" className="hover:underline">
            {t("Language")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterNewPass;
