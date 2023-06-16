import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const router = useRouter();

  const { mutate: createMeeting, isLoading: isPosting } =
    api.meeting.create.useMutation({
      onSuccess: () => {
        console.log("Successfully created meeting!");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          console.log(errorMessage[0]);
        } else {
          console.log("Failed to create meeting! Please try again later.");
        }
      },
    });

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
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            createMeeting({ name: "Test meeting" });
            void router.push("/sign-up");
          }}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Started
        </button>
      </main>
    </>
  );
};

export default Home;
