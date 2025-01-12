import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { useTranslation } from "react-i18next";

const ModalDonor = ({ isOpen, onClose, refetch, initialData = {} }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().required(t("Full Name is required")),
    gender: Yup.string().oneOf(["male", "female"], t("Select a valid gender")).required(t("Gender is required")),
    birthDate: Yup.date()
    .required(t("Birth Date is required"))
    .test("age", t("You must be between 16 and 80 years old"), (value) => {
      const currentDate = new Date();
      const birthDate = new Date(value);

      // Calculate the age
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const month = currentDate.getMonth() - birthDate.getMonth();
      const day = currentDate.getDate() - birthDate.getDate();

      // Adjust the age if the current date hasn't passed the birth date yet
      if (month < 0 || (month === 0 && day < 0)) {
        age--;
      }

      // Return whether the age is between 16 and 80
      return age >= 16 && age <= 80;
    }),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, t("Enter a valid phone number"))
      .required(t("Phone Number is required")),
    city: Yup.string().required(t("City is required")),
    donationType: Yup.string().required(t("Donation type is required")),
    donationPrivacy: Yup.string()
      .oneOf(["Public", "Private"], t("Select a valid privacy option"))
      .required(t("Donation privacy is required")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axiosInstance.patch(endpoints.auth.me, { donor: values });
      onClose();
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
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
            {t("Edit Donor Personal Information")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <h1 className="font-bold">{t("Edit Donor Personal Information")}</h1>

                {/* Full Name */}
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block font-medium mb-1 dark:text-gray-200"
                  >
                    {t("Full Name")}
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Gender and Birth Date */}
                <div className="flex justify-between gap-2">
                  <div className="w-1/2">
                    <label
                      htmlFor="gender"
                      className="block font-medium mb-1 dark:text-gray-200"
                    >
                      {t("Gender")}
                    </label>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <option value="">{t("Select Your Gender")}</option>
                      <option value="male">{t("Male")}</option>
                      <option value="female">{t("Female")}</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="w-1/2">
                    <label
                      htmlFor="birthDate"
                      className="block font-medium mb-1 dark:text-gray-200"
                    >
                      {t("Birth Date")}
                    </label>
                    <Field
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="birthDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-medium mb-1 dark:text-gray-200"
                  >
                    {t("Phone Number")}
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block font-medium mb-1 dark:text-gray-200"
                  >
                    {t("City/State")}
                  </label>
                  <Field
                    as="select"
                    id="city"
                    name="city"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="">{t("Select A City")}</option>
                    <option value="Amman">{t("Amman")}</option>
                    <option value="Jarash">{t("Jarash")}</option>
                    <option value="Zarqa">{t("Zarqa")}</option>
                    <option value="Irbid">{t("Irbid")}</option>
                    <option value="Aqaba">{t("Aqaba")}</option>
                    <option value="Ma'an">{t("Ma'an")}</option>
                    <option value="Mafraq">{t("Mafraq")}</option>
                    <option value="Madaba">{t("Madaba")}</option>
                    <option value="Karak">{t("Karak")}</option>
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Donation Type */}
                <div>
                  <label
                    htmlFor="donationType"
                    className="block font-medium mb-1 dark:text-gray-200"
                  >
                    {t("Type of Donation")}
                  </label>
                  <Field
                    as="select"
                    id="donationType"
                    name="donationType"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="">{t("Select Type of Donation")}</option>
                    <option value="Medical">{t("Medical")}</option>
                    <option value="Financial">{t("Financial")}</option>
                    <option value="Clothing">{t("Clothing")}</option>
                    <option value="Food">{t("Food")}</option>
                    <option value="Educational">{t("Educational")}</option>
                    <option value="Relief">{t("Relief")}</option>
                    <option value="Other">{t("Other")}</option>
                  </Field>
                  <ErrorMessage
                    name="donationType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Donation Privacy */}
                <h2 className="font-semibold">{t("Show Donor Name On Donation")}</h2>
                <div className="flex gap-1">
                  <Field
                    type="radio"
                    id="public"
                    name="donationPrivacy"
                    value="Public"
                  />
                  <label htmlFor="public">{t("Public")}</label>
                  <Field
                    type="radio"
                    id="private"
                    name="donationPrivacy"
                    value="Private"
                  />
                  <label htmlFor="private">{t("Private")}</label>
                </div>
                <ErrorMessage
                  name="donationPrivacy"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                {/* Submit Buttons */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    {t("Save")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ModalDonor;
