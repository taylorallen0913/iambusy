import { type ReactNode, useRef, type RefObject } from "react";
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";
import { type OverlayTriggerState } from "react-stately";

interface PopoverProps {
  triggerRef: RefObject<Element>;
  placement: string;
  state: OverlayTriggerState;
  children?: ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({
  triggerRef,
  state,
  children,
}) => {
  const ref = useRef(null);

  const { popoverProps, underlayProps } = usePopover(
    {
      popoverRef: ref,
      triggerRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div
        {...popoverProps}
        ref={ref}
        className="absolute top-full z-10 mt-2 rounded-md border border-gray-300 bg-white p-8 shadow-lg"
      >
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
};
