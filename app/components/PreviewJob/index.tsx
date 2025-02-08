import { Link } from "react-router";
import {
  BorderDash,
  PreviewCompanyInfo,
  PreviewJobBody,
  PreviewJobCompany,
  PreviewJobContainer,
  PreviewJobHeader,
  PreviewJobOverview,
  PreviewJobReasons,
  PreviewJobRecruitment,
} from "./styled";
import { LuCircleDollarSign } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { FaRegHeart, FaRegClock, FaHeart } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import IconWorkingModel from "../Icon/IconWorkingModel";

const PreviewJob = () => {
  const { t, i18n } = useTranslation(["search"]);
  const language = i18n.language;

  return (
    <>
      {false ? (
        <PreviewJobContainer>
          <PreviewJobHeader>
            <PreviewJobCompany>
              <Skeleton className="logo-company" />
            </PreviewJobCompany>
          </PreviewJobHeader>
          <PreviewJobBody>
            <Skeleton style={{ minHeight: "41.2rem" }} />
          </PreviewJobBody>
        </PreviewJobContainer>
      ) : (
        <PreviewJobContainer>
          <PreviewJobHeader>
            <PreviewJobCompany>
              <Link to={""} className="logo-company">
                <img
                  src={"/assets/images/Thankslab-Logo.png"}
                  alt="logo-company"
                />
              </Link>
              <div className="job-info">
                <h2 className="job-name">
                  Android Dev Mobile App (Java/Kotlin)
                </h2>
                <Link to={""} className="company-name">
                  TOHSoft
                </Link>
                <div className="job-salary">
                  {false ? (
                    <span className="salary-show">
                      <LuCircleDollarSign />
                      You&apos;ll love it
                    </span>
                  ) : (
                    <Link to={"/login"} className="salary-hide">
                      <LuCircleDollarSign />
                      {t("Sign in to view salary")}
                    </Link>
                  )}
                </div>
              </div>
            </PreviewJobCompany>
            <PreviewJobRecruitment>
              <button>{t("Apply now")}</button>
              {false ? <FaHeart /> : <FaRegHeart />}
            </PreviewJobRecruitment>
          </PreviewJobHeader>
          <PreviewJobBody>
            <PreviewJobOverview>
              <div className="overview-item">
                <GrLocation />
                <div>
                  <span>Ha Noi - Ho Chi Minh</span>
                </div>
              </div>
              <div className="overview-item">
                <IconWorkingModel />
                <span>{t(`remote`)}</span>
              </div>
              <div className="overview-item">
                <FaRegClock />
                <span>2 giờ trước</span>
              </div>
              <div className="overview-item">
                <span>{t("Skills")}:</span>
                <ul>
                  <li>
                    <Link to={""}>ReactJS</Link>
                  </li>
                </ul>
              </div>
            </PreviewJobOverview>
            <BorderDash></BorderDash>
            <PreviewJobReasons>
              <h2>
                {" "}
                {language === "en" ? (
                  <span>Top 3 reasons to join us</span>
                ) : (
                  <span>3 Lý do để gia nhập công ty</span>
                )}
              </h2>
              <ul>
                <li>Chế độ đãi ngộ tương xứng năng lực và đóng góp</li>
                <li>Chăm sóc sức khỏe và đời sống văn hóa tinh thần</li>
                <li>Cơ hội được học hỏi, đào tạo và phát triển nhanh</li>
              </ul>
            </PreviewJobReasons>
            <BorderDash></BorderDash>
            <PreviewJobReasons>
              <h2>{t("Job description")}</h2>
              <ul>
                <li>Phát triển các ứng dụng Android theo tài liệu</li>
                <li>Tìm hiểu kỹ thuật công nghệ mới cho từng bài toán</li>
                <li>
                  Phối hợp với nhóm Kiểm thử, kiểm tra và sửa lỗi của ứng dụng
                </li>
                <li>Hỗ trợ, sửa lỗi sau triển khai.</li>
              </ul>
            </PreviewJobReasons>
            <BorderDash></BorderDash>
            <PreviewCompanyInfo>
              <div className="company-name">
                <h2>TOHSoft</h2>
                <Link to={""}>
                  <span>{t("View company")}</span>
                  <FaArrowUpRightFromSquare />
                </Link>
              </div>
              <p className="company-intro">
                Tower Hanoi hoạt động trong lĩnh vực phát triển phần mềm, ứng
                dụng và game cho Desktop, Mobile
              </p>
              <div className="company-grid">
                <div>
                  <small>{t("Introduce.Company type")}</small>
                  <p>Sản phẩm</p>
                </div>
                <div>
                  <small>{t("Introduce.Company industry")}</small>
                  <p>Viễn Thông</p>
                </div>
                <div>
                  <small>{t("Introduce.Company size")}</small>
                  <p>51-150</p>
                </div>
                <div>
                  <small>{t("Introduce.Country")}</small>
                  <p>Vietnam</p>
                </div>
                <div>
                  <small>{t("Introduce.Working days")}</small>
                  <p>Thứ 2 - Thứ 6</p>
                </div>
                <div>
                  <small>{t("Introduce.Overtime policy")}</small>
                  <p>Không có OT</p>
                </div>
              </div>
            </PreviewCompanyInfo>
          </PreviewJobBody>
        </PreviewJobContainer>
      )}
    </>
  );
};

export default PreviewJob;
