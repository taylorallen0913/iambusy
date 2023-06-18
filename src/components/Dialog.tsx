import { type AriaDialogProps, useDialog } from "react-aria";
import React, { type ReactNode } from "react";

export const Dialog: React.FC<AriaDialogProps & { children?: ReactNode }> = ({
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
};
