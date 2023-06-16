import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 pb-10 md:pb-40">
      <SignUp />
    </div>
  );
}
