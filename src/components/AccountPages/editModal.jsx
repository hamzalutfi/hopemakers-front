import React, { useCallback, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { formDataConvert } from "../../utils/formData";
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Modal = ({ isOpen, onClose, refetch, initialData = {} }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("Full Name is required")),
    gender: Yup.string().required(t("Gender is required")),
    birthDate: Yup.date().required(t("Birth Date is required")),
    phone: Yup.string().required(t("Phone Number is required")),
    city: Yup.string().required(t("City/State is required")),
    disabilityType: Yup.string().required(t("Type of Disability is required")),
    needType: Yup.string().required(t("Type of Need is required")),
    caseDescription: Yup.string().required(t("Case Description is required")),
    medicalReport: Yup.mixed().required(t("Medical Report is required")),
  });

  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await formDataConvert({ disabled: values });
        await axiosInstance.patch(endpoints.auth.me, data, {
          "Content-Type": "multipart/form-data",
        });
        refetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-gray-200">
            {t("Edit Disabled Personal Information")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex justify-between gap-2 !w-full">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Full Name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">{formik.errors.name}</div>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="gender"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Gender")}
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="">{t("Select Gender")}</option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                )}
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="birthDate"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Birth Date")}
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <div className="text-red-500 text-sm">{formik.errors.birthDate}</div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Phone Number")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("City/State")}
                </label>
                <select
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="">{t("Select A City")}</option>
                  <option value="Amman">{t("Amman")}</option>
                  <option value="Jarash">{t("Jarash")}</option>
                  <option value="Zarqa">{t("Zarqa")}</option>
                  <option value="Aqaba">{t("Aqaba")}</option>
                  <option value="Karak">{t("Karak")}</option>
                  <option value="Tafila">{t("Tafila")}</option>
                  <option value="Ma'an">{t("Ma'an")}</option>
                  <option value="Irbid">{t("Irbid")}</option>
                  <option value="Ajloun">{t("Ajloun")}</option>
                  <option value="Balqa">{t("Balqa")}</option>
                  <option value="Madaba">{t("Madaba")}</option>
                  <option value="Mafrag">{t("Mafrag")}</option>
                </select>
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm">{formik.errors.city}</div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="disabilityType"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Type of Disability")}
              </label>
              <select
                id="disabilityType"
                name="disabilityType"
                value={formik.values.disabilityType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">{t("Select Type of Disability")}</option>
                <option value="Physical">{t("Physical")}</option>
                <option value="Sensory">{t("Sensory")}</option>
                <option value="Intellectual/Developmental">{t("Intellectual/Developmental")}</option>
                <option value="Mental and Emotional">{t("Mental and Emotional")}</option>
                <option value="Neurological">{t("Neurological")}</option>
                <option value="Learning">{t("Learning")}</option>
              </select>
              {formik.touched.disabilityType && formik.errors.disabilityType && (
                <div className="text-red-500 text-sm">{formik.errors.disabilityType}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="medicalReport"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Medical Report")}
              </label>
              <input
                type="file"
                id="medicalReport"
                name="medicalReport"
                onChange={(e) => formik.setFieldValue("medicalReport", e.target.files[0])}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {formik.touched.medicalReport && formik.errors.medicalReport && (
                <div className="text-red-500 text-sm">{formik.errors.medicalReport}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="needType"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Type of Need")}
              </label>
              <select
                id="needType"
                name="needType"
                value={formik.values.needType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">{t("Select Type of Need")}</option>
                <option value="Financial">{t("Financial")}</option>
                <option value="Equipment And Tools">{t("Equipment And Tools")}</option>
                <option value="Medical Needs">{t("Medical Needs")}</option>
                <option value="Educational Needs">{t("Educational Needs")}</option>
              </select>
              {formik.touched.needType && formik.errors.needType && (
                <div className="text-red-500 text-sm">{formik.errors.needType}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="caseDescription"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Case Description")}
              </label>
              <textarea
                id="caseDescription"
                name="caseDescription"
                value={formik.values.caseDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              ></textarea>
              {formik.touched.caseDescription && formik.errors.caseDescription && (
                <div className="text-red-500 text-sm">{formik.errors.caseDescription}</div>
              )}
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {t("Save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
