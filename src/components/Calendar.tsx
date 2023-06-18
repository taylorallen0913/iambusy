import { useRef } from "react";
import { useCalendarState } from "react-stately";
import {
  type AriaCalendarProps,
  type DateValue,
  useCalendar,
  useLocale,
} from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Calendar: React.FC<AriaCalendarProps<DateValue>> = (props) => {
  const { locale } = useLocale();
  const calendarState = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, calendarState);

  return (
    <div
      {...calendarProps}
      ref={calendarRef}
      className="inline-block text-gray-800"
    >
      <div className="flex items-center pb-4">
        <h2 className="ml-2 flex-1 text-lg font-medium">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-5 w-5" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-5 w-5" />
        </CalendarButton>
      </div>
      <CalendarGrid state={calendarState} />
    </div>
  );
};
