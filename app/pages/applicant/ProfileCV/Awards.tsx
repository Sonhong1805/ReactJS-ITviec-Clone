import React, { useState } from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { AwardsContent, customStyles, ModalContainer } from "./styled";
import { IoCloseOutline } from "react-icons/io5";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "~/components/RichTextEditor";
import { FiFeather } from "react-icons/fi";
import InputFloating from "~/components/InputFloating";
import SelectBase from "~/components/SelectBase";
import { months, years } from "~/constants/dateOptions";

const Awards = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  const schema = z.object({
    awardsName: z
      .string()
      .nonempty({ message: t("Please enter your award name") }),
    awardsOrganization: z
      .string()
      .nonempty({ message: t("Please enter your organization") }),
    awardsMonth: z.string().nonempty({ message: t("Please choose a time") }),
    awardsYear: z.string().nonempty({ message: t("Please choose a time") }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IAwards>({
    defaultValues: {
      awardsName: "",
      awardsOrganization: "",
      awardsMonth: "",
      awardsYear: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IAwards> = async (data: IAwards) => {
    console.log(data);
  };

  const isValidAwardsName = watch("awardsName") !== "" ? "success" : "";
  const isValidAwardsOrganization =
    watch("awardsOrganization") !== "" ? "success" : "";
  const isValidAwardsMonth = watch("awardsMonth") !== "" ? "success" : "";
  const isValidAwardsYear = watch("awardsYear") !== "" ? "success" : "";

  return (
    <Card
      title="Awards"
      subtitle="Highlight your awards or recognitions"
      img="/assets/svg/award_no_info.svg"
      openModal={() => setIsOpen(true)}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Awards</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <AwardsContent>
              <div className="form-group">
                <InputFloating
                  name="awardsName"
                  label={t("Awards name")}
                  required={true}
                  register={register}
                  error={errors.awardsName && t(errors.awardsName.message + "")}
                  className={
                    errors.awardsName?.message ? "error" : isValidAwardsName
                  }
                />
              </div>
              <div className="form-group">
                <InputFloating
                  name="awardsOrganization"
                  label={t("Awards Organization")}
                  required={true}
                  register={register}
                  error={
                    errors.awardsOrganization &&
                    t(errors.awardsOrganization.message + "")
                  }
                  className={
                    errors.awardsOrganization?.message
                      ? "error"
                      : isValidAwardsOrganization
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
                        name="awardsMonth"
                        options={months()}
                        register={register}
                        placeholder="Month"
                        onSetValue={(value: string) =>
                          setValue("awardsMonth", value)
                        }
                        error={
                          errors.awardsMonth &&
                          t(errors.awardsMonth?.message + "")
                        }
                        className={
                          errors.awardsMonth?.message
                            ? "error"
                            : isValidAwardsMonth
                        }
                      />
                    </div>
                    <div>
                      <SelectBase
                        name="awardsYear"
                        options={years()}
                        register={register}
                        placeholder="Year"
                        onSetValue={(value: string) =>
                          setValue("awardsYear", value)
                        }
                        error={
                          errors.awardsYear &&
                          t(errors.awardsYear?.message + "")
                        }
                        className={
                          errors.awardsYear?.message
                            ? "error"
                            : isValidAwardsYear
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-select"></div>
              </div>
              <div className="form-group">
                <h4>Description</h4>
                <div className="placeholder-tips">
                  <div className="icon">
                    <FiFeather />
                  </div>
                  <div className="tips">
                    <strong>Tips: </strong>
                    Shortly describe the relevant category (innovation,
                    leadership,...) or the reason for the award.
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

export default Awards;
