import React, { useState } from "react";
import {
  CompanyInfoContainer,
  CompanyInfoMain,
  CompanyInfoSide,
  CompanyInfoWrapper,
} from "./styled";
import { FiUpload } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFloating from "~/components/InputFloating";
import SelectFloating from "~/components/SelectFloating";
import cities from "~/constants/cities";
import RichTextEditor from "~/components/RichTextEditor";
import InputSearch from "~/components/InputSearch";
import industries from "~/constants/industries";

const CompanyInfo = () => {
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [overview, setOverview] = useState("");
  const [perks, setPerks] = useState("");
  const { t, i18n } = useTranslation(["apply"]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("Please enter your name") })
      .min(4, t("Please enter at least 4 characters")),
    role: z
      .string()
      .nonempty({ message: t("Please enter your title") })
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
    companyType: z
      .string()
      .nonempty({ message: t("Please enter your company type") }),
    companyIndustry: z
      .string()
      .nonempty({ message: t("Please enter your company industry") }),
    companySize: z
      .string()
      .nonempty({ message: t("Please enter your company size") }),
    country: z.string().nonempty({ message: t("Please enter your country") }),
    workingDays: z
      .string()
      .nonempty({ message: t("Please enter your working days") }),
    overtimePolicy: z
      .string()
      .nonempty({ message: t("Please enter your overtime policy") }),
    companyName: z
      .string()
      .nonempty({ message: t("Please enter your company name") })
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
  } = useForm<ICompany>({
    defaultValues: {
      username: "",
      role: "",
      email: "",
      phone: "",
      companyType: "",
      companyIndustry: "",
      companySize: "",
      country: "",
      workingDays: "",
      overtimePolicy: "",
      companyName: "",
      companyAddress: "",
      companyWebsite: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ICompany> = async (data: ICompany) => {
    console.log(data);
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidRole = watch("role") !== "" ? "success" : "";
  const isValidEmail = watch("email") !== "" ? "success" : "";
  const isValidPhone = watch("phone") !== "" ? "success" : "";
  const isValidCompanyType = watch("companyType") !== "" ? "success" : "";
  const isValidCompanyIndustry =
    watch("companyIndustry") !== "" ? "success" : "";
  const isValidCompanySize = watch("companySize") !== "" ? "success" : "";
  const isValidCountry = watch("country") !== "" ? "success" : "";
  const isValidWorkingDays = watch("workingDays") !== "" ? "success" : "";
  const isValidOvertimePolicy = watch("overtimePolicy") !== "" ? "success" : "";
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
    <CompanyInfoWrapper>
      <div className="heading">
        <h2>Hồ sơ công ty</h2>
      </div>
      <CompanyInfoContainer>
        <CompanyInfoMain>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group input-row">
              <InputFloating
                name="username"
                label={t("Full name")}
                register={register}
                required={true}
                error={errors.username && t(errors.username.message + "")}
                className={errors.username?.message ? "error" : isValidUsername}
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
            <div className="form-group input-row">
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
                {t("URL includes a protocol (https), e.g: https://itviec.com")}
              </div>
            </div>
            <h3>General information</h3>
            <div className="form-group input-row">
              <SelectFloating
                name="companyType"
                register={register}
                label={t("Company type")}
                required={true}
                error={errors.companyType && t(errors.companyType.message + "")}
                className={
                  errors.companyType?.message ? "error" : isValidCompanyType
                }
                options={cities}
                onSetValue={(value) => setValue("companyType", value)}
              />
              <SelectFloating
                name="companyIndustry"
                register={register}
                label={t("Company industry")}
                required={true}
                error={
                  errors.companyIndustry &&
                  t(errors.companyIndustry.message + "")
                }
                className={
                  errors.companyIndustry?.message
                    ? "error"
                    : isValidCompanyIndustry
                }
                options={cities}
                onSetValue={(value) => setValue("companyType", value)}
              />
            </div>
            <div className="form-group input-row">
              <SelectFloating
                name="companySize"
                register={register}
                label={t("Company size")}
                required={true}
                error={errors.companySize && t(errors.companySize.message + "")}
                className={
                  errors.companySize?.message ? "error" : isValidCompanySize
                }
                options={cities}
                onSetValue={(value) => setValue("companySize", value)}
              />
              <SelectFloating
                name="country"
                register={register}
                label={t("Country")}
                required={true}
                error={errors.country && t(errors.country.message + "")}
                className={errors.country?.message ? "error" : isValidCountry}
                options={cities}
                onSetValue={(value) => setValue("country", value)}
              />
            </div>
            <div className="form-group input-row">
              <SelectFloating
                name="workingDays"
                register={register}
                label={t("Working days")}
                required={true}
                error={errors.workingDays && t(errors.workingDays.message + "")}
                className={
                  errors.workingDays?.message ? "error" : isValidWorkingDays
                }
                options={cities}
                onSetValue={(value) => setValue("workingDays", value)}
              />
              <SelectFloating
                name="overtimePolicy"
                register={register}
                label={t("Overtime policy")}
                required={true}
                error={
                  errors.overtimePolicy && t(errors.overtimePolicy.message + "")
                }
                className={
                  errors.overtimePolicy?.message
                    ? "error"
                    : isValidOvertimePolicy
                }
                options={cities}
                onSetValue={(value) => setValue("companyType", value)}
              />
            </div>
            <h3>Company overview</h3>
            <div className="form-group">
              <RichTextEditor content={overview} setContent={setOverview} />
            </div>
            <h3 style={{ marginTop: "1.6rem" }}>Our key skills</h3>
            <div className="form-group skills">
              <div className="form-select">
                <InputSearch options={industries} placeholder="Search skills" />
                <div className="counter">0/10 skills</div>
              </div>
            </div>
            <h3 style={{ marginTop: "1.6rem" }}>
              Why you'll love working here
            </h3>
            <div className="form-group" style={{ marginBottom: "2.4rem" }}>
              <RichTextEditor content={perks} setContent={setPerks} />
            </div>
            <div className="form-submit">
              <button>Cập nhật thông tin</button>
            </div>
          </form>
        </CompanyInfoMain>
        <CompanyInfoSide>
          <div className="logo">
            <figure>
              <img
                src={previewAvatar || "/assets/svg/avatar-default.svg"}
                alt="company logo"
              />
            </figure>
          </div>
          <div className="upload-file">
            <label htmlFor="logo">
              <input type="file" id="logo" hidden onChange={handleFileChange} />
              <FiUpload />
              <div className="selected-file">{t("Choose logo")}</div>
            </label>
          </div>
        </CompanyInfoSide>
      </CompanyInfoContainer>
    </CompanyInfoWrapper>
  );
};

export default CompanyInfo;
