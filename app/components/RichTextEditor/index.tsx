import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  type Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { htmlToSlate } from "@slate-serializers/html";
import countCharacters from "~/utils/countCharacters";
import { convertHtmlToSlate, convertSlateToHtml } from "./convert";
import { Button, Icon, Toolbar } from "./components";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  Underline,
} from "feather-icons-react";
import IconHeading1 from "../Icon/IconHeading1";
import IconHeading2 from "../Icon/IconHeading2";
import IconQuote from "../Icon/IconQuote";
import IconListOl from "../Icon/IconListOl";

const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

type CustomElement = {
  type: string;
  align?: string;
  children: CustomText[];
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const initialValue: Descendant[] = [
  // {
  //   type: "paragraph",
  //   children: [{ text: "Nhập nội dung!" }],
  // },
] as CustomElement[];

interface IProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}
const RichTextEditor = ({ content, setContent }: IProps) => {
  const [slate, setSlate] = useState<Descendant[]>(initialValue);

  useEffect(() => {
    const serializedToSlate = htmlToSlate(content, convertHtmlToSlate);
    setSlate(serializedToSlate.length > 0 ? serializedToSlate : initialValue);
  }, [content]);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const html = convertSlateToHtml({
    content: slate as any,
  });

  useEffect(() => {
    setContent(html);
  }, [slate]);

  return (
    <Slate
      key={JSON.stringify(slate)}
      editor={editor}
      initialValue={slate}
      onChange={(newValue) => setSlate(newValue)}>
      <Toolbar>
        <MarkButton format="bold" icon={<Bold />} />
        <MarkButton format="italic" icon={<Italic />} />
        <MarkButton format="underline" icon={<Underline />} />
        <MarkButton format="code" icon={<Code />} />
        <BlockButton format="heading-one" icon={<IconHeading1 />} />
        <BlockButton format="heading-two" icon={<IconHeading2 />} />
        <BlockButton format="block-quote" icon={<IconQuote />} />
        <BlockButton format="numbered-list" icon={<IconListOl />} />
        <BlockButton format="bulleted-list" icon={<List />} />
        <BlockButton format="left" icon={<AlignLeft />} />
        <BlockButton format="center" icon={<AlignCenter />} />
        <BlockButton format="right" icon={<AlignRight />} />
        <BlockButton format="justify" icon={<AlignJustify />} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder=""
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
      <div
        className={`count-characters ${
          countCharacters(html) > 2500 && "error"
        }`}>
        <span>{countCharacters(html)}</span> / 2500 ký tự
        {countCharacters(html) > 2500 && ". Vui lòng giảm số lượng ký tự"}
      </div>
    </Slate>
  );
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as CustomElement).type),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = { align: isActive ? undefined : format };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: any, format: any, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as Record<string, any>)[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, any>)[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = element.align ? { textAlign: element.align } : {};
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default RichTextEditor;
