import { type HTMLAttributes } from "react";
import { ErrorMessageWrapper } from "./styled";

type IProps = {
  message?: string;
} & HTMLAttributes<HTMLDivElement>;

const ErrorMessage = ({ message, ...props }: IProps) => {
  return (
    message && <ErrorMessageWrapper {...props}>{message}</ErrorMessageWrapper>
  );
};

export default ErrorMessage;
