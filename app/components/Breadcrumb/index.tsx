import React from "react";
import { BreadcrumbWrapper } from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface IProps {
  primaryLinkLabel?: string;
  primaryLinkUrl?: string;
  secondaryLinkLabel?: string;
  secondaryLinkUrl?: string;
}

const Breadcrumb = ({
  primaryLinkLabel,
  primaryLinkUrl,
  secondaryLinkLabel,
  secondaryLinkUrl,
}: IProps) => {
  const { t } = useTranslation(["home", "header"]);
  return (
    <BreadcrumbWrapper>
      <div className="breadcrumb-container">
        <div>
          <Link to={"/"}>{t("Home")}</Link>
          {primaryLinkUrl && (
            <>
              <span>›</span>
              <Link to={primaryLinkUrl}>{primaryLinkLabel}</Link>
            </>
          )}
          {secondaryLinkUrl && (
            <>
              <span>›</span>
              <Link to={secondaryLinkUrl}>{secondaryLinkLabel}</Link>
            </>
          )}
        </div>
      </div>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
