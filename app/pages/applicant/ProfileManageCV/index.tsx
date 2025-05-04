import { ManageCVs, ManageCVWrapper } from "./styled";
import PersonalInformation from "./PersonalInformation";
import GeneralInformation from "./GeneralInformation";
import CoverLetter from "./CoverLetter";
import YourCV from "./YourCV";
import { useTranslation } from "react-i18next";

const ProfileManageCV = () => {
  const { t } = useTranslation(["profile"]);
  return (
    <ManageCVWrapper>
      <ManageCVs>
        <h2>{t("Manage CVs")}</h2>
        <p className="text">
          {t(
            "Upload your CV below to use it throughout your application process"
          )}
        </p>
        <YourCV />
        <PersonalInformation />
      </ManageCVs>
      <GeneralInformation />
      <CoverLetter />
    </ManageCVWrapper>
  );
};

export default ProfileManageCV;
