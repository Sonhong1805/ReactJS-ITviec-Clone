const IconStarFill = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      stroke="#ff9119"
      fill="#ff9119"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 
                       7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
};

export default IconStarFill;
