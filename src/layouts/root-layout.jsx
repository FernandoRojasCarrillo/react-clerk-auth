import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <header className="px-6 py-4 border-b border-sky-600">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            to="/sign-in"
            className="px-14 py-3 rounded-2xl bg-sky-600 text-white"
          >
            Sign in
          </Link>
        </SignedOut>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
