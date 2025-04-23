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
  LoginGoogle,
} from "./styled";
import LOGO_BLACK_TEXT from "/assets/images/logo_black_text.png";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputBase from "~/components/InputBase";
import authService from "~/services/authService";
import { useUserStore } from "~/stores/userStore";
import showToast from "~/utils/showToast";
import useValidation from "~/hooks/useValidation";
import { GoogleLogin } from "@react-oauth/google";
import { Check } from "feather-icons-react";
import { schema } from "./schema";

const ROLLBACK_ROUTES = ["apply", "review", "company"];

const Login = () => {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });

  const { login } = useUserStore((s) => s);
  const [searchParams] = useSearchParams();

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    const response = await authService.login(data);
    if (response.isSuccess && response.data) {
      login(response.data.user);
      localStorage.setItem("access_token", response.data.accessToken as string);
      const target = ROLLBACK_ROUTES.find((key) => searchParams.get(key));
      navigate(target ? `/${target}/${searchParams.get(target)}` : "/");
      showToast("success", t("Successfully authenticated from Email account."));
      reset();
    } else {
      showToast("error", t("Email or password is incorrect"));
    }
  };

  const isValidEmail = useValidation(watch("email"));
  const isValidPassword = useValidation(watch("password"));

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
            <LoginGoogle>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const credential = credentialResponse.credential + "";
                  const response = await authService.loginGoogle(credential);
                  if (response.isSuccess && response.data) {
                    localStorage.setItem(
                      "access_token",
                      response.data.accessToken as string
                    );
                    login(response.data.user);
                    const target = ROLLBACK_ROUTES.find((key) =>
                      searchParams.get(key)
                    );
                    navigate(
                      target ? `/${target}/${searchParams.get(target)}` : "/"
                    );
                    showToast(
                      "success",
                      "Successfully authenticated from Google account."
                    );
                  }
                }}
                onError={() => {
                  showToast("error", "Đăng nhập bằng google thất bại");
                }}
                text="signin_with"
              />
            </LoginGoogle>
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
                <Check />
                <p>
                  {t(
                    "View salary to help you negotiate your offer or pay rise"
                  )}
                </p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <Check />
                <p>
                  {t(
                    "Find out about benefits, interview, company culture via reviews"
                  )}
                </p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <Check />
                <p>{t("Easy apply with only 1 click")}</p>
              </LoginFeatureItem>
              <LoginFeatureItem>
                <Check />
                <p>{t("Manage your own profile & privacy")}</p>
              </LoginFeatureItem>
            </LoginFeatureList>
          </LoginFeature>
        </LoginContainer>
      </UserLogin>
    </LoginWrapper>
  );
};

export default Login;
