import React, { useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { CertificatesContent, customStyles, ModalContainer } from "./styled";
import { IoCloseOutline } from "react-icons/io5";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RichTextEditor from "~/components/RichTextEditor";
import SelectBase from "~/components/SelectBase";
import InputFloating from "~/components/InputFloating";
import { months, years } from "~/constants/dateOptions";

const Certificates = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  const schema = z.object({
    certificateName: z
      .string()
      .nonempty({ message: t("Please enter your certificate name") }),
    certificateOrganization: z
      .string()
      .nonempty({ message: t("Please enter your organization") }),
    certificateMonth: z
      .string()
      .nonempty({ message: t("Please choose a time") }),
    certificateYear: z
      .string()
      .nonempty({ message: t("Please choose a time") }),
    certificateURL: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<ICertificates>({
    defaultValues: {
      certificateName: "",
      certificateOrganization: "",
      certificateMonth: "",
      certificateYear: "",
      certificateURL: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ICertificates> = async (
    data: ICertificates
  ) => {
    console.log(data);
  };

  const isValidCertificateName =
    watch("certificateName") !== "" ? "success" : "";
  const isValidCertificateOrganization =
    watch("certificateOrganization") !== "" ? "success" : "";
  const isValidCertificateMonth =
    watch("certificateMonth") !== "" ? "success" : "";
  const isValidCertificateYear =
    watch("certificateYear") !== "" ? "success" : "";

  return (
    <Card
      title="Certificates"
      subtitle="Provides evidence of your specific expertise and skills"
      img="/assets/svg/certificate_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Certificates</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <CertificatesContent>
              <div className="form-group">
                <InputFloating
                  name="certificateName"
                  label={t("Certificate name")}
                  required={true}
                  register={register}
                  error={
                    errors.certificateName &&
                    t(errors.certificateName.message + "")
                  }
                  className={
                    errors.certificateName?.message
                      ? "error"
                      : isValidCertificateName
                  }
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="certificateOrganization"
                  label={t("Organization")}
                  required={true}
                  register={register}
                  error={
                    errors.certificateOrganization &&
                    t(errors.certificateOrganization.message + "")
                  }
                  className={
                    errors.certificateOrganization?.message
                      ? "error"
                      : isValidCertificateOrganization
                  }
                />
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    Issue date <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectBase
                        name="certificateMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("certificateMonth", value)
                        }
                        error={
                          errors.certificateMonth &&
                          t(errors.certificateMonth?.message + "")
                        }
                        className={
                          errors.certificateMonth?.message
                            ? "error"
                            : isValidCertificateMonth
                        }
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="certificateYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("certificateYear", value)
                        }
                        error={
                          errors.certificateYear &&
                          t(errors.certificateYear?.message + "")
                        }
                        className={
                          errors.certificateYear?.message
                            ? "error"
                            : isValidCertificateYear
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select"></div>
              </div>
              <div className="form-group">
                <InputFloating
                  name="certificateURL"
                  label={t("Certificate URL")}
                  register={register}
                />
              </div>
              <div className="form-group">
                <h4 style={{ paddingBottom: "1.6rem" }}>Description</h4>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
            </CertificatesContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}>
              {t("Cancel")}
            </button>
            <button className="save" type="submit">
              {t("Save")}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </Card>
  );
};

export default Certificates;
