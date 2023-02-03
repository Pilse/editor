import { forwardRef, PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

type Heading2Props = PropsWithChildren<Omit<Pick<RenderElementProps, "attributes">, "ref">>;

const Heading2 = forwardRef<HTMLHeadingElement, Heading2Props>(({ children, attributes }, ref) => {
  return (
    <h2 {...attributes} ref={ref}>
      {children}
    </h2>
  );
});

export default Heading2;
