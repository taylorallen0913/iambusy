import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

const DashboardPage: NextPage = () => {
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
      <main className="h-screen bg-slate-900">
        <UserButton />
        <button
          type="button"
          onClick={() => console.log("New event")}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create New Event
        </button>
      </main>
    </>
  );
};

export default DashboardPage;
