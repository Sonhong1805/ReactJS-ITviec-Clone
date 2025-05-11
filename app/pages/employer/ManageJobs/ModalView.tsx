import Modal from "react-modal";
import { useModalStore } from "~/stores/modalStore";
import { customStyles, ModalContainer, ModalViewWrapper } from "./styled";
import { Clock, MapPin, X } from "feather-icons-react";
import { Link } from "react-router";
import formatSalary from "~/utils/formatSalary";
import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import { useTranslation } from "react-i18next";
import IconWorkingModel from "~/components/Icons/IconWorkingModel";
import getPostedTime from "~/utils/getPostedTime";
import {
  PreviewJobOverview,
  PreviewJobHeader,
  PreviewJobBody,
  PreviewJobContainer,
  BorderDash,
  PreviewJobReasons,
  PreviewJobCompany,
} from "~/components/PreviewJob/styled";
import DOMPurify from "dompurify";

interface IProps {
  selectedJob: CompanyJob | null;
  onClose: () => void;
}

const ModalView = ({ selectedJob, onClose }: IProps) => {
  const { t } = useTranslation(["search"]);
  const { modal } = useModalStore();

  return (
    <Modal
      isOpen={modal["job-view"]}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}>
      <ModalContainer>
        <div className="modal-head">
          <h2>{t("Job details")}</h2>
          <X onClick={onClose} />
        </div>
        <div className="modal-body">
          <ModalViewWrapper>
            <PreviewJobContainer>
              <PreviewJobCompany className="preview__job-company">
                <div className="job-info">
                  <div className="job-name">
                    <Link to={``} className="job-title">
                      <h2>{selectedJob?.title}</h2>
                    </Link>
                  </div>
                  <div className="job-salary">
                    <span className="salary-show">
                      <IconCircleDollarSign />
                      {selectedJob &&
                        formatSalary(+selectedJob?.minSalary)} -{" "}
                      {selectedJob && formatSalary(+selectedJob?.maxSalary)}{" "}
                      {selectedJob?.currencySalary}
                    </span>
                  </div>
                </div>
              </PreviewJobCompany>
              <hr style={{ marginBlock: "2.4rem" }} />
              <PreviewJobOverview className="preview__job-overview">
                <div className="overview-item">
                  <MapPin />
                  <div>
                    <span>
                      {selectedJob &&
                        selectedJob?.address &&
                        selectedJob.address + ", "}
                      {selectedJob &&
                        t(selectedJob?.location, { ns: "option" })}
                    </span>
                  </div>
                </div>
                <div className="overview-item">
                  <IconWorkingModel />
                  <span>
                    {selectedJob &&
                      t(selectedJob?.workingModel, { ns: "option" })}
                  </span>
                </div>
                <div className="overview-item">
                  <Clock />
                  <span>
                    {selectedJob &&
                      `${t("Posted")} ${getPostedTime(
                        t,
                        selectedJob?.startDate
                      )}`}
                  </span>
                </div>
                <div className="overview-item">
                  <span>{t("Skills")}:</span>
                  <ul>
                    {selectedJob?.skills?.map((skill) => (
                      <li key={skill.id}>
                        <Link to={""}>{skill.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </PreviewJobOverview>
              <BorderDash></BorderDash>
              <PreviewJobReasons>
                <h2>{t("Job description")}</h2>
                {selectedJob && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(selectedJob?.description),
                    }}></div>
                )}
              </PreviewJobReasons>
              <BorderDash></BorderDash>
              <PreviewJobReasons>
                <h2>{t("Your skills and experience")}</h2>
                {selectedJob && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(selectedJob?.requirement),
                    }}></div>
                )}
              </PreviewJobReasons>
              <BorderDash></BorderDash>
              <PreviewJobReasons>
                <h2>{t("Why you'll love working here")}</h2>
                {selectedJob && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(selectedJob?.reason),
                    }}></div>
                )}
              </PreviewJobReasons>
              <hr style={{ marginBlock: "2.4rem" }} />
            </PreviewJobContainer>
          </ModalViewWrapper>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ModalView;
