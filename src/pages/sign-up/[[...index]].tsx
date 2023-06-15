import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-primary-950 flex h-screen items-center justify-center pb-10 md:pb-40">
      <SignUp />
    </div>
  );
}
