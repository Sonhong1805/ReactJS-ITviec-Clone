import { Star } from "feather-icons-react";

const formatRating = (rating: number) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star fill="#ff9119" stroke="#ff9119" />);
  }
  for (let i = 5; i > rating; i--) {
    stars.push(<Star />);
  }
  return stars;
};

export default formatRating;
