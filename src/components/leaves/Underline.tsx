import { PropsWithChildren } from "react";

const Underline = ({ children }: PropsWithChildren) => {
  return <em>{children}</em>;
};

export default Underline;
