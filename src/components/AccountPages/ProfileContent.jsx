import React, { useState } from "react";
import Modal from "./editModal";
import { useTheme } from "../../Context/ThemeContext";
import ModalAssistant from "./editModalAssistant";
import ModalDonor from "./editModalDonor";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { useGetUser } from "../../api/users";
import { fDate } from "../../utils/format-time";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";
import { formDataConvert } from "../../utils/formData";
import { useTranslation } from 'react-i18next';

const ProfileContent = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme(); // Access theme from the context
  const { userData, refetch } = useGetUser();

  return (
    <div
      className={`flex flex-col w-full p-6 justify-center items-center mb-14 lg:mb-0 ${theme === "dark"
        ? "bg-gray-900 text-gray-200"
        : "bg-lightBackground text-gray-800"
        }`}
      role="main"
    >
      <div className="flex justify-between gap-32 mb-4">
        <h1
          className={`text-xl lg:text-3xl font-bold  ${theme === "dark" ? "text-blue-400" : "text-blue-500"
            }`}
          aria-label="Profile Page Title"
          tabIndex={0}
        >
          {t("My Profile")}
        </h1>
        <div className="">
          <button
            className="px-2 lg:px-6  py-2 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setIsModalOpen(true)}
            aria-label="Edit Personal Info"
          >
            {t("Edit Personal Info")}
          </button>
        </div>
      </div>

      {/* Conditional rendering based on user role */}
      {user?.role === "disabled" || user?.role === "assistant" ? (
        <>
          <Section
            profilePhoto={true}
            type={"disabled"}
            profilePhotoUrl={userData?.disabled?.img}
            imageFor={"disabled"}
            userData={userData}
            title={t("Disabled Personal Information")}
            fields={[
              { label: t("Email"), value: userData?.email },
              { label: t("Country"), value: t("Jordan") },
              { label: t("City"), value: t(userData?.disabled?.city || "") },
              { label: t("Full Name"), value: userData?.disabled?.name },
              {
                label: t("Birth Date"),
                value: fDate(userData?.disabled?.birthDate),
              },
              { label: t("Phone Number"), value: userData?.disabled?.phone },
              { label: t("Gender"), value: t(userData?.disabled?.gender) },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />

          <Section
            title={t("Disability Information")}
            fields={[
              {
                label: t("Type Of Disability"),
                value: t(userData?.disabled?.disabilityType),
              },
              {
                label: t("Medical Report"),
                value: t(userData?.disabled?.medicalReport ? t("exist") : t("no exist")),
              },
              { label: t("Type of Need"), value: t(userData?.disabled?.needType) },
              {
                label: t("Case Description"),
                value: t(userData?.disabled?.caseDescription),
              },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />
        </>
      ) : null}

      {user?.role === "assistant" ? (
        <>
          <Section
            profilePhoto={true}
            type={"assistant"}
            profilePhotoUrl={userData?.assistant?.img}
            imageFor={"assistant"}
            userData={userData}
            title={t("Assistant Personal Information")}
            fields={[
              { label: t("Full Name"), value: userData?.assistant?.name },
              {
                label: t("Birth Date"),
                value: fDate(userData?.assistant?.birthDate),
              },
              { label: t("Phone Number"), value: userData?.assistant?.phone },
              { label: t("Gender"), value: t(userData?.assistant?.gender) },
              { label: t("Country"), value: t("Jordan") },
              { label: t("City"), value: t(userData?.assistant?.city) },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />

          <Section
            title={t("Assistant Information")}
            fields={[
              {
                label: t("Relationship To Disabled Person"),
                value: t(userData?.assistant?.relation),
              },
              {
                label: t("Identity Document"),
                value: t(userData?.assistant?.idDocument),
              },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />
        </>
      ) : null}

      {user?.role === "donor" ? (
        <>
          <Section
            title={t("Donor Personal Information")}
            fields={[
              { label: t("Full Name"), value: userData?.donor?.name },
              { label: t("Birth Date"), value: fDate(userData?.donor?.birthDate) },
              { label: t("Phone Number"), value: userData?.donor?.phone },
              { label: t("Gender"), value: t(userData?.donor?.gender) },
              { label: t("Country"), value: t("Jordan") },
              { label: t("City"), value: t(userData?.donor?.city) },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />

          <Section
            title={t("Donor Information")}
            fields={[
              {
                label: t("Type of Donation Available"),
                value: t(userData?.donor?.donationType),
              },
              {
                label: t("Show Donor Name On Donation "),
                value: t(userData?.donor?.donationPrivacy),
              },
            ]}
            onEdit={() => setIsModalOpen(true)}
          />
        </>
      ) : null}

      {/* Modal Component */}
      {isModalOpen && user?.role === "disabled"
        ? userData && (
          <Modal
            isOpen={isModalOpen}
            initialData={userData?.disabled}
            onClose={() => setIsModalOpen(false)}
            refetch={refetch}
          />
        )
        : null}

      {isModalOpen && user?.role === "donor" ? (
        <ModalDonor
          isOpen={isModalOpen}
          initialData={userData?.donor}
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}

      {isModalOpen && user?.role === "assistant" ? (
        <ModalAssistant
          isOpen={isModalOpen}
          initialData={userData}
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </div>
  );
};

const Section = ({
  title,
  fields,
  onEdit,
  profilePhoto,
  profilePhotoUrl,
  type,
  imageFor,
  userData,
}) => {
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const { t } = useTranslation();

  return (
    <div
      className={`shadow-md rounded-lg p-4 mb-6 w-full lg:w-2/3 ${theme === "dark"
        ? "bg-gray-800 text-gray-200"
        : "bg-white text-gray-800"
        }`}
      aria-labelledby="section-title" // ARIA label for the section title
    >
      <div
        className="flex justify-between items-center"
        role="heading"
        aria-level="2"
      >
        <h3 className="text-lg font-bold" id="section-title" tabIndex={"0"}>
          {title}
        </h3>

        {profilePhoto ? (
          <div className="flex justify-center">
            <div
              className={`relative w-28 h-28 rounded-full border-2 ${theme === "dark" ? "border-blue-400" : "border-blue-500"
                } flex items-center justify-center group cursor-pointer`}
              aria-label="Upload Profile Image"
            >

              <label htmlFor="photoFile" className="sr-only">
                {t("Upload profile image")}
              </label>
              <input
                id="photoFile"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-describedby="upload-profile-image"
                onChange={async (e) => {
                  e.preventDefault();
                  try {
                    const data = formDataConvert({
                      [imageFor]: {
                        ...userData[imageFor],
                        img: e.target.files[0],
                      },
                    });
                    await axiosInstance.patch(endpoints.auth.me, data);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                tabindex="0" // Ensure the input is focusable
              />

              {user.disabled?.img && type === "disabled" ? (
                <img
                  src={`http://localhost:3000/${user.disabled?.img}`}
                  alt="User Image"
                  className="w-full h-full object-cover rounded-full !right-10"
                  tabindex="0" // Make the image focusable
                />
              ) : null}

              {user.assistant?.img && type === "assistant" ? (
                <img
                  src={`http://localhost:3000/${user.assistant?.img}`}
                  alt="User Image"
                  className="w-full h-full object-cover rounded-full"
                  tabindex="0" // Make the image focusable
                />
              ) : null}

              <div
                className={`absolute inset-0 rounded-full transition-all pointer-events-none ${theme === "dark"
                  ? "bg-blue-400 bg-opacity-10 group-hover:bg-opacity-20"
                  : "bg-blue-500 bg-opacity-10 group-hover:bg-opacity-20"
                  }`}
              ></div>

            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4 text-left" aria-labelledby="section-fields">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`flex justify-between border-b py-2 ${theme === "dark" ? "border-gray-700" : "border-gray-300"
              }`}
            aria-labelledby={`field-${index}`} // Associate field with its label
          >
            <span className="font-bold" id={`field-${index}`} tabIndex={"0"}>
          
              {field.label}
            </span>
            <span tabIndex={"0"}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProfileContent;
