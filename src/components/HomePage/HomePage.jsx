import React from "react";
import Chart from "react-apexcharts";
import { useLanguage } from "../../Context/LanguageContext";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Data for the charts
  const chartOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: [t("Normal People"), t("Disabled People")],
    colors: ["#93C5FD", "#2E5077"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      labels: {
        colors: "#b9b9b9",
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  const dataWorld = {
    series: [70, 30],
    options: {
      ...chartOptions,
      colors: ["#93C5FD", "#2E5077"],
    },
  };

  const dataJordan = {
    series: [80, 20],
    options: {
      ...chartOptions,
      colors: ["#d8b8f2", "#7d50bf"],
    },
  };

  // Dummy Campaign Data
  const dummyCampaigns = [
    {
      title: t("Mobility Devices for Independence"),
      description:
        t("Help provide wheelchairs, walkers, and prosthetics to individuals with physical disabilities, giving them the freedom to move independently."),
      image: "wheelchair.jpg",
    },
    {
      title: t("Hearing Aids for the Hearing Impaired"),
      description:
        t("Raise funds to distribute hearing aids to individuals with hearing impairments, enabling them to reconnect with the world around them."),
        image: "hearing.jpg",

    },
    {
      title: t("Therapy for Children with Autism"),
      description:
        t("Contribute to therapy sessions, learning tools, and support programs for children with autism and their families."),
        image: "aes.jpg",

    },
    
  ];
  
  return (
    <div dir={language === "en" ? "ltr" : "rtl"} className="!w-full">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-center text-white py-20 lg:py-40"
        style={{ backgroundImage: "url('/bg.jpg')" }}
        aria-labelledby="hero-heading"
      >
        <div className="bg-black bg-opacity-35 absolute inset-0 z-0"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1
            id="hero-heading"
            className="text-4xl lg:text-6xl font-bold mb-4"
            tabIndex="0"
          >
            {t("h1home")}
          </h1>
          <p className="text-lg lg:text-xl mb-6" tabIndex="0">
            {t("p1home")}
          </p>
          <a
            href="/pages/donate"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold transition-colors"
            aria-label="Get Started with the platform"
          >
            {t("a1home")}
          </a>
        </div>
      </section>

      {/* Charts Section */}
      <section
        className="py-20 bg-gray-100 dark:bg-gray-900"
        aria-labelledby="charts-heading"
      >
        <div className="container mx-auto">
          <h2
            id="charts-heading"
            className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200"
            tabIndex="0"
          >
            {t("h2home")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ChartCard
              title={t("TWhome")}
              series={dataWorld.series}
              options={dataWorld.options}
            />
            <ChartCard
              title={t("TJhome")}
              series={dataJordan.series}
              options={dataJordan.options}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <InfoGrid
        title={t("How It Works")}
        steps={[
          {
            icon: "fa-user-plus",
            title: t("Step 1: Sign Up"),
            description: t("description1"),
          },
          {
            icon: "fa-hand-holding-heart",
            title: t("Step 2: Explore Needs"),
            description: t("description2"),
          },
          {
            icon: "fa-check-circle",
            title: t("Step 3: Make a Difference"),
            description: t("description3"),
          },
        ]}
      />

      {/* Featured Campaigns Section */}
      <ContentGrid
        title={t("Featured Campaigns")}
        items={dummyCampaigns.map((campaign, index) => ({
          title: campaign.title,
          description: campaign.description,
          image: campaign.image,
        }))}
      />
    </div>
  );
};

// ChartCard Component
const ChartCard = ({ title, series, options }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    aria-labelledby={`${title}-chart`}
  >
    <h2
      id={`${title}-chart`}
      className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center"
      tabIndex="0"
    >
      {title}
    </h2>
    <div className="flex justify-center">
      <Chart
        options={options}
        series={series}
        type="donut"
        width="380"
        aria-label={`Pie chart showing ${title}`}
      />
    </div>
  </div>
);

// InfoGrid Component
const InfoGrid = ({ title, steps }) => (
  <section
    className="py-20 bg-lightBackground dark:bg-gray-900 text-center"
    aria-labelledby="info-grid-heading"
  >
    <div className="container mx-auto">
      <h2
        id="info-grid-heading"
        className="text-3xl lg:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
        tabIndex="0"
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center" tabIndex="0">
            <div
              className="bg-blue-500 text-white p-4 rounded-full mb-4"
              aria-hidden="true"
            >
              <i className={`fa-solid ${step.icon} text-3xl`}></i>
            </div>
            <h3 className="font-bold text-xl dark:text-white">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ContentGrid Component
const ContentGrid = ({ title, items }) => (
  <section
    className="py-20 bg-gray-100 dark:bg-gray-900"
    aria-labelledby="content-grid-heading"
  >
    <div className="container mx-auto">
      <h2
        id="content-grid-heading"
        className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200"
        tabIndex="0"
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            tabIndex="0"
          >
            {item.image && (
              <img
                src={item.image}
                alt={`Visual representation of ${item.title}`}
                className="w-full h-60  mb-4"
              />
            )}
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomePage;