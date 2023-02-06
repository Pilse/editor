import { ElementType, useCallback, useState } from "react";
import { RenderLeafProps } from "slate-react";

type LeafRenderer = Record<string, ElementType>;

export interface UseLeafHelper {
  addLeaf: (type: string, leaf: ElementType) => void;
  renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

export const useLeafHelper = (): UseLeafHelper => {
  const [leafRenderer, setLeafRenderer] = useState<LeafRenderer>({});

  const addLeaf = useCallback(
    (type: string, leaf: ElementType) => {
      setLeafRenderer((prev) => ({ ...prev, [type]: leaf }));
    },
    [setLeafRenderer]
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      Object.keys(leaf).forEach((key) => {
        const Component = leafRenderer[key];
        if (Component) children = <Component>{children}</Component>;
      });
      return <span {...attributes}>{children}</span>;
    },
    [leafRenderer]
  );

  return { addLeaf, renderLeaf };
};
