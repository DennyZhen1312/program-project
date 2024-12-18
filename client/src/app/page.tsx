"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignedOut, useAuth } from "@clerk/nextjs";
import SignInPage from "./sign-in/[[...sign-in]]/page";


export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/stations");
    }
  }, [isSignedIn, router]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </div>
  );
}
