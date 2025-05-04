import UPLOADED_RESUME from "/assets/svg/uploaded-resume.svg";
import NO_RESUME from "/assets/svg/no-resume.svg";
import { Link } from "react-router";
import { YourCVWrapper } from "./styled";
import { Upload } from "feather-icons-react";
import { useApplicantStore } from "~/stores/applicantStore";
import formatDate from "~/utils/formatDate";
import { useForm, type SubmitHandler } from "react-hook-form";
import { schemaUploadCV } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import ErrorMessage from "~/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import showToast from "~/utils/showToast";
import applicantService from "~/services/applicantService";

const YourCV = () => {
  const { t } = useTranslation(["profile", "apply"]);
  const { applicant, handleSaveApplicant } = useApplicantStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<{ cv: File | string }>({
    defaultValues: {
      cv: "",
    },
    resolver: zodResolver(schemaUploadCV(t)),
    mode: "onTouched",
  });

  const uploadCVMutation = useMutation({
    mutationFn: (body: FormData) => applicantService.uploadCV(body),
    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as Applicant;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      handleSaveApplicant(data);
      showToast("success", t(message));
    },
  });

  const onSubmit: SubmitHandler<{ cv: File | string }> = async ({
    cv,
  }: {
    cv: File | string;
  }) => {
    const formData = new FormData();
    formData.append("cv", cv || "");
    uploadCVMutation.mutate(formData);
  };

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue("cv", file);
      handleSubmit(onSubmit)();
    }
  };

  return (
    <YourCVWrapper>
      <h3>{t("Your CV")}</h3>
      <div className="cv-link">
        <figure>
          {applicant.cv ? (
            <img src={UPLOADED_RESUME} alt="uploaded resume" />
          ) : (
            <img src={NO_RESUME} alt="no resume" />
          )}
        </figure>
        {applicant.cv ? (
          <div className="profile-link">
            <Link to={applicant.cvUrl} className="filename">
              {applicant?.cv.split("/")[2]}
            </Link>
            <p>
              {t("Last uploaded")}:{" "}
              {applicant.updatedAt && formatDate(applicant.updatedAt)}
            </p>
          </div>
        ) : (
          <p className="no-resume">{t("You have not attached a CV yet")}</p>
        )}
      </div>
      <div className="upload-file">
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            {...register("cv")}
            hidden
            accept=".doc, .docx, .pdf"
            onChange={handleUploadCV}
          />
          <Upload />
          <div className="selected-file">{t("Upload CV")}</div>
        </label>
        <ErrorMessage
          message={
            errors.cv &&
            errors.cv?.message &&
            t(errors.cv?.message, { ns: "apply" })
          }
        />
        <div className="file-alert">
          {t(
            "Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password protection",
            { ns: "apply" }
          )}
        </div>
      </div>
    </YourCVWrapper>
  );
};

export default YourCV;
