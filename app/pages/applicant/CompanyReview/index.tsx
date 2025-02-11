import { Fragment, useState } from "react";
import {
  AlertError,
  ButtonSubmit,
  customStyles,
  ModalForm,
  ReviewBranding,
  ReviewContainer,
  ReviewContent,
  ReviewForm,
  ReviewLeft,
  ReviewRadio,
  ReviewRight,
  ReviewWrapper,
} from "./styled";
import { FiChevronLeft, FiStar } from "react-icons/fi";
import SwitchLanguage from "~/components/SwitchLanguage";
import { useTranslation } from "react-i18next";
import LOGO from "/assets/images/logo.png";
import IconStarFill from "~/components/Icon/IconStarFill";
import rateDescription from "~/constants/rateDescription";
import InputFloating from "~/components/InputFloating";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingItem from "./RatingItem";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const CompanyReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(["search", "apply"]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedOvertime, setSelectedOvertime] = useState<
    "Satisfied" | "Unsatisfied" | null
  >(null);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const schema = z.object({
    summary: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(10, { message: "From 10 to 80 characters" })
      .max(80, { message: "From 10 to 80 characters" }),
    reason: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 140 ${t("characters")}`,
      })
      .max(140, {
        message: `${t("Limit from")} 50 ${t("to")} 140 ${t("characters")}`,
      }),
    experiences: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      })
      .max(10000, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      }),
    suggestion: z
      .string()
      .nonempty({ message: t("Please input content to this field") })
      .min(50, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      })
      .max(10000, {
        message: `${t("Limit from")} 50 ${t("to")} 100000 ${t("characters")}`,
      }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IReview>({
    defaultValues: {
      summary: "",
      reason: "",
      experiences: "",
      suggestion: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IReview> = async (data: IReview) => {
    console.log(data);
  };

  const isValidSummary = watch("summary") !== "" ? "success" : "";
  const isValidReason = watch("reason") !== "" ? "success" : "";
  const isValidExperiences = watch("experiences") !== "" ? "success" : "";
  const isValidSuggestion = watch("suggestion") !== "" ? "success" : "";

  return (
    <ReviewWrapper>
      <ReviewContainer>
        <ReviewBranding>
          <button className="back" onClick={openModal}>
            <FiChevronLeft />
            <span>{t("Back", { ns: "apply" })}</span>
          </button>
          <img src={LOGO} alt="logo itviec" />
          <SwitchLanguage />
        </ReviewBranding>
        <ReviewContent>
          <ReviewLeft className="col-8">
            <ReviewForm onSubmit={handleSubmit(onSubmit)}>
              <h2>{t("Review")} CUBICSTACK SOLUTIONS</h2>
              <p>
                {t(
                  "It only takes you 1 minute to complete this review form. Your opinion will be very helpful for the Developer community who are looking for a job."
                )}
              </p>
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
                            id={`rate-${currentRating}`}
                            name="rate"
                            value={currentRating}
                            onChange={() => setSelectedRating(currentRating)}
                            hidden
                          />
                          <span
                            onMouseEnter={() => setHoverRating(currentRating)}
                            onMouseLeave={() => setHoverRating(0)}>
                            {currentRating <=
                            (hoverRating || selectedRating) ? (
                              <IconStarFill
                                onClick={() => {
                                  setSelectedRating(0);
                                  setHoverRating(0);
                                }}
                              />
                            ) : (
                              <FiStar />
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
                register={register}
                label={t("Summary")}
                required={true}
                error={errors.summary && t(errors.summary.message + "")}
                className={errors.summary?.message ? "error" : isValidSummary}
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
                      id="satisfied"
                      checked={selectedOvertime === "Satisfied"}
                      name="overtime-recommend"
                      onChange={() => setSelectedOvertime("Satisfied")}
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
                      id="unsatisfied"
                      checked={selectedOvertime === "Unsatisfied"}
                      name="overtime-recommend"
                      onChange={() => setSelectedOvertime("Unsatisfied")}
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("Unsatisfied")}</span>
                    </div>
                  </ReviewRadio>
                  <textarea
                    id="reason"
                    {...register("reason")}
                    style={{ marginTop: "2.4rem" }}
                    className={errors.reason?.message ? "error" : isValidReason}
                    placeholder={t("Input your reason")}></textarea>
                  <AlertError>{errors.reason?.message}</AlertError>
                  <p className="characters">
                    {t("Limit from")} 50 {t("to")} 140 {t("characters")}.
                  </p>
                </div>
              </div>
              <div className="form-group">
                <h3>
                  {t("What makes you love working here")}
                  <abbr>*</abbr>
                </h3>
                <textarea
                  id="experiences"
                  {...register("experiences")}
                  className={
                    errors.experiences?.message ? "error" : isValidExperiences
                  }
                  placeholder={t("Input your experiences")}></textarea>
                <AlertError>{errors.experiences?.message}</AlertError>
                <p className="characters">
                  {t("Limit from")} 50 {t("to")} 10000 {t("characters")}
                </p>
              </div>
              <div className="form-group">
                <h3>
                  {t("Suggestion for improvement")} <abbr>*</abbr>
                </h3>
                <textarea
                  id="suggestion"
                  {...register("suggestion")}
                  className={
                    errors.suggestion?.message ? "error" : isValidSuggestion
                  }
                  placeholder={t("Input your suggestion")}></textarea>
                <AlertError>{errors.suggestion?.message}</AlertError>
                <p className="characters">
                  {t("Limit from")} 50 {t("to")} 10000 {t("characters")}
                </p>
              </div>
              <div className="form-group">
                <h3>
                  {t("Rating detail")} <abbr>*</abbr>
                </h3>
                <div className="rating-detail">
                  <RatingItem label={t("Salary & benefits")} />
                  <RatingItem label={t("Training & learning")} />
                  <RatingItem label={t("Management cares about me")} />
                  <RatingItem label={t("Culture & fun")} />
                  <RatingItem label={t("Office & workspace")} />
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
                    id="satisfied"
                    checked={selectedOvertime === "Satisfied"}
                    name="overtime-recommend"
                    onChange={() => setSelectedOvertime("Satisfied")}
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("Yes")}</span>
                  </div>
                </ReviewRadio>
                <ReviewRadio
                  htmlFor="satisfied"
                  style={{ marginTop: "1.6rem" }}>
                  <input
                    type="radio"
                    id="satisfied"
                    checked={selectedOvertime === "Satisfied"}
                    name="overtime-recommend"
                    onChange={() => setSelectedOvertime("Satisfied")}
                  />
                  <span></span>
                  <div className="text">
                    <span>{t("No")}</span>
                  </div>
                </ReviewRadio>
              </div>
              <ButtonSubmit>{t("Send Review")}</ButtonSubmit>
            </ReviewForm>
          </ReviewLeft>
          <ReviewRight className="col-4">
            <h2>{t("Review Guidelines & Conditions")}</h2>
            <div>
              <p>
                {t(
                  "In order for a review to be displayed on the website, it must adhere to the Guidelines & Conditions for reviews."
                )}
              </p>
              <p>{t("Please ensure that:")}</p>
              <ul>
                <li>{t("Do not use offensive or derogatory language")}</li>
                <li>{t("Do not provide personal information")}</li>
                <li>
                  {t(
                    "Do not provide confidential or proprietary business information"
                  )}
                </li>
              </ul>
              <p>
                {t(
                  "Thank you for providing the most honest reviews. For more detailed information on the Guidelines & Conditions for reviews, please visit the link provided."
                )}
              </p>
            </div>
          </ReviewRight>
        </ReviewContent>
      </ReviewContainer>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <ModalForm>
          <div className="form-group">
            <h2>{t("Quit reviewing")}</h2>
            <IoCloseOutline onClick={closeModal} />
          </div>
          <p>
            {t(
              "Changes you made so far will not be saved. Are you sure you want to quit this page?",
              { ns: "apply" }
            )}
          </p>
          <div className="button-group">
            <button onClick={closeModal}>{t("Continue reviewing")}</button>
            <button onClick={() => navigate(-1)}>
              {t("Confirm", { ns: "apply" })}
            </button>
          </div>
        </ModalForm>
      </Modal>
    </ReviewWrapper>
  );
};

export default CompanyReview;
