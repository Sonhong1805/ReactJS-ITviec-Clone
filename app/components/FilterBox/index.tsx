import { Filter } from "feather-icons-react";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  children: React.ReactElement;
}

const FilterBox = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        boxRef.current &&
        !boxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="filter-box"
      ref={boxRef}
      onClick={() => setIsOpen((prev) => !prev)}>
      <Filter cursor={"pointer"} />
      {isOpen && (
        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterBox;
