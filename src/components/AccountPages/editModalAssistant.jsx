import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { formDataConvert } from "../../utils/formData";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import * as Yup from "yup";

const ModalAssistant = ({ isOpen, onClose, refetch, initialData = {} }) => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    assistant: Yup.object().shape({
      name: Yup.string().required(t("Full Name is required")),
      gender: Yup.string().required(t("Gender is required")),
      birthDate: Yup.date().required(t("Birth Date is required")),
      phone: Yup.string()
        .matches(/^[0-9]+$/, t("Phone number must be numeric"))
        .required(t("Phone Number is required")),
      city: Yup.string().required(t("City/State is required")),
      relation: Yup.string().required(t("Type of Relationship is required")),
      idDocument: Yup.mixed().required(t("Identification Document is required")),
    }),
    disabled: Yup.object().shape({
      name: Yup.string().required(t("Full Name is required")),
      gender: Yup.string().required(t("Gender is required")),
      birthDate: Yup.date().required(t("Birth Date is required")),
      phone: Yup.string()
        .matches(/^[0-9]+$/, t("Phone number must be numeric"))
        .required(t("Phone Number is required")),
      city: Yup.string().required(t("City/State is required")),
      disabilityType: Yup.string().required(t("Type of Disability is required")),
      medicalReport: Yup.mixed().required(t("Medical Report is required")),
      caseDescription: Yup.string().required(t("Case Description is required")),
    }),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const updatedValues = _.cloneDeep(prevValues);
      _.set(updatedValues, name, value);
      return updatedValues;
    });
  };

  const fileChangeHandler = (e) => {
    setValues((prevValues) => {
      const updatedValues = _.cloneDeep(prevValues);
      _.set(updatedValues, e.target.name, e.target.files[0]);
      return updatedValues;
    });
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        _.set(newErrors, error.path, error.message);
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const data = formDataConvert(values);
      await axiosInstance.patch(endpoints.auth.me, data);
      onClose();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-gray-200">
            {t("Edit Personal Information")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}

            <h1 className="font-bold">
              {t("Edit Assistant Personal Information")}
            </h1>
            <div className="flex justify-between gap-2 !w-full">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Full Name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="assistant.name"
                  value={values?.assistant?.name || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.assistant?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assistant.name}
                  </p>
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
                  name="assistant.gender"
                  value={values?.assistant?.gender || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option>{t("Select Your Gender")}</option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </select>
                {errors.assistant?.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assistant.gender}
                  </p>
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
                  name="assistant.birthDate"
                  value={values?.assistant?.birthDate || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.assistant?.birthDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assistant.birthDate}
                  </p>
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
                name="assistant.phone"
                value={values?.assistant?.phone || ""}
                onChange={changeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.assistant?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assistant.phone}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <label
                  htmlFor="country"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Country")}
                </label>
                <select
                  disabled
                  id="country"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="Jordan">{t("Jordan")}</option>
                </select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("City/State")}
                </label>
                <select
                  id="city"
                  name="assistant.city"
                  value={values?.assistant?.city || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option>{t("Select A City")}</option>
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
                {errors.assistant?.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assistant.city}
                  </p>
                )}
              </div>
            </div>

            <hr></hr>
            <h1 className="font-bold">{t("Edit Assistant Information")}</h1>
            <div>
              <label
                htmlFor="disabilityType"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Type of Relationship")}
              </label>
              <select
                id="relation"
                name="assistant.relation"
                value={values?.assistant?.relation || ""}
                onChange={changeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Friend">{t("Friend")}</option>
                <option value="Volunteer">{t("Volunteer")}</option>
                <option value="family">{t("Family Member")}</option>
              </select>
              {errors.assistant?.relation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assistant.relation}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="idDocument"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Identification Document")}
              </label>
              <input
                type="file"
                id="idDocument"
                name="assistant.idDocument"
                onChange={fileChangeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.assistant?.idDocument && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assistant.idDocument}
                </p>
              )}
            </div>

            <hr></hr>
            <h1 className="font-bold">
              {t("Edit Disabled Personal Information")}
            </h1>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------*/}

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
                  id="name"
                  name="disabled.name"
                  value={values?.disabled?.name || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.disabled?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.disabled.name}
                  </p>
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
                  name="disabled.gender"
                  value={values?.disabled?.gender || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option>{t("Select Your Gender")}</option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </select>
                {errors.disabled?.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.disabled.gender}
                  </p>
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
                  name="disabled.birthDate"
                  value={values?.disabled?.birthDate || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.disabled?.birthDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.disabled.birthDate}
                  </p>
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
                name="disabled.phone"
                value={values?.disabled?.phone || ""}
                onChange={changeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.disabled?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disabled.phone}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <label
                  htmlFor="country"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("Country")}
                </label>
                <select
                  disabled
                  id="country"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="Jordan">{t("Jordan")}</option>
                </select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block font-medium mb-1 dark:text-gray-200"
                >
                  {t("City/State")}
                </label>
                <select
                  id="city"
                  name="disabled.city"
                  value={values?.disabled?.city || ""}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                >
                  <option>{t("Select City")}</option>
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
                {errors.disabled?.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.disabled.city}
                  </p>
                )}
              </div>
            </div>

            <hr></hr>
            <h1 className="font-bold">{t("Edit Disablility Information")}</h1>
            <div>
              <label
                htmlFor="disabilityType"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Type of Disability")}
              </label>
              <select
                id="disabilityType"
                name="disabled.disabilityType"
                value={values?.disabled?.disabilityType || ""}
                onChange={changeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Physical">{t("Physical")}</option>
                <option value="Sensory">{t("Sensory")}</option>
                <option value="Intellectual/Developmental">
                  {t("Intellectual/Developmental")}
                </option>
                <option value="Mental and Emotional">
                  {t("Mental and Emotional")}
                </option>
                <option value="Neurological">{t("Neurological")}</option>
                <option value="Learning">{t("Learning")} </option>
              </select>
              {errors.disabled?.disabilityType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disabled.disabilityType}
                </p>
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
                name="disabled.medicalReport"
                onChange={fileChangeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.disabled?.medicalReport && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disabled.medicalReport}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="typeOfNeed"
                className="block font-medium mb-1 dark:text-gray-200"
              >
                {t("Type of Need")}
              </label>
              <select
                id="typeOfNeed"
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Financial">{t("Financial")}</option>
                <option value="Equipment And Tools">
                  {t("Equipment And Tools")}
                </option>
                <option value="Medical Needs">{t("Medical Needs")}</option>
                <option value="Educational Needs">
                  {t("Educational Needs")}
                </option>
              </select>
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
                name="disabled.caseDescription"
                value={values?.disabled?.caseDescription || ""}
                onChange={changeHandler}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
              ></textarea>
              {errors.disabled?.caseDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disabled.caseDescription}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded"
          >
            {t("Cancel")}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {t("Save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAssistant;