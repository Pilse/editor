import { PropsWithChildren } from "react";

const Strike = ({ children }: PropsWithChildren) => {
  return <del>{children}</del>;
};

export default Strike;
