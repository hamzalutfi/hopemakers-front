import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from 'react-i18next';

const DonationHistoryPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const donationHistory = [
    {
      id: 1,
      campaign: {
        title: "Wheelchair for Ahmed",
        goal: "$2000",
        raised: "$1250",
        type: t("Equipment And Tools"),
        organizer: "Charity A",
      },
      donation: {
        date: "2024-01-15",
        amount: "$150",
        method: "Credit Card",
        reference: "TXN123456",
      },
      status: {
        value: t("Completed"),
        impact: t("Your donation covered 10% of the campaign goal."),
      },
    },
    {
      id: 2,
      campaign: {
        title: "Braille Books for School",
        goal: "$1000",
        raised: "$750",
        type: t("Educational"),
        organizer: "Charity B",
      },
      donation: {
        date: "2024-01-12",
        amount: "$50",
        method: "PayPal",
        reference: "TXN654321",
      },
      status: {
        value: t("Pending"),
        impact: t("Your donation is being processed."),
      },
    },
  ];

  return (
    <div
      className={`!w-full p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-8 ${theme === "dark" ? "text-blue-400" : "text-blue-500"
          }`}
      >
        {t("Donation History")}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {donationHistory.map((donation) => (
          <div
            key={donation.id}
            className={`shadow-md rounded-lg overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
          >
            <div className="p-6">
              <h2 className="text-lg font-bold mb-2">{donation.campaign.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {t("Organizer:")} {donation.campaign.organizer} | {t("Type:")} {donation.campaign.type}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">
                    {t("Goal:")} <span className="font-bold">{donation.campaign.goal}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {t("Raised:")} <span className="font-bold">{donation.campaign.raised}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {t("Date:")} <span className="font-bold">{donation.donation.date}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {t("Amount:")} <span className="font-bold">{donation.donation.amount}</span>
                  </p>
                  <p className="text-sm font-medium">
                    {t("Method:")} <span className="font-bold">{donation.donation.method}</span>
                  </p>
                </div>      
              </div>
              <p className="text-sm mb-4">
                {t("Reference ID:")} <span className="font-mono">{donation.donation.reference}</span>
              </p>
              <div className="mt-4">
                <p
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${
                    donation.status.value === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {donation.status.value}
                </p>
                <p className="mt-2 text-sm italic">{donation.status.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistoryPage;
