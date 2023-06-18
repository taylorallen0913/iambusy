/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "~/components/DatePicker";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { useState } from "react";

interface EventPageProps {
  id: string;
}

const EventPage: NextPage<EventPageProps> = ({ id }) => {
  const router = useRouter();
  const ctx = api.useContext();

  const [isEditing, setIsEditing] = useState(false);

  const {
    mutate: modifyAvailabilityMutation,
    isLoading: isModifyingAvailabilityLoading,
  } = api.availability.update.useMutation({
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

  const { mutate: modifyEventMutation } = api.event.update.useMutation({
    onSuccess: () => {
      void refetchEvent();
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
    refetch: refetchEvent,
  } = api.event.getById.useQuery({ id });

  const handleDateChange = (newDate: string) => {
    modifyEventMutation({
      eventId: id,
      date: dayjs(newDate, "YYYY-MM-DD").toDate(),
    });
    void ctx.event.getById.invalidate();
  };

  // Modifies event availability. If a user has not already set a event availibility, this will set it for them.
  const modifyAvailability = () => {
    modifyAvailabilityMutation({
      eventId: id,
      utcStartTime: new Date(),
      utcEndTime: new Date(),
    });
  };

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (isLoading) {
    return null;
  }

  if (!event) {
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
      <div className="py-10">
        <header className="mx-auto flex max-w-7xl items-center border-b border-gray-200 px-4 pb-5 sm:px-6 lg:px-8">
          <div className="mr-10 w-full">
            <h1 className="text-3xl font-semibold">{event.name}</h1>
          </div>

          <DatePicker
            onDateChange={handleDateChange}
            defaultValue={parseDate(formatDate(event.date))}
          />

          <div className="ml-10">
            {isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(false);
                }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            )}
          </div>
        </header>
        <main className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
          <div className="my-5" />
          <div className="pb-10">
            <button
              onClick={() => void router.push("/dashboard")}
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
      </div>
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
