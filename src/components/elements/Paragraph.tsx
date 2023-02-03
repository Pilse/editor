import { forwardRef, PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

type ParagraphProps = PropsWithChildren<Omit<Pick<RenderElementProps, "attributes">, "ref">>;

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ children, attributes }, ref) => {
  return (
    <p {...attributes} ref={ref}>
      {children}
    </p>
  );
});

export default Paragraph;
