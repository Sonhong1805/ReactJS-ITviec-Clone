import { Link } from "react-router";
import { BreadcrumbWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const Breadcrumb = () => {
  const { t } = useTranslation(["home"]);
  return (
    <BreadcrumbWrapper>
      <div className="breadcrumb-container">
        <Link to={"/"}>{t("Home")}</Link>
        <span>›</span>
        <Link to={"/it-jobs"}>{t("All IT jobs")}</Link>
      </div>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
