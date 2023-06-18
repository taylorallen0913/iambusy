/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "~/components/DatePicker";
import { api } from "~/utils/api";
import dayjs from "dayjs";

interface EventPageProps {
  id: string;
}

const EventPage: NextPage<EventPageProps> = ({ id }) => {
  const router = useRouter();

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

  const { data: event, isLoading } = api.event.getById.useQuery({ id });

  const handleDateChange = (newDate: string) => {
    modifyEventMutation({
      eventId: id,
      date: dayjs(newDate, "YYYY-MM-DD").toDate(),
    });
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
    return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">Loading...</div>
      </div>
    );
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
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <input
              className="bg-transparent text-3xl font-semibold leading-tight text-gray-900 outline-none placeholder:text-gray-500"
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
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <DatePicker
              onDateChange={handleDateChange}
              defaultValue={parseDate(formatDate(event.date))}
            />
            <div className="pb-10">
              <button
                onClick={() => void router.replace("/dashboard")}
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
          </div>
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
