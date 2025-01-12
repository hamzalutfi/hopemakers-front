import "./App.css";
import NavBar from "./components/navbar/NavBar";
import AccountPageSidebar from "./components/AccountPages/AccountPageSideBar";
import BottomBar from "./components/BottomBar/BottomBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfileContent from "./components/AccountPages/ProfileContent";
import SettingsPage from "./components/AccountPages/settingsPage";
import SecurityPage from "./components/AccountPages/SecurityPage";
import ResetPassPage from "./components/ResetPassPage/ResetPage";
import LoginPage from "./components/Login-Page/LoginPage";
import Footer from "./components/Footer/Footer";
import { LanguageProvider } from "./Context/LanguageContext"; // Adjust path as needed
import { useLanguage } from "./Context/LanguageContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { useState } from "react";
import { AuthProvider } from "./Context/auth/context/auth-provider";
import SignUpPage from "./components/signup-page/signupPage";
import EnterNewPass from "./components/ResetPassPage/enterNewPass";
import DonatePage from "./components/DonatePage/DonatePage";
import SubmitNeedPage from "./components/DonatePage/SubmitNeedPage";
import AboutUsPage from "./components/AboutPage/AboutUsPage";
import AuthGuard from "./Context/auth/guard/auth-guard";
import { Toaster } from "sonner";

import DonationHistoryPage from "./components/DonatePage/DonateHistory";

// Handle toggle

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const { language, changeLanguage } = useLanguage();
  return (
    <>
      <AuthProvider>
        <NavBar isOpen={isOpen} toggleSidebar={() => toggleSidebar()} />
        <div
          className="flex min-h-screen !w-full bg-blue-50"
          dir={language === "en" ? "!ltr" : "rtl"}
        >
          <AccountPageSidebar
            isOpen={isOpen}
            toggleSidebar={() => toggleSidebar()}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/pages/profile"
              element={
                <AuthGuard>
                  <ProfileContent />
                </AuthGuard>
              }
            />
            <Route
              path="/pages/settings"
              element={
                <AuthGuard>
                  <SettingsPage />
                </AuthGuard>
              }
            />
            <Route
              path="/pages/security"
              element={
                <AuthGuard>
                  <SecurityPage />
                </AuthGuard>
              }
            />
            <Route
              path="/pages/donate"
              element={
                <AuthGuard>
                  <DonatePage />
                </AuthGuard>
              }
            />
            {/*<Route
              path="/pages/donate-history"
              element={
                <AuthGuard>
                  <DonationHistoryPage
                  />
                </AuthGuard>
              }
            />*/}
            <Route path="/pages/login" element={<LoginPage />} />
            <Route path="/pages/sign-up" element={<SignUpPage />} />
            <Route path="/pages/aboutus" element={<AboutUsPage />} />
            <Route
              path="/pages/requestNeed"
              element={
                <AuthGuard>
                  <SubmitNeedPage />
                </AuthGuard>
              }
            />
            <Route path="/pages/reset-password" element={<ResetPassPage />} />
            <Route path="/pages/confirm-password" element={<EnterNewPass />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
        <Toaster position="top-center" richColors />
        <BottomBar />
        <Footer />
      </AuthProvider>
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);

export default AppWrapper;
