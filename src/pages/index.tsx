import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>iambusy</title>
        <meta
          name="description"
          content="Simple availabilitiy coordination app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-gradient-radial from-slate-900 to-indigo-950">
        {/* Header text */}
        <div className="flex flex-col items-center space-y-7 pt-32">
          <h1 className="max-w-4xl text-center text-6xl font-bold text-white md:text-8xl">
            Simplify the way you{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Schedule
            </span>{" "}
            Meetings.
          </h1>
          <h1 className="max-w-3xl px-6 text-center text-sm font-light text-gray-300 md:px-0 md:text-xl">
            Say goodbye to the back-and-forth of scheduling. With our
            user-friendly interface, coordinating meetings is simpler and faster
            than ever.
          </h1>
        </div>
        <div className="flex justify-center pt-10">
          <Link
            href="/dashboard"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
