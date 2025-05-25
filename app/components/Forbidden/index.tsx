import { useTranslation } from "react-i18next";
import { ForbiddenWrapper } from "./styled";

const Forbidden = () => {
  const { t } = useTranslation(["search"]);
  return (
    <ForbiddenWrapper>
      <div className="title">
        <h1>403 </h1>
        <figure>
          <img src="/assets/images/robby-very-bad.png" alt="robby very bad" />
        </figure>
      </div>
      <h2>Forbidden</h2>
      <h4>{t("You don't have permission to access this resource")}</h4>
    </ForbiddenWrapper>
  );
};

export default Forbidden;
