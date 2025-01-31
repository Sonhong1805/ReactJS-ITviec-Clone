import React from "react";
import { ExciteItContainer, ExciteItWrapper } from "./styled";
import { useTranslation } from "react-i18next";

const ExciteIt = () => {
  const { t } = useTranslation(["footer"]);
  return (
    <ExciteItWrapper>
      <img src="/assets/svg/excite-it-desktop.svg" alt="excite it desktop" />
      <ExciteItContainer>
        <div className="excite-content">
          <div className="h1">
            {t("Excite the IT in Vietnam by Great Hiring")}
          </div>
          <p>
            {t(
              "Since 2013, ITviec has always been on the mission to achieve Great Hiring in IT. We help IT people to advance their careers. We help IT companies to find awesome candidates. Join us to excite the IT in Vietnam by Great Hiring!"
            )}
          </p>
        </div>
        <div className="excite-video">
          <iframe
            width="835"
            height="500"
            src="https://www.youtube.com/embed/iRL0gIHFAgQ?si=82NlgUEBIgd7UDjm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </ExciteItContainer>
    </ExciteItWrapper>
  );
};

export default ExciteIt;
