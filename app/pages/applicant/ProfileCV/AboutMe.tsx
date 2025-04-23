import { useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import { AboutMeContent, customStyles, ModalContainer } from "./styled";
import { useTranslation } from "react-i18next";
import RichTextEditor from "~/components/RichTextEditor";
import { Feather, X } from "feather-icons-react";

const AboutMe = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log(content);
  };

  return (
    <Card
      title="About Me"
      subtitle="Introduce your strengths and years of experience"
      img="/assets/svg/about_me_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>About Me</h2>
            <X onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <AboutMeContent>
              <div className="placeholder-tips">
                <div className="icon">
                  <Feather />
                </div>
                <div className="tips">
                  <strong>Tips: </strong>
                  Summarize your professional experience, highlight your skills
                  and your strengths.
                </div>
              </div>
              <RichTextEditor content={content} setContent={setContent} />
            </AboutMeContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}>
              {t("Cancel")}
            </button>
            <button className="save" type="button" onClick={handleSave}>
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default AboutMe;
