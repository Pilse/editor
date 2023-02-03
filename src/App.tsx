import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useMemo, useState } from "react";
import { useElementHelper, useLeafHelper } from "./helpers";
import { Heading1, Heading2, Heading3, Paragraph } from "./components/elements";

function App() {
  const { addElement, renderElement } = useElementHelper();
  const { renderLeaf } = useLeafHelper();

  addElement("p", Paragraph);
  addElement("h1", Heading1);
  addElement("h2", Heading2);
  addElement("h3", Heading3);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  console.log(value);

  const editor = useMemo(() => withReact(createEditor()), []);

  const handleValueChange = (newValue: Descendant[]) => setValue(() => newValue);

  return (
    <Slate editor={editor} value={value} onChange={handleValueChange}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}

const initialValue: Descendant[] = [
  {
    type: "p",
    children: [{ text: "hello world" }],
  },
  {
    type: "h2",
    children: [{ text: "heading" }],
  },
];

export default App;
