import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxDropdownContainer,
  BoxDropdownLabel,
  BoxDropdownWrapper,
} from "./styled";
import { useTranslation } from "react-i18next";
import { useJobStore } from "~/stores/jobStore";
import { createSearchParams, useNavigate } from "react-router";
import { routes } from "~/constants/routes";
import { MAX_RANGE, MIN_RANGE } from "../SearchFilter/ModalFilter";
import formatSalary from "~/utils/formatSalary";
import { useQueriesParams } from "~/hooks/useQueriesParams";
import { ChevronDown, X } from "feather-icons-react";

interface IProps {
  label: string;
  options?: Option[];
  children?: React.ReactElement;
  selectedIds?: string[];
  isActive: boolean;
  onSelectedIds?: (option: string) => void;
  onResetSelected: () => void;
}

const BoxDropdown = ({
  label,
  options,
  children,
  selectedIds,
  isActive,
  onSelectedIds,
  onResetSelected,
}: IProps) => {
  const { t } = useTranslation(["search"]);
  const { queryParams } = useQueriesParams();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const {
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    selectedMaxSalary,
  } = useJobStore();

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

  const showLabel = useMemo(() => {
    if (selectedIds) {
      return selectedIds && selectedIds.length === 1
        ? selectedIds[0]
        : selectedIds && selectedIds.length > 1
        ? `${selectedIds[0]}, +${selectedIds.length - 1}`
        : label;
    }
    if (selectedMinSalary > MIN_RANGE || selectedMaxSalary < MAX_RANGE) {
      return `${formatSalary(selectedMinSalary)}$ - ${formatSalary(
        selectedMaxSalary
      )}$`;
    } else {
      return label;
    }
  }, [selectedIds, selectedMinSalary, selectedMaxSalary]);

  const filteredParams = useMemo(() => {
    const searchParams: Record<string, string | string[]> = {
      page: queryParams.page || "",
      limit: queryParams.limit || "",
      keyword: queryParams.keyword || "",
      city: queryParams.city || "",
      levels: selectedLevels,
      industries: selectedIndustries.map((item) => item + ""),
      workingModels: selectedWorkingModels,
      companyTypes: selectedCompanyTypes,
      minSalary:
        selectedMinSalary === MIN_RANGE ? "" : selectedMinSalary.toString(),
      maxSalary:
        selectedMaxSalary === MAX_RANGE ? "" : selectedMaxSalary.toString(),
    };

    return Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== "")
    );
  }, [
    queryParams.page,
    queryParams.limit,
    queryParams.keyword,
    queryParams.city,
    selectedLevels,
    selectedWorkingModels,
    selectedCompanyTypes,
    selectedIndustries,
    selectedMinSalary,
    selectedMaxSalary,
  ]);

  useEffect(() => {
    navigate({
      pathname: routes.ITJobs,
      search: createSearchParams(filteredParams).toString(),
    });
  }, [filteredParams]);

  const handleChangeValue = (value: string) => {
    if (onSelectedIds) {
      onSelectedIds(value);
    }
  };

  const handleResetSelected = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onResetSelected();
  };

  return (
    <BoxDropdownWrapper
      ref={boxRef}
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <div className={`box ${isActive && "active"}`}>
        <span>{showLabel}</span>
        {isActive ? <X onClick={handleResetSelected} /> : <ChevronDown />}
      </div>
      {isShowDropdown && (
        <BoxDropdownContainer
          onClick={(e) => e.stopPropagation()}
          className="box-dropdown-container">
          {options
            ? options.map((option) => (
                <BoxDropdownLabel
                  key={option.value}
                  htmlFor={option.value + ""}>
                  <input
                    type="checkbox"
                    id={option.value + ""}
                    checked={selectedIds?.includes(option.value + "")}
                    onChange={() => handleChangeValue(option.value + "")}
                  />
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
