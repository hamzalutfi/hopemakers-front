import PropTypes from "prop-types";
import { useMemo, useEffect, useReducer, useCallback } from "react";

import { AuthContext } from "./auth-context";
import { setSession, isValidToken } from "./utils";
import axiosInstance from "../../../utils/axios";
import { endpoints } from "../../../constants/endpoints";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------
const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axiosInstance.get(endpoints.auth.me);

        const user = response.data;

        dispatch({
          type: "INITIAL",
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (data) => {
      const { data: userData } = await axiosInstance.post(
        endpoints.auth.login,
        {
          ...data,
          email: data.email.toLowerCase(),
        }
      );

      if (userData) {
        setSession(userData);

        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              accessToken: userData,
            },
          },
        });
        await initialize();
      }
    },
    [initialize]
  );

  // REGISTER
  const register = useCallback(async (data) => {
    const { data: userData } = await axiosInstance.post(endpoints.auth.signup, {
      ...data,
      email: data.email.toLowerCase(),
    });
    return userData;
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await axiosInstance.post(endpoints.auth.forgotPassword, {
      email: email.toLowerCase(),
    });
  }, []);

  // NEW PASSWORD
  const newPassword = useCallback(
    async (email, code, password, confirmPassword) => {
      await axiosInstance.patch(endpoints.auth.resetpassword, {
        email: email.toLowerCase(),
        resetToken: code,
        password,
        confirmPassword,
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    window.location.assign("/");
    dispatch({
      type: "LOGOUT",
    });
    setSession(null);
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      login,
      register,
      initialize,
      forgotPassword,
      newPassword,
      logout,
    }),
    [
      login,
      logout,
      register,
      initialize,
      forgotPassword,
      newPassword,
      state.user,
      status,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
