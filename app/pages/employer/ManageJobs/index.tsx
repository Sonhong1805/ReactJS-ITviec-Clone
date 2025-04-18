import React, { useState } from "react";
import {
  customStyles,
  ManageJobsContent,
  ManageJobsTable,
  ManageJobsWrapper,
  ModalContainer,
  SalaryBox,
} from "./styled";
import Pagination from "~/components/Pagination";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFloating from "~/components/InputFloating";
import RichTextEditor from "~/components/RichTextEditor";
import SelectBase from "~/components/SelectBase";
import currencies from "~/constants/currencies";
import InputBase from "~/components/InputBase";
import customSalary from "~/utils/customSalary";
import { years } from "~/constants/dateOptions";
import InputDate from "~/components/InputDate";
import { Edit, PlusCircle, Trash2 } from "feather-icons-react";
import IconCircleDollarSign from "~/components/Icon/IconCircleDollarSign";

const ManageJobs = () => {
  const { t } = useTranslation(["settings"]);
  const [isOpen, setIsOpen] = useState(false);
  const [descriptions, setDescriptions] = useState("");
  const [requirements, setRequirements] = useState("");

  const schema = z.object({
    title: z.string().nonempty({ message: t("Please enter your title") }),
    level: z.string().nonempty({ message: t("Please select your job level.") }),
    workingModel: z
      .string()
      .nonempty({ message: t("Please select your working model.") }),
    industry: z
      .string()
      .nonempty({ message: t("Please select your industry.") }),
    minSalary: z.string().nonempty({ message: t("Please enter min salary.") }),
    maxSalary: z.string().nonempty({ message: t("Please enter max salary.") }),
    startDate: z.string().nonempty({ message: t("Please choose a time") }),
    endDate: z.string().nonempty({ message: t("Please choose a time") }),
    currencySalary: z.string().default("VND"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<Job>({
    defaultValues: {
      title: "",
      level: "",
      workingModel: "",
      minSalary: "",
      maxSalary: "",
      currencySalary: "VND",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<Job> = async (data: Job) => {
    console.log(data);
  };

  const isValidTitle = watch("title") !== "" ? "success" : "";
  const isValidMinSalary = watch("minSalary") !== "" ? "success" : "";
  const isValidMaxSalary = watch("maxSalary") !== "" ? "success" : "";
  const isValidLevel = watch("level") !== "" ? "success" : "";
  const isValidWorkingModel = watch("workingModel") !== "" ? "success" : "";
  // const isValidIndustry = watch("industry") !== "" ? "success" : "";
  const isValidStartDate = watch("startDate") !== "" ? "success" : "";
  const isValidEndDate = watch("endDate") !== "" ? "success" : "";

  console.log(watch("currencySalary"));

  return (
    <ManageJobsWrapper>
      <div className="heading">
        <h2>Quản lý việc làm</h2>
        <button onClick={() => setIsOpen(true)}>
          <PlusCircle />
          Thêm
        </button>
      </div>
      <ManageJobsTable>
        <table>
          <thead>
            <tr>
              <th>Tên việc làm</th>
              <th>Các kỹ năng</th>
              <th>Hình thức</th>
              <th>Cấp bậc</th>
              <th style={{ width: "20%" }}>Thời gian</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <p>Singapore Java Fullstack Developer (Spring) Up to $3000</p>
                  <div className="salary">
                    <IconCircleDollarSign />
                    1,000 - 2,000 USD
                  </div>
                </td>
                <td>
                  <ul className="skills">
                    <li className="item">ReactJS</li>
                    <li className="item">NextJS</li>
                    <li className="item">NestJS</li>
                  </ul>
                </td>
                <td>
                  <p>Remote</p>
                </td>
                <td>
                  <p>Senior</p>
                </td>
                <td style={{ width: "20%" }}>
                  <div className="time">
                    <p>
                      <span className="col-5">Cập nhật:</span>
                      <span className="col-7">03-01-2024</span>{" "}
                    </p>
                    <p>
                      <span className="col-5">Hết hạn:</span>
                      <span className="col-7">03-04-2024</span>{" "}
                    </p>
                    <p>
                      <span className="col-5">Ngày tạo:</span>
                      <span className="col-7">02-04-2024</span>{" "}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="status success">Hoạt động</div>
                </td>
                <td>
                  <div className="icons">
                    <Edit />
                    <Trash2 />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ManageJobsTable>
      {/* <Pagination /> */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}>
        <ModalContainer>
          <div className="modal-head">
            <h2>Thêm mới việc làm</h2>
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          </div>
          <div className="modal-body">
            <ManageJobsContent>
              <div className="form-group">
                <InputFloating
                  name="Title"
                  label={t("Job title")}
                  required={true}
                  register={register}
                  error={errors.title && t(errors.title.message + "")}
                  className={errors.title?.message ? "error" : isValidTitle}
                />
              </div>
              <div className="form-group">
                <h3>Job salary</h3>
                <SalaryBox>
                  <div className="salary-currency">
                    <SelectBase
                      name="currencySalary"
                      defaultValue={currencies[0]}
                      register={register}
                      options={currencies}
                      onSetValue={(value: string) =>
                        setValue("currencySalary", value)
                      }
                    />
                    <div className="salary-input">
                      <InputBase
                        name="minSalary"
                        type="salary"
                        placeholder={t("From")}
                        register={register}
                        error={
                          errors.minSalary && t(errors.minSalary?.message + "")
                        }
                        className={
                          errors.minSalary?.message ? "error" : isValidMinSalary
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = customSalary(e.target.value);
                        }}
                      />
                      <span className="dash">-</span>
                      <InputBase
                        name="maxSalary"
                        type="salary"
                        placeholder={t("To")}
                        register={register}
                        error={
                          errors.maxSalary && t(errors.maxSalary?.message + "")
                        }
                        className={
                          errors.maxSalary?.message ? "error" : isValidMaxSalary
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = customSalary(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </SalaryBox>
              </div>
              <div className="form-group">
                <h3>
                  Job level <abbr>*</abbr>
                </h3>
                <SelectBase
                  name="level"
                  register={register}
                  placeholder={t("Select level")}
                  options={currencies}
                  onSetValue={(value: string) => setValue("level", value)}
                  error={errors.level && t(errors.level?.message + "")}
                  className={errors.level?.message ? "error" : isValidLevel}
                />
              </div>
              <div className="form-group">
                <h3>
                  Job working model <abbr>*</abbr>
                </h3>
                <SelectBase
                  name="workingModel"
                  register={register}
                  placeholder={t("Select working model")}
                  options={currencies}
                  onSetValue={(value: string) =>
                    setValue("workingModel", value)
                  }
                  error={
                    errors.workingModel && t(errors.workingModel?.message + "")
                  }
                  className={
                    errors.workingModel?.message ? "error" : isValidWorkingModel
                  }
                />
              </div>
              <div className="form-group">
                <h3>
                  Job industry <abbr>*</abbr>
                </h3>
                {/* <SelectBase
                  name="industry"
                  register={register}
                  placeholder={t("Select industry")}
                  options={currencies}
                  onSetValue={(value: string) => setValue("industry", value)}
                  error={errors.industry && t(errors.industry?.message + "")}
                  className={
                    errors.industry?.message ? "error" : isValidIndustry
                  }
                /> */}
              </div>
              <div className="form-group">
                <div className="date-group">
                  <div>
                    <h3>
                      Start date <abbr>*</abbr>
                    </h3>
                    <InputDate
                      name="startDate"
                      label="Start date"
                      register={register}
                      required={true}
                      error={
                        errors.startDate && t(errors.startDate.message + "")
                      }
                      className={
                        errors.startDate?.message ? "error" : isValidStartDate
                      }
                    />
                  </div>
                  <div>
                    <h3>
                      End Date <abbr>*</abbr>
                    </h3>
                    <InputDate
                      name="endDate"
                      label="End date"
                      register={register}
                      required={true}
                      error={errors.endDate && t(errors.endDate.message + "")}
                      className={
                        errors.endDate?.message ? "error" : isValidEndDate
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h3>Descriptions</h3>
                <RichTextEditor
                  content={descriptions}
                  setContent={setDescriptions}
                />
              </div>
              <div className="form-group">
                <h3>Requirements</h3>
                <RichTextEditor
                  content={requirements}
                  setContent={setRequirements}
                />
              </div>
            </ManageJobsContent>
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
    </ManageJobsWrapper>
  );
};

export default ManageJobs;
