import { useCallback, useEffect, useMemo, useState } from "react";
import {
  customStyles,
  LabelRadio,
  ManageJobsContent,
  ManageJobsTable,
  ManageJobsWrapper,
  ModalContainer,
  SalaryBox,
} from "./styled";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFloating from "~/components/InputFloating";
import RichTextEditor from "~/components/RichTextEditor";
import SelectBase from "~/components/SelectBase";
import currencies from "~/constants/currencies";
import InputBase from "~/components/InputBase";
import customSalary from "~/utils/customSalary";
import InputDate from "~/components/InputDate";
import {
  ChevronDown,
  Edit,
  Eye,
  Play,
  PlusCircle,
  Trash2,
  X,
} from "feather-icons-react";
import IconCircleDollarSign from "~/components/Icons/IconCircleDollarSign";
import { schema } from "./schema";
import { useCompanyStore } from "~/stores/companyStore";
import formatSalary from "~/utils/formatSalary";
import { formatTime } from "~/utils/formatTime";
import cities from "~/constants/cities";
import levels from "~/constants/levels";
import useValidation from "~/hooks/useValidation";
import getModels from "~/constants/getModels";
import InputSelectFloating from "~/components/InputSelectFloating";
import { useSkillsQuery } from "~/hooks/useSkillsQuery";
import useDebounce from "~/hooks/useDebounce";
import { useSkillStore } from "~/stores/skillStore";
import { useMutation } from "@tanstack/react-query";
import jobService from "~/services/jobService";
import showToast from "~/utils/showToast";
import { useModalStore } from "~/stores/modalStore";
import formatSalaryRange from "~/utils/formatSalaryRange";
import Pagination from "~/components/Pagination";
import ModalView from "./ModalView";
import ModalDelete from "./ModalDelete";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FilterBox from "~/components/FilterBox";
import { useGetAllJobQuery } from "~/hooks/useGetAllJobQuery";

const ManageJobs = () => {
  const { t } = useTranslation(["search"]);
  const { modal, handleOpenModal, handleCloseModal } = useModalStore();
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [reason, setReason] = useState("");
  const [skillOptions, setSkillOptions] = useState<Option[]>([]);
  const [selectedJob, setSelectedJob] = useState<CompanyJob | null>(null);
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [statusValue, setStatusValue] = useState<string[]>([]);
  const [levelValue, setLevelValue] = useState<string[]>([]);
  const [currencyValue, setCurrencyValue] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const {
    jobs,
    pagination,
    handleSaveJobs,
    handleSavePagination,
    handleCreateJob,
    handleUpdateJob,
  } = useCompanyStore();
  const workingModels = getModels(t);
  const {
    skillOptionsTmp,
    handleAddSkillOption,
    handleRemoveSkillOption,
    handleAddSkillOptions,
  } = useSkillStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<CompanyJob>({
    defaultValues: {
      title: "",
      level: "",
      label: "",
      workingModel: "",
      minSalary: "",
      maxSalary: "",
      currencySalary: "VND",
      startDate: "",
      endDate: "",
      address: "",
      skill: "",
      location: "",
    },
    resolver: zodResolver(schema(t, skillOptionsTmp.length === 0)),
    mode: "onChange",
  });

  const closeModal = () => {
    handleCloseModal("manage-job");
    reset();
    setValue("location", "");
    setDescription("");
    setRequirement("");
    setReason("");
    handleAddSkillOptions([]);
  };

  const createJobMutation = useMutation({
    mutationFn: (body: CompanyJob) => jobService.create(body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as CompanyJob;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleCreateJob(data);
      closeModal();
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: (body: CompanyJob) => jobService.update(watch("id"), body),

    onSuccess: (response) => {
      const message = response.message as string;
      const data = response.data as CompanyJob;
      if (!data && message) {
        showToast("error", message);
        return;
      }
      showToast("success", message);
      handleUpdateJob(data);
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<CompanyJob> = async (data: CompanyJob) => {
    data.description = description;
    data.requirement = requirement;
    data.reason = reason;
    data.minSalary = +data.minSalary;
    data.maxSalary = +data.maxSalary;
    data.skillIds = skillOptionsTmp.map((option) => +option.value);
    delete data.skill;
    if (watch("id")) {
      data.startDate = data.startDate.split("T")[0];
      data.endDate = data.endDate.split("T")[0];
      updateJobMutation.mutate(data);
    } else {
      createJobMutation.mutate(data);
    }
  };

  const isValidTitle = useValidation(watch("title"), selectedJob?.title);
  const isValidMinSalary = useValidation(
    watch("minSalary") + "",
    selectedJob?.minSalary + ""
  );
  const isValidMaxSalary = useValidation(
    watch("maxSalary") + "",
    selectedJob?.maxSalary + ""
  );
  const isValidLevel = useValidation(watch("level"), selectedJob?.level);
  const isValidWorkingModel = useValidation(
    watch("workingModel"),
    selectedJob?.workingModel
  );
  const isValidLocation = useValidation(
    watch("location"),
    selectedJob?.location
  );
  const isValidAddress = useValidation(watch("address"), selectedJob?.address);
  const isValidStartDate = useValidation(
    watch("startDate"),
    selectedJob?.startDate
  );
  const isValidEndDate = useValidation(watch("endDate"), selectedJob?.endDate);

  const params = useMemo(
    () => ({
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      ...(sortValue.length > 0 ? { sort: sortValue.join(",") } : {}),
      ...(statusValue.length > 0 ? { status: statusValue } : {}),
      ...(levelValue.length > 0 ? { levels: levelValue } : {}),
      ...(currencyValue.length > 0 ? { currencies: currencyValue } : {}),
    }),
    [
      pagination.page,
      pagination.limit,
      sortValue,
      statusValue,
      levelValue,
      currencyValue,
    ]
  );

  const { data: companyJobs, isPending: companyJobsPending } =
    useGetAllJobQuery(params as any);

  useEffect(() => {
    if (!companyJobsPending && companyJobs) {
      handleSaveJobs(companyJobs?.data || []);
      handleSavePagination(companyJobs?.pagination || {});
    }
  }, [companyJobs, companyJobsPending]);

  const skillDebounce = useDebounce(watch("skill") + "", 1000);

  const { data: skills, isPending: skillsPending } =
    useSkillsQuery(skillDebounce);

  useEffect(() => {
    if (!skillsPending && skills) {
      const options = skills
        ?.map((data: any) => ({
          value: data.id,
          label: data.name,
        }))
        .filter((option: Option) =>
          skillOptionsTmp.map((skill) => skill.value !== option.value)
        );
      setSkillOptions(options);
    }
  }, [skills, skillsPending]);

  const handleOpenModalDelete = (job: CompanyJob) => {
    setSelectedJob(job);
    handleOpenModal("confirm-delete");
  };

  const handleCloseModalDelete = useCallback(() => {
    setSelectedJob(null);
    handleCloseModal("confirm-delete");
  }, []);

  const handleOpenModalEdit = (job: CompanyJob) => {
    handleOpenModal("manage-job");
    setSelectedJob(job);
    setValue("id", job.id);
    setValue("title", job.title);
    setValue("label", job.label);
    setValue("currencySalary", job.currencySalary);
    setValue("minSalary", job.minSalary);
    setValue("maxSalary", job.maxSalary);
    setValue("level", job.level);
    setValue("workingModel", job.workingModel);
    setValue("location", job.location);
    setValue("address", job.address || "");
    setValue("startDate", job.startDate || "");
    setValue("endDate", job.endDate || "");
    setDescription(job.description || "");
    setRequirement(job.requirement || "");
    setReason(job.reason || "");
    const jobSkills = job.skills?.map((data: any) => ({
      value: data.id,
      label: data.name,
    }));

    handleAddSkillOptions(
      job.skills?.map((data: any) => ({
        value: data.id,
        label: data.name,
      }))
    );

    const filteredSkillOptions = skillOptions.filter((option: Option) =>
      jobSkills.every((skill) => skill.value !== option.value)
    );

    setSkillOptions(filteredSkillOptions);
  };

  const handleOpenModalView = (job: CompanyJob) => {
    setSelectedJob(job);
    handleOpenModal("job-view");
  };

  const handleCloseModalView = useCallback(() => {
    setSelectedJob(null);
    handleCloseModal("job-view");
  }, []);

  const handleGetValueSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const combinedValue = name + value;
    if (selectedValue === value) {
      setSelectedValue(null);
      setSortValue((prev) => prev.filter((item) => item !== combinedValue));
    } else {
      setSelectedValue(value);
      setSortValue((prev) => {
        const filtered = prev.filter((item) => !item.startsWith(name));
        if (selectedValue === value) return filtered;
        return [...filtered, combinedValue];
      });
    }
  };

  const handleGetValueStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatusValue((prev) => {
      const exits = prev.find((item) => item === value);
      if (exits) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };
  const handleGetValueLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLevelValue((prev) => {
      const exits = prev.find((item) => item === value);
      if (exits) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };
  const handleGetValueCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrencyValue((prev) => {
      const exits = prev.find((item) => item === value);
      if (exits) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  return (
    <ManageJobsWrapper>
      {companyJobsPending ? (
        <Skeleton style={{ minHeight: "8.76rem", marginBottom: "2rem" }} />
      ) : (
        <div className="heading">
          <h2>{t("Manage Jobs", { ns: "header" })}</h2>
          <button onClick={() => handleOpenModal("manage-job")}>
            <PlusCircle />
            {t("Add", { ns: "profile" })}
          </button>
        </div>
      )}
      {companyJobsPending ? (
        <Skeleton
          count={8}
          style={{ minHeight: "6.48rem", marginBottom: "1.6rem" }}
        />
      ) : (
        <ManageJobsTable>
          <table>
            <thead>
              <tr>
                <th>{t("No.")}</th>
                <th style={{ width: "20%" }}>
                  <div className="space-between">
                    {t("Job title")}
                    <div className="ic-sort">
                      <label>
                        <input
                          type="checkbox"
                          name="title"
                          value=":ASC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("title:ASC")}
                        />
                        <Play fill="#414042" />
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="title"
                          value=":DESC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("title:DESC")}
                        />
                        <Play fill="#414042" />
                      </label>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="space-between">
                    {t("Salary")}
                    <FilterBox>
                      <>
                        <div className="space-between space-top">
                          {t("Min salary")}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="minSalary"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("minSalary:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="minSalary"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("minSalary:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                        <div className="space-between space-top">
                          {t("Max salary")}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="maxSalary"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("maxSalary:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="maxSalary"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("maxSalary:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="label" htmlFor="usd">
                            <input
                              type="checkbox"
                              id="usd"
                              name="currency"
                              value="USD"
                              hidden
                              className="input"
                              onChange={handleGetValueCurrency}
                              checked={currencyValue.includes("USD")}
                            />
                            <span className="text">USD</span>
                          </label>
                          <label className="label" htmlFor="vnd">
                            <input
                              type="checkbox"
                              id="vnd"
                              name="currency"
                              value="VND"
                              hidden
                              className="input"
                              onChange={handleGetValueCurrency}
                              checked={currencyValue.includes("VND")}
                            />
                            <span className="text">VND</span>
                          </label>
                        </div>
                      </>
                    </FilterBox>
                  </div>
                </th>
                <th>
                  <div className="space-between">
                    {t("Level")}
                    <FilterBox>
                      <>
                        {levels.map((level) => (
                          <label
                            className="label"
                            key={level.value}
                            htmlFor={level.value}>
                            <input
                              type="checkbox"
                              id={level.value}
                              name="level"
                              value={level.value}
                              hidden
                              className="input"
                              onChange={handleGetValueLevel}
                              checked={levelValue.includes(level.value)}
                            />
                            <span className="text">{level.label}</span>
                          </label>
                        ))}
                      </>
                    </FilterBox>
                  </div>
                </th>
                <th style={{ width: "20%" }}>
                  <div className="space-between">
                    {t("Time.label")}
                    <FilterBox>
                      <>
                        <div className="space-between space-top">
                          {t("Created at")}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="createdAt"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("createdAt:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="createdAt"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("createdAt:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                        <div className="space-between space-top">
                          {t("Updated at", { ns: "search" })}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="updatedAt"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("updatedAt:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="updatedAt"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("updatedAt:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                      </>
                    </FilterBox>
                  </div>
                </th>
                <th className="space-between">
                  {t("Status")}
                  <FilterBox>
                    <>
                      <label className="label" htmlFor="active">
                        <input
                          type="checkbox"
                          id="active"
                          name="status"
                          value="active"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("active")}
                        />
                        <span className="text">{t("Active")}</span>
                      </label>
                      <label className="label" htmlFor="expired">
                        <input
                          type="checkbox"
                          id="expired"
                          name="status"
                          value="expired"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("expired")}
                        />
                        <span className="text">
                          {t("Expired", { ns: "profile" })}
                        </span>
                      </label>
                      <label className="label" htmlFor="deleted">
                        <input
                          type="checkbox"
                          id="deleted"
                          name="status"
                          value="deleted"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("deleted")}
                        />
                        <span className="text">
                          {t("Deleted", { ns: "search" })}
                        </span>
                      </label>
                    </>
                  </FilterBox>
                </th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </td>
                    <td>
                      <p>{job.title}</p>
                    </td>
                    <td>
                      <div className="salary">
                        <IconCircleDollarSign />
                        {job.currencySalary === "VND" ? (
                          formatSalaryRange(+job.minSalary, +job.maxSalary)
                        ) : (
                          <>
                            {formatSalary(+job.minSalary)} -{" "}
                            {formatSalary(+job.maxSalary)} {job.currencySalary}
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <p>{t(job.level)}</p>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="time">
                        <div className="time-label">
                          <span className="col-5">{t("Updated at")}:</span>
                          <span className="col-7 time-value">
                            {formatTime(job.updatedAt + "")}
                            <ChevronDown
                              color="#121212"
                              style={{ marginLeft: "4px" }}
                            />
                          </span>
                        </div>
                        <div className="time-detail">
                          {job.deletedAt && (
                            <p>
                              <span className="col-5">{t("Deleted at")}:</span>
                              <span className="col-7 time-value">
                                {formatTime(job.deletedAt + "", true)}
                              </span>
                            </p>
                          )}
                          <p>
                            <span className="col-5">{t("Updated at")}:</span>
                            <span className="col-7 time-value">
                              {formatTime(job.updatedAt + "", true)}
                            </span>
                          </p>
                          <p>
                            <span className="col-5">{t("Start")}:</span>
                            <span className="col-7 time-value">
                              {job.startDate
                                ? formatTime(job.startDate + "", true, 0)
                                : "Chưa tạo"}
                            </span>
                          </p>
                          <p>
                            <span className="col-5">{t("End")}:</span>
                            <span className="col-7 time-value">
                              {job.endDate
                                ? formatTime(job.endDate + "", true, 0)
                                : "Chưa tạo"}
                            </span>
                          </p>
                          <p>
                            <span className="col-5">{t("Created at")}:</span>
                            <span className="col-7 time-value">
                              {formatTime(job.createdAt + "", true)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {job.deletedAt ? (
                        <div className="status deleted">{t("Deleted")}</div>
                      ) : job.endDate && new Date(job.endDate) < new Date() ? (
                        <div className="status expired">{t("Expired")}</div>
                      ) : (
                        <div className="status success">{t("Active")}</div>
                      )}
                    </td>
                    <td>
                      <div className="icons">
                        <Eye
                          color="#0ab305"
                          onClick={() => handleOpenModalView(job)}
                        />
                        {!job.deletedAt && (
                          <>
                            <Edit
                              color="#ed1b2f"
                              onClick={() => handleOpenModalEdit(job)}
                            />
                            <Trash2
                              color="#414042"
                              onClick={() => handleOpenModalDelete(job)}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div style={{ textAlign: "center" }}>
                      {t("No jobs available")}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ManageJobsTable>
      )}
      {jobs.length > 0 && (
        <Pagination
          pagination={pagination}
          onChangePagination={handleSavePagination}
        />
      )}
      <ModalView selectedJob={selectedJob} onClose={handleCloseModalView} />
      <Modal
        isOpen={modal["manage-job"]}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-head">
            <h2>{!watch("id") ? t("Add new job") : t("Edit a job")}</h2>
            <X onClick={closeModal} />
          </div>
          <div className="modal-body">
            <ManageJobsContent>
              <div className="form-group">
                <InputFloating
                  name="title"
                  label={t("Job title")}
                  required={true}
                  value={watch("title")}
                  error={errors.title && t(errors.title.message + "")}
                  className={errors.title?.message ? "error" : isValidTitle}
                  onSetValue={useCallback(
                    (value: string) => setValue("title", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <h3>{t("Label")}</h3>
                <div>
                  <LabelRadio htmlFor="hot">
                    <input
                      type="radio"
                      id="hot"
                      {...register("label")}
                      checked={watch("label") === "HOT"}
                      value="HOT"
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("HOT")}</span>
                    </div>
                  </LabelRadio>
                  <LabelRadio
                    htmlFor="super_hot"
                    style={{ marginTop: "1.6rem" }}>
                    <input
                      type="radio"
                      id="super_hot"
                      {...register("label")}
                      checked={watch("label") === "SUPER HOT"}
                      value="SUPER HOT"
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("SUPER HOT")}</span>
                    </div>
                  </LabelRadio>
                  <LabelRadio htmlFor="new" style={{ marginTop: "1.6rem" }}>
                    <input
                      type="radio"
                      id="new"
                      {...register("label")}
                      checked={watch("label") === "NEW"}
                      value="NEW"
                    />
                    <span></span>
                    <div className="text">
                      <span>{t("NEW")}</span>
                    </div>
                  </LabelRadio>
                </div>
              </div>
              <div className="form-group">
                <h3>
                  {t("Salary")} <abbr>*</abbr>
                </h3>
                <SalaryBox>
                  <div className="salary-currency">
                    <SelectBase
                      name="currencySalary"
                      register={register}
                      options={currencies}
                      onSetValue={(value: string) =>
                        setValue("currencySalary", value)
                      }
                      defaultValue={
                        watch("currencySalary")
                          ? {
                              value: watch("currencySalary") || "VND",
                              label: watch("currencySalary") || "VND",
                            }
                          : undefined
                      }
                    />
                    <div className="salary-input">
                      <InputBase
                        name="minSalary"
                        type="salary"
                        placeholder={t("From", { ns: "profile" })}
                        register={register}
                        error={
                          errors.minSalary && t(errors.minSalary?.message + "")
                        }
                        className={
                          errors.minSalary?.message ? "error" : isValidMinSalary
                        }
                        defaultValue={
                          watch("minSalary")
                            ? customSalary(watch("minSalary") + "")
                            : ""
                        }
                      />
                      <span className="dash">-</span>
                      <InputBase
                        name="maxSalary"
                        type="salary"
                        placeholder={t("To", { ns: "profile" })}
                        register={register}
                        error={
                          errors.maxSalary && t(errors.maxSalary?.message + "")
                        }
                        className={
                          errors.maxSalary?.message ? "error" : isValidMaxSalary
                        }
                        defaultValue={
                          watch("maxSalary")
                            ? customSalary(watch("maxSalary") + "")
                            : ""
                        }
                      />
                    </div>
                  </div>
                </SalaryBox>
              </div>
              <div className="form-group">
                <h3>
                  {t("Level")} <abbr>*</abbr>
                </h3>
                <SelectBase
                  name="level"
                  register={register}
                  placeholder={t("Select level", { ns: "profile" })}
                  options={levels}
                  onSetValue={(value: string) => setValue("level", value)}
                  error={errors.level && t(errors.level?.message + "")}
                  className={errors.level?.message ? "error" : isValidLevel}
                  defaultValue={
                    watch("level")
                      ? {
                          value: watch("level"),
                          label: watch("level"),
                        }
                      : undefined
                  }
                />
              </div>
              <div className="form-group">
                <h3>
                  {t("Working Model")} <abbr>*</abbr>
                </h3>
                <SelectBase
                  name="workingModel"
                  register={register}
                  placeholder={t("Select model", { ns: "profile" })}
                  options={workingModels}
                  onSetValue={(value: string) =>
                    setValue("workingModel", value)
                  }
                  error={
                    errors.workingModel && t(errors.workingModel?.message + "")
                  }
                  className={
                    errors.workingModel?.message ? "error" : isValidWorkingModel
                  }
                  defaultValue={
                    watch("workingModel")
                      ? {
                          value: watch("workingModel"),
                          label: watch("workingModel"),
                        }
                      : undefined
                  }
                />
              </div>
              <div className="form-group">
                <h3>
                  {t("City")} <abbr>*</abbr>
                </h3>
                <SelectBase
                  name="location"
                  register={register}
                  placeholder={t("Select city")}
                  options={cities}
                  onSetValue={(value: string) => setValue("location", value)}
                  error={errors.location && t(errors.location?.message + "")}
                  className={
                    errors.location?.message ? "error" : isValidLocation
                  }
                  defaultValue={
                    watch("location")
                      ? {
                          value: watch("location"),
                          label: watch("location"),
                        }
                      : undefined
                  }
                />
              </div>
              <div className="form-group">
                <h3>
                  {t("Address")} <abbr>*</abbr>
                </h3>
                <InputFloating
                  name="address"
                  label={t("Address (Street, district,...)", { ns: "profile" })}
                  value={watch("address")}
                  className={isValidAddress}
                  onSetValue={useCallback(
                    (value: string) => setValue("address", value),
                    []
                  )}
                />
              </div>
              <div className="form-group">
                <div className="date-group">
                  <div>
                    <h3>
                      {t("Start date", { ns: "profile" })} <abbr>*</abbr>
                    </h3>
                    <InputDate
                      name="startDate"
                      label={t("Start date", { ns: "profile" })}
                      value={watch("startDate")}
                      required={true}
                      error={
                        errors.startDate && t(errors.startDate.message + "")
                      }
                      className={
                        errors.startDate?.message ? "error" : isValidStartDate
                      }
                      onSetValue={useCallback(
                        (value: string) => setValue("startDate", value),
                        []
                      )}
                    />
                  </div>
                  <div>
                    <h3>
                      {t("End date", { ns: "profile" })} <abbr>*</abbr>
                    </h3>
                    <InputDate
                      name="endDate"
                      label={t("End date", { ns: "profile" })}
                      value={watch("endDate")}
                      required={true}
                      error={errors.endDate && t(errors.endDate.message + "")}
                      className={
                        errors.endDate?.message ? "error" : isValidEndDate
                      }
                      onSetValue={useCallback(
                        (value: string) => setValue("endDate", value),
                        []
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h3>
                  {t("Skills")} <abbr>*</abbr>
                </h3>
                <InputSelectFloating
                  name="skill"
                  label={t("Skills")}
                  register={register}
                  required={true}
                  options={skillOptions}
                  maxLengh={3}
                  field={t("skills")}
                  value={watch("skill") + ""}
                  selectedOptions={skillOptionsTmp}
                  onAddOption={handleAddSkillOption}
                  onRemoveOption={handleRemoveSkillOption}
                  error={errors.skill?.message}
                  onReset={() => setValue("skill", "")}
                  isPending={skillsPending}
                />
              </div>
              <div className="form-group">
                <h3>{t("Job description")}</h3>
                <RichTextEditor
                  content={description}
                  setContent={setDescription}
                />
              </div>
              <div className="form-group">
                <h3>{t("Your skills and experience")}</h3>
                <RichTextEditor
                  content={requirement}
                  setContent={setRequirement}
                />
              </div>
              <div className="form-group">
                <h3>{t("Why you'll love working here")}</h3>
                <RichTextEditor content={reason} setContent={setReason} />
              </div>
            </ManageJobsContent>
          </div>
          <div className="modal-foot">
            <button
              type="button"
              disabled={
                updateJobMutation.isPending || createJobMutation.isPending
              }
              className="cancel"
              onClick={closeModal}>
              {t("Cancel", { ns: "profile" })}
            </button>
            <button
              className="save"
              type="submit"
              disabled={
                updateJobMutation.isPending || createJobMutation.isPending
              }>
              {t("Save", { ns: "profile" })}
            </button>
          </div>
        </ModalContainer>
      </Modal>
      <ModalDelete selectedJob={selectedJob} onClose={handleCloseModalDelete} />
    </ManageJobsWrapper>
  );
};

export default ManageJobs;
