import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/users/my-info");
          const user = response.data.data;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    const { accessToken, user } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const googleLogin = async (code) => {
    try {
      const response = await axios.post(
        `/auth/outbound/login-google?code=${code}`
      );

      const token = response.data.data.token;
      const user = response.data.data.user;
      setSession(token);

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error("Google login failed:", error);
      throw new Error("Failed to authenticate with Google.");
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
