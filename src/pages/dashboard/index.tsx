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

  const { data: meetings, isLoading: isMeetingsLoading } =
    api.meeting.getUserMeetings.useQuery();

  const createMeeting = () => {
    createMeetingMutation({ name: "New meeting" });
  };

  if (isMeetingsLoading) {
    return (
      <div className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white" />
    );
  }

  if (!meetings) {
    return (
      <div className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white">
        An error has occured.
      </div>
    );
  }

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
      <main className="min-h-screen bg-gradient-radial from-slate-900 to-indigo-950">
        <div className="mx-auto max-w-6xl pt-20">
          {meetings.length === 0 ? (
            <button
              type="button"
              onClick={createMeeting}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
              </svg>
              <span className="mt-2 block text-sm font-semibold text-gray-200">
                Create a new database
              </span>
            </button>
          ) : (
            <div>
              <Calendar
                meetings={meetings}
                isAddEventButtonVisible={!isCreatingMeetingLoading}
                onAddEvent={createMeeting}
              />
              <UserButton />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
