"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";
import { useSearchParams } from "next/navigation";

const SignInComponent = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id");

  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : "/signup";

  const getRedirectUrl = () => {
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}&showSignUp=true`;
    }

    const userType = user?.publicMetadata?.userType as string;
    if (userType === "teacher") {
      return "/teacher/courses";
    }
    return "/user/courses";
  };

  return (
    <SignIn
       appearance={{
              baseTheme: dark,
              elements: {
                rootBox: "flex justify-center items-center py-5",
                cardBox: "shadow-none",
                card: "bg-transparent w-full shadow-none",
                footer: {
                  background: "#000000",
                  padding: "0rem 2.5rem",
                  "& > div > div:nth-child(1)": {
                    background: "#000000",
                  },
                  "& > div:last-child": {
                    display: "none",
                  },
                },
                formFieldLabel: "text-white-50 font-normal",
                formButtonPrimary:
                  "!shadow-none",
                formFieldInput: "bg-secondary bg text-white-50 !shadow-none",
                footerActionLink: "text-primary-750 hover:text-primary-600",
                
              },
            }}
      signUpUrl={signUpUrl}
      forceRedirectUrl={getRedirectUrl()}
      routing="hash"
      afterSignOutUrl="/"
    />
  );
};

export default SignInComponent;