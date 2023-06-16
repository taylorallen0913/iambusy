/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

interface MeetingPageProps {
  id: string;
}

const MeetingPage: NextPage<MeetingPageProps> = ({ id }) => {
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

  // Modifies meeting availability. If a user has not already set a meeting availibility, this will set it for them.
  const modifyAvailability = () => {
    console.log(id);
    modifyAvailabilityMutation({
      meetingId: id,
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
      <main className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white">
        {!isModifyingAvailabilityLoading && (
          <button
            onClick={modifyAvailability}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modify Meeting Availability
          </button>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MeetingPageProps> = async (
  context
) => {
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  return {
    props: { id },
  };
};

export default MeetingPage;
