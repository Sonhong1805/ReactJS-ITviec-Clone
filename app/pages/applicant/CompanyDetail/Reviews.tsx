import { FiAlertCircle, FiStar, FiThumbsUp } from "react-icons/fi";
import { ReviewAbout, ReviewCard, ReviewList, ReviewRating } from "./styled";
import IconStarFill from "~/components/Icon/IconStarFill";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation(["search"]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(0);

  return (
    <>
      <ReviewRating>
        <figure>
          <img
            src="/assets/svg/robby-apply-success.svg"
            alt="robby apply success"
          />
        </figure>
        <div className="box">
          <div className="h3">
            {t("Please take a minute to share your work experience at")} CJ
            OLIVENETWORKS VINA CO., LTD
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
                        onChange={() => setSelectedRating(currentRating)}
                        hidden
                      />
                      <span
                        onMouseEnter={() => setHoverRating(currentRating)}
                        onMouseLeave={() => setHoverRating(null)}>
                        {currentRating <= (hoverRating || selectedRating) ? (
                          <IconStarFill />
                        ) : (
                          <FiStar />
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
              <FiAlertCircle />
            </span>
            <span>
              {t("Your review for")} CJ OLIVENETWORKS VINA CO., LTD{" "}
              {t("will be submitted anonymously.")}
            </span>
          </div>
        </div>
      </ReviewRating>
      <ReviewList>
        <div className="heading">
          <h2>6 {t("employee reviews")}</h2>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewCard key={index}>
            <div className="box">
              <div className="create-at">Tháng Sáu 2022</div>
              <h3>Công ty tốt, công việc ổn định</h3>
              <div className="rating">
                <div className="box-star">
                  <div className="stars">
                    <IconStarFill />
                    <IconStarFill />
                    <IconStarFill />
                    <IconStarFill />
                    <FiStar />
                  </div>
                  <div className="number">4</div>
                </div>
                <div className="recommend">
                  <FiThumbsUp />
                  {t("Recommend")}
                </div>
              </div>
            </div>
            <div className="feedback" style={{ paddingBottom: "0.8rem" }}>
              <h4>{t("What I liked:")}</h4>
              <p>- Công ty nước ngoài, được cho học Tiếng Anh.</p>
            </div>
            <div className="feedback">
              <h4>{t("Suggestions for improvement:")}</h4>
              <p>- Công ty nước ngoài, được cho học Tiếng Anh.</p>
            </div>
          </ReviewCard>
        ))}
        {/* <p style={{ paddingTop: "3.2rem" }}></p> */}
        <Pagination />
      </ReviewList>
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
