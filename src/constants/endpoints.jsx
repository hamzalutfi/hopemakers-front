export const endpoints = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    forgotPassword: "/api/auth/forgotpassword",
    activate: "/api/auth/activate",
    resendactivate: "/api/auth/resendactivate",
    resetpassword: "/api/auth/resetpassword",
    changePassword: "/api/auth/changePassword",
    me: "/api/auth/me",
  },
  need: {
    cases: "/api/needs/cases",
    one: (id) => `/api/needs/cases/${id}`,
  },
};
