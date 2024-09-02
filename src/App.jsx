import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { dark } from "@clerk/themes";

function AuthLayout({ children }) {
  return (
    <>
      <SignedIn>
        <Home />
      </SignedIn>

      <SignedOut>
        <div className="h-screen grid lg:grid-cols-[minmax(580px,25%)_1fr] text-center">
          <div className="max-lg:order-2 grid place-content-center bg-[#060d18]">
            {children}
          </div>

          <div className="max-lg:order-1 max-lg:h-52 cover"></div>
        </div>
      </SignedOut>
    </>
  );
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/icons/yoom-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#FFF",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#FFF",
        },
      }}
    >
      <Routes>
        <Route
          path="/sign-up"
          element={
            <AuthLayout>
              <SignUp redirectTo="/sign-in" />
            </AuthLayout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <AuthLayout>
              <SignIn routing="path" path="/sign-in" redirectTo="/sign-up" />
            </AuthLayout>
          }
        />
        <Route
          path="/*"
          element={
            <AuthLayout>
              <SignUp redirectTo="/sign-in" />
            </AuthLayout>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
