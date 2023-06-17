/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface EventPageProps {
  id: string;
}

const EventPage: NextPage<EventPageProps> = ({ id }) => {
  const router = useRouter();
  const ctx = api.useContext();

  const {
    mutate: modifyAvailabilityMutation,
    isLoading: isModifyingAvailabilityLoading,
  } = api.event.modifyAvailability.useMutation({
    onSuccess: () => {
      console.log("Successfully updated event availability!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log(
          "Failed to update event availability! Please try again later."
        );
      }
    },
  });

  const { mutate: modifyEventMutation, isLoading: isModifyingEventLoading } =
    api.event.update.useMutation({
      onSuccess: () => {
        console.log("Successfully updated event!");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          console.log(errorMessage[0]);
        } else {
          console.log(
            "Failed to update event availability! Please try again later."
          );
        }
      },
    });

  const {
    data: event,
    isLoading,
    isError,
  } = api.event.getById.useQuery({ id });

  // Modifies event availability. If a user has not already set a event availibility, this will set it for them.
  const modifyAvailability = () => {
    modifyAvailabilityMutation({
      eventId: id,
      utcStartTime: new Date(),
      utcEndTime: new Date(),
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white" />
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
      <main className="h-screen bg-gradient-radial from-slate-900 to-indigo-950 text-white">
        <div className="flex justify-center pt-10">
          <input
            className="border-b-2 border-gray-500 bg-transparent p-2 text-xl outline-none"
            placeholder="New Event"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                modifyEventMutation({
                  eventId: id,
                  name: e.currentTarget.value,
                });
              }
            }}
          />
        </div>
        <div className="pb-10">
          <button
            onClick={() => {
              void ctx.event.getUserEvents.invalidate();
              void router.replace("/dashboard");
            }}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back
          </button>
        </div>

        {!isModifyingAvailabilityLoading && (
          <button
            onClick={modifyAvailability}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modify Event Availability
          </button>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EventPageProps> = async (
  context
) => {
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  return {
    props: { id },
  };
};

export default EventPage;
