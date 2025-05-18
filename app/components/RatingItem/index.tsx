import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import rateDescription from "~/constants/rateDescription";
import { RatingItemWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import { Star } from "feather-icons-react";
import ErrorMessage from "../ErrorMessage";

interface IProps {
  label: string;
  register?: any;
  name?: string;
  setValue?: (value: number) => void;
  error?: string;
  defaultValue?: number;
  disabled?: boolean;
}
const RatingItem = ({
  label,
  register,
  name,
  setValue,
  error,
  defaultValue = 0,
  disabled = false,
}: IProps) => {
  const { t } = useTranslation(["search"]);
  const [selectedRating, setSelectedRating] = useState<number>(defaultValue);
  const [hoverRating, setHoverRating] = useState<number>(defaultValue);

  return (
    <RatingItemWrapper>
      <div className="rating-name col-4">{label}</div>
      <div className="star-container">
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <Fragment key={currentRating}>
                <label htmlFor={`${name}-${currentRating}`}>
                  <input
                    type="radio"
                    id={`${name}-${currentRating}`}
                    {...(register && register(name))}
                    value={currentRating}
                    onChange={() => {
                      if (disabled) return;
                      setSelectedRating(currentRating);
                      if (setValue) setValue(currentRating);
                    }}
                    hidden
                    disabled={disabled}
                  />
                  <span
                    onMouseEnter={() => {
                      if (!disabled) setHoverRating(currentRating);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setHoverRating(0);
                    }}>
                    {currentRating <= (hoverRating || selectedRating) ? (
                      <Star
                        fill="#ff9119"
                        stroke="#ff9119"
                        strokeWidth={1.5}
                        onClick={() => {
                          if (!disabled) {
                            setSelectedRating(0);
                            setHoverRating(0);
                          }
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
          <span className="description">{t(rateDescription[hoverRating])}</span>
        </div>
        {error && (
          <ErrorMessage message={error} style={{ marginLeft: "1.6rem" }} />
        )}
      </div>
    </RatingItemWrapper>
  );
};

export default RatingItem;
