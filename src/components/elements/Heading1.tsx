import { forwardRef, PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

type Heading1Props = PropsWithChildren<Omit<Pick<RenderElementProps, "attributes">, "ref">>;

const Heading1 = forwardRef<HTMLHeadingElement, Heading1Props>(({ children, attributes }, ref) => {
  return (
    <h1 {...attributes} ref={ref}>
      {children}
    </h1>
  );
});

export default Heading1;
