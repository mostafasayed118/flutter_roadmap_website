import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In - Flutter Roadmap",
  description: "Sign in to track your Flutter learning journey.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <SignIn />
    </div>
  );
}
