import { useState } from "react";
import Card from "./Card";
import Modal from "react-modal";
import {
  AgreementCheck,
  customStyles,
  EducationContent,
  ModalContainer,
} from "./styled";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFloating from "~/components/InputFloating";
import SelectBase from "~/components/SelectBase";
import { months, years } from "~/constants/dateOptions";
import { X } from "feather-icons-react";

const Education = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [agreementCheck, setAgreementCheck] = useState(false);

  const schema = z.object({
    school: z
      .string()
      .nonempty({ message: t("Please enter your school name") }),
    major: z.string().nonempty({ message: t("Please enter your major") }),
    eduFromMonth: z.string().nonempty({ message: t("Please choose a time") }),
    eduFromYear: z.string().nonempty({ message: t("Please choose a time") }),
    eduToMonth: z.string().optional(),
    eduToYear: z.string().optional(),
    additionalDetails: z.string().optional(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IEducation>({
    defaultValues: {
      school: "",
      major: "",
      eduFromMonth: "",
      eduFromYear: "",
      eduToMonth: "",
      eduToYear: "",
      additionalDetails: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IEducation> = async (data: IEducation) => {
    if (!agreementCheck) {
      setError("eduToMonth", { message: t("Please choose a time") });
      setError("eduToYear", { message: t("Please choose a time") });
      return;
    }
    console.log(data);
  };

  const isValidSchool = watch("school") !== "" ? "success" : "";
  const isValidMajor = watch("major") !== "" ? "success" : "";
  const isValidEduFromMonth = watch("eduFromMonth") !== "" ? "success" : "";
  const isValidEduFromYear = watch("eduFromYear") !== "" ? "success" : "";
  const isValidEduToMonth = watch("eduToMonth") !== "" ? "success" : "";
  const isValidEduToYear = watch("eduToMonth") !== "" ? "success" : "";

  return (
    <Card
      title="Education"
      subtitle="Share your background education"
      img="/assets/svg/education_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>Education</h2>
            <X onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <EducationContent>
              <div className="form-group">
                <InputFloating
                  name="school"
                  label={t("School")}
                  required={true}
                  register={register}
                  error={errors.school && t(errors.school.message + "")}
                  className={errors.school?.message ? "error" : isValidSchool}
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="major"
                  label={t("Major")}
                  required={true}
                  register={register}
                  error={errors.major && t(errors.major.message + "")}
                  className={errors.major?.message ? "error" : isValidMajor}
                />
              </div>
              <div className="form-group">
                <AgreementCheck htmlFor="agreement-check">
                  <input
                    type="checkbox"
                    id="agreement-check"
                    onChange={() => setAgreementCheck((prev) => !prev)}
                  />
                  <span>{t("I am currently studying here")}</span>
                </AgreementCheck>
              </div>
              <div className="form-group date">
                <div className="form-select">
                  <h4>
                    From <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectBase
                        name="eduFromMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("eduFromMonth", value)
                        }
                        error={
                          errors.eduFromMonth &&
                          t(errors.eduFromMonth?.message + "")
                        }
                        className={
                          errors.eduFromMonth?.message
                            ? "error"
                            : isValidEduFromMonth
                        }
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="eduFromYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("eduFromYear", value)
                        }
                        error={
                          errors.eduFromYear &&
                          t(errors.eduFromYear?.message + "")
                        }
                        className={
                          errors.eduFromYear?.message
                            ? "error"
                            : isValidEduFromYear
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select">
                  <h4>
                    To <abbr>*</abbr>
                  </h4>
                  <div className="select">
                    <div>
                      <SelectBase
                        name="eduToMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("eduToMonth", value)
                        }
                        error={
                          errors.eduToMonth &&
                          t(errors.eduToMonth?.message + "")
                        }
                        className={
                          errors.eduToMonth?.message
                            ? "error"
                            : isValidEduToMonth
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="eduToYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("eduToYear", value)
                        }
                        error={
                          errors.eduToYear && t(errors.eduToYear?.message + "")
                        }
                        className={
                          errors.eduToYear?.message ? "error" : isValidEduToYear
                        }
                        disabled={agreementCheck}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <InputFloating
                  name="additionalDetails"
                  label={t("Additional details")}
                  register={register}
                />
              </div>
            </EducationContent>
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

export default Education;
