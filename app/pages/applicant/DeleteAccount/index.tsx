import { useTranslation } from "react-i18next";
import { Box, Branding, Container, ErrorAlert, Form, Wrapper } from "./styled";
import { ChevronLeft, XCircle } from "feather-icons-react";
import SwitchLanguage from "~/components/SwitchLanguage";
import LOGO from "/assets/images/logo.png";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputBase from "~/components/InputBase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import authService from "~/services/authService";
import showToast from "~/utils/showToast";
import { useUserStore } from "~/stores/userStore";
import IconToastError from "~/components/Icons/IconToastError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteAccount = () => {
  const { t } = useTranslation(["profile"]);
  const [errorMessage, setErrorMessage] = useState("");
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCreateNewCode = async () => {
    if (isDisabled) return;
    const response = await authService.createDeleteCode();
    if (response.isSuccess) {
      setTimeLeft(180);
      setIsDisabled(true);
    }
  };

  const { register, handleSubmit, watch } = useForm<DeleteAccount>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<DeleteAccount> = async (
    data: DeleteAccount
  ) => {
    const response = await authService.deleteAccount(data.code);
    if (response.isSuccess) {
      localStorage.removeItem("access_token");
      showToast("success", response.message + "");
      logout();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setErrorMessage(response.message + "");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Branding>
          <button className="back" onClick={() => navigate(-1)}>
            <ChevronLeft />
            <span>{t("Back", { ns: "apply" })}</span>
          </button>
          <img src={LOGO} alt="logo itviec" />
          <SwitchLanguage />
        </Branding>
        <Box>
          <h2>{t("Account deletion confirmation")}</h2>
          {errorMessage && (
            <ErrorAlert>
              <div className="icon">
                <IconToastError />
              </div>
              <h6>{t(errorMessage)}</h6>
            </ErrorAlert>
          )}
          <div className="instruction">
            {t(
              "Please enter the code in the email we have sent to confirm your delete action"
            )}
            :
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBase
              type="text"
              name="code"
              placeholder={t("Input code")}
              required={true}
              register={register}
            />
            <div className="note">
              {t("This verification code will expire after 3 hours")}.{" "}
              <span
                className={`new-code ${isDisabled ? "disabled" : ""}`}
                onClick={handleCreateNewCode}>
                {t("Request new code")}{" "}
              </span>
              {isDisabled && <span className="time-count">({timeLeft}s)</span>}
            </div>
            <div className="action">
              <button
                type="submit"
                disabled={watch("code") !== "" ? false : true}>
                {t("Continue")}
              </button>
            </div>
          </Form>
        </Box>
      </Container>
      <ToastContainer />
    </Wrapper>
  );
};

export default DeleteAccount;
