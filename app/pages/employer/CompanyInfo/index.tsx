import React, { useEffect, useMemo, useRef, useState } from "react";
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
import useValidation from "~/hooks/useValidation";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import industryService from "~/services/industryService";
import skillService from "~/services/skillService";
import useDebounce from "~/hooks/useDebounce";
import InputSearch from "~/components/InputSearch";
import sizes from "~/constants/sizes";
import types from "~/constants/types";
import workingDays from "~/constants/workingDays";
import overtimes from "~/constants/overtimePolicy";
import countries from "~/constants/countries";
import { useSkillStore } from "~/stores/skillStore";
import companyService, {
  type UpdateCompanyPayload,
} from "~/services/companyService";
import { useUserStore } from "~/stores/userStore";
import showToast from "~/utils/showToast";
import { useCompanyStore } from "~/stores/companyStore";

const MAX_SKILLS = 10;

const CompanyInfo = () => {
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const [overview, setOverview] = useState("");
  const [perks, setPerks] = useState("");
  const { t } = useTranslation(["search", "auth"]);

  const { selectedSkillIds, handleSelectedSkillIds, saveSelectedSkillIds } =
    useSkillStore((s) => s);
  const { email, phoneNumber, username } = useUserStore((s) => s.user);
  const { updateCompanyInfo } = useUserStore((s) => s);
  const { company, isLoading } = useCompanyStore((s) => s);

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("Please enter your name", { ns: "auth" }) })
      .min(4, t("Please enter at least 4 characters", { ns: "auth" })),
    position: z
      .string()
      .nonempty({ message: t("Please enter your title", { ns: "auth" }) })
      .min(3, t("Please enter at least 3 characters", { ns: "auth" })),
    email: z
      .string()
      .nonempty({
        message: t("Please provide your work email address", { ns: "auth" }),
      })
      .email({
        message: t("Please enter a valid email address", { ns: "auth" }),
      }),
    phoneNumber: z
      .string()
      .nonempty({
        message: t("Please provide your phone number", { ns: "auth" }),
      })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
    companyType: z.string().nonempty({
      message: t("Please enter your company type", { ns: "auth" }),
    }),
    industryId: z.union([
      z.string().nonempty({
        message: t("Please enter your company industry", { ns: "auth" }),
      }),
      z.number(),
    ]),
    companySize: z.string().nonempty({
      message: t("Please enter your company size", { ns: "auth" }),
    }),
    country: z
      .string()
      .nonempty({ message: t("Please enter your country", { ns: "auth" }) }),
    workingDay: z.string().nonempty({
      message: t("Please enter your working days", { ns: "auth" }),
    }),
    overtimePolicy: z.string().nonempty({
      message: t("Please enter your overtime policy", { ns: "auth" }),
    }),
    companyName: z
      .string()
      .nonempty({
        message: t("Please enter your company name", { ns: "auth" }),
      })
      .min(4, t("Please enter at least 4 characters", { ns: "auth" })),
    location: z
      .string()
      .nonempty({ message: t("Please select a city", { ns: "auth" }) }),
    website: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value ||
          /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(value),
        {
          message: t("Please enter a valid URL, i.e https://itviec.com", {
            ns: "auth",
          }),
        }
      ),
    skillIds: z.string().optional(),
    overview: z.string().optional(),
    perks: z.string().optional(),
    logo: z.any().optional(),
  });

  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<Company>({
    defaultValues: {
      username: "",
      position: "",
      email: "",
      phoneNumber: "",
      companyType: "",
      industryId: "",
      companySize: "",
      country: "",
      workingDay: "",
      overtimePolicy: "",
      companyName: "",
      location: "",
      website: "",
      skillIds: "",
      logo: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (!isLoading && company) {
      setValue("id", company.id);
      setValue("username", username);
      setValue("email", email);
      setValue("phoneNumber", phoneNumber);
      setValue("companyName", company.companyName);
      setValue("position", company.position);
      setValue("location", company.location);
      setValue("website", company.website);
      setValue("companyType", company.companyType);
      setValue("companySize", company.companySize);
      setValue("industryId", company?.industry?.id + "");
      setValue("country", company.country);
      setValue("workingDay", company.workingDay);
      setValue("overtimePolicy", company.overtimePolicy);
      setValue("overview", company.overview);
      setValue("perks", company.perks);
      saveSelectedSkillIds(
        company?.skills
          ? company.skills.map((skill) => +skill.id).filter(Boolean)
          : []
      );
      setValue("logo", company.logo);
    }
  }, [isLoading, company]);

  const updateCompany = useMutation({
    mutationFn: ({ id, body }: UpdateCompanyPayload) =>
      companyService.update({ id, body }),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as any;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      const { username, email, phoneNumber } = data;
      updateCompanyInfo({ username, email, phoneNumber });
      showToast("success", "Thành công");
    },
  });

  const onSubmit: SubmitHandler<Company> = async (data: Company) => {
    data.overview = overview;
    data.perks = perks;
    data.skillIds = selectedSkillIds.map((id) => +id);
    if (data.industryId) data.industryId = +data.industryId;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "logo" && value instanceof File) {
        formData.append("logo", value || "");
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, JSON.stringify(value[i]));
        }
      } else if (value) {
        formData.append(key, value as string);
      }
    });
    if (!company) return;
    updateCompany.mutate({ id: company.id, body: formData });
  };

  const isValidUsername = useValidation(watch("username"));
  const isValidPosition = useValidation(watch("position"));
  const isValidEmail = useValidation(watch("email"));
  const isValidPhoneNumber = useValidation(watch("phoneNumber"));
  const isValidCompanyType = useValidation(watch("companyType"));
  const isValidIndustryId = useValidation(watch("industryId") + "");
  const isValidCompanySize = useValidation(watch("companySize"));
  const isValidCountry = useValidation(watch("country"));
  const isValidWorkingDay = useValidation(watch("workingDay"));
  const isValidOvertimePolicy = useValidation(watch("overtimePolicy"));
  const isValidCompanyName = useValidation(watch("companyName"));
  const isValidLocation = useValidation(watch("location"));
  const companyWebsiteValue = useValidation(watch("website"));
  const isValidWebsite = useMemo(() => {
    return submitCount > 0 && !companyWebsiteValue
      ? "success"
      : errors.website?.message
      ? "error"
      : "";
  }, [companyWebsiteValue, submitCount]);

  const { data: industries } = useQuery({
    queryKey: ["indutries"],
    queryFn: industryService.getAll,
    select: ({ data }) =>
      data.map((item) => ({
        value: item.id,
        label: item.name_en,
      })),
  });

  const skillIdsDebounce = useDebounce(watch("skillIds") + "", 1000);

  const { data: skills, isPending } = useQuery({
    queryKey: ["skills", skillIdsDebounce],
    queryFn: () => skillService.getAll({ name: skillIdsDebounce }),
    select: ({ data }) =>
      data.map((item) => ({ value: item.id, label: item.name })),
    placeholderData: keepPreviousData,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewLogo(fileUrl);
      setValue("logo", file);
    }
  };

  return (
    <CompanyInfoWrapper>
      {(isLoading || updateCompany.isPending) && <p>Loading...</p>}
      <div className="heading">
        <h2>Hồ sơ công ty</h2>
      </div>
      <CompanyInfoContainer>
        <CompanyInfoMain>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group input-row">
              <InputFloating
                name="username"
                label={t("Full name", { ns: "auth" })}
                register={register}
                required={true}
                error={errors.username && t(errors.username.message + "")}
                className={
                  errors.username?.message
                    ? "error"
                    : watch("username") === username
                    ? ""
                    : isValidUsername
                }
              />
              <InputFloating
                name="position"
                label={t("Work title", { ns: "auth" })}
                register={register}
                required={true}
                error={errors.position && t(errors.position?.message + "")}
                className={
                  errors.position?.message
                    ? "error"
                    : watch("position") === company?.position
                    ? ""
                    : isValidPosition
                }
              />
            </div>
            <div className="form-group input-row">
              <InputFloating
                name="email"
                register={register}
                type="email"
                label={t("Work email", { ns: "auth" })}
                required={true}
                error={errors.email && t(errors.email?.message + "")}
                className={
                  errors.email?.message
                    ? "error"
                    : watch("email") === email
                    ? ""
                    : isValidEmail
                }
              />
              <InputFloating
                name="phoneNumber"
                register={register}
                label={t("Phone number", { ns: "auth" })}
                required={true}
                error={
                  errors.phoneNumber && t(errors.phoneNumber?.message + "")
                }
                className={
                  errors.phoneNumber?.message
                    ? "error"
                    : watch("phoneNumber") === phoneNumber
                    ? ""
                    : isValidPhoneNumber
                }
              />
            </div>
            <div className="form-group">
              <InputFloating
                name="companyName"
                register={register}
                label={t("Company name", { ns: "auth" })}
                required={true}
                error={
                  errors.companyName && t(errors.companyName?.message + "")
                }
                className={
                  errors.companyName?.message
                    ? "error"
                    : watch("companyName") === company?.companyName
                    ? ""
                    : isValidCompanyName
                }
              />
            </div>
            <div className="form-group">
              <SelectFloating
                name="location"
                register={register}
                label={t("Company location", { ns: "auth" })}
                required={true}
                error={errors.location && t(errors.location?.message + "")}
                className={errors.location?.message ? "error" : isValidLocation}
                options={cities}
                onSetValue={(value) => setValue("location", value)}
                defaultValue={
                  watch("location")
                    ? { value: watch("location"), label: watch("location") }
                    : undefined
                }
              />
            </div>
            <div className="form-group set-mb">
              <InputFloating
                name="website"
                register={register}
                label="Địa chỉ website"
                required={false}
                error={errors.website && t(errors.website?.message + "")}
                className={isValidWebsite}
              />
              <div className="helper-text">
                {t("URL includes a protocol (https), e.g: https://itviec.com", {
                  ns: "auth",
                })}
              </div>
            </div>
            <h3>{t("General information")}</h3>
            <div className="form-group input-row">
              <SelectFloating
                name="companyType"
                register={register}
                label={t("Introduce.Company type")}
                required={true}
                error={errors.companyType && t(errors.companyType.message + "")}
                className={
                  errors.companyType?.message ? "error" : isValidCompanyType
                }
                options={types}
                onSetValue={(value) => setValue("companyType", value)}
                defaultValue={
                  watch("companyType")
                    ? {
                        value: watch("companyType"),
                        label: watch("companyType"),
                      }
                    : undefined
                }
              />
              <SelectFloating
                name="industryId"
                register={register}
                label={t("Introduce.Company industry")}
                required={true}
                error={errors.industryId && t(errors.industryId.message + "")}
                className={
                  errors.industryId?.message ? "error" : isValidIndustryId
                }
                options={industries ?? []}
                onSetValue={(value) => setValue("industryId", value)}
                defaultValue={
                  watch("industryId")
                    ? {
                        value: company?.industry?.id + "",
                        label: company?.industry?.name_en + "",
                      }
                    : undefined
                }
              />
            </div>
            <div className="form-group input-row">
              <SelectFloating
                name="companySize"
                register={register}
                label={t("Introduce.Company size")}
                required={true}
                error={errors.companySize && t(errors.companySize.message + "")}
                className={
                  errors.companySize?.message ? "error" : isValidCompanySize
                }
                options={sizes}
                onSetValue={(value) => setValue("companySize", value)}
                defaultValue={
                  watch("companySize")
                    ? {
                        value: watch("companySize"),
                        label: watch("companySize"),
                      }
                    : undefined
                }
              />
              <SelectFloating
                name="country"
                register={register}
                label={t("Introduce.Country")}
                required={true}
                error={errors.country && t(errors.country.message + "")}
                className={errors.country?.message ? "error" : isValidCountry}
                options={countries}
                onSetValue={(value) => setValue("country", value)}
                defaultValue={
                  watch("country")
                    ? {
                        value: watch("country"),
                        label: watch("country"),
                      }
                    : undefined
                }
              />
            </div>
            <div className="form-group input-row">
              <SelectFloating
                name="workingDay"
                register={register}
                label={t("Introduce.Working days")}
                required={true}
                error={errors.workingDay && t(errors.workingDay.message + "")}
                className={
                  errors.workingDay?.message ? "error" : isValidWorkingDay
                }
                options={workingDays}
                onSetValue={(value) => setValue("workingDay", value)}
                defaultValue={
                  watch("workingDay")
                    ? {
                        value: watch("workingDay"),
                        label: watch("workingDay"),
                      }
                    : undefined
                }
              />
              <SelectFloating
                name="overtimePolicy"
                register={register}
                label={t("Introduce.Overtime policy")}
                required={true}
                error={
                  errors.overtimePolicy && t(errors.overtimePolicy.message + "")
                }
                className={
                  errors.overtimePolicy?.message
                    ? "error"
                    : isValidOvertimePolicy
                }
                options={overtimes}
                onSetValue={(value) => setValue("overtimePolicy", value)}
                defaultValue={
                  watch("overtimePolicy")
                    ? {
                        value: watch("overtimePolicy"),
                        label: watch("overtimePolicy"),
                      }
                    : undefined
                }
              />
            </div>
            <h3>{t("Company overview")}</h3>
            <div className="form-group">
              <RichTextEditor
                content={watch("overview") ? watch("overview") : overview}
                setContent={setOverview}
              />
            </div>
            <h3 style={{ marginTop: "1.6rem" }}>{t("Our key skills")}</h3>
            <div className="form-group skills">
              <div className="form-select">
                <InputSearch
                  name="skillIds"
                  register={register}
                  options={skills ?? []}
                  max={MAX_SKILLS}
                  isPending={isPending}
                  placeholder={t("Search skills")}
                  selectedIds={selectedSkillIds}
                  handleSelectedIds={handleSelectedSkillIds}
                />
                <div
                  className={`counter ${
                    selectedSkillIds.length === MAX_SKILLS && "error"
                  }`}>
                  {selectedSkillIds.length}/{MAX_SKILLS} {t("skills")}
                </div>
              </div>
            </div>
            <h3 style={{ marginTop: "1.6rem" }}>
              {t("Why you'll love working here")}
            </h3>
            <div className="form-group" style={{ marginBottom: "2.4rem" }}>
              <RichTextEditor
                content={watch("perks") ? watch("perks") : perks}
                setContent={setPerks}
              />
            </div>
            <div className="form-submit">
              <button type="submit">Cập nhật thông tin</button>
            </div>
          </form>
        </CompanyInfoMain>
        <CompanyInfoSide>
          <div className="logo">
            <figure>
              <img
                src={
                  watch("id") && watch("logo")
                    ? previewLogo || getValues("logo") + ""
                    : previewLogo || "/assets/svg/avatar-default.svg"
                }
                alt="company logo"
              />
            </figure>
          </div>
          <div className="upload-file">
            <label htmlFor="logo">
              <input
                type="file"
                id="logo"
                {...register("logo")}
                hidden
                onChange={handleFileChange}
              />
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
