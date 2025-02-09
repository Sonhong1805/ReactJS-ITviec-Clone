import { Link } from "react-router";
import { BreadcrumbWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const Breadcrumb = () => {
  const { t } = useTranslation(["home", "header"]);
  return (
    <BreadcrumbWrapper>
      <div className="breadcrumb-container">
        <div>
          <Link to={"/"}>{t("Home")}</Link>
          <span>›</span>
          <Link to={"/employer"}>{t("For Employers", { ns: "header" })}</Link>
          <span>›</span>
          <Link to={"/"}>Persol Career Tech Studio Vietnam</Link>
        </div>
        <div className="views">{t("Page views:")} 29,688</div>
      </div>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
