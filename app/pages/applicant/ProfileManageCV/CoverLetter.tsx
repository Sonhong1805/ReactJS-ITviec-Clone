import { useEffect, useState } from "react";
import { CoverLetterWrapper } from "./styled";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "feather-icons-react";
import showToast from "~/utils/showToast";
import applicantService from "~/services/applicantService";
import { useMutation } from "@tanstack/react-query";
import { useApplicantStore } from "~/stores/applicantStore";
import { useTranslation } from "react-i18next";
import useValidation from "~/hooks/useValidation";

const CoverLetter = () => {
  const { t } = useTranslation(["profile"]);
  const [showArea, setShowArea] = useState(false);
  const { applicant, handleUpdateCoverLetter } = useApplicantStore();

  const schema = z.object({
    coverLetter: z.string().optional(),
  });

  const { register, handleSubmit, watch, reset } = useForm<{
    coverLetter: string;
  }>({
    defaultValues: {
      coverLetter: applicant.coverLetter + "" || "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const coverLetterMutation = useMutation({
    mutationFn: (coverLetter: string) =>
      applicantService.updateCoverLetter(coverLetter),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as string;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      handleUpdateCoverLetter(data);
      setShowArea(false);
    },
  });

  const onSubmit: SubmitHandler<{ coverLetter: string }> = async ({
    coverLetter,
  }: {
    coverLetter: string;
  }) => {
    coverLetterMutation.mutate(coverLetter);
  };

  const isValidCoverLetter = useValidation(
    watch("coverLetter"),
    applicant.coverLetter
  );
  useEffect(() => {
    if (applicant.coverLetter !== undefined) {
      reset({ coverLetter: applicant.coverLetter });
    }
  }, [applicant.coverLetter, reset]);

  return (
    <CoverLetterWrapper>
      <div style={{ position: "relative" }}>
        <h2>{t("Cover Letter")}</h2>
        {showArea ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <hr />
            <p className="tips">
              {t("Tips")}:{" "}
              {t(
                "Start by describing what you bring to the table and why this job excites you"
              )}
            </p>
            <textarea
              id="coverLetter"
              {...register("coverLetter")}
              maxLength={500}
              className={isValidCoverLetter}
            />
            <span className="characters">
              {500 - Number(watch("coverLetter")?.length || 0)}/500{" "}
              {t("characters", { ns: "apply" })}
            </span>
            <div className="group-button">
              <button
                className="cancel"
                onClick={() => {
                  setShowArea(false);
                }}>
                {t("Cancel")}
              </button>
              <button type="submit" className="save">
                {t("Save")}
              </button>
            </div>
          </form>
        ) : (
          <div>
            {applicant.coverLetter ? (
              <p className="value">{applicant.coverLetter}</p>
            ) : (
              <div>
                <p>{t("Introduce yourself and why you'd make a great hire")}</p>
                <img
                  src={"/assets/svg/cover_letter_no_info.svg"}
                  alt="uploaded resume"
                />
              </div>
            )}
          </div>
        )}
        <Edit cursor={"pointer"} onClick={() => setShowArea(true)} />
      </div>
    </CoverLetterWrapper>
  );
};

export default CoverLetter;
