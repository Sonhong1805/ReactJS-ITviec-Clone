import { Star } from "feather-icons-react";
import { Fragment } from "react/jsx-runtime";

const formatRating = (rating: number) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star fill="#ff9119" stroke="#ff9119" />);
  }
  for (let i = 5; i > rating; i--) {
    stars.push(<Star color="#dedede" />);
  }
  return stars.map((star, index) => <Fragment key={index}>{star}</Fragment>);
};

export default formatRating;
