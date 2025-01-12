'use client'

import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen !w-full p-6 ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32 rounded-lg mb-16" style={{ backgroundImage: "url('/images/hope-makers-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <motion.div 
          className="relative text-center text-white z-10 "
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">{t("Hope Makers")}</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
            {t("ab1")}
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <motion.section 
        className="container mx-auto py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{t("Our Story")}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {t("ab2")}            </p>
            <p className="text-lg leading-relaxed">
              {t("ab3")}            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/about.jpg"
              alt="Our Story"
              className=" rounded-lg"
            />
          </div>
        </div>
      </motion.section>

      {/* Our Impact Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg my-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">{t("Our Impact")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10,000+", description: t("lifeTouched") },
              { number: "500+", description: t("Assistive devices provided") },
              { number: "100+", description: t("comPart") },
            ].map((stat, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-lg">
                <h3 className="text-5xl font-bold mb-4">{stat.number}</h3>
                <p className="text-xl">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Programs Section */}

      {/* Meet Our Team Section */}
      <motion.section 
        className="container mx-auto py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12">{t("Meet Our Team")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: t("Mohammed shker"), role: t("Developer"), img: "moh.jpg" },
            { name: t("Hamzeh lutfi"), role: t("Developer"), img: "ham.jpg" },
            { name: t("Bayan Hamad"), role: t("Developer"), img: "bayan.jpg" },
          ].map((member, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-lg text-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <img
                src={`/${member.img}`}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-xl mb-2">{member.name}</h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{member.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Our Vision Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg my-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">{t("Our Vision")}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t("We envision a world where disability is recognized as a natural part of human diversity, where every individual has the opportunity to thrive, and where communities are enriched by the full participation of all their members.")}
          </p>
         
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">{t("Be a Hope Maker")}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {t("Your support can change lives. Join us in creating a world where everyone has the opportunity to reach their full potential.")}
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/pages/donate" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition duration-300">
            {t("Donate Now")}
          </a>
     
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;

