import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Calendar from "~/components/Calendar";
import { api } from "~/utils/api";

const DashboardPage: NextPage = () => {
  const router = useRouter();

  const { mutate: createEventMutation, isLoading: isCreatingEventLoading } =
    api.event.create.useMutation({
      onSuccess: async (event) => {
        await router.push(`/dashboard/event/${event.id}`);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          console.log(errorMessage[0]);
        } else {
          console.log("Failed to create event! Please try again later.");
        }
      },
    });

  const { data: events, isLoading: isEventsLoading } =
    api.event.getUserEvents.useQuery();

  const createEvent = () => {
    createEventMutation({ name: "New event" });
  };

  if (isEventsLoading) {
    return (
      <div className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white" />
    );
  }

  if (!events) {
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
          <div>
            <Calendar
              events={events}
              isAddEventButtonVisible={!isCreatingEventLoading}
              onAddEvent={createEvent}
            />
            <UserButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
