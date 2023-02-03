import { ElementType } from "react";
import { RenderLeafProps } from "slate-react";

type LeafRenderer = Record<string, ElementType>;

export interface UseLeafHelper {
  addLeaf: (type: string, leaf: ElementType) => void;
  renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

export const useLeafHelper = (): UseLeafHelper => {
  const leafRenderer: LeafRenderer = {};

  const addLeaf = (type: string, leaf: ElementType) => {
    leafRenderer[type] = leaf;
  };

  const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    Object.keys(leaf).forEach((key) => {
      const Component = leafRenderer[key];
      if (Component) children = <Component>{children}</Component>;
    });
    return <span {...attributes}>{children}</span>;
  };

  return { addLeaf, renderLeaf };
};
