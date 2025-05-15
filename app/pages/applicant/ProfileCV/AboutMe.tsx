import { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import { customStyles, ModalContainer } from "./styled";
import { useTranslation } from "react-i18next";
import RichTextEditor from "~/components/RichTextEditor";
import { Edit, Feather, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import { useApplicantStore } from "~/stores/applicantStore";
import DOMPurify from "dompurify";

const AboutMe = () => {
  const { t } = useTranslation(["profile"]);
  const { applicant, handleSaveAboutMe } = useApplicantStore();
  const [content, setContent] = useState(applicant.aboutMe || "");
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();

  useEffect(() => {
    if (applicant.aboutMe) {
      setContent(applicant.aboutMe);
    }
  }, [applicant.aboutMe]);

  const closeModal = () => {
    handleCloseModal("about-me");
  };

  const updateAboutMeMutation = useMutation({
    mutationFn: (aboutMe: string) => applicantService.updateAboutMe(aboutMe),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as string;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleSaveAboutMe(data);
      setContent(data);
      handleCloseModal("about-me");
    },
  });

  const handleSave = () => {
    if (content === "<p ></p>") {
      closeModal();
      return;
    }
    if (content.length >= 2500) return;
    updateAboutMeMutation.mutate(content);
  };

  return (
    <Card
      title={t("About Me")}
      subtitle={
        applicant.aboutMe
          ? ""
          : t("Introduce your strengths and years of experience")
      }
      img={applicant.aboutMe ? "" : "/assets/svg/about_me_no_info.svg"}
      openModal={() => handleOpenModal("about-me")}
      edit={!!applicant.aboutMe}>
      {applicant.aboutMe && (
        <>
          <div className="devide"></div>
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(applicant.aboutMe),
            }}></div>
          <br />
          <br />
          <br />
          <div className="edit-button" onClick={closeModal}>
            <Edit cursor={"pointer"} color="#ed1b2f" />
          </div>
        </>
      )}
      <Modal
        isOpen={modal["about-me"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer>
          <div className="modal-head">
            <h2>{t("About Me")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <div className="placeholder-tips">
              <div className="icon">
                <Feather />
              </div>
              <div className="tips">
                <strong>{t("Tips")}: </strong>
                {t(
                  "Summarize your professional experience, highlight your skills and your strengths."
                )}
              </div>
            </div>
            <RichTextEditor content={content} setContent={setContent} />
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={updateAboutMeMutation.isPending}
              type="button"
              onClick={handleSave}>
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default AboutMe;
