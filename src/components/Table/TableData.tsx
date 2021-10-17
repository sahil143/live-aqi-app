import * as React from "react";

export const TableData: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  ...props
}) => <td {...props}>{children}</td>;
