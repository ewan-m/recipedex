import Cookies from "js-cookie";
import { atom, useAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import decode from "jwt-decode";

const googleTokenCookieKey = "googleToken-v1";

const googleTokenAtom = atom(Cookies.get(googleTokenCookieKey));

export const useAuth = ():
  | {
      isLoggedIn: true;
      logout: () => void;
      accessToken: string;
    }
  | { isLoggedIn: false; login: (credential: string) => void } => {
  const [googleToken, setGoogleToken] = useAtom(googleTokenAtom);

  const login = (credential: string) => {
    Cookies.set(googleTokenCookieKey, credential);
    setGoogleToken(credential);
  };

  const logout = () => {
    Cookies.remove(googleTokenCookieKey);
    setGoogleToken(undefined);
  };

  if (googleToken === undefined) {
    return {
      isLoggedIn: false,
      login: login,
    };
  }

  return {
    isLoggedIn: true,
    accessToken: googleToken,
    logout: logout,
  };
};

export const useAuthRedirection = () => {
  const auth = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
    if (
      auth.isLoggedIn &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/library");
    }
  }, [location.pathname, auth, navigate]);
};
