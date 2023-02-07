import { useMemo, useState } from "react";
import { withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editor } from "./components/editor";

function App() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleValueChange = (newValue: Descendant[]) => setValue(() => newValue);

  return (
    <Slate editor={editor} value={value} onChange={handleValueChange}>
      <Editor />
    </Slate>
  );
}

const initialValue: Descendant[] = [
  {
    type: "p",
    children: [{ text: "내용을 입력해주세요", bold: true }],
  },
];

export default App;
