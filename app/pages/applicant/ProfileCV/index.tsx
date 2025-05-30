import AboutMe from "./AboutMe";
import Awards from "./Awards";
import Certificates from "./Certificates";
import ContactInfo from "./ContactInfo";
import Education from "./Education";
import ProgressBar from "./ProgressBar";
import HighlightProject from "./HighlightProject";
import Skills from "./Skills";
import { ProfileCVContent, ProfileCVWrapper } from "./styled";
import WorkExperience from "./WorkExperience";

const ProfileCV = () => {
  return (
    <ProfileCVWrapper>
      <ProfileCVContent>
        <ContactInfo />
        <AboutMe />
        <Education />
        <WorkExperience />
        <Skills />
        <HighlightProject />
        <Certificates />
        <Awards />
      </ProfileCVContent>
      <ProgressBar />
    </ProfileCVWrapper>
  );
};

export default ProfileCV;
