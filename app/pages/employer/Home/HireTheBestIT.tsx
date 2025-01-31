import { Link } from "react-router";
import { HireTheBestITWrapper } from "./styled";
import HIRE_THE_BEST_IT from "/assets/webp/hire-the-best-it.webp";
import { useTranslation } from "react-i18next";
const HireTheBestIT = () => {
  const { t } = useTranslation(["home"]);
  return (
    <HireTheBestITWrapper>
      <div className="banner-container">
        <div className="banner-left">
          <h1>{t("Hire the best IT Professionals in Vietnam with ITviec")}</h1>
          <p className="parapraph">
            {t(
              "With in-depth understanding in the IT sector and specialized skills, we can help you reach and hire the best IT candidates."
            )}
          </p>
          <Link to={"#employer-contact"} className="button">
            {t("Contact now")}
          </Link>
          <div className="login">
            <p>{t("Already have an Employer account?")}</p>
            <Link to={"employer/login"} target="_blank">
              {t("Sign in")}
            </Link>
          </div>
        </div>
        <div className="banner-right">
          <figure>
            <img src={HIRE_THE_BEST_IT} alt="hire-the-best-it" />
          </figure>
        </div>
      </div>
    </HireTheBestITWrapper>
  );
};

export default HireTheBestIT;
