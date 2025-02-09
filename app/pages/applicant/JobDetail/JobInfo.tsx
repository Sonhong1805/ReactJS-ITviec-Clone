import { Link } from "react-router";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaRegHeart, FaRegClock, FaHeart } from "react-icons/fa";
import {
  BorderDash,
  JobDetailBody,
  JobDetailHeader,
  JobDetailOverview,
  JobDetailRecruitment,
  JobDetailRight,
} from "./styled";
import { FiMapPin } from "react-icons/fi";
import IconWorkingModel from "~/components/Icon/IconWorkingModel";
import { useTranslation } from "react-i18next";

const JobInfo = () => {
  const { t, i18n } = useTranslation(["search"]);
  const language = i18n.language;

  return (
    <JobDetailRight className="col-8">
      <JobDetailHeader>
        <h1>Technical Lead (Java, Spring)</h1>
        <p>Persol Career Tech Studio Vietnam</p>
        <div className="job-salary">
          {true ? (
            <span className="salary-show">
              <LuCircleDollarSign />
              {/* {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(1000)}{" "} */}
              2,000 - 2,750 USD
            </span>
          ) : (
            <Link to={"/login"} className="salary-hide">
              <LuCircleDollarSign />
              {t("Sign in to view salary")}
            </Link>
          )}
        </div>
        <JobDetailRecruitment>
          <button>{t("Apply now")}</button>
          {false ? <FaHeart /> : <FaRegHeart />}
        </JobDetailRecruitment>
      </JobDetailHeader>
      <JobDetailBody>
        <div className="job-info">
          <FiMapPin />
          <span>Ha Noi - Ho Chi Minh</span>
        </div>
        <div className="job-info">
          <IconWorkingModel />
          <span>{t(`remote`)}</span>
        </div>
        <div className="job-info">
          <FaRegClock />
          <span> {t("Posted")}</span>
        </div>
        <div className="job-tags">
          <span>{t("Skills")}:</span>
          <ul>
            <li>
              <Link to={""}>ReactJS</Link>
            </li>
          </ul>
        </div>
      </JobDetailBody>
      <JobDetailOverview>
        <div className="overview-item">
          <h2>{t("Job description")}</h2>
          <ul>
            <li>Chế độ đãi ngộ tương xứng năng lực và đóng góp</li>
            <li>Chăm sóc sức khỏe và đời sống văn hóa tinh thần</li>
            <li>Cơ hội được học hỏi, đào tạo và phát triển nhanh</li>
          </ul>
        </div>
        <BorderDash></BorderDash>
        <div className="overview-item">
          <h2>{t("Job description")}</h2>
          <ul>
            <li>Phát triển các ứng dụng Android theo tài liệu</li>
            <li>Tìm hiểu kỹ thuật công nghệ mới cho từng bài toán</li>
            <li>
              Phối hợp với nhóm Kiểm thử, kiểm tra và sửa lỗi của ứng dụng
            </li>
            <li>Hỗ trợ, sửa lỗi sau triển khai.</li>
          </ul>
        </div>
        <BorderDash></BorderDash>
        <div className="overview-item">
          <h2>
            {" "}
            {language === "en" ? (
              <span>Top 10 reasons to join us</span>
            ) : (
              <span>10 Lý do để gia nhập công ty</span>
            )}
          </h2>
          <ul>
            <li>Phát triển các ứng dụng Android theo tài liệu</li>
            <li>Tìm hiểu kỹ thuật công nghệ mới cho từng bài toán</li>
            <li>
              Phối hợp với nhóm Kiểm thử, kiểm tra và sửa lỗi của ứng dụng
            </li>
            <li>Hỗ trợ, sửa lỗi sau triển khai.</li>
          </ul>
        </div>
      </JobDetailOverview>
    </JobDetailRight>
  );
};

export default JobInfo;
