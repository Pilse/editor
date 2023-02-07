import { MouseEvent, ReactNode, useCallback, useState } from "react";
import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";

type ToolConfig = {
  type: string;
  icon: ReactNode;
  toggleable: boolean;
};

export type Tool = ToolConfig & {
  onMouseDown: (event: MouseEvent) => void;
  isActive: () => boolean;
};

interface UseToolHelper {
  tools: Tool[];
  addBlockTool: (config: ToolConfig) => void;
  addMarkTool: (config: ToolConfig) => void;
}

export const useToolHelper = (): UseToolHelper => {
  const editor = useSlate();

  const [tools, setTools] = useState<Tool[]>([]);

  const doesSelectedBlockHaveType = (editor: Editor, type: string) => {
    if (!editor.selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (node) => !Editor.isEditor(node) && Element.isElement(node) && node.type === type,
      })
    );

    return Boolean(match);
  };

  const doesSelectiveTextHaveMark = (editor: Editor, type: string) => {
    const marks = Editor.marks(editor);
    console.log(editor.marks, type);
    return marks === null ? false : Boolean(marks[type]);
  };

  const handleBlockToolClick = useCallback(
    (event: MouseEvent, type: string, toggleable: boolean = true) => {
      event.preventDefault();

      const isSelectedBlockHaveType = toggleable && doesSelectedBlockHaveType(editor, type);

      if (isSelectedBlockHaveType) Transforms.unsetNodes(editor, "type");
      Transforms.setNodes(editor, { type: isSelectedBlockHaveType ? "p" : type });
    },
    [editor]
  );

  const handleMarkToolClick = useCallback(
    (event: MouseEvent, type: string, toggleable: boolean = true) => {
      event.preventDefault();

      const isSelectedTextHaveType = toggleable && doesSelectiveTextHaveMark(editor, type);

      if (isSelectedTextHaveType) Editor.removeMark(editor, type);
      else Editor.addMark(editor, type, true);
    },
    [editor]
  );

  const addBlockTool = useCallback(
    ({ type, icon, toggleable }: ToolConfig) =>
      setTools((prev) => [
        ...prev,
        {
          type,
          icon,
          toggleable,
          onMouseDown: (event: MouseEvent) => handleBlockToolClick(event, type),
          isActive: () => doesSelectedBlockHaveType(editor, type),
        },
      ]),
    [editor, handleBlockToolClick]
  );

  const addMarkTool = useCallback(
    ({ type, icon, toggleable }: ToolConfig) =>
      setTools((prev) => [
        ...prev,
        {
          type,
          icon,
          toggleable,
          onMouseDown: (event: MouseEvent) => handleMarkToolClick(event, type),
          isActive: () => doesSelectiveTextHaveMark(editor, type),
        },
      ]),
    [editor, handleMarkToolClick]
  );

  return { tools, addBlockTool, addMarkTool };
};
