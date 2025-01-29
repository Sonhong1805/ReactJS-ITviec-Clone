import "./styled";
import { AlertError, InputFloatingWrapper, InputWrapper } from "./styled";

interface IProps {
  id: string;
  label: string;
  required?: boolean;
  message?: string;
}

const InputFloating = ({ id, label, required = false, message }: IProps) => {
  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper>
        <input
          type={id === "email" ? "email" : "text"}
          id={id}
          placeholder={" "}
        />
        <label htmlFor={id}>
          {label} {required && <abbr>*</abbr>}
        </label>
      </InputFloatingWrapper>
      {required && <AlertError>*{message}</AlertError>}
    </InputWrapper>
  );
};

export default InputFloating;
