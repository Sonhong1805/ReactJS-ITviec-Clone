import LOGO from "/assets/images/logo.png";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
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
  SkeletonWrapper,
} from "./styled";
import InputFloating from "~/components/InputFloating";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputSelectFloating from "~/components/InputSelectFloating";
import locationService from "~/services/locationService";
import SwitchLanguage from "~/components/SwitchLanguage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/stores/userStore";
import showToast from "~/utils/showToast";
import "react-toastify/dist/ReactToastify.css";
import applicantService from "~/services/applicantService";
import Skeleton from "react-loading-skeleton";
import { useJobQuery } from "~/hooks/useJobQuery";
import useDebounce from "~/hooks/useDebounce";
import { useLocationStore } from "~/stores/locationStore";
import type { CreateApplicationPayload } from "~/services/applicationService";
import applicationService from "~/services/applicationService";
import { schema } from "./schema";
import { ChevronLeft, Eye, Upload } from "feather-icons-react";
import formatDate from "~/utils/formatDate";
import { useJobStore } from "~/stores/jobStore";
import Loading from "~/components/Loading";

const ApplyJob = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState<string>("");
  const [selectedCV, setSelectedCV] = useState(true);
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const { t, i18n } = useTranslation(["apply", "auth"]);
  const language = i18n.language;
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const {
    locations,
    handleAddLocation,
    handleRemoveLocation,
    handleAddLocations,
  } = useLocationStore();
  const { handleAppliedSuccess } = useJobStore();
  const queryClient = useQueryClient();

  const { id: userId, username, phoneNumber } = useUserStore((s) => s.user);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { data: job, isPending: jobPending } = useJobQuery(slug + "");

  useEffect(() => {
    setLoading(true);
    if (!jobPending && !job) {
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [jobPending, job]);

  const { data: applicant, isPending: applicantPending } = useQuery({
    queryKey: ["applicant", userId],
    queryFn: () => applicantService.getDetailByUser(userId),
    select: ({ data }) => data as Applicant,
  });

  useEffect(() => {
    setLoading(true);
    if (!applicantPending && !applicant) {
      showToast("error", "Chỉ ứng viên mới có thể ứng tuyển");
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      setLoading(false);
      setSelectedCV(!!applicant?.cv);
      setValue("cv", applicant?.cv + "");
      const locations =
        applicant?.locations.map(({ location }) => ({
          value: location,
          label: location,
        })) || [];
      handleAddLocations(locations);
    }
  }, [applicant, applicantPending]);

  const schemaResolver = schema(t, selectedCV, locations.length === 0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<Application>({
    defaultValues: {
      fullName: username || "",
      phoneNumber: phoneNumber || "",
      coverLetter: "",
      cv: "",
      location: "",
    },
    resolver: zodResolver(schemaResolver),
    mode: "onTouched",
  });

  const applyJobMutation = useMutation({
    mutationFn: ({ slug, body }: CreateApplicationPayload) =>
      applicationService.create({ slug, body }),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as Application;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      setSuccess(false);
      handleAppliedSuccess(data);
      navigate(`/apply/success/${slug + ""}`, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["job", slug + ""] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const onSubmit: SubmitHandler<Application> = async (data: Application) => {
    setSuccess(true);
    data.locations = locations.map((l) => l.label);
    delete data.location;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "cv" && value instanceof File && !selectedCV) {
        formData.append("cv", value || "");
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else if (value) {
        formData.append(key, value as string);
      }
    });
    if (selectedCV) formData.delete("cv");
    if (!job) return;
    applyJobMutation.mutate({ slug: job?.slug, body: formData });
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
  };

  const isValidFullName =
    watch("fullName") !== "" && watch("fullName") !== username ? "success" : "";
  const isValidPhoneNumber =
    watch("phoneNumber") !== "" && watch("phoneNumber") !== phoneNumber
      ? "success"
      : "";
  const isValidCoverLetter = watch("coverLetter") !== "" ? "success" : "";

  const locationDebounce = useDebounce(watch("location") + "", 1000);

  const { data: provinces } = useQuery({
    queryKey: ["province", locationDebounce],
    queryFn: () => locationService.getProvinces({ name: locationDebounce }),
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (provinces) {
      const options = provinces?.data
        .map((data: any) => ({
          value: data.name,
          label: data.name,
        }))
        .filter((option: Option) =>
          locations.map((location) => location.value !== option.value)
        );
      setProvinceOptions(options);
    }
  }, [provinces]);

  const handleGetFileCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilename(file.name);
      setValue("cv", file);
    }
  };

  return (
    <ApplyJobWrapper>
      {success && <Loading />}
      {applicantPending || loading || jobPending || !job ? (
        <SkeletonWrapper>
          <Skeleton style={{ height: "100vh", borderRadius: ".8rem" }} />
        </SkeletonWrapper>
      ) : (
        <ApplyJobContainer>
          <ApplyJobBranding>
            <button className="back" onClick={openModal}>
              <ChevronLeft />
              <span>{t("Back")}</span>
            </button>
            <img src={LOGO} alt="logo itviec" />
            <SwitchLanguage />
          </ApplyJobBranding>
          <ApplyJobBox>
            <h2>{job.title}</h2>
            <ApplyJobForm onSubmit={handleSubmit(onSubmit)}>
              <h3>
                {t("Your CV")} <abbr>*</abbr>
              </h3>
              {applicant?.cv && (
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
                      {applicant?.cv.split("/")[2]}{" "}
                      <Link to={applicant?.cvUrl} target="_blank">
                        <Eye />
                      </Link>
                    </p>
                    <div className="time-upload">
                      {t("Upload date:")}{" "}
                      {job.uploadAt && formatDate(job.uploadAt)}
                    </div>
                  </div>
                </ApplyJobFile>
              )}
              <ApplyJobFile
                htmlFor="my-cv"
                className={!selectedCV ? `active` : ""}
                onClick={() => setSelectedCV(false)}>
                <input
                  type="radio"
                  id="my-cv"
                  name="selected-cv"
                  checked={!selectedCV}
                  onChange={() => {}}
                />
                <span></span>
                <div className={`upload-cv`}>
                  <span>{t("Upload a new CV")}</span>
                  <br />
                  <div className="upload-file">
                    <label htmlFor="cv">
                      <input
                        type="file"
                        id="cv"
                        {...register("cv")}
                        hidden
                        onChange={handleGetFileCV}
                        accept=".doc, .docx, .pdf"
                      />
                      <Upload />
                      <div className="selected-file">{t("Choose file")}</div>
                    </label>
                    <div className="file-name">
                      {filename ? filename : t("No file chosen")}
                    </div>
                  </div>
                  {errors.cv && (
                    <p className="file-error">{errors.cv.message}</p>
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
                  name="fullName"
                  label={t("Full name", { ns: "auth" })}
                  required={true}
                  register={register}
                  error={errors.fullName && t(errors.fullName.message + "")}
                  className={
                    errors.fullName?.message ? "error" : isValidFullName
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
                    errors.phoneNumber?.message ? "error" : isValidPhoneNumber
                  }
                />
                <InputSelectFloating
                  name="location"
                  label={t("Preferred work location")}
                  register={register}
                  required={true}
                  options={provinceOptions}
                  maxLengh={3}
                  field={t("locations")}
                  value={watch("location") + ""}
                  selectedOptions={locations}
                  onAddOption={handleAddLocation}
                  onRemoveOption={handleRemoveLocation}
                  error={errors.location?.message}
                  onReset={() => setValue("location", "")}
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
                  id="coverLetter"
                  {...register("coverLetter")}
                  maxLength={500}
                  className={isValidCoverLetter}
                  placeholder={t(
                    "Details and specific examples will make your application stronger..."
                  )}></textarea>
                <p className="characters">
                  {language === "en" ? (
                    <>
                      <span>{500 - Number(watch("coverLetter")?.length)}</span>{" "}
                      of 500 characters remaining
                    </>
                  ) : (
                    <>
                      Còn lại{" "}
                      <span>{500 - Number(watch("coverLetter")?.length)}</span>{" "}
                      trong tổng số 500 ký tự
                    </>
                  )}
                </p>
              </ApplyJobLetter>
              <ApplyJobSubmit>{t("Send my CV")}</ApplyJobSubmit>
            </ApplyJobForm>
          </ApplyJobBox>
        </ApplyJobContainer>
      )}
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
            <button onClick={() => navigate(`/job/${job?.slug}`)}>
              {t("Confirm")}
            </button>
          </div>
        </ModalForm>
      </Modal>
      <ToastContainer />
    </ApplyJobWrapper>
  );
};

export default ApplyJob;
