/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "~/components/DatePicker";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { useState } from "react";
import Availability from "~/components/Availability";
import { TimeField } from "~/components/TimeField";
import { Time } from "@internationalized/date";
import { MapPinIcon } from "@heroicons/react/20/solid";

interface EventPageProps {
  id: string;
}

const EventPage: NextPage<EventPageProps> = ({ id }) => {
  const router = useRouter();
  const ctx = api.useContext();
  const [startTime, setStartValue] = useState(new Time(11, 45));
  const [endTime, setEndTime] = useState(new Time(1, 30));

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
        <header className="mx-auto flex w-full max-w-7xl border-b border-gray-200 px-4 pb-5 sm:px-6 lg:px-8">
          <div className="flex flex-grow items-center">
            <div className="mr-10 w-full space-y-2">
              <h1 className="whitespace-nowrap text-2xl font-medium">
                {event.name}
              </h1>

              <div className="flex items-start space-x-3 text-sm">
                <dt className="mt-0.5">
                  <span className="sr-only">Location</span>
                  <MapPinIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>{event.location}</dd>
              </div>
            </div>

            <div className="mx-auto flex flex-row items-center">
              <DatePicker
                onDateChange={handleDateChange}
                defaultValue={parseDate(formatDate(event.date))}
              />

              <div className="ml-10">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Live
                </span>
                {/* {isEditing ? (
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
                )} */}
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto h-full w-full sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="my-5" />
          {/* Mobile layout */}
          <div className="flex flex-grow flex-col lg:hidden">
            <div className="my-10 flex w-full justify-center space-x-3">
              <TimeField label="Starting time" />
              <TimeField label="End time" />
            </div>

            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center px-14">
                <div className="my-2">
                  <h1>My Availability</h1>
                </div>
                <Availability
                  availabilities={[
                    { utcStartTime: new Date(), utcEndTime: new Date() },
                  ]}
                />
              </div>
              <div className="flex flex-col items-center px-14">
                <div className="my-2">
                  <h1>Group Availability</h1>
                </div>
                <Availability
                  availabilities={[
                    { utcStartTime: new Date(), utcEndTime: new Date() },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Desktop layout */}
          <div className="hidden flex-grow flex-row lg:flex">
            <div className="flex w-full flex-col space-y-2">
              <h1 className="text-lg text-gray-700">{event.description}</h1>

              <div className="flex space-x-10">
                <TimeField
                  label="Starting"
                  value={startTime}
                  onChange={setStartValue}
                />
                <TimeField
                  label="Ending"
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>

            <div className="flex flex-col items-center px-14">
              <div className="my-2">
                <h1>My Availability</h1>
              </div>
              <Availability
                availabilities={[
                  {
                    utcStartTime: new Date(startTime.toString()),
                    utcEndTime: new Date(endTime.toString()),
                  },
                ]}
              />
            </div>
            <div className="flex flex-col items-center px-14">
              <div className="my-2">
                <h1>Group Availability</h1>
              </div>
              <Availability
                availabilities={[
                  {
                    utcStartTime: new Date(startTime.toString()),
                    utcEndTime: new Date(endTime.toString()),
                  },
                ]}
              />
            </div>
          </div>

          {/* <div className="pb-10">
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
          )} */}
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
