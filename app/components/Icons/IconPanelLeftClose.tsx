import { type SVGProps } from "react";

const IconPanelLeftClose = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M9 3v18"></path>
      <path d="m14 9 3 3-3 3"></path>
    </svg>
  );
};

export default IconPanelLeftClose;
