import React from "react";
import { CardWrapper } from "./styled";
import { PlusCircle } from "feather-icons-react";
interface IProps {
  title: string;
  subtitle: string;
  img: string;
  children: React.ReactNode;
  openModal: () => void;
}
const Card = ({ title, subtitle, img, children, openModal }: IProps) => {
  return (
    <CardWrapper>
      <div className="content">
        <div className="title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <figure>
          <img src={img} alt={title} />
        </figure>
        <div className="add-button" onClick={openModal}>
          <PlusCircle cursor={"pointer"} color="#ed1b2f" />
        </div>
      </div>
      {children}
    </CardWrapper>
  );
};

export default Card;
