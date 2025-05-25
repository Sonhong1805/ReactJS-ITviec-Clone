import { Fragment, useCallback, useState } from "react";
import {
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
import SwitchLanguage from "~/components/SwitchLanguage";
import { useTranslation } from "react-i18next";
import LOGO from "/assets/images/logo.png";
import rateDescription from "~/constants/rateDescription";
import InputFloating from "~/components/InputFloating";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { useNavigate, useParams, useSearchParams } from "react-router";
import RatingItem from "~/components/RatingItem";
import { ChevronLeft, Star, X } from "feather-icons-react";
import { schema } from "./schema";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateReviewPayload } from "~/services/companyService";
import companyService from "~/services/companyService";
import showToast from "~/utils/showToast";
import Loading from "~/components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReviewStore } from "~/stores/reviewStore";
import useValidation from "~/hooks/useValidation";
import ErrorMessage from "~/components/ErrorMessage";

const CompanyReview = () => {
  let { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(["search"]);
  const [searchParams] = useSearchParams();
  const star = searchParams.get("star");
  const [selectedRating, setSelectedRating] = useState<number>(
    star ? +star : 0
  );
  const [hoverRating, setHoverRating] = useState<number>(star ? +star : 0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: company, isPending } = useCompanyQuery(slug + "");
  const { handleReviewSuccess } = useReviewStore();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<Review>({
    defaultValues: {
      rate: star ? +star : 0,
      overtimePolicySatisfaction: "",
      summary: "",
      reason: "",
      experiences: "",
      suggestion: "",
      salaryBenefits: 0,
      cultureFun: 0,
      managementCare: 0,
      officeWorkspace: 0,
      trainingLearning: 0,
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });

  const reviewCompanyMutation = useMutation({
    mutationFn: ({ id, body }: CreateReviewPayload) =>
      companyService.createReview({ id, body }),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as Review;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      handleReviewSuccess(true);
      navigate(`/review/success/${slug + ""}`, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["company", slug + ""] });
    },
  });

  const onSubmit: SubmitHandler<Review> = async (data: Review) => {
    if (company?.review) {
      showToast("error", "Bạn đã đánh giá công ty này");
      return;
    }
    if (!company) return;
    reviewCompanyMutation.mutate({ id: company?.id, body: data });
  };

  const isValidSummary = useValidation(watch("summary"));
  const isValidReason = useValidation(watch("reason"));
  const isValidExperiences = useValidation(watch("experiences"));
  const isValidSuggestion = useValidation(watch("suggestion"));

  return (
    <ReviewWrapper>
      {reviewCompanyMutation.isPending && <Loading />}
      <ReviewContainer>
        <ReviewBranding>
          <button className="back" onClick={openModal}>
            <ChevronLeft />
            <span>{t("Back", { ns: "apply" })}</span>
          </button>
          <img src={LOGO} alt="logo itviec" />
          <SwitchLanguage />
        </ReviewBranding>
        <ReviewContent>
          {isPending ? (
            <div className="col-8" style={{ display: "block" }}>
              <Skeleton height={543} borderRadius={8} />
            </div>
          ) : (
            <ReviewLeft className="col-8">
              <ReviewForm onSubmit={handleSubmit(onSubmit)}>
                <h2>
                  {t("Review")} {company?.companyName}
                </h2>
                <p>
                  {t(
                    "It only takes you 1 minute to complete this review form. Your opinion will be very helpful for the Developer community who are looking for a job."
                  )}
                </p>
                <div className="form-group" style={{ display: "flex" }}>
                  <h3 style={{ marginBottom: "0.8rem" }}>
                    {t("Overall rating")} <abbr>*</abbr>
                  </h3>
                  <div>
                    <div className="stars">
                      {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                          <Fragment key={currentRating}>
                            <label htmlFor={`rate-${currentRating}`}>
                              <input
                                type="radio"
                                id={`rate-${currentRating}`}
                                {...register("rate")}
                                value={currentRating}
                                onChange={() => {
                                  setSelectedRating(currentRating);
                                  setValue("rate", currentRating);
                                }}
                                hidden
                              />
                              <span
                                onMouseEnter={() =>
                                  setHoverRating(currentRating)
                                }
                                onMouseLeave={() => setHoverRating(0)}>
                                {currentRating <=
                                (hoverRating || selectedRating) ? (
                                  <Star
                                    fill="#ff9119"
                                    stroke="#ff9119"
                                    strokeWidth={1.5}
                                    onClick={() => {
                                      setSelectedRating(0);
                                      setHoverRating(0);
                                    }}
                                  />
                                ) : (
                                  <Star strokeWidth={1.5} />
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
                    <ErrorMessage
                      style={{ marginLeft: "6rem" }}
                      message={errors.rate?.message}
                    />
                  </div>
                </div>
                <InputFloating
                  name="summary"
                  value={watch("summary")}
                  label={t("Summary")}
                  required={true}
                  error={errors.summary && t(errors.summary?.message + "")}
                  className={errors.summary?.message ? "error" : isValidSummary}
                  onSetValue={useCallback(
                    (value: string) => setValue("summary", value),
                    []
                  )}
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
                        checked={
                          watch("overtimePolicySatisfaction") === "satisfied"
                        }
                        value={watch("overtimePolicySatisfaction")}
                        onChange={() =>
                          setValue("overtimePolicySatisfaction", "satisfied")
                        }
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
                        checked={
                          watch("overtimePolicySatisfaction") === "unsatisfied"
                        }
                        value={watch("overtimePolicySatisfaction")}
                        onChange={() =>
                          setValue("overtimePolicySatisfaction", "unsatisfied")
                        }
                      />
                      <span></span>
                      <div className="text">
                        <span>{t("Unsatisfied")}</span>
                      </div>
                    </ReviewRadio>
                    <ErrorMessage
                      message={errors.overtimePolicySatisfaction?.message}
                    />
                    <textarea
                      id="reason"
                      {...register("reason")}
                      style={{ marginTop: "2.4rem" }}
                      className={
                        errors.reason?.message ? "error" : isValidReason
                      }
                      placeholder={t("Input your reason")}></textarea>
                    <ErrorMessage message={errors.reason?.message} />
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
                  <ErrorMessage message={errors.experiences?.message} />
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
                  <ErrorMessage message={errors.suggestion?.message} />
                  <p className="characters">
                    {t("Limit from")} 50 {t("to")} 10000 {t("characters")}
                  </p>
                </div>
                <div className="form-group">
                  <h3>
                    {t("Rating detail")} <abbr>*</abbr>
                  </h3>
                  <div className="rating-detail">
                    <RatingItem
                      label={t("Salary & benefits")}
                      register={register}
                      name="salaryBenefits"
                      setValue={(value: number) =>
                        setValue("salaryBenefits", value)
                      }
                      error={errors.salaryBenefits?.message}
                    />
                    <RatingItem
                      label={t("Training & learning")}
                      register={register}
                      name="trainingLearning"
                      setValue={(value: number) =>
                        setValue("trainingLearning", value)
                      }
                      error={errors.trainingLearning?.message}
                    />
                    <RatingItem
                      label={t("Management cares about me")}
                      register={register}
                      name="managementCare"
                      setValue={(value: number) =>
                        setValue("managementCare", value)
                      }
                      error={errors.managementCare?.message}
                    />
                    <RatingItem
                      label={t("Culture & fun")}
                      register={register}
                      name="cultureFun"
                      setValue={(value: number) =>
                        setValue("cultureFun", value)
                      }
                      error={errors.cultureFun?.message}
                    />
                    <RatingItem
                      label={t("Office & workspace")}
                      register={register}
                      name="officeWorkspace"
                      setValue={(value: number) =>
                        setValue("officeWorkspace", value)
                      }
                      error={errors.officeWorkspace?.message}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <h3>
                    {t(
                      "Do you want to recommend this company to your friends?"
                    )}
                    <abbr>*</abbr>
                  </h3>
                  <ReviewRadio htmlFor="yes">
                    <input
                      type="radio"
                      id="yes"
                      checked={watch("isRecommend") === true}
                      onChange={() => setValue("isRecommend", true)}
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("Yes")}</span>
                    </div>
                  </ReviewRadio>
                  <ReviewRadio htmlFor="no" style={{ marginTop: "1.6rem" }}>
                    <input
                      type="radio"
                      id="no"
                      checked={watch("isRecommend") === false}
                      onChange={() => setValue("isRecommend", false)}
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("No")}</span>
                    </div>
                  </ReviewRadio>
                  <ErrorMessage message={errors.isRecommend?.message} />
                </div>
                <ButtonSubmit>{t("Send Review")}</ButtonSubmit>
              </ReviewForm>
            </ReviewLeft>
          )}
          {isPending ? (
            <div className="col-4" style={{ display: "block" }}>
              <Skeleton height={543} borderRadius={8} />
            </div>
          ) : (
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
          )}
        </ReviewContent>
      </ReviewContainer>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <ModalForm>
          <div className="form-group">
            <h2>{t("Quit reviewing")}</h2>
            <X onClick={closeModal} />
          </div>
          <p>
            {t(
              "Changes you made so far will not be saved. Are you sure you want to quit this page?",
              { ns: "apply" }
            )}
          </p>
          <div className="button-group">
            <button onClick={closeModal}>{t("Continue reviewing")}</button>
            <button onClick={() => navigate(`/company/${slug + ""}`)}>
              {t("Confirm", { ns: "apply" })}
            </button>
          </div>
        </ModalForm>
      </Modal>
    </ReviewWrapper>
  );
};

export default CompanyReview;
