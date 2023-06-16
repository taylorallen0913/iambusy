import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const DashboardPage: NextPage = () => {
  const { mutate: createMeetingMutation, isLoading: isCreatingMeetingLoading } =
    api.meeting.create.useMutation({
      onSuccess: () => {
        console.log("Successfully created meeting!");
      },
      onError: (e) => {
        console.log("HERRRR");
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          console.log(errorMessage[0]);
        } else {
          console.log("Failed to create meeting! Please try again later.");
        }
      },
    });

  const {
    mutate: modifyAvailabilityMutation,
    isLoading: isModifyingAvailabilityLoading,
  } = api.meeting.modifyAvailability.useMutation({
    onSuccess: () => {
      console.log("Successfully updated meeting availability!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log(
          "Failed to update meeting availability! Please try again later."
        );
      }
    },
  });

  const createMeeting = () => {
    createMeetingMutation({ name: "Test meeting" });
  };

  const modifyAvailability = () => {
    modifyAvailabilityMutation({
      meetingId: "clixy3wxh00001moem0gteoph",
      utcStartTime: new Date(),
      utcEndTime: new Date(),
    });
  };

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
        <div className="flex w-1/2 flex-col gap-y-5">
          {!isCreatingMeetingLoading && (
            <button
              onClick={createMeeting}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new meeting
            </button>
          )}

          {!isModifyingAvailabilityLoading && (
            <button
              onClick={modifyAvailability}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Modify Meeting Availability
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
