import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ManagePage } from "./manage/ManagePage.tsx";
import { LibraryPage } from "./library/LibraryPage.tsx";
import { BookPage } from "./library/[id]/BookPage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginPage } from "./login/LoginPage.tsx";
import { AppContainer } from "./lib/AppContainer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: (
      <AppContainer title={"Loading"}>
        <p>Loading...</p>
      </AppContainer>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/library",
    element: <LibraryPage />,
  },
  {
    path: "/library/:id",
    element: <BookPage />,
  },
  {
    path: "/manage",
    element: <ManagePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="906326810377-sb8gmfr50a59k6c6ujjhu8ssinoc5ibn.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
