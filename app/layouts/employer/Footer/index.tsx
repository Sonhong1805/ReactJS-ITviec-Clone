import { useTranslation } from "react-i18next";
import {
  FooterColumn,
  FooterContact,
  FooterContainer,
  FooterDesign,
  FooterFigure,
  FooterGrid,
  FooterList,
  FooterMain,
  FooterSaperate,
  FooterSocials,
  FooterWrapper,
} from "./styled";
import ExciteIt from "./ExciteIt";
import {
  Facebook,
  Linkedin,
  Mail,
  PhoneCall,
  Send,
  Youtube,
} from "feather-icons-react";

const Footer = () => {
  const { t } = useTranslation(["footer"]);
  return (
    <FooterWrapper>
      <ExciteIt />
      <FooterMain>
        <FooterContainer>
          <FooterColumn className="col-3">
            <FooterFigure>
              <img src="/assets/images/logo.png" />
              <figcaption>Ít nhưng mà chất</figcaption>
            </FooterFigure>
            <FooterSocials>
              <li>
                <Linkedin />
              </li>
              <li>
                <Facebook />
              </li>
              <li>
                <Youtube />
              </li>
            </FooterSocials>
          </FooterColumn>
          <FooterColumn className="col-2">
            <h4>{t("About Us.value")}</h4>
            <FooterList>
              <li>{t("About Us.Home")}</li>
              <li>{t("About Us.About ITviec")}</li>
              <li>{t("About Us.AI Match Service")}</li>
              <li>{t("About Us.Contact Us")}</li>
              <li>{t("About Us.All Jobs")}</li>
              <li>{t("About Us.FAQ")}</li>
            </FooterList>
          </FooterColumn>
          <FooterColumn className="col-2">
            <h4>{t("Campaign.value")}</h4>
            <FooterList>
              <li>{t("Campaign.IT Story")}</li>
              <li>{t("Campaign.Writing Contest")}</li>
              <li>{t("Campaign.Featured IT Jobs")}</li>
              <li>{t("Campaign.Annual Survey")}</li>
            </FooterList>
          </FooterColumn>
          <FooterColumn className="col-2">
            <h4>{t("Terms & Conditions.value")}</h4>
            <FooterList>
              <li>{t("Terms & Conditions.Privacy Policy")}</li>
              <li>{t("Terms & Conditions.Operating Regulation")}</li>
              <li>{t("Terms & Conditions.Complaint Handling")}</li>
              <li>{t("Terms & Conditions.Terms & Conditions")}</li>
              <li>{t("Terms & Conditions.Press")}</li>
            </FooterList>
          </FooterColumn>
          <FooterColumn className="col-3">
            <h4>{t("Want to post a job?.value")}</h4>
            <FooterContact>
              <li>
                <PhoneCall />
                {t("Want to post a job?.Ho Chi Minh")}
              </li>
              <li>
                <PhoneCall />
                {t("Want to post a job?.Ha Noi")}
              </li>
              <li>
                <Mail />
                {t("Want to post a job?.Email")}
              </li>
              <li>
                <Send />
                {t("Want to post a job?.Submit")}
              </li>
            </FooterContact>
          </FooterColumn>
        </FooterContainer>
        <hr />
        <FooterDesign>
          <span>Copyright © NGUYỄN HỒNG SƠN</span>
          <FooterSaperate></FooterSaperate>
          <span>(+ 84) 327 842 451</span>
        </FooterDesign>
        <FooterGrid>
          <img
            src="https://itviec.com/assets/footer-image-35f866330436404820ee462153a6b32edebdbdd90869eedacf2205b45fcc9f4a.svg"
            alt="grid"
          />
        </FooterGrid>
      </FooterMain>
    </FooterWrapper>
  );
};

export default Footer;
