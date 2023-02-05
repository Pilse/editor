import { ElementType, useCallback, useRef } from "react";
import { RenderLeafProps } from "slate-react";

type LeafRenderer = Record<string, ElementType>;

export interface UseLeafHelper {
  addLeaf: (type: string, leaf: ElementType) => void;
  renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

export const useLeafHelper = (): UseLeafHelper => {
  const leafRenderer = useRef<LeafRenderer>({});

  const addLeaf = useCallback(
    (type: string, leaf: ElementType) => {
      leafRenderer.current[type] = leaf;
    },
    [leafRenderer]
  );

  const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    Object.keys(leaf).forEach((key) => {
      const Component = leafRenderer.current[key];
      if (Component) children = <Component>{children}</Component>;
    });
    return <span {...attributes}>{children}</span>;
  };

  return { addLeaf, renderLeaf };
};
