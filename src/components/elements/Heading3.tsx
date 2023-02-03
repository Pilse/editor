import { forwardRef, PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

type Heading3Props = PropsWithChildren<Omit<Pick<RenderElementProps, "attributes">, "ref">>;

const Heading3 = forwardRef<HTMLHeadingElement, Heading3Props>(({ children, attributes }, ref) => {
  return (
    <h3 {...attributes} ref={ref}>
      {children}
    </h3>
  );
});

export default Heading3;
