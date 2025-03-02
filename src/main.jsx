import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Createtrip from "./create-trip/Createtrip";
import Header from "./componet/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viwetrip from "./Viwe-trip/tripId/Viwetrip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/createtrip",
    element: <Createtrip />,
  },
  {
    path: "/viwetrip/:tripId",
    element: <Viwetrip />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
