import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../utils/axios";

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);
  if (timeLeft < 100000) {
    expiredTimer = setTimeout(() => {
      alert("Token expired");

      localStorage.removeItem("accessToken");

      window.location.pathname = "/";
    }, timeLeft);
  } else if (timeLeft < 0) {
    alert("Token expired");

    localStorage.removeItem("accessToken");

    window.location.pathname = "/";
  }
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired

    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    if (exp) {
      tokenExpired(exp);
    }
  } else {
    localStorage.removeItem("accessToken");

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
