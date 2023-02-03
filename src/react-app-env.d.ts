/// <reference types="react-scripts" />

import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type TextElementTypes = string;
type TextFormats = string;

type ForamttedText = {
  [K: string]: boolean | string;
};
type TextElement = {
  type: TextElementTypes;
  children: ForamttedText[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor | ReactEditor;
    Element: TextElement;
    Text: ForamttedText;
  }
}
