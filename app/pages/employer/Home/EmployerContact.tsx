import React, { useEffect, useMemo, useState } from "react";
import {
  AgreementCheck,
  ContactButton,
  EmployerContactWrapper,
  SubmitContact,
  SuccessCheck,
} from "./styled";
import { FiClock, FiPhone } from "react-icons/fi";
import InputFloating from "~/components/InputFloating";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import IconCloudflare from "~/components/Icon/IconCloudflare";
import sources from "~/constants/sources";
import SelectFloating from "~/components/SelectFloating";
import cities from "~/constants/cities";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EmployerContact = () => {
  const { t } = useTranslation(["auth", "home"]);
  const [agreementCheck, setAgreementCheck] = useState(false);

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("Please let us know your name") })
      .min(4, t("Please enter at least 4 characters")),
    role: z
      .string()
      .nonempty({ message: t("Please let us know your title") })
      .min(3, t("Please enter at least 3 characters")),
    email: z
      .string()
      .nonempty({ message: t("Please provide your work email address") })
      .email({ message: t("Please enter a valid email address") }),
    phone: z
      .string()
      .nonempty({ message: t("Please provide your phone number") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number"),
      }),
    source: z.string(),
    companyName: z
      .string()
      .nonempty({ message: t("Please let us know your company name") })
      .min(4, t("Please enter at least 4 characters")),
    companyAddress: z.string().nonempty({ message: t("Please select a city") }),
    companyWebsite: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value ||
          /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(value),
        { message: t("Please enter a valid URL, i.e https://itviec.com") }
      ),
  });

  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<TRegisterEmployer>({
    defaultValues: {
      username: "",
      role: "",
      email: "",
      phone: "",
      companyName: "",
      companyAddress: "",
      companyWebsite: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TRegisterEmployer> = async (
    data: TRegisterEmployer
  ) => {
    console.log(data);
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidRole = watch("role") !== "" ? "success" : "";
  const isValidEmail = watch("email") !== "" ? "success" : "";
  const isValidPhone = watch("phone") !== "" ? "success" : "";
  const isValidCompanyName = watch("companyName") !== "" ? "success" : "";
  const isValidCompanyAddress = watch("companyAddress") !== "" ? "success" : "";
  const companyWebsiteValue = watch("companyWebsite");
  const isValidCompanyWebsite =
    submitCount > 0 && !companyWebsiteValue
      ? "success"
      : errors.companyWebsite?.message
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
                  register={register}
                  required={true}
                  error={errors.username && t(errors.username.message + "")}
                  className={
                    errors.username?.message ? "error" : isValidUsername
                  }
                />
                <InputFloating
                  name="role"
                  label={t("Work title")}
                  register={register}
                  required={true}
                  error={errors.role && t(errors.role?.message + "")}
                  className={errors.role?.message ? "error" : isValidRole}
                />
              </div>
              <div className="form-group space">
                <InputFloating
                  name="email"
                  register={register}
                  type="email"
                  label={t("Work email")}
                  required={true}
                  error={errors.email && t(errors.email?.message + "")}
                  className={errors.email?.message ? "error" : isValidEmail}
                />
                <InputFloating
                  name="phone"
                  register={register}
                  label={t("Phone number")}
                  required={true}
                  error={errors.phone && t(errors.phone?.message + "")}
                  className={errors.phone?.message ? "error" : isValidPhone}
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  id="sources"
                  name="source"
                  register={register}
                  label={t("How did you know ITviec?")}
                  required={false}
                  options={sources}
                  onSetValue={(value) => setValue("source", value)}
                />
              </div>
              <h3>{t("Company information")}</h3>
              <div className="form-group">
                <InputFloating
                  name="companyName"
                  register={register}
                  label={t("Company name")}
                  required={true}
                  error={
                    errors.companyName && t(errors.companyName?.message + "")
                  }
                  className={
                    errors.companyName?.message ? "error" : isValidCompanyName
                  }
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  id="companies"
                  name="companyAddress"
                  register={register}
                  label={t("Company location")}
                  required={true}
                  error={
                    errors.companyAddress &&
                    t(errors.companyAddress?.message + "")
                  }
                  className={
                    errors.companyAddress?.message
                      ? "error"
                      : isValidCompanyAddress
                  }
                  options={cities}
                  onSetValue={(value) => setValue("companyAddress", value)}
                />
              </div>
              <div className="form-group set-mb">
                <InputFloating
                  name="companyWebsite"
                  register={register}
                  label="Địa chỉ website"
                  required={false}
                  error={
                    errors.companyWebsite &&
                    t(errors.companyWebsite?.message + "")
                  }
                  className={isValidCompanyWebsite}
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
                  <FaCheckCircle color="#038127" />
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
              <FiPhone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline {t("Ho Chi Minh")}</p>
                <h3>0977 460 519</h3>
              </div>
            </div>
            <div className="contact-box">
              <FiPhone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline {t("Ha Noi")}</p>
                <h3>0983 131 531</h3>
              </div>
            </div>
            <div className="contact-box">
              <FiClock size={24} color="#ed1b2f" />
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
