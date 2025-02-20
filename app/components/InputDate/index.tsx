import { AlertError, InputFloatingWrapper, InputWrapper } from "./styled";

interface IProps {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  className?: string;
  required?: boolean;
}

const InputDate = ({
  name,
  label,
  error,
  register,
  className,
  required,
}: IProps) => {
  return (
    <InputWrapper className="input-wrapper">
      <InputFloatingWrapper>
        <input
          type={"date"}
          id={name}
          {...register(name)}
          className={className}
          max={new Date().toISOString().split("T")[0]}
          placeholder={" "}
        />
        <label htmlFor={name}>
          {label} {required && <abbr>*</abbr>}
        </label>
        {/* <FiCalendar cursor="pointer" /> */}
      </InputFloatingWrapper>
      {error && <AlertError>{error}</AlertError>}
    </InputWrapper>
  );
};

export default InputDate;
