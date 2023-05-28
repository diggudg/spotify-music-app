import React, { useCallback, useMemo } from "react";
import { AuthorizationContext } from "./context";
import { IUserProfile } from "./interface";
import axios from "axios";
import { setupInterceptorsTo } from "../../interceptor";

interface AuthorizationContextProps {
  children: React.ReactNode;
}

const AuthorizationContextProvider: React.FC<AuthorizationContextProps> = ({
  children,
}) => {
  const [email, setEmail] = React.useState(() => {
    const storedEmail = localStorage.getItem("spotify-user-email");
    return storedEmail !== null ? storedEmail : "";
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const axiosInstance = setupInterceptorsTo(axios);

  React.useEffect(() => {
    localStorage.setItem("spotify-user-email", email);
  }, [email]);

  const [profile, setProfile] = React.useState<IUserProfile | null>(null);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const loadProfile = useCallback(async () => {
    if (email) {
      const response = await axiosInstance.get(
        `${apiUrl}/spotify/me?email=${email}`
      );

      const { data } = response;

      setProfile({ displayName: data.display_name, email: data.email });
      setEmail(data.email);
    }
  }, [apiUrl, axiosInstance, email]);

  const login = useCallback(
    async (email: string) => {
      const response = await axiosInstance.get(
        `${apiUrl}/spotify/login?email=${email}`
      );

      const { data } = response;
      window.location.replace(data);
    },
    [apiUrl, axiosInstance]
  );

  const checkAuthenticated = useMemo(() => {
    const token = localStorage.getItem("spotify-token");
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    const date = new Date(token);

    const isAuth = date.getTime() > Date.now();
    email ? setIsAuthenticated(isAuth) : setIsAuthenticated(false);
    return isAuth;
  }, [email]);

  const provider = {
    email,
    setEmail,
    loadProfile,
    login,
    profile,
    isAuthenticated,
    checkAuthenticated,
  };

  return (
    <AuthorizationContext.Provider value={provider}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export { AuthorizationContextProvider, AuthorizationContext };
