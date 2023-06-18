import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { type EventTypeOutput, api } from "~/utils/api";
import { EventListItem } from "~/components/EventListItem";
import { Calendar } from "~/components/Calendar";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const ctx = api.useContext();
  const [eventsRef] = useAutoAnimate();

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

  const { mutate: deleteEventMutation } = api.event.delete.useMutation({
    onSuccess: (event) => {
      console.log(`Succesfully deleted event with id ${event.id}`);
      void ctx.event.all.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed to delete event! Please try again later.");
      }
    },
  });

  const { data: events, isLoading: isEventsLoading } = api.event.all.useQuery();

  const createEvent = () => {
    createEventMutation({ name: "New Event" });
  };

  const deleteEvent = (id: string) => {
    deleteEventMutation({ id });
  };

  if (isEventsLoading) {
    return null;
  }

  if (!events) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          Something went wrong...
        </div>
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
      <main>
        <div className="mx-auto max-w-6xl pt-20">
          <div>
            <div className="flex flex-row">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Upcoming events
              </h2>
              <div className="ml-auto">
                <UserButton />
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
              {/* Calendar Section */}
              <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                <Calendar />
                {/* Add event button */}
                <button
                  onClick={createEvent}
                  className="mt-10 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isCreatingEventLoading
                    ? "Creating Event..."
                    : "Create Event"}
                </button>
              </div>

              {/* Events section */}
              <ol
                ref={eventsRef}
                className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8"
              >
                {!!events &&
                  events.map((event: EventTypeOutput) => (
                    <li key={event.id}>
                      <EventListItem
                        event={event}
                        onDeleteEvent={deleteEvent}
                      />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
