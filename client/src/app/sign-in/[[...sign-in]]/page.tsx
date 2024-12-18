import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative flex justify-center">
      <SignIn/>
    </div>
  );
}
