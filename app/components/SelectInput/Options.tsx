import React from "react";
import { OptionItem, OptionList } from "./styled";

interface IProps {
  options: Option[];
  onGetOption: (option: Option) => void;
}

const Options = ({ options, onGetOption }: IProps) => {
  return (
    <OptionList>
      {options.map((option) => (
        <OptionItem key={option.value} onClick={() => onGetOption(option)}>
          {option.label}
        </OptionItem>
      ))}
    </OptionList>
  );
};

export default Options;
