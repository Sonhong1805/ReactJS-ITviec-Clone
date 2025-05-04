import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  AwardItems,
  AwardsContent,
  customStyles,
  ModalContainer,
} from "./styled";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "~/components/RichTextEditor";
import InputFloating from "~/components/InputFloating";
import { months, years } from "~/constants/dateOptions";
import { Edit, Feather, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import { schemaAward } from "./schema";
import useValidation from "~/hooks/useValidation";
import { useApplicantStore } from "~/stores/applicantStore";
import showToast from "~/utils/showToast";
import applicantService from "~/services/applicantService";
import { useMutation } from "@tanstack/react-query";
import { useAwardsQuery } from "~/hooks/useAwardsQuery";
import DOMPurify from "dompurify";
import SelectFloating from "~/components/SelectFloating";

const Awards = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const [description, setDescription] = useState("");
  const [selectedAward, setSelectedAward] = useState<ApplicantAward>();
  const {
    applicant,
    awards,
    handleSaveAwards,
    handleAddAward,
    handleEditAward,
    handleRemoveAward,
  } = useApplicantStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantAward>({
    defaultValues: {
      name: "",
      organization: "",
      month: "",
      year: "",
    },
    resolver: zodResolver(schemaAward(t)),
    mode: "onTouched",
  });

  const closeModal = () => {
    handleCloseModal("awards");
    setDescription("");
    setSelectedAward(undefined);
    reset();
  };

  const createAwardMutation = useMutation({
    mutationFn: (body: ApplicantAward) => applicantService.createAward(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantAward;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleAddAward(data);
      closeModal();
    },
  });

  const updateAwardMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: ApplicantAward }) =>
      applicantService.updateAward(id, body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantAward;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleEditAward(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantAward> = async (
    data: ApplicantAward
  ) => {
    data.description = description;
    if (watch("id")) {
      updateAwardMutation.mutate({ id: +watch("id"), body: data });
    } else {
      createAwardMutation.mutate(data);
    }
  };

  const isValidName = useValidation(watch("name"), selectedAward?.name);
  const isValidOrganization = useValidation(
    watch("organization"),
    selectedAward?.organization
  );
  const isValidMonth = useValidation(watch("month"), selectedAward?.month);
  const isValidYear = useValidation(watch("year"), selectedAward?.year);

  const { data: awardData } = useAwardsQuery(applicant.id);

  useEffect(() => {
    if (awardData) {
      handleSaveAwards(awardData);
    }
  }, [awardData]);

  const deleteAwardMutation = useMutation({
    mutationFn: (id: number) => applicantService.deleteAward(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as number;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("info", message);
      handleRemoveAward(data);
      closeModal();
    },
  });

  const handleDeleteAward = (id: number) => {
    deleteAwardMutation.mutate(id);
  };

  const handleUpdateAward = (id: number) => {
    const selectedAward = awards.find((award) => award.id === id);
    setSelectedAward(selectedAward);
    setValue("id", selectedAward?.id || 0);
    setValue("name", selectedAward?.name + "");
    setValue("organization", selectedAward?.organization + "");
    setValue("month", selectedAward?.month + "");
    setValue("year", selectedAward?.year + "");
    setValue("description", selectedAward?.description + "");
    setDescription(selectedAward?.description || "");
    handleOpenModal("awards");
  };

  return (
    <Card
      title={t("Awards")}
      subtitle={awards.length ? "" : t("Highlight your awards or recognitions")}
      img={awards.length ? "" : "/assets/svg/award_no_info.svg"}
      openModal={() => handleOpenModal("awards")}
      edit={false}>
      {awards.length > 0 && <div className="devide"></div>}
      {awards.length > 0 && (
        <AwardItems>
          {awards.map((award) => (
            <div key={award.id} className="award-item">
              <div className="award-info">
                <div className="award-name">
                  <h3>{award.name}</h3>
                  <div className="actions">
                    <Edit
                      color="#ed1b2f"
                      cursor={"pointer"}
                      onClick={() => handleUpdateAward(award.id)}
                    />
                    <Trash2
                      color="#414042"
                      cursor={"pointer"}
                      onClick={() => handleDeleteAward(award.id)}
                    />
                  </div>
                </div>
                <div className="award-organization">{award.organization}</div>
                <div className="award-date">
                  {award.month}/{award.year}{" "}
                </div>
                {award.description && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(award.description),
                    }}></div>
                )}
              </div>
            </div>
          ))}
        </AwardItems>
      )}
      <Modal
        isOpen={modal["awards"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{t("Awards")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <AwardsContent>
              <div className="form-group">
                <InputFloating
                  name="name"
                  label={t("Awards name")}
                  required={true}
                  value={watch("name")}
                  error={errors.name && t(errors.name.message + "")}
                  className={errors.name?.message ? "error" : isValidName}
                  onSetValue={useCallback(
                    (value: string) => setValue("name", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="organization"
                  label={t("Awards Organization")}
                  required={true}
                  value={watch("organization")}
                  error={
                    errors.organization && t(errors.organization.message + "")
                  }
                  className={
                    errors.organization?.message ? "error" : isValidOrganization
                  }
                  onSetValue={useCallback(
                    (value: string) => setValue("organization", value),
                    []
                  )}
                />
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    {t("Issue date")} <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectFloating
                        name="month"
                        options={months()}
                        register={register}
                        label={t("Month")}
                        onSetValue={(value: string) => setValue("month", value)}
                        error={errors.month && t(errors.month?.message + "")}
                        className={
                          errors.month?.message ? "error" : isValidMonth
                        }
                        defaultValue={
                          watch("month")
                            ? {
                                value: watch("month"),
                                label: watch("month"),
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div>
                      <SelectFloating
                        name="year"
                        options={years()}
                        register={register}
                        label={t("Year")}
                        onSetValue={(value: string) => setValue("year", value)}
                        error={errors.year && t(errors.year?.message + "")}
                        className={errors.year?.message ? "error" : isValidYear}
                        defaultValue={
                          watch("year")
                            ? {
                                value: watch("year"),
                                label: watch("year"),
                              }
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select"></div>
              </div>
              <div className="form-group">
                <h4>{t("Description")}</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <Feather />
                  </div>
                  <div className="tips">
                    <strong>{t("Tips")}: </strong>
                    {t(
                      "Shortly describe the relevant category (innovation, leadership,...) or the reason for the award."
                    )}
                  </div>
                </div>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
            </AwardsContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={
                createAwardMutation.isPending || updateAwardMutation.isPending
              }
              type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default Awards;
