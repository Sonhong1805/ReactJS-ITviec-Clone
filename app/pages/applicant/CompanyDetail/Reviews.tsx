import {
  HasReview,
  ReviewAbout,
  ReviewCard,
  ReviewList,
  ReviewRating,
} from "./styled";
import { Fragment } from "react/jsx-runtime";
import { useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  ChevronDown,
  Loader,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "feather-icons-react";
import { useNavigate } from "react-router";
import formatRating from "~/utils/formatRating";
import { useReviewStore } from "~/stores/reviewStore";
import ratingFields from "~/constants/ratingFields";

interface IProps {
  company: Company;
  data: Review[];
  isPending: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const Reviews = ({ company, data, isPending, ref }: IProps) => {
  const { t } = useTranslation(["search"]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(0);
  const navigate = useNavigate();
  const { pagination, isReviewing } = useReviewStore();

  const formattedDate = (date: string): string => {
    const convertDate = new Date(date);
    const monthNames = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = convertDate.getUTCMonth() + 1;
    const year = convertDate.getUTCFullYear();

    return `${t("months." + monthNames[month])} ${year}`;
  };

  return (
    <>
      {isReviewing ? (
        <HasReview>
          <div className="company-review-icon">
            <div className="toast-icon">
              <svg
                fill="none"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2058_2196)" id="state-success">
                  <path
                    clip-rule="evenodd"
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.5993 7.61499C16.0224 7.19192 16.0224 6.50599 15.5993 6.08293C15.1762 5.65986 14.4903 5.65986 14.0672 6.08293L8.53117 11.619L6.43262 9.52043C6.00955 9.09736 5.32362 9.09736 4.90055 9.52043C4.47749 9.94349 4.47749 10.6294 4.90055 11.0525L7.76514 13.9171C8.1882 14.3401 8.87413 14.3401 9.2972 13.9171L15.5993 7.61499Z"
                    fill="#0AB305"
                    fill-rule="evenodd"
                    id="Subtract"></path>
                </g>
                <defs>
                  <clipPath id="clip0_2058_2196">
                    <rect fill="white" height="20" width="20"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="company-review-message">
              <h3 className="company-review-message__title">
                {t("You have submitted a review for this company")}
              </h3>
              <div className="company-review-message__description">
                {t(
                  "The review will be published once it is approved and the company has received the required minimum number of reviews."
                )}
              </div>
              <div className="company-review-message__note">
                {t(
                  "Note: You can only submit a review to the same company once per year."
                )}
              </div>
            </div>
          </div>
        </HasReview>
      ) : (
        <ReviewRating>
          <figure>
            <img
              src="/assets/svg/robby-apply-success.svg"
              alt="robby apply success"
            />
          </figure>
          <div className="box">
            <div className="h3">
              {t("Please take a minute to share your work experience at")}{" "}
              {company.companyName}
            </div>
            <p></p>
            <div className="rating">
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
                          onChange={() => {
                            setSelectedRating(currentRating);
                            navigate(
                              `/review/${company.slug}?star=${currentRating}`
                            );
                          }}
                          hidden
                        />
                        <span
                          onMouseEnter={() => setHoverRating(currentRating)}
                          onMouseLeave={() => setHoverRating(null)}>
                          {currentRating <= (hoverRating || selectedRating) ? (
                            <Star fill="#ff9119" stroke="#ff9119" />
                          ) : (
                            <Star />
                          )}
                        </span>
                      </label>
                    </Fragment>
                  );
                })}
              </div>
              <div className="text">{t("Select star to start reviewing")}</div>
            </div>
            <div className="message">
              <span>
                <AlertCircle />
              </span>
              <span>
                {t("Your review for")} {company.companyName}{" "}
                {t("will be submitted anonymously.")}
              </span>
            </div>
          </div>
        </ReviewRating>
      )}
      {pagination.totalItems > 0 && (
        <ReviewList>
          <div className="heading">
            <h2>
              {pagination.totalItems} {t("employee reviews")}
            </h2>
          </div>
          {data.map((review, index) => (
            <ReviewCard
              key={index}
              ref={(div: HTMLDivElement) => {
                if (div) ref.current = div;
              }}>
              <div className="box">
                <div className="create-at">
                  {formattedDate(review.createdAt + "")}
                </div>
                <h3>{review.summary}</h3>
                <div className="rating">
                  <div className="box-star">
                    <div className="stars">{formatRating(review.rate)}</div>
                    <ul className="detail-rating">
                      {ratingFields.map((rate) => (
                        <li className="detail-rating__item" key={rate.value}>
                          <p className="detail-rating__label">
                            {t(rate.label)}
                          </p>
                          <div className="detail-rating__content">
                            <div className="detail-rating__stars">
                              {formatRating((review as any)[rate.value])}
                            </div>
                            <p className="detail-rating__score">
                              {(review as any)[rate.value]}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="number">{review.rate}</div>
                    <ChevronDown stroke="#121212" />
                  </div>
                  {review.isRecommend ? (
                    <div className="recommend">
                      <ThumbsUp />
                      {t("Recommend")}
                    </div>
                  ) : (
                    <div className="unrecommend">
                      <ThumbsDown />
                      {t("Doesn't recommend")}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`feedback ${
                  review.status === "Hide" ? "hidden" : ""
                }`}
                style={{ paddingBottom: "0.8rem" }}>
                <h4>{t("What I liked:")}</h4>
                <p>{review.experiences}</p>
              </div>
              <div
                className={`feedback ${
                  review.status === "Hide" ? "hidden" : ""
                }`}>
                <h4>{t("Suggestions for improvement:")}</h4>
                <p>{review.suggestion}</p>
              </div>
            </ReviewCard>
          ))}
          <p style={{ paddingTop: "3.2rem", textAlign: "center" }}>
            {isPending && <Loader className="loader" />}
          </p>
        </ReviewList>
      )}
      <ReviewAbout>
        <div className="about">
          <div className="h4">{t("About the Company Review on ITviec")}</div>
          <p>
            {t(
              "ITviec allows current and former employees to review the working environment, company culture, and management quality. These reviews include both ratings and detailed comments, helping users easily compare and choose a company that best suits their needs and preferences."
            )}
          </p>
        </div>
        <img src={"/assets/svg/good-feedback.svg"} alt="good feedback" />
      </ReviewAbout>
    </>
  );
};

export default Reviews;
