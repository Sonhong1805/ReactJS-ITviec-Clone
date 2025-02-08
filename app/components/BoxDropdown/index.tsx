import { FiChevronDown } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import {
  BoxDropdownContainer,
  BoxDropdownLabel,
  BoxDropdownWrapper,
} from "./styled";
import { useTranslation } from "react-i18next";

interface IProps {
  label: string;
  options?: any[];
  children?: React.ReactElement;
}

const BoxDropdown = ({ label, options, children }: IProps) => {
  const { t } = useTranslation(["search"]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isShowDropdown &&
        boxRef.current &&
        !boxRef?.current.contains(e.target as Node)
      ) {
        setIsShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <BoxDropdownWrapper
      ref={boxRef}
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <div className="box">
        <span>{t(label)}</span>
        <FiChevronDown />
      </div>
      {isShowDropdown && (
        <BoxDropdownContainer
          onClick={(e) => e.stopPropagation()}
          className="box-dropdown-container">
          {options
            ? options.map((option) => (
                <BoxDropdownLabel key={option.id}>
                  <input type="checkbox" id={option.label} />
                  <span>{t(option.label)}</span>
                </BoxDropdownLabel>
              ))
            : children}
        </BoxDropdownContainer>
      )}
    </BoxDropdownWrapper>
  );
};

export default BoxDropdown;
