import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Calendar from "~/components/Calendar";
import { api } from "~/utils/api";

const DashboardPage: NextPage = () => {
  const router = useRouter();

  const { mutate: createMeetingMutation, isLoading: isCreatingMeetingLoading } =
    api.meeting.create.useMutation({
      onSuccess: async (meeting) => {
        console.log("Successfully created meeting!");
        await router.push(`/dashboard/meeting/${meeting.id}`);
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

  const createMeeting = () => {
    createMeetingMutation({ name: "Test meeting" });
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
      <main className="h-screen bg-gradient-radial from-slate-900 to-indigo-950">
        <div className="mx-auto max-w-6xl pt-20">
          <Calendar
            isAddEventButtonVisible={!isCreatingMeetingLoading}
            onAddEvent={createMeeting}
          />
          <UserButton />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
