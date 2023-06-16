import { Fragment, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import Image from "next/image";

export interface Meeting {
  id: string;
  name: string;
  date: string;
  time: string;
  datetime: string;
  imageUrl: string;
  location: string;
}

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  isAddEventButtonVisible: boolean;
  onAddEvent: () => void;
  meetings: Meeting[];
}

const Calendar: React.FC<CalendarProps> = ({
  meetings,
  isAddEventButtonVisible,
  onAddEvent,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const getDaysInMonth = (month: dayjs.Dayjs) => {
    const startWeek = month.startOf("month").startOf("week");
    const endWeek = month.endOf("month").endOf("week");
    const days = [];
    let day = startWeek;

    while (day <= endWeek) {
      days.push({
        date: day.format("YYYY-MM-DD"),
        isCurrentMonth: month.isSame(day, "month"),
        isToday: dayjs().isSame(day, "date"),
      });
      day = day.add(1, "day");
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div>
      <h2 className="text-base font-semibold leading-6 text-gray-300">
        Upcoming meetings
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        {/* Calendar Section */}
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          {/* Month Navigation */}
          <div className="flex items-center text-gray-400">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">
              {currentMonth.format("MMMM YYYY")}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Days Header */}
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div className="font-semibold">Sun</div>
            <div className="font-semibold">Mon</div>
            <div className="font-semibold">Tue</div>
            <div className="font-semibold">Wed</div>
            <div className="font-semibold">Thu</div>
            <div className="font-semibold">Fri</div>
            <div className="font-semibold">Sat</div>
          </div>

          {/* Calendar Body */}
          <div className="mt-4 grid grid-cols-7 gap-4 text-sm">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                className={`rounded-full p-2 text-gray-400 hover:bg-gray-50 focus:outline-none ${
                  day.isToday ? "font-semibold" : ""
                } ${day.isCurrentMonth ? "" : "text-opacity-50"}`}
              >
                {dayjs(day.date).date()}
              </button>
            ))}
          </div>

          {/* Add event button */}
          {isAddEventButtonVisible && (
            <button
              onClick={onAddEvent}
              className="mt-10 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Event
            </button>
          )}
        </div>

        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <Image
                src={meeting.imageUrl}
                alt=""
                width={20}
                height={20}
                className="h-14 w-14 flex-none rounded-full"
              />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-400 xl:pr-0">
                  {meeting.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={meeting.datetime}>
                        {meeting.date} at {meeting.time}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </dl>
              </div>
              <Menu
                as="div"
                className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
              >
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Calendar;
