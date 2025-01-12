import React, { useState } from "react";
import { formDataConvert } from "../../utils/formData";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";

const SubmitNeedPage = () => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Validation schema using yup
  const validationSchema = yup.object({
    title: yup.string().required(t("Title is required")),
    disabilityType: yup.string().required(t("Disability type is required")),
    donationType: yup.string().required(t("Donation type is required")),
    image: yup
      .mixed()
      .required(t("Need image is required"))
      .test("fileType", t("Only images are allowed (JPG or PNG)"), (value) =>
        value ? ["image/jpeg", "image/png"].includes(value.type) : false
      ),
    file: yup
      .mixed()
      .required(t("Medical report is required"))
      .test("fileType", t("Only PDF or Word documents are allowed"), (value) =>
        value
          ? ["application/pdf", "application/msword"].includes(value.type)
          : false
      ),
    caseDescription: yup.string().required(t("Case description is required")),
    needDescription: yup.string().required(t("Need description is required")),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      title: "",
      disabilityType: "",
      donationType: "",
      image: null,
      file: null,
      caseDescription: "",
      needDescription: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const data = formDataConvert(values);
        await axiosInstance.post(endpoints.need.cases, data);
        Navigate("/pages/donate");
      } catch (error) {
        toast.error(t(error));
        if (error.response && error.response.status === 500) {
          setErrorMessage(error.response.data); // Show backend error message
        } else {
          console.log(error);
        }
      }
    },
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    formik.setFieldValue(name, files[0]);
  };

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen !w-full">
      <div className="container mx-auto max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500 dark:text-blue-400">
          {t("Submit a Need")}
        </h1>
        {errorMessage && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Title")}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>

          {/* Disability Type */}
          <div>
            <label
              htmlFor="disabilityType"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Type of Disability")}
            </label>
            <select
              id="disabilityType"
              name="disabilityType"
              value={formik.values.disabilityType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.disabilityType && formik.errors.disabilityType
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">{t("Select Type")}</option>
              <option value="physical">{t("Physical")}</option>
              <option value="sensory">{t("Sensory")}</option>
              <option value="neurological">{t("Neurological")}</option>
              <option value="intellectual">{t("Intellectual")}</option>
              <option value="mental">{t("Mental")}</option>
              <option value="learning">{t("Learning")}</option>
            </select>
            {formik.touched.disabilityType && formik.errors.disabilityType && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.disabilityType}
              </div>
            )}
          </div>

          {/* Donation Type */}
          <div>
            <label
              htmlFor="donationType"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Type of Donation")}
            </label>
            <select
              id="donationType"
              name="donationType"
              value={formik.values.donationType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.donationType && formik.errors.donationType
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">{t("Select Type")}</option>
              <option value="devices">{t("Devices")}</option>
              <option value="financial">{t("Financial")}</option>
              <option value="educational">{t("Educational")}</option>
              <option value="other">{t("Other")}</option>
            </select>
            {formik.touched.donationType && formik.errors.donationType && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.donationType}
              </div>
            )}
          </div>

          {/* Medical Report */}
          <div>
            <label
              htmlFor="file"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Medical Condition Report")}
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.file && formik.errors.file
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formik.touched.file && formik.errors.file && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.file}
              </div>
            )}
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Need Image")}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.image}
              </div>
            )}
          </div>

          {/* Case Description */}
          <div>
            <label
              htmlFor="caseDescription"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Description of the Case")}
            </label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={formik.values.caseDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.caseDescription && formik.errors.caseDescription
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              rows="4"
            ></textarea>
            {formik.touched.caseDescription &&
              formik.errors.caseDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.caseDescription}
                </div>
              )}
          </div>

          {/* Need Description */}
          <div>
            <label
              htmlFor="needDescription"
              className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
            >
              {t("Type of Need (Description)")}
            </label>
            <textarea
              id="needDescription"
              name="needDescription"
              value={formik.values.needDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded p-2 focus:ring-2 focus:outline-none ${
                formik.touched.needDescription && formik.errors.needDescription
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              rows="4"
            ></textarea>
            {formik.touched.needDescription &&
              formik.errors.needDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.needDescription}
                </div>
              )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all"
            >
              {t("Submit")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SubmitNeedPage;
