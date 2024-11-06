import { createContext, useEffect, useReducer } from "react";
import { isValidToken, setSession } from "../utils/jwt";
import axios from "../utils/axios";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  roles: [],
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, roles } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      roles,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      roles,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      roles: [],
    };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      roles,
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
});

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
          const roles = user.roles;
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
              roles,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              roles: [],
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
            roles: [],
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    const { token, user } = response.data.data;
    const roles = user.roles;
    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        roles,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, method: "jwt", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
