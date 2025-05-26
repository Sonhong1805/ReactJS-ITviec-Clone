import {
  Select,
  SearchBox,
  SearchButton,
  SearchKeyword,
  Form,
  SelectPane,
  Overlay,
} from "./styled";
import { useEffect, useState, type SyntheticEvent } from "react";
import { createSearchParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import SearchOptions from "./SearchOptions";
import CityOptions from "./CityOptions";
import { routes } from "~/constants/routes";
import { ChevronDown, MapPin, Search, X } from "feather-icons-react";

interface IProps {
  paramCity?: string;
  paramKeyword?: string;
}

const SearchForm = ({ paramCity, paramKeyword }: IProps) => {
  const { t } = useTranslation(["home", "option"]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [optionValue, setOptionValue] = useState(paramCity || t("All Cities"));
  const [keyword, setKeyword] = useState(paramKeyword || "");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let city = optionValue || "";
    city = optionValue === "All Cities" ? "" : city;

    const searchParams: Record<string, string> = {
      city,
      keyword,
      page: "1",
    };

    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );

    navigate({
      pathname: routes.ITJobs,
      search: createSearchParams(filteredParams).toString(),
    });

    setIsShowOptions(false);
    setIsInputFocused(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Select
          onClick={handleOptions}
          className={isShowOptions ? "select-active" : ""}>
          <SelectPane>
            <div className="select-value">
              <MapPin />
              <span>{t(optionValue, { ns: "option" })}</span>
            </div>
            <ChevronDown size={24} className="arrow-down" />
          </SelectPane>
          {isShowOptions && <CityOptions onOptionValue={handleOptionValue} />}
        </Select>
        <SearchBox>
          <SearchKeyword className={isInputFocused ? "focus" : "unfocus"}>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={t("Placeholder")}
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                onFocus={() => setIsInputFocused(true)}
              />
              <X
                className={keyword && "show"}
                onClick={() => {
                  setKeyword("");
                  setIsInputFocused(false);
                }}
              />
            </div>
            {isInputFocused && (
              <SearchOptions
                keyword={keyword}
                setIsInputFocused={setIsInputFocused}
              />
            )}
          </SearchKeyword>
          <SearchButton type="submit">
            <Search />
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
