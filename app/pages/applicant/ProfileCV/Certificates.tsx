import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  CertificateItems,
  CertificatesContent,
  customStyles,
  ModalContainer,
} from "./styled";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "~/components/RichTextEditor";
import InputFloating from "~/components/InputFloating";
import { months, years } from "~/constants/dateOptions";
import { Edit, ExternalLink, Trash2, X } from "feather-icons-react";
import { useModalStore } from "~/stores/modalStore";
import useValidation from "~/hooks/useValidation";
import { schemaCertificate } from "./schema";
import { useApplicantStore } from "~/stores/applicantStore";
import { useCertificatesQuery } from "~/hooks/useCertificatesQuery";
import { useMutation } from "@tanstack/react-query";
import applicantService from "~/services/applicantService";
import showToast from "~/utils/showToast";
import DOMPurify from "dompurify";
import { Link } from "react-router";
import SelectFloating from "~/components/SelectFloating";

const Certificates = () => {
  const { t } = useTranslation(["profile"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const [description, setDescription] = useState("");
  const [selectedCertificate, setSelectedCertificate] =
    useState<ApplicantCertificate>();
  const {
    certificates,
    handleSaveCertificates,
    handleAddCertificate,
    handleEditCertificate,
    handleRemoveCertificate,
  } = useApplicantStore();

  const schemaResolver = schemaCertificate(t);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ApplicantCertificate>({
    defaultValues: {
      name: "",
      organization: "",
      month: "",
      year: "",
      url: "",
    },
    resolver: zodResolver(schemaResolver),
    mode: "onTouched",
  });

  const closeModal = () => {
    handleCloseModal("certificates");
    setDescription("");
    setSelectedCertificate(undefined);
    reset();
  };

  const createCertificateMutation = useMutation({
    mutationFn: (body: ApplicantCertificate) =>
      applicantService.createCertificate(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantCertificate;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleAddCertificate(data);
      closeModal();
    },
  });

  const updateCertificateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: ApplicantCertificate }) =>
      applicantService.updateCertificate(id, body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as ApplicantCertificate;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleEditCertificate(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<ApplicantCertificate> = async (
    data: ApplicantCertificate
  ) => {
    data.description = description;
    if (watch("id")) {
      updateCertificateMutation.mutate({ id: +watch("id"), body: data });
    } else {
      createCertificateMutation.mutate(data);
    }
  };

  const isValidName = useValidation(watch("name"), selectedCertificate?.name);
  const isValidOrganization = useValidation(
    watch("organization"),
    selectedCertificate?.organization
  );
  const isValidMonth = useValidation(
    watch("month"),
    selectedCertificate?.month
  );
  const isValidYear = useValidation(watch("year"), selectedCertificate?.year);
  const isValidUrl = useValidation(watch("url"), selectedCertificate?.url);

  const { data: certificateData } = useCertificatesQuery();

  useEffect(() => {
    if (certificateData) {
      handleSaveCertificates(certificateData);
    }
  }, [certificateData]);

  const deleteCertificateMutation = useMutation({
    mutationFn: (id: number) => applicantService.deleteCertificate(id),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as number;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("info", message);
      handleRemoveCertificate(data);
      closeModal();
    },
  });

  const handleDeleteCertificate = (id: number) => {
    deleteCertificateMutation.mutate(id);
  };

  const handleUpdateCertificate = (id: number) => {
    const selectedCertificate = certificates.find(
      (certificate) => certificate.id === id
    );
    setSelectedCertificate(selectedCertificate);
    setValue("id", selectedCertificate?.id || 0);
    setValue("name", selectedCertificate?.name + "");
    setValue("organization", selectedCertificate?.organization + "");
    setValue("month", selectedCertificate?.month + "");
    setValue("year", selectedCertificate?.year + "");
    setValue("description", selectedCertificate?.description + "");
    setDescription(selectedCertificate?.description || "");
    setValue("url", selectedCertificate?.url + "");
    handleOpenModal("certificates");
  };

  return (
    <Card
      title={t("Certificates")}
      subtitle={
        certificates.length > 0
          ? ""
          : t("Provides evidence of your specific expertise and skills")
      }
      img={certificates.length > 0 ? "" : "/assets/svg/certificate_no_info.svg"}
      openModal={() => handleOpenModal("certificates")}
      edit={false}>
      {certificates.length > 0 && <div className="devide"></div>}
      {certificates.length > 0 && (
        <CertificateItems>
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-item">
              <div className="certificate-info">
                <div className="certificate-name">
                  <h3>{certificate.name}</h3>
                  <div className="actions">
                    <Edit
                      color="#ed1b2f"
                      cursor={"pointer"}
                      onClick={() => handleUpdateCertificate(certificate.id)}
                    />
                    <Trash2
                      color="#414042"
                      cursor={"pointer"}
                      onClick={() => handleDeleteCertificate(certificate.id)}
                    />
                  </div>
                </div>
                <div className="certificate-organization">
                  {certificate.organization}
                </div>
                <div className="certificate-date">
                  {certificate.month}/{certificate.year}{" "}
                </div>
                {certificate.description && (
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(certificate.description),
                    }}></div>
                )}
                {certificate.url && (
                  <Link to={certificate.url} className="certificate-url">
                    <span>{t("View certificate")}</span>
                    <ExternalLink color="#0e2eed" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </CertificateItems>
      )}
      <Modal
        isOpen={modal["certificates"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={true}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{t("Certificates")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <CertificatesContent>
              <div className="form-group">
                <InputFloating
                  name="name"
                  label={t("Certificate Name")}
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
                  label={t("Organization")}
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
                <InputFloating
                  name="url"
                  label={t("Certificate URL")}
                  value={watch("url")}
                  error={errors.url && t(errors.url.message + "")}
                  className={errors.url?.message ? "error" : isValidUrl}
                  onSetValue={useCallback(
                    (value: string) => setValue("url", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <h4 style={{ paddingBottom: "1.6rem" }}>{t("Description")}</h4>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
            </CertificatesContent>
          </div>
          <div className="modal-foot">
            <button type="button" className="cancel" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className="save"
              disabled={
                createCertificateMutation.isPending ||
                updateCertificateMutation.isPending
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

export default Certificates;
