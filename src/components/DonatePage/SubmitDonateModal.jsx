import React, { useEffect } from "react";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { useTranslation } from "react-i18next";

const SubmitDonateModal = ({ isOpen, onClose, data, onSubmit }) => {
  const { user, authenticated } = useAuthContext();
  const { t } = useTranslation();

  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 bg-blue-300 bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title" // Link to the modal header title
      aria-describedby="modal-body" // Optionally, link to the modal body content for more details
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2
            id="modal-title"
            className="text-xl font-semibold dark:text-gray-200"
            tabIndex={0}
          >
            {t("Case Details")}
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
        <div id="modal-body" className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Case Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold dark:text-gray-200" tabIndex={0}>
              Personal Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span
                  className="block font-medium text-gray-500 dark:text-gray-400"
                  tabIndex={0}
                >
                  {t("Full Name")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data.userDisabled.disabled?.name}
                </span>
              </div>
              <div>
                <span
                  className="block font-medium text-gray-500 dark:text-gray-400"
                  tabIndex={0}
                >
                  {t("Birth Date")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {new Date(
                    data?.userDisabled.disabled?.birthDate
                  ).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span
                  tabIndex={0}
                  className="block font-medium text-gray-500 dark:text-gray-400"
                >
                  {t("Gender")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data?.userDisabled.disabled?.gender}
                </span>
              </div>
              <div>
                <span
                  tabIndex={0}
                  className="block font-medium text-gray-500 dark:text-gray-400"
                >
                  {t("City")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data.userDisabled.disabled?.city}
                </span>
              </div>
              <div>
                <span
                  tabIndex={0}
                  className="block font-medium text-gray-500 dark:text-gray-400"
                >
                  {t("Phone Number")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data.userDisabled.disabled?.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Case Details */}
          <div className="space-y-4">
            <h3 tabIndex={0} className="text-lg font-bold dark:text-gray-200">
              {t("Case Details")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span
                  tabIndex={0}
                  className="block font-medium text-gray-500 dark:text-gray-400"
                >
                  {t("Disability Type")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data?.disabilityType}
                </span>
              </div>
              <div>
                <span
                  tabIndex={0}
                  className="block font-medium text-gray-500 dark:text-gray-400"
                >
                  {t("Need Type")}
                </span>
                <span tabIndex={0} className="text-gray-800 dark:text-gray-200">
                  {data.userDisabled.disabled?.needType}
                </span>
              </div>
            </div>
            <div>
              <span
                tabIndex={0}
                className="block font-medium text-gray-500 dark:text-gray-400"
              >
                {t("Case Description")}
              </span>
              <p
                tabIndex={0}
                className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
              >
                {data?.caseDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4 rtl:gap-3">
          <button
            tabIndex={0}
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded"
          >
            {t("Close")}
          </button>

          <div className="text-center">
            <button
              tabIndex={0}
              onClick={onSubmit}
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all"
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitDonateModal;
