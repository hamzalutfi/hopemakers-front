import React, { useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { useGetNeeds } from "../../api/needs";
import { useAuthContext } from "../../Context/auth/hooks/use-auth-context";
import { CONFIG } from "../../configFile";
import SubmitDonateModal from "./SubmitDonateModal";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import { endpoints } from "../../constants/endpoints";

const DonatePage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const { needs, refetch } = useGetNeeds({ status: "pending" });
  const campaigns = [...needs];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [disabilityTypeFilter, setDisabilityTypeFilter] = useState("all");
  const [donationTypeFilter, setDonationTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "";

    const matchesDisabilityType =
      disabilityTypeFilter === "all" ||
      campaign.disabilityType === disabilityTypeFilter;

    const matchesDonationType =
      donationTypeFilter === "all" ||
      campaign.donationType === donationTypeFilter;

    return matchesSearch && matchesDisabilityType && matchesDonationType;
  });

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);

  const handleDonate = async (id) => {
    await axiosInstance.patch(endpoints.need.one(id), {
      status: "accepted",
    });
    refetch();
    setIsModalOpen(false);
  };

  return (
    <main
      className={`p-6 !w-full ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-8 ${
          theme === "dark" ? "text-blue-400" : "text-blue-500"
        }`}
      >
        {t("Active Campaigns")}
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder={t("Search campaigns")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(t(e.target.value))}
          className="w-full sm:w-1/3 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
        <label htmlFor="disabilityTypeFilter">{t("Disability Type")}</label>
        <select
          id="disabilityTypeFilter"
          value={disabilityTypeFilter}
          onChange={(e) => setDisabilityTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="all">{t("All Disability Types")}</option>
          {/* Replace these with your actual disability types */}
          <option value="physical">{t("Physical")}</option>
          <option value="sensory">{t("Sensory")}</option>
          <option value="neurological">{t("Neurological")}</option>
          <option value="intellectual">{t("Intellectual")}</option>
          <option value="mental">{t("Mental")}</option>
          <option value="learning">{t("Learning")}</option>
        </select>
        <label htmlFor="donationTypeFilter">{t("Donation Type:")}</label>
        <select
          id="donationTypeFilter"
          value={donationTypeFilter}
          onChange={(e) => setDonationTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="all">{t("All Donation Types")}</option>
          <option value="devices">{t("Devices")}</option>
          <option value="financial">{t("Financial")}</option>
          <option value="educational">{t("Educational")}</option>
          <option value="other">{t("Other")}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedCampaigns.map((campaign) => (
          <div
            key={campaign._id}
            className={`shadow-md  hover:shadow-xl rounded-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={`${CONFIG.backendUrl}/${campaign.image}`}
              alt={campaign.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{campaign.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {campaign.needDescription}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("Disability type:")}{" "}
                    <span className="font-bold">{campaign.disabilityType}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {t("Donation Type:")}{" "}
                    <span className="font-bold">{campaign.donationType}</span>
                  </p>
                </div>
                {user?.role === "donor" || user?.role === "disabled" ? (
                  <>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                        theme === "dark"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {t("Donate")}
                    </button>
                    <SubmitDonateModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      data={campaign}
                      onSubmit={() => handleDonate(campaign._id)}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-300 text-gray-800"
          } ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
        >
          {t("Previous")}
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-300 text-gray-800"
          } ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
        >
          {t("Next")}
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <h1 className="bg-blue-500 rounded-full w-5 text-center text-white">
          {currentPage}
        </h1>
      </div>
    </main>
  );
};

export default DonatePage;
