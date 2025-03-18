import InputBase from "../InputBase";
import { useTranslation } from "react-i18next";
import { InputSearchDropdown, InputSearchWrapper, SearchLabel } from "./styled";

interface IProps {
  options: Option[];
  placeholder: string;
  name: string;
  register: any;
  isPending: boolean;
  selectedIds: (string | number)[];
  handleSelectedIds: (option: string | number) => void;
  max?: number;
}
const InputSearch = ({
  options,
  placeholder,
  name,
  max,
  register,
  isPending,
  selectedIds,
  handleSelectedIds,
}: IProps) => {
  const { t } = useTranslation(["search"]);

  return (
    <InputSearchWrapper className="input-search-wrapper">
      <InputBase name={name} register={register} placeholder={t(placeholder)} />
      <InputSearchDropdown
        className={`input-search-dropdown ${options.length === 0 && "empty"}`}>
        {options.length > 0 || isPending ? (
          options.map((option) => (
            <SearchLabel key={option.value} htmlFor={option.label}>
              <input
                type="checkbox"
                id={option.label}
                disabled={
                  !selectedIds.includes(option.value) &&
                  selectedIds.length >= (max ?? options.length)
                }
                checked={selectedIds.includes(option.value)}
                onChange={() => handleSelectedIds(option.value)}
              />
              <span>{t(`${option.label}`)}</span>
            </SearchLabel>
          ))
        ) : (
          <p className="not-found">{t("No results found")}</p>
        )}
      </InputSearchDropdown>
    </InputSearchWrapper>
  );
};

export default InputSearch;
