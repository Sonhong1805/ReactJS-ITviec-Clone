import { FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi";
import {
  Select,
  SearchBox,
  SearchButton,
  SearchKeyword,
  Form,
  SelectPane,
  Overlay,
} from "./styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

import SearchOptions from "./SearchOptions";
import CityOptions from "./CityOptions";

interface IProps {
  valueCity?: string;
  valueKeyword?: string;
}

const SearchForm = ({ valueCity, valueKeyword }: IProps) => {
  const { t, i18n } = useTranslation(["home"]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [optionValue, setOptionValue] = useState(valueCity || t("All Cities"));
  const [keywords, setKeywords] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (valueKeyword) {
      setKeywords(valueKeyword);
    }
  }, [valueKeyword]);

  useEffect(() => {
    setOptionValue(t("All Cities"));
  }, [t, i18n.language]);

  const handleOptions = () => {
    setIsShowOptions(!isShowOptions);
  };
  const handleOptionValue = (value: string) => {
    setOptionValue(value);
    setIsShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isShowOptions && !event.target.closest(".select-active")) {
        setIsShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isShowOptions]);

  const handleSearch = () => {
    let city = optionValue || "";
    city =
      optionValue === "All Cities" || optionValue === "Tất cả thành phố"
        ? ""
        : city;
    navigate(`/search?city=${city}&keywords=${keywords}`);
  };

  useEffect(() => {
    const preventScroll = (event: any) => {
      if (isInputFocused || isShowOptions) {
        event.preventDefault();
      }
    };

    if (isInputFocused || isShowOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("scroll", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", preventScroll);
    };
  }, [isInputFocused, isShowOptions]);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Select
          onClick={handleOptions}
          className={isShowOptions ? "select-active" : ""}>
          <SelectPane>
            <div className="select-value">
              <FiMapPin />
              <span>{valueCity || optionValue}</span>
            </div>
            <FiChevronDown size={24} className="arrow-down" />
          </SelectPane>
          {isShowOptions && <CityOptions />}
        </Select>
        <SearchBox>
          <SearchKeyword className={isInputFocused ? "focus" : "unfocus"}>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={t("Placeholder")}
                onChange={(e) => setKeywords(e.target.value)}
                value={keywords}
                onFocus={() => setIsInputFocused(true)}
              />
              <FiX
                className={keywords && "show"}
                onClick={() => {
                  setKeywords("");
                  setIsInputFocused(false);
                }}
              />
            </div>
            {isInputFocused && (
              <SearchOptions
                keywords={keywords}
                setIsInputFocused={setIsInputFocused}
              />
            )}
          </SearchKeyword>
          <SearchButton onClick={handleSearch}>
            <FiSearch />
            {t("Search")}
          </SearchButton>
        </SearchBox>
      </Form>
      <Overlay
        className={isShowOptions || isInputFocused ? "select-active" : ""}
        onClick={() => {
          setIsShowOptions(false);
          setIsInputFocused(false);
        }}></Overlay>
    </>
  );
};

export default SearchForm;
