"use client"
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const UserProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <UserProfile
          path="/user/profile"
          routing="path"
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#09090b",
              colorInputBackground: "#27272a",
              colorInputText: "#fafafa",
              colorText: "#fafafa",
              colorPrimary: "#2563eb",
              colorDanger: "#ef4444",
            },
            elements: {
              rootBox: "bg-background text-foreground",
              card: "bg-card text-card-foreground shadow-sm",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
              formButtonReset: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
              formFieldInput: "bg-background text-foreground border border-input",
              formFieldLabel: "text-foreground font-medium",
              formFieldHintText: "text-muted-foreground text-sm",
              profileSectionTitle: "text-lg font-semibold text-foreground",
              profileSectionPrimaryButton: "bg-primary text-primary-foreground hover:bg-primary/90",
              profileSectionDangerButton: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              navbar: "hidden",
              footer: "hidden",
            },
          }}
        />
      </main>
      <style jsx global>{`
        .cl-rootBox::after {
          content: none !important;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;






