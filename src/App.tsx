import { useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { useElementHelper, useLeafHelper } from "./helpers";
import { Heading1, Heading2, Heading3, Paragraph } from "./components/elements";
import { Bold, Italic, Strike, Underline } from "./components/leaves";
import { useToolHelper } from "./helpers/tool";

function App() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const { addElement, renderElement } = useElementHelper();
  const { addLeaf, renderLeaf } = useLeafHelper();

  addElement("p", Paragraph);
  addElement("h1", Heading1);
  addElement("h2", Heading2);
  addElement("h3", Heading3);

  addLeaf("bold", Bold);
  addLeaf("italic", Italic);
  addLeaf("strike", Strike);
  addLeaf("underline", Underline);

  const handleValueChange = (newValue: Descendant[]) => setValue(() => newValue);

  return (
    <Slate editor={editor} value={value} onChange={handleValueChange}>
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
    type: "p",
    children: [{ text: "heading", strike: true }],
  },
];

export default App;
