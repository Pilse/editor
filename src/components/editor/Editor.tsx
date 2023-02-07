import { useLayoutEffect } from "react";
import { Editable } from "slate-react";
import { useElementHelper, useLeafHelper, useToolHelper } from "../../helpers";
import { Heading1, Heading2, Heading3, Paragraph } from "../elements";
import { Bold, Italic, Strike, Underline } from "../leaves";
import { Tools } from "../tools";

const Editor = () => {
  const { addElement, renderElement } = useElementHelper();
  const { addLeaf, renderLeaf } = useLeafHelper();
  const { tools, addBlockTool, addMarkTool } = useToolHelper();

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

    addMarkTool({ type: "bold", icon: "B", toggleable: true });
    addMarkTool({ type: "italic", icon: "I", toggleable: true });
    addMarkTool({ type: "strike", icon: "S", toggleable: true });
    addMarkTool({ type: "underline", icon: "U", toggleable: true });
    addBlockTool({
      type: "image",
      icon: (
        <>
          <label htmlFor="file">image</label>
          <input hidden id="file" type="file" />
        </>
      ),
      toggleable: false,
    });
  }, [addElement, addLeaf, addBlockTool, addMarkTool]);

  return (
    <>
      <Tools tools={tools} />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} autoFocus spellCheck={false} />
    </>
  );
};

export default Editor;
