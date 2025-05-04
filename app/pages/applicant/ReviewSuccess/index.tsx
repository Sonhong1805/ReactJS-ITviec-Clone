import { useTranslation } from "react-i18next";
import {
  PromoteReviewBox,
  ReviewSuccessBranding,
  ReviewSuccessContainer,
  ReviewSuccessWrapper,
  ReviewSucsessBox,
} from "./styled";
import LOGO from "/assets/images/logo.png";
import ROBBY_APPLY_SUCCESS from "/assets/svg/robby-apply-success.svg";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useCompaniesQuery } from "~/hooks/useCompaniesQuery";
import { useCompanyStore } from "~/stores/companyStore";
import useDebounce from "~/hooks/useDebounce";
import SelectInput from "~/components/SelectInput";
import { useCompanyQuery } from "~/hooks/useCompanyQuery";
import Loading from "~/components/Loading";
import { useReviewStore } from "~/stores/reviewStore";

const ReviewSuccess = () => {
  const { t } = useTranslation(["search"]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { isReviewSuccess } = useReviewStore();

  const {
    formState: { errors },
    setValue,
  } = useForm<{
    company: string;
  }>({
    defaultValues: {
      company: "",
    },
    resolver: zodResolver(schema(t)),
    mode: "onTouched",
  });
  const {
    selectedCompany,
    handleSelectedCompany,
    handleRemoveSelectedCompany,
  } = useCompanyStore();

  const handleGetInputValue = (value: string) => {
    setInputValue(value);
  };

  const inputDebounce = useDebounce(inputValue, 1000);

  const { data: companies, isPending } = useCompaniesQuery({
    name: inputDebounce,
  });
  useEffect(() => {
    if (!isPending && companies) {
      const options = companies.map((company) => ({
        value: company.slug,
        label: company.companyName,
      }));
      setCompanyOptions(options);
    }
  }, [isPending, companies]);

  const handleSetValue = (value: string) => {
    navigate(`/review/${value}`);
    setValue("company", value);
  };

  const { data: company, isPending: companyPending } = useCompanyQuery(
    slug as string
  );

  useEffect(() => {
    if (!slug) {
      navigate("/it-jobs", { replace: true });
      return;
    }

    if (!isReviewSuccess) {
      navigate(`/company/${slug}`, { replace: true });
    }
  }, []);

  if (!slug || companyPending) {
    return <Loading />;
  }

  return (
    <ReviewSuccessWrapper>
      <ReviewSuccessContainer>
        <ReviewSuccessBranding>
          <img src={LOGO} alt="logo itviec" />
        </ReviewSuccessBranding>
        <ReviewSucsessBox>
          <div className="robby-success">
            <img src={ROBBY_APPLY_SUCCESS} alt="robby apply success" />
          </div>
          <div className="thankyou-message">
            <h1>{t("Tuyệt vời! Đánh giá của bạn đã được ghi nhận")}</h1>
            <p>
              {t(
                "Chúng tôi sẽ thông báo đến bạn khi đánh giá của bạn dành cho"
              )}{" "}
              {company?.companyName} {t("được kiểm duyệt.")}
            </p>
            <div className="search-button">
              <Link to={`/company/${slug}`}>{t("Quay lại trang công ty")}</Link>
            </div>
          </div>
          <PromoteReviewBox>
            <div className="text">
              {t(
                "Ý kiến của bạn rất quan trọng. Tại sao bạn không gửi đánh giá khác ngay bây giờ?"
              )}
            </div>
            <div>
              <SelectInput
                className=""
                placeholder="Nhập tên công ty"
                options={companyOptions}
                selectedOption={selectedCompany}
                onSetValue={handleSetValue}
                onSelectedOption={handleSelectedCompany}
                onRemoveSelectedOption={handleRemoveSelectedCompany}
                onGetInputValue={handleGetInputValue}
                error={errors.company?.message}
              />
            </div>
          </PromoteReviewBox>
        </ReviewSucsessBox>
      </ReviewSuccessContainer>
    </ReviewSuccessWrapper>
  );
};

export default ReviewSuccess;
