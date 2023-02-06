import { useLayoutEffect, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { useElementHelper, useLeafHelper, useToolHelper } from "./helpers";
import { Heading1, Heading2, Heading3, Paragraph } from "./components/elements";
import { Bold, Italic, Strike, Underline } from "./components/leaves";

function App() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const { addElement, renderElement } = useElementHelper();
  const { addLeaf, renderLeaf } = useLeafHelper();
  const { tools, addBlockTool, addMarkTool } = useToolHelper(editor);

  useLayoutEffect(() => {
    addElement("p", Paragraph);
    addElement("h1", Heading1);
    addElement("h2", Heading2);
    addElement("h3", Heading3);

    addLeaf("bold", Bold);
    addLeaf("italic", Italic);
    addLeaf("strike", Strike);
    addLeaf("underline", Underline);

    addBlockTool({ type: "p", icon: "p", toggleable: true });
    addBlockTool({ type: "h1", icon: "h1", toggleable: true });
    addBlockTool({ type: "h2", icon: "h2", toggleable: true });
    addBlockTool({ type: "h3", icon: "h3", toggleable: true });

    addMarkTool({ type: "bold", icon: "bold", toggleable: true });
    addMarkTool({ type: "italic", icon: "italic", toggleable: true });
    addMarkTool({ type: "strike", icon: "strike", toggleable: true });
    addMarkTool({ type: "underline", icon: "underline", toggleable: true });
  }, [addElement, addLeaf, addBlockTool, addMarkTool]);

  const handleValueChange = (newValue: Descendant[]) => setValue(() => newValue);

  return (
    <Slate editor={editor} value={value} onChange={handleValueChange}>
      <div>
        {tools.map(({ onMouseDown, icon }) => (
          <button onMouseDown={onMouseDown} key={Math.random()}>
            {icon}
          </button>
        ))}
      </div>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} autoFocus />
    </Slate>
  );
}

const initialValue: Descendant[] = [
  {
    type: "p",
    children: [{ text: "hello world" }],
  },
  {
    type: "h1",
    children: [{ text: "heading", strike: true }],
  },
];

export default App;
