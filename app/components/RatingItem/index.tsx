import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { Fragment } from "react/jsx-runtime";
import IconStarFill from "~/components/Icon/IconStarFill";
import rateDescription from "~/constants/rateDescription";
import { RatingItemWrapper } from "./styled";
import { useTranslation } from "react-i18next";

interface IProps {
  label: string;
}
const RatingItem = ({ label }: IProps) => {
  const { t } = useTranslation(["search"]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  return (
    <RatingItemWrapper>
      <div className="rating-name col-4">{label}</div>
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
                  {currentRating <= (hoverRating || selectedRating) ? (
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
        <span className="description">{t(rateDescription[hoverRating])}</span>
      </div>
    </RatingItemWrapper>
  );
};

export default RatingItem;
