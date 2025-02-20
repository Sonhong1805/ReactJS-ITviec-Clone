import { FiCheck } from "react-icons/fi";
import {
  LoginContainer,
  LoginFeature,
  LoginFeatureItem,
  LoginFeatureList,
  LoginSubmit,
  LoginMain,
  LoginRegister,
  LoginWrapper,
  UserLogin,
} from "./styled";
import { Bounce, ToastContainer, toast } from "react-toastify";
import LOGO_BLACK_TEXT from "/assets/images/logo_black_text.png";
import GOOGLE_LOGO from "/assets/svg/google_logo.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputBase from "~/components/InputBase";

const Login = () => {
  const { t } = useTranslation(["auth"]);

  const schema = z.object({
    email: z
      .string()
      .nonempty({ message: t("Can't be blank") })
      .email({ message: t("Please check your email") }),
    password: z.string().nonempty({ message: t("Can't be blank") }),
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
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TLogin> = async (data: TLogin) => {
    console.log(data);
    toast.error(t("Email or password is incorrect"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const isValidEmail = watch("email") !== "" ? "success" : "";
  const isValidPassword = watch("password") !== "" ? "success" : "";

  return (
    <LoginWrapper>
      <UserLogin>
        <h3>
          <span>{t("Welcome to")}</span>
          <img src={LOGO_BLACK_TEXT} alt="logo-black-text" />
        </h3>
        <LoginContainer>
          <LoginMain>
            <div className="Login-message">
              {t("By signing in, you agree to ITviec")}{" "}
              <span className="Login-rules">{t("Terms & Conditions")}</span>{" "}
              {t("and")}{" "}
              <span className="Login-rules">{t("Privacy Policy")}</span>{" "}
              {t("in relation to your privacy information.")}
            </div>
            <button className="Login-google">
              <img src={GOOGLE_LOGO} alt="google logo" />
              <span>{t("Sign In with Google")}</span>
            </button>
            <div className="Login-separator">
              <span>{t("or")}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBase
                type="email"
                name="email"
                label={t("Email")}
                placeholder={t("Email")}
                required={true}
                register={register}
                className={errors.email?.message ? "error" : isValidEmail}
                error={errors.email?.message}
              />
              <InputBase
                type="password"
                name="password"
                label={t("Password")}
                placeholder={t("Password")}
                required={true}
                register={register}
                className={errors.password?.message ? "error" : isValidPassword}
                error={errors.password?.message}
                isForgot={true}
              />
              <LoginSubmit type="submit">{t("Sign In with Email")}</LoginSubmit>
            </form>
            <LoginRegister>
              {t("Do not have an account?")}{" "}
              <Link to="/register">{t("Sign up now!")}</Link>
            </LoginRegister>
          </LoginMain>
          <LoginFeature>
            <h2>
              {t(
                "Sign in to get instant access to thousands of reviews and salary information"
              )}
            </h2>
            <LoginFeatureList>
              <LoginFeatureItem>
                <FiCheck />
                <p>
                  {t(
                    "View salary to help you negotiate your offer or pay rise"
                  )}
                </p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <FiCheck />
                <p>
                  {t(
                    "Find out about benefits, interview, company culture via reviews"
                  )}
                </p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <FiCheck />
                <p>{t("Easy apply with only 1 click")}</p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <FiCheck />
                <p>{t("Manage your own profile & privacy")}</p>
              </LoginFeatureItem>
            </LoginFeatureList>
          </LoginFeature>
        </LoginContainer>
      </UserLogin>
      <ToastContainer />
    </LoginWrapper>
  );
};

export default Login;
