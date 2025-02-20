import LOGO from "/assets/images/logo.png";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import {
  ApplyJobBox,
  ApplyJobBranding,
  ApplyJobContainer,
  ApplyJobFile,
  ApplyJobForm,
  ApplyJobGroup,
  ApplyJobLetter,
  ApplyJobSubmit,
  ApplyJobWrapper,
  customStyles,
  ModalForm,
} from "./styled";
import { FiChevronLeft, FiEye, FiUpload } from "react-icons/fi";
import InputFloating from "~/components/InputFloating";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputSelectFloating from "~/components/InputSelectFloating";
import locationService from "~/services/locationService";
import SwitchLanguage from "~/components/SwitchLanguage";

const ApplyJob = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState<string>("");
  const [selectedCV, setSelectedCV] = useState(true);
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const { t, i18n } = useTranslation(["apply", "auth"]);
  const language = i18n.language;
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilename(e.target.files[0].name);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const schema = z.object({
    username: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .min(4, t("Please enter at least 4 characters")),
    phone: z
      .string()
      .nonempty({ message: t("This field is required.") })
      .regex(/^(0[1-9][0-9]{8,9})$/, {
        message: t("Please enter a valid phone number", { ns: "auth" }),
      }),
    letter: z.string().optional(),
    file: z

      .custom<FileList>(
        (val) => val instanceof FileList,
        t("This field is required.")
      )
      .refine((files) => files.length > 0, t("This field is required."))
      .refine((files) => {
        const file = files.item(0);
        if (!file) return false;
        return (
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
      }, "Use .doc, .docx, or .pdf file format."),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TApplyJob>({
    defaultValues: {
      username: "",
      phone: "",
      file: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TApplyJob> = async (data: TApplyJob) => {
    console.log(data);
  };

  const isValidUsername = watch("username") !== "" ? "success" : "";
  const isValidPhone = watch("phone") !== "" ? "success" : "";
  const isValidLetter = watch("letter") !== "" ? "success" : "";

  useEffect(() => {
    (async () => {
      const response = await locationService.getProvinces({});
      if (response.data) {
        const data = response.data.map((data: any) => ({
          value: data.id,
          label: data.name,
        }));
        setProvinceOptions(data);
      }
    })();
  }, []);

  return (
    <ApplyJobWrapper>
      <ApplyJobContainer>
        <ApplyJobBranding>
          <button className="back" onClick={openModal}>
            <FiChevronLeft />
            <span>{t("Back")}</span>
          </button>
          <img src={LOGO} alt="logo itviec" />
          <SwitchLanguage />
        </ApplyJobBranding>
        <ApplyJobBox>
          <h2>[Urgent] Technical Business Analyst tại CUBICSTACK SOLUTIONS</h2>
          <ApplyJobForm onSubmit={handleSubmit(onSubmit)}>
            <h3>
              {t("Your CV")} <abbr>*</abbr>
            </h3>
            <ApplyJobFile
              htmlFor="current-file"
              className={selectedCV ? "active" : ""}
              onClick={() => setSelectedCV(true)}>
              <input
                type="radio"
                id="current-file"
                checked={selectedCV}
                name="selected-cv"
                onChange={() => {}}
              />
              <span></span>
              <div className="upload-cv">
                <span>{t("Use your current CV")}</span>
                <p className="current-project">
                  NGUYEN-HONG-SON-CV.pdf{" "}
                  <Link to={""}>
                    <FiEye />
                  </Link>
                </p>
                <div className="time-upload">
                  {t("Upload date:")} 22/07/2024
                </div>
              </div>
            </ApplyJobFile>
            <ApplyJobFile
              htmlFor="new-file"
              className={!selectedCV ? "active" : ""}
              onClick={() => setSelectedCV(false)}>
              <input
                type="radio"
                id="new-file"
                name="selected-cv"
                checked={!selectedCV}
                onChange={handleFileChange}
              />
              <span></span>
              <div className="upload-cv">
                <span>{t("Upload a new CV")}</span>
                <br />
                <div className="upload-file">
                  <label htmlFor="file">
                    <input
                      type="file"
                      id="file"
                      {...register("file")}
                      hidden
                      onChange={handleFileChange}
                    />
                    <FiUpload />
                    <div className="selected-file">{t("Choose file")}</div>
                  </label>
                  <div className="file-name">
                    {filename ? filename : t("No file chosen")}
                  </div>
                </div>
                {errors.file && (
                  <p className="file-error">{errors.file.message}</p>
                )}
                <p className="file-alert">
                  {t(
                    "Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password protection"
                  )}
                </p>
              </div>
            </ApplyJobFile>
            <ApplyJobGroup>
              <h3>{t("Personal information")}</h3>
              <InputFloating
                name="username"
                label={t("Full name", { ns: "auth" })}
                required={true}
                register={register}
                error={errors.username && "*" + t(errors.username.message + "")}
                className={errors.username?.message ? "error" : isValidUsername}
              />
              <InputFloating
                name="phone"
                register={register}
                label={t("Phone number", { ns: "auth" })}
                required={true}
                error={errors.phone && "*" + t(errors.phone?.message + "")}
                className={errors.phone?.message ? "error" : isValidPhone}
              />
              <InputSelectFloating
                name="locations"
                label={t("Preferred work location")}
                required={true}
                options={provinceOptions}
                maxLengh={3}
                field={t("locations")}
              />
            </ApplyJobGroup>
            <ApplyJobLetter>
              <h3>
                {t("Cover Letter")} <span>({t("Optional")})</span>
              </h3>
              <p className="advantages">
                {t(
                  "What skills, work projects or achievements make you a strong candidate?"
                )}
              </p>
              <textarea
                id="letter"
                {...register("letter")}
                maxLength={500}
                className={isValidLetter}
                placeholder={t(
                  "Details and specific examples will make your application stronger..."
                )}></textarea>
              <p className="characters">
                {language === "en" ? (
                  <>
                    <span>{500 - Number(watch("letter")?.length)}</span> of 500
                    characters remaining
                  </>
                ) : (
                  <>
                    Còn lại <span>{500 - Number(watch("letter")?.length)}</span>{" "}
                    trong tổng số 500 ký tự
                  </>
                )}
              </p>
            </ApplyJobLetter>
            <ApplyJobSubmit>{t("Send my CV")}</ApplyJobSubmit>
          </ApplyJobForm>
        </ApplyJobBox>
      </ApplyJobContainer>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <ModalForm>
          <div className="form-group">
            <h2>{t("Quit applying")}</h2>
            <IoCloseOutline onClick={closeModal} />
          </div>
          <p>
            {t(
              "Changes you made so far will not be saved. Are you sure you want to quit this page?"
            )}
          </p>
          <div className="button-group">
            <button onClick={closeModal}>{t("Continue applying")}</button>
            <button onClick={() => navigate(-1)}>{t("Confirm")}</button>
          </div>
        </ModalForm>
      </Modal>
      <ToastContainer />
    </ApplyJobWrapper>
  );
};

export default ApplyJob;
