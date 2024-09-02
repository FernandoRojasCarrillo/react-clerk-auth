import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <section className="grid min-h-screen place-content-center border">
      <SignIn path="/sign-in" />
    </section>
  );
}
