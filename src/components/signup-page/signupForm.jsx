import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../input/InputField";
import SubmitButton from "../input/SubmitButton";
import SelectUserType from "./SelectUserType";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { useNavigate } from "react-router-dom";
import { Button, Dialog } from "@mui/material";
import OTPInput from "../ResetPassPage/OtpForm";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

const SignUpForm = ({ logoHeader }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const { theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState(new Array(6).fill(""));

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("Invalid email address"))
        .required(t("Email is required")),
      password: Yup.string()
        .min(6, t("Password must be at least 6 characters"))
        .required(t("Password is required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t("Passwords must match"))
        .required(t("Confirm Password is required")),
      role: Yup.string().required(t("User role is required")),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSendOTP = async () => {
    try {
      await axiosInstance.post(endpoints.auth.activate, {
        email: formik.values.email,
        token: otp,
      });
      navigate("/pages/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`signup-form-container min-h-screen flex justify-center ${
          theme === "dark" ? "bg-gray-900 text-gray-200" : "lg:bg-gray-100"
        }`}
      >
        <div
          className={`flex flex-row-reverse gap-32 lg:border-2 lg:p-10 lg:rounded-3xl ${
            theme === "dark"
              ? "lg:border-gray-700 lg:bg-gradient-to-l from-gray-800 via-gray-700 to-gray-900"
              : "lg:border-blue-300 lg:bg-gradient-to-l from-purple-300 to-blue-300"
          }`}
        >
          <div className="rounded-3xl hidden lg:block">
            <img src="/disabled3.png" alt="Sign Up Illustration" />
          </div>
          <div
            className={`flex flex-col justify-center items-center p-14 rounded-3xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-4xl font-bold mb-6">{t("Sign Up")}</h2>

            <form
              className="w-full max-w-sm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              {/* Email Field */}
              <div className="mb-4">
                <InputField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  type="email"
                  placeholder={t("Enter Your Email")}
                  iconClasses={`fa-solid fa-envelope ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <InputField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                  placeholder={t("Enter Your Password")}
                  iconClasses={`fa-solid fa-lock ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <InputField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  type="password"
                  placeholder={t("Confirm your password")}
                  iconClasses={`fa-solid fa-check ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              {/* Role Selection */}
              <div className="mb-4">
                <SelectUserType
                  handleChange={formik.handleChange}
                  value={formik.values.role}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.role}
                  </div>
                )}
              </div>

              <SubmitButton
                onClick={formik.handleSubmit}
                title={t("Submit")}
                disabled={!formik.isValid || !formik.dirty}
              />
            </form>

            
          </div>
        </div>
      </div>

      {/* OTP Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="p-5">
        <div
          className={`p-5 flex flex-col gap-2 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">{t("Enter OTP")}</h2>
          <OTPInput setOtp={setOtp} otp={otp} />
          <Button variant="contained" onClick={handleSendOTP}>
            {t("Submit")}
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default SignUpForm;
