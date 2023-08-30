import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/useAuth";
import { AppContainer } from "../lib/AppContainer";
import { Google } from "../lib/Icons";

export const LoginPage = () => {
  const auth = useAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (!auth.isLoggedIn) {
        auth.login(tokenResponse.access_token);
      }
    },
    scope: "https://www.googleapis.com/auth/books",
  });

  return (
    <AppContainer>
      <div className="flex flex-col items-center gap-4">
        <h1 className="line-clamp-3 pb-1 text-5xl font-bold text-emerald-600 md:text-7xl">
          recipedex
        </h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          className="flex flex-row items-center justify-center gap-2 rounded-full border bg-white px-5 py-3 shadow hover:bg-gray-50"
        >
          <Google /> Login with Google
        </button>
      </div>
    </AppContainer>
  );
};
