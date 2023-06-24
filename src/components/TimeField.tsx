import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import {
  type TimeFieldStateOptions,
  useTimeFieldState,
} from "@react-stately/datepicker";
import {
  type AriaTimeFieldProps,
  type TimeValue,
  useTimeField,
} from "@react-aria/datepicker";
import { DateSegment } from "./DateSegment";

export const TimeField = (
  props: TimeFieldStateOptions<TimeValue> | AriaTimeFieldProps<TimeValue>
) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex rounded-md border border-gray-300 bg-white p-1 pr-8 transition-colors focus-within:border-violet-600 hover:border-gray-400 focus-within:hover:border-violet-600"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
};
