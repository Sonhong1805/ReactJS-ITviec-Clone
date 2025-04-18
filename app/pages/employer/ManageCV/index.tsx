import {
  customStyles,
  CVContent,
  ManageCVTable,
  ManageCVWrapper,
  ModalContainer,
} from "./styled";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Edit, Trash2 } from "feather-icons-react";
import IconCircleDollarSign from "~/components/Icon/IconCircleDollarSign";
const ManageCV = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ManageCVWrapper>
      <div className="heading">
        <h2>Quản lý CV</h2>
      </div>
      <ManageCVTable>
        <table>
          <thead>
            <tr>
              <th>Tên việc làm</th>
              <th>Tên ứng viên</th>
              <th>Email</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <p>Singapore Java Fullstack Developer (Spring) Up to $3000</p>
                  <div className="salary">
                    <IconCircleDollarSign />
                    1,000 - 2,000 USD
                  </div>
                </td>
                <td>
                  <p>Sophia Miller</p>
                </td>
                <td>
                  <p>sophiamiller@email.com</p>
                </td>
                <td style={{ width: "20%" }}>
                  <div className="time">
                    <p>
                      <span className="col-5">Ngày gửi:</span>
                      <span className="col-7">03-01-2024</span>{" "}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="status success">Chờ duyệt</div>
                </td>
                <td>
                  <div className="icons">
                    <Edit onClick={() => setIsOpen(true)} />
                    <Trash2 />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ManageCVTable>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Thông tin người ứng tuyển</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <CVContent>
              <h3>CV ứng viên</h3>
              <div className="cv-link">
                <figure>
                  <img
                    src={"/assets/svg/uploaded-resume.svg"}
                    alt="uploaded resume"
                  />
                </figure>
                <div className="profile-link">
                  <Link to={""} className="filename">
                    NGUYEN-HONG-SON-CV.pdf
                  </Link>
                  <p>Last uploaded: 12/02/2025</p>
                </div>
              </div>
              <div className="cv-info">
                <h3>Personal information</h3>
                <div className="list">
                  <div className="row">
                    <div className=" col-3">Full name</div>
                    <h4 className=" col-8">Nguyen Hong Son</h4>
                  </div>
                  <div className="row">
                    <div className=" col-3">Phone number</div>
                    <h4 className=" col-8">0327842451</h4>
                  </div>
                  <div className="row">
                    <div className=" col-3">Preferred work location</div>
                    <h4 className=" col-8">Hà Nội</h4>
                  </div>
                </div>
              </div>
              <div className="cv-info">
                <h3>Cover Letter</h3>
                <div className="cover-letter">abc</div>
              </div>
            </CVContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}>
              {t("Cancel")}
            </button>
            <button className="save" type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
      {/* <Pagination /> */}
    </ManageCVWrapper>
  );
};

export default ManageCV;
