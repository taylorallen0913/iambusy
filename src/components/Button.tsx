import { useRef } from "react";
import {
  useButton,
  useFocusRing,
  mergeProps,
  type AriaButtonProps,
} from "react-aria";

export const CalendarButton: React.FC<AriaButtonProps> = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-purple-600 ring-offset-2" : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export const FieldButton: React.FC<
  AriaButtonProps & { isPressed?: boolean }
> = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`-ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 ${
        isPressed || props.isPressed
          ? "border-gray-400 bg-gray-200"
          : "border-gray-300 bg-gray-50 group-hover:border-gray-400"
      }`}
    >
      {props.children}
    </button>
  );
};

interface ButtonProps {
  href: string;
  className?: string;
  title: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  href,
  title,
  variant = "primary",
  className = "",
}) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a
        href={href}
        className={`${
          variant === "primary"
            ? "bg-primary-300 hover:bg-primary-400 focus-visible:outline-primary-700 text-slate-900"
            : "bg-secondary-400 hover:bg-secondary-500 focus-visible:outline-secondary-600 text-white"
        } rounded-md px-5 py-3.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      >
        {title}
      </a>
    </div>
  );
};

export default Button;
