import {
  customStyles,
  ManageReviewsTable,
  ManageReviewsWrapper,
  ModalContainer,
  ReviewRadio,
} from "./styled";
import { Fragment, useState } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import rateDescription from "~/constants/rateDescription";
import InputFloating from "~/components/InputFloating";
import { useForm } from "react-hook-form";
import RatingItem from "~/components/RatingItem";
import { Edit, Star, Trash2, X } from "feather-icons-react";

const ManageReviews = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const { register } = useForm();

  return (
    <ManageReviewsWrapper>
      <div className="heading">
        <h2>Quản lý đánh giá</h2>
      </div>
      <ManageReviewsTable>
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Đánh giá</th>
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
                  <p>
                    Môi trường thân thiện, có nhiều cơ hội để học hỏi và phát
                    triển và vui chơi
                  </p>
                </td>
                <td>
                  <div className="stars">
                    <Star fill="#ff9119" stroke="#ff9119" />
                    <Star fill="#ff9119" stroke="#ff9119" />
                    <Star fill="#ff9119" stroke="#ff9119" />
                    <Star />
                    <Star />
                  </div>
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
                  <div className="status success">Hiển thị</div>
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
      </ManageReviewsTable>
      {/* <Pagination /> */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Thông tin bài đánh giá</h2>
            <X onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <div className="form-group" style={{ display: "flex" }}>
              <h3 style={{ marginBottom: "0.8rem" }}>
                {t("Overall rating")} <abbr>*</abbr>
              </h3>
              <div className="stars">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <Fragment key={currentRating}>
                      <label htmlFor={`rate-${currentRating}`}>
                        <input
                          type="radio"
                          disabled
                          readOnly
                          id={`rate-${currentRating}`}
                          name="rate"
                          value={currentRating}
                          onChange={() => setSelectedRating(currentRating)}
                          hidden
                        />
                        <span
                          onMouseEnter={() => setHoverRating(currentRating)}
                          onMouseLeave={() => setHoverRating(0)}>
                          {currentRating <= (hoverRating || selectedRating) ? (
                            <Star
                              fill="#ff9119"
                              stroke="#ff9119"
                              onClick={() => {
                                setSelectedRating(0);
                                setHoverRating(0);
                              }}
                            />
                          ) : (
                            <Star />
                          )}
                        </span>
                      </label>
                    </Fragment>
                  );
                })}
                <span className="description">
                  {t(rateDescription[hoverRating])}
                </span>
              </div>
            </div>
            <InputFloating
              name="summary"
              label={t("Summary")}
              required={true}
            />
            <div className="form-group">
              <h3>
                {t("How do you feel about the overtime policy?")}
                <abbr>*</abbr>
              </h3>
              <div>
                <ReviewRadio htmlFor="satisfied">
                  <input
                    type="radio"
                    disabled
                    readOnly
                    id="satisfied"
                    checked={true}
                    name="overtime-recommend"
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("Satisfied")}</span>
                  </div>
                </ReviewRadio>
                <ReviewRadio
                  htmlFor="unsatisfied"
                  style={{ marginTop: "1.6rem" }}>
                  <input
                    type="radio"
                    disabled
                    readOnly
                    id="unsatisfied"
                    checked={false}
                    name="overtime-recommend"
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("Unsatisfied")}</span>
                  </div>
                </ReviewRadio>
                <div className="normal-text" style={{ marginTop: "1.2rem" }}>
                  Lý do:{" "}
                </div>
              </div>
            </div>
            <div className="form-group">
              <h3>
                {t("What makes you love working here")}
                <abbr>*</abbr>
              </h3>
              <div className="normal-text">Cải thiện: </div>
            </div>
            <div className="form-group">
              <h3>
                {t("Suggestion for improvement")} <abbr>*</abbr>
              </h3>
              <div className="normal-text">Lý do: </div>
            </div>
            <div className="form-group">
              <h3>
                {t("Rating detail")} <abbr>*</abbr>
              </h3>
              <div className="rating-detail">
                {/* <RatingItem label={t("Salary & benefits")} />
                <RatingItem label={t("Training & learning")} />
                <RatingItem label={t("Management cares about me")} />
                <RatingItem label={t("Culture & fun")} />
                <RatingItem label={t("Office & workspace")} /> */}
              </div>
            </div>
            <div className="form-group">
              <h3>
                {t("Do you want to recommend this company to your friends?")}
                <abbr>*</abbr>
              </h3>
              <ReviewRadio htmlFor="satisfied">
                <input
                  type="radio"
                  disabled
                  readOnly
                  id="satisfied"
                  checked={true}
                  name="overtime-recommend"
                />
                <span></span>
                <div className="text">
                  <span>{t("Yes")}</span>
                </div>
              </ReviewRadio>
              <ReviewRadio htmlFor="satisfied" style={{ marginTop: "1.6rem" }}>
                <input
                  type="radio"
                  disabled
                  readOnly
                  id="satisfied"
                  checked={false}
                  name="overtime-recommend"
                />
                <span></span>
                <div className="text">
                  <span>{t("No")}</span>
                </div>
              </ReviewRadio>
            </div>
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
    </ManageReviewsWrapper>
  );
};

export default ManageReviews;
