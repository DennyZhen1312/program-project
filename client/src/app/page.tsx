"use client";

import { SignedOut, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignInPage from "./sign-in/[[...sign-in]]/page";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/schedules");
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
