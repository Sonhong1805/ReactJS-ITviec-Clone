import { ManageCVs, ManageCVWrapper } from "./styled";
import PersonalInformation from "./PersonalInformation";
import GeneralInformation from "./GeneralInformation";
import CoverLetter from "./CoverLetter";
import YourCV from "./YourCV";

const ProfileManageCV = () => {
  return (
    <ManageCVWrapper>
      <ManageCVs>
        <h2>Manage CVs</h2>
        <p className="text">
          Upload your CV below to use it throughout your application process
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
