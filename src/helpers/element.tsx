import { ElementType } from "react";
import { RenderElementProps } from "slate-react";

type ElementRenderer = Record<string, ElementType>;

export interface UseElementHelper {
  addElement: (type: string, element: ElementType) => void;
  renderElement: (props: RenderElementProps) => JSX.Element;
}

export const useElementHelper = (): UseElementHelper => {
  const elementRenderer: ElementRenderer = {};

  const addElement = (type: string, element: ElementType) => {
    elementRenderer[type] = element;
  };

  const renderElement = ({ attributes, children, element }: RenderElementProps) => {
    const Component = elementRenderer[element.type] ?? "p";
    return <Component {...attributes}>{children}</Component>;
  };

  return { addElement, renderElement };
};
