import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { type EventTypeOutput } from "~/utils/api";
import EventListItem from "./EventListItem";

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  isAddEventButtonVisible: boolean;
  onAddEvent: () => void;
  events?: EventTypeOutput[];
}

const Calendar: React.FC<CalendarProps> = ({
  events,
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
        isSelected: false,
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
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming events
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        {/* Calendar Section */}
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          {/* Month Navigation */}
          <div className="flex items-center text-gray-900">
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
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  "py-1.5 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-400",
                  day.isToday && !day.isSelected && "text-indigo-600",
                  dayIdx === 0 && "rounded-tl-lg",
                  dayIdx === 6 && "rounded-tr-lg",
                  dayIdx === days.length - 7 && "rounded-bl-lg",
                  dayIdx === days.length - 1 && "rounded-br-lg"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900"
                  )}
                >
                  {dayjs(day.date).date()}
                </time>
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
          {!!events &&
            events.map((event: EventTypeOutput) => (
              <li key={event.id}>
                <EventListItem event={event} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Calendar;
