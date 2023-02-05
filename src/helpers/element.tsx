import { ElementType, useCallback, useRef } from "react";
import { RenderElementProps } from "slate-react";

type ElementRenderer = Record<string, ElementType>;

export interface UseElementHelper {
  addElement: (type: string, element: ElementType) => void;
  renderElement: (props: RenderElementProps) => JSX.Element;
}

export const useElementHelper = (): UseElementHelper => {
  const elementRenderer = useRef<ElementRenderer>({});

  const addElement = useCallback(
    (type: string, element: ElementType) => {
      elementRenderer.current[type] = element;
    },
    [elementRenderer]
  );

  const renderElement = ({ attributes, children, element }: RenderElementProps) => {
    const Component = elementRenderer.current[element.type] ?? "p";
    return <Component {...attributes}>{children}</Component>;
  };

  return { addElement, renderElement };
};
