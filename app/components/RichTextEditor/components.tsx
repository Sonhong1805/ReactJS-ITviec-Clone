import React, { type ReactNode, type Ref, type PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

interface ButtonProps extends BaseProps {
  active: boolean;
  reversed: boolean;
}

export const Button = React.forwardRef<
  HTMLSpanElement,
  PropsWithChildren<ButtonProps>
>(({ className = "", active, reversed, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      className as string,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? "white"
            : "#aaa"
          : active
          ? "black"
          : "#a6a6a6"};
      `
    )}
  />
));
interface SlateValue {
  children: { text: string }[];
}

interface EditorValueProps extends BaseProps {
  value: SlateValue;
}
export const EditorValue = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<EditorValueProps>
>(({ className = "", value, ...props }, ref) => {
  const textLines = (value as SlateValue).children
    .map((node: any) => node.text)
    .join("\n");

  return (
    <div
      ref={ref}
      {...props}
      className={cx(
        className as string,
        css`
          margin: 30px -20px 0;
        `
      )}>
      <div
        className={css`
          font-size: 14px;
          padding: 5px 20px;
          color: #404040;
          border-top: 2px solid #eeeeee;
          background: #f8f8f8;
        `}>
        Slate's value as text
      </div>
      <div
        className={css`
          color: #404040;
          font: 12px monospace;
          white-space: pre-wrap;
          padding: 10px 20px;
          div {
            margin: 0 0 0.5em;
          }
        `}>
        {textLines}
      </div>
    </div>
  );
});

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        "material-icons",
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  )
);

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 10px 10px 0;
          margin: 0px;
          background-color: #f7f7f7;
          border: 1px solid #dedede;
          border-radius: 4px 4px 0 0;
          border-bottom-color: transparent;
        `
      )}
    />
  )
);
