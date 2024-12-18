import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Schedule Management App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="relative w-full">
            <Navbar />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
