import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CompanyInfoContainer,
  CompanyInfoMain,
  CompanyInfoSide,
  CompanyInfoWrapper,
} from "./styled";
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
import companySizes from "~/constants/companySizes";
import companyTypes from "~/constants/companyTypes";
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
import Loading from "~/components/Loading";
import { Upload } from "feather-icons-react";
import { schema } from "./schema";

const MAX_SKILLS = 10;

const CompanyProfile = () => {
  const { t, i18n } = useTranslation(["search"]);
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const [overview, setOverview] = useState("");
  const [perks, setPerks] = useState("");

  const { selectedSkillIds, handleSelectedSkillIds, saveSelectedSkillIds } =
    useSkillStore();
  const { email, phoneNumber, username } = useUserStore((s) => s.user);
  const { updateCompanyInfo } = useUserStore();
  const { company, isLoading, handleSaveCompany } = useCompanyStore();
  console.log(company);

  const {
    register,
    formState: { errors, submitCount },
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<Company>({
    defaultValues: {},
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });

  useEffect(() => {
    if (!isLoading && company) {
      reset({
        username: username || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        tagline: company.tagline || "",
        position: company.position || "",
        companyType: company.companyType || "",
        industryId: company?.industry?.id ? company?.industry?.id + "" : "",
        companySize: company.companySize || "",
        country: company.country || "",
        workingDay: company.workingDay || "",
        overtimePolicy: company.overtimePolicy || "",
        companyName: company.companyName || "",
        location: company.location || "",
        website: company.website || "",
        overview: company.overview || "",
        perks: company.perks || "",
        skillIds: "",
        logo: company.logo || "",
        id: company.id || 0,
      });
    }
  }, [company, isLoading, reset]);

  const updateCompanyMutation = useMutation({
    mutationFn: ({ id, body }: UpdateCompanyPayload) =>
      companyService.update({ id, body }),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as any;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      const { username, email, phoneNumber, ...companyResponse } = data;
      updateCompanyInfo({ username, email, phoneNumber });
      handleSaveCompany({ ...company, ...companyResponse });
      saveSelectedSkillIds(
        selectedSkillIds?.map((skill) => +skill).filter(Boolean) ?? []
      );
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
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    if (!company) return;
    updateCompanyMutation.mutate({ id: company.id, body: formData });
  };

  const isValidUsername = useValidation(watch("username"), username);
  const isValidPosition = useValidation(watch("position"), company?.position);
  const isValidEmail = useValidation(watch("email"), email);
  const isValidPhoneNumber = useValidation(watch("phoneNumber"), phoneNumber);
  const isValidCompanyType = useValidation(
    watch("companyType"),
    `${company.companyType}`
  );
  const isValidIndustryId = useValidation(watch("industryId") + "");
  const isValidCompanySize = useValidation(
    watch("companySize") + "",
    `${company.companySize}`
  );
  const isValidCountry = useValidation(
    watch("country") + "",
    `${company.country}`
  );
  const isValidWorkingDay = useValidation(
    watch("workingDay") + "",
    `${company.workingDay}`
  );
  const isValidOvertimePolicy = useValidation(
    watch("overtimePolicy") + "",
    `${company.overtimePolicy}`
  );
  const isValidCompanyName = useValidation(
    watch("companyName"),
    company?.companyName
  );

  const isValidLocation = useValidation(
    watch("location"),
    `${company?.location}`
  );
  const companyWebsiteValue = useValidation(
    watch("website"),
    `${company?.website}`
  );
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
        label: i18n.language === "en" ? item.name_en : item.name_vi,
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
      {(isLoading || updateCompanyMutation.isPending) && <Loading />}
      <div className="heading">
        <h2>{t("Company Profile", { ns: "header" })}</h2>
      </div>
      <CompanyInfoContainer>
        <CompanyInfoMain>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group input-row">
              <InputFloating
                name="username"
                label={t("Full name", { ns: "auth" })}
                value={watch("username")}
                required={true}
                error={errors.username && t(errors.username.message + "")}
                className={errors.username?.message ? "error" : isValidUsername}
                onSetValue={useCallback(
                  (value: string) => setValue("username", value),
                  []
                )}
              />
              <InputFloating
                name="position"
                label={t("Work title", { ns: "auth" })}
                value={watch("position")}
                required={true}
                error={errors.position && t(errors.position?.message + "")}
                className={errors.position?.message ? "error" : isValidPosition}
                onSetValue={useCallback(
                  (value: string) => setValue("position", value),
                  []
                )}
              />
            </div>
            <div className="form-group input-row">
              <InputFloating
                name="email"
                value={watch("email")}
                type="email"
                disabled={true}
                label={t("Work email", { ns: "auth" })}
                required={true}
                error={errors.email && t(errors.email?.message + "")}
                className={errors.email?.message ? "error" : isValidEmail}
                onSetValue={useCallback(
                  (value: string) => setValue("email", value),
                  []
                )}
              />
              <InputFloating
                name="phoneNumber"
                value={watch("phoneNumber")}
                label={t("Phone number", { ns: "auth" })}
                required={true}
                error={
                  errors.phoneNumber && t(errors.phoneNumber?.message + "")
                }
                className={
                  errors.phoneNumber?.message ? "error" : isValidPhoneNumber
                }
                onSetValue={useCallback(
                  (value: string) => setValue("phoneNumber", value),
                  []
                )}
              />
            </div>
            <div className="form-group">
              <InputFloating
                name="companyName"
                value={watch("companyName")}
                label={t("Company name", { ns: "auth" })}
                required={true}
                error={
                  errors.companyName && t(errors.companyName?.message + "")
                }
                className={
                  errors.companyName?.message ? "error" : isValidCompanyName
                }
                onSetValue={useCallback(
                  (value: string) => setValue("companyName", value),
                  []
                )}
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
                value={watch("website")}
                label="Địa chỉ website"
                required={false}
                error={errors.website && t(errors.website?.message + "")}
                className={isValidWebsite}
                onSetValue={useCallback(
                  (value: string) => setValue("website", value),
                  []
                )}
              />
              <div className="helper-text">
                {t("URL includes a protocol (https), e.g: https://itviec.com", {
                  ns: "auth",
                })}
              </div>
            </div>
            <h3>{t("General information")}</h3>
            <div className="form-group">
              <InputFloating
                name="tagline"
                value={watch("tagline")}
                label={t("Tag line", { ns: "auth" })}
                required={false}
                onSetValue={useCallback(
                  (value: string) => setValue("tagline", value),
                  []
                )}
              />
            </div>
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
                options={companyTypes}
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
                        label:
                          i18n.language === "en"
                            ? company?.industry?.name_en + ""
                            : company?.industry?.name_vi + "",
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
                options={companySizes}
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
              <button type="submit" disabled={updateCompanyMutation.isPending}>
                {t("Update Profile")}
              </button>
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
              <Upload />
              <div className="selected-file">{t("Upload Logo")}</div>
            </label>
          </div>
        </CompanyInfoSide>
      </CompanyInfoContainer>
    </CompanyInfoWrapper>
  );
};

export default CompanyProfile;
