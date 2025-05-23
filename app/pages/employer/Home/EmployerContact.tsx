import { useMemo, useState } from "react";
import {
  AgreementCheck,
  ContactButton,
  EmployerContactWrapper,
  SubmitContact,
  SuccessCheck,
} from "./styled";
import InputFloating from "~/components/InputFloating";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import IconCloudflare from "~/components/Icons/IconCloudflare";
import SelectFloating from "~/components/SelectFloating";
import cities from "~/constants/cities";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidation from "~/hooks/useValidation";
import getSources from "~/constants/getSources";
import authService from "~/services/authService";
import showToast from "~/utils/showToast";
import { Clock, Phone } from "feather-icons-react";
import IconCheckCircle from "~/components/Icons/IconCheckCircle";
import { schema } from "./schema";

const EmployerContact = () => {
  const { t } = useTranslation(["auth"]);
  const [agreementCheck, setAgreementCheck] = useState(false);
  const sources = getSources(t);

  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<RegisterEmployer>({
    defaultValues: {
      username: "",
      position: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      location: "",
      website: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<RegisterEmployer> = async (
    data: RegisterEmployer
  ) => {
    const response = await authService.registerCompany(data);
    if (response.isSuccess) {
      showToast(
        "success",
        "Bạn sẽ nhận được email hướng dẫn cách đăng nhập vào nhà tuyển dụng trong vài phút."
      );
    } else {
      const messages = response.message;
      if (messages && messages.length > 0) {
        const message = Array.isArray(messages) ? messages[0] : messages;
        showToast("error", message);
      }
    }
  };

  const isValidUsername = useValidation(watch("username"));
  const isValidPosition = useValidation(watch("position"));
  const isValidEmail = useValidation(watch("email"));
  const isValidPhoneNumber = useValidation(watch("phoneNumber"));
  const isValidCompanyName = useValidation(watch("companyName"));
  const isValidLocation = useValidation(watch("location"));
  const websiteValue = useMemo(() => {
    return watch("website");
  }, [watch("website")]);

  const isValidwebsite =
    submitCount > 0 && !websiteValue
      ? "success"
      : errors.website?.message
      ? "error"
      : "";

  return (
    <EmployerContactWrapper id="employer-contact">
      <div className="employer-contact-container">
        <h1>{t("Let’s find your IT Talents")}</h1>
        <p>
          {t("Leave your contact so our Customer Love team can support you")}
        </p>
        <div className="contact">
          <div className="contact-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>{t("Your contact information")}</h3>
              <div className="form-group space">
                <InputFloating
                  name="username"
                  label={t("Full name")}
                  value={watch("username")}
                  required={true}
                  error={errors.username && t(errors.username.message + "")}
                  className={
                    errors.username?.message ? "error" : isValidUsername
                  }
                  onSetValue={(value: string) => setValue("username", value)}
                />
                <InputFloating
                  name="position"
                  label={t("Work title")}
                  value={watch("position")}
                  required={true}
                  error={errors.position && t(errors.position?.message + "")}
                  className={
                    errors.position?.message ? "error" : isValidPosition
                  }
                  onSetValue={(value: string) => setValue("position", value)}
                />
              </div>
              <div className="form-group space">
                <InputFloating
                  name="email"
                  value={watch("email")}
                  type="email"
                  label={t("Work email")}
                  required={true}
                  error={errors.email && t(errors.email?.message + "")}
                  className={errors.email?.message ? "error" : isValidEmail}
                  onSetValue={(value: string) => setValue("email", value)}
                />
                <InputFloating
                  name="phoneNumber"
                  value={watch("phoneNumber")}
                  label={t("Phone number")}
                  required={true}
                  error={
                    errors.phoneNumber && t(errors.phoneNumber?.message + "")
                  }
                  className={
                    errors.phoneNumber?.message ? "error" : isValidPhoneNumber
                  }
                  onSetValue={(value: string) => setValue("phoneNumber", value)}
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  name="source"
                  register={register}
                  label={t("How did you know ITviec?")}
                  required={false}
                  options={sources}
                  onSetValue={(value) => setValue("source", value)}
                  defaultValue={undefined}
                />
              </div>
              <h3>{t("Company information")}</h3>
              <div className="form-group">
                <InputFloating
                  name="companyName"
                  value={watch("companyName")}
                  label={t("Company name")}
                  required={true}
                  error={
                    errors.companyName && t(errors.companyName?.message + "")
                  }
                  className={
                    errors.companyName?.message ? "error" : isValidCompanyName
                  }
                  onSetValue={(value: string) => setValue("companyName", value)}
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  name="location"
                  register={register}
                  label={t("Company location")}
                  required={true}
                  error={errors.location && t(errors.location?.message + "")}
                  className={
                    errors.location?.message ? "error" : isValidLocation
                  }
                  options={cities}
                  onSetValue={(value) => setValue("location", value)}
                  defaultValue={undefined}
                />
              </div>
              <div className="form-group set-mb">
                <InputFloating
                  name="website"
                  value={watch("website")}
                  label="Địa chỉ website"
                  required={false}
                  error={errors.website && t(errors.website?.message + "")}
                  className={isValidwebsite}
                  onSetValue={(value: string) => setValue("website", value)}
                />
                <div className="helper-text">
                  {t(
                    "URL includes a protocol (https), e.g: https://itviec.com"
                  )}
                </div>
              </div>
              <AgreementCheck htmlFor="agreement-check">
                <input
                  type="checkbox"
                  id="agreement-check"
                  onChange={() => setAgreementCheck((prev) => !prev)}
                />
                <span>
                  {t("I have read and agree to ITviec")}{" "}
                  <span className="register-rules">
                    {t("Terms & Conditions")}
                  </span>{" "}
                  {t("and")}{" "}
                  <span className="register-rules">{t("Privacy Policy")}</span>{" "}
                  {t("in relation to your privacy information.")}
                </span>
              </AgreementCheck>
              <SuccessCheck>
                <div className="success">
                  <IconCheckCircle />
                  <span>Thành công!</span>
                </div>
                <div className="cloudflare">
                  <IconCloudflare />
                  <Link to={""}>Quyền riêng tư</Link>
                  <Link to={""}>Điều khoản</Link>
                </div>
              </SuccessCheck>
              <SubmitContact>
                <div className="already-account">
                  <p>
                    {t("Already have an Employer account?", { ns: "home" })}
                  </p>
                  <Link to={"/employer/login"}>
                    {t("Sign in", { ns: "home" })}
                  </Link>
                </div>
                <ContactButton
                  className={agreementCheck ? "active" : ""}
                  disabled={!agreementCheck}
                  type="submit">
                  {t("Contact me")}
                </ContactButton>
              </SubmitContact>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-box">
              <Phone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline {t("Ho Chi Minh", { ns: "option" })}</p>
                <h3>0977 460 519</h3>
              </div>
            </div>
            <div className="contact-box">
              <Phone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline {t("Ha Noi", { ns: "option" })}</p>
                <h3>0983 131 531</h3>
              </div>
            </div>
            <div className="contact-box">
              <Clock size={24} color="#ed1b2f" />
              <div className="text">
                <p>{t("Working time")}</p>
                <h3>{t("Mon - Fri")} | 8:30 - 17:00</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployerContactWrapper>
  );
};

export default EmployerContact;
