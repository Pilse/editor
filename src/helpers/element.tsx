import { ElementType, useCallback, useState } from "react";
import { RenderElementProps } from "slate-react";

type ElementRenderer = Record<string, ElementType>;

export interface UseElementHelper {
  addElement: (type: string, element: ElementType) => void;
  renderElement: (props: RenderElementProps) => JSX.Element;
}

export const useElementHelper = (): UseElementHelper => {
  const [elementRenderer, setElementRenderer] = useState<ElementRenderer>({});

  const addElement = useCallback(
    (type: string, element: ElementType) => {
      setElementRenderer((prev) => ({ ...prev, [type]: element }));
    },
    [setElementRenderer]
  );

  const renderElement = useCallback(
    ({ attributes, children, element }: RenderElementProps) => {
      const Component = elementRenderer[element.type] ?? "p";
      return <Component {...attributes}>{children}</Component>;
    },
    [elementRenderer]
  );

  return { addElement, renderElement };
};
