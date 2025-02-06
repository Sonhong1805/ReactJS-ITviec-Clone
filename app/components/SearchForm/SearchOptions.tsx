import React from "react";

interface IProps {
  keywords: string;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchOptions = ({ keywords, setIsInputFocused }: IProps) => {
  return <div>SearchOptions</div>;
};

export default SearchOptions;
