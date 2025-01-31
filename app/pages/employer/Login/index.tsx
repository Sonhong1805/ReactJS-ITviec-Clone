import { useTranslation } from "react-i18next";
import { RememberMeCheck, SignInForm } from "./styled";
import Logo from "/assets/images/logo_black_text.png";
import InputFloating from "~/components/InputFloating";
import { useState } from "react";
import { Link } from "react-router";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const { t, i18n } = useTranslation(["auth"]);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const schema = z.object({
    email: z.string().optional(),
    password: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TLogin> = async (data: TLogin) => {
    console.log(data);
  };

  return (
    <SignInForm>
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h3>CUSTOMER ADMIN SITE</h3>
      </div>
      <h1>{t("Welcome to ITviec Customer")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <InputFloating
            name="email"
            register={register}
            type="email"
            label={t("Email")}
            required={false}
          />
        </div>
        <div className="form-group">
          <InputFloating
            name="password"
            type="password"
            register={register}
            label={t("Password")}
            required={false}
          />
        </div>
        <div className="form-group">
          <RememberMeCheck htmlFor="remember-me-check">
            <input
              type="checkbox"
              id="remember-me-check"
              onChange={() => setIsRememberMe((prev) => !prev)}
            />
            <span>{t("Remember me")}</span>
          </RememberMeCheck>
          <Link to="/employer/forgot-password">{t("Forgot password?")}</Link>
        </div>
        <div className="policy">
          {t("I have read and agree to ITviec")}{" "}
          <Link to={""} className="register-rules">
            {t("Terms & Conditions")}
          </Link>{" "}
          {t("and")}{" "}
          <Link to={""} className="register-rules">
            {t("Privacy Policy")}
          </Link>{" "}
          {t("in relation to your privacy information.")}
        </div>
        <div className="form-submit">
          <button>{t("Sign In")}</button>
        </div>
        <hr />
        <div className="contact">
          {t("Don't have a customer account yet? Contact us at:")}
        </div>
        <ul className="contact-list">
          <li>
            <FiPhoneCall />
            <span>{t("Ho Chi Minh")}: (+84) 977 460 519</span>
          </li>
          <li>
            <FiPhoneCall />
            <span>{t("Ha Noi")}: (+84) 983 131 351</span>
          </li>
          <li>
            <FiMail />
            <span>Email: love@itviec.com</span>
          </li>
        </ul>
      </form>
    </SignInForm>
  );
};

export default Login;
