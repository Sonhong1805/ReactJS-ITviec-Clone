import {
  CompanyReasons,
  CompanySpecialize,
  GeneralInformation,
} from "./styled";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FiGlobe } from "react-icons/fi";

const Overview = () => {
  const { t } = useTranslation(["search"]);
  return (
    <>
      <GeneralInformation>
        <h2>{t("General information")}</h2>
        <div className="general-body">
          <div>
            <div className="general-title">{t("Introduce.Company type")}</div>
            <p>Sản phẩm</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Company industry")}
            </div>
            <p>Viễn Thông</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Company size")}</div>
            <p>51-150</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Country")}</div>
            <p>Vietnam</p>
          </div>
          <div>
            <div className="general-title">{t("Introduce.Working days")}</div>
            <p>Thứ 2 - Thứ 6</p>
          </div>
          <div>
            <div className="general-title">
              {t("Introduce.Overtime policy")}
            </div>
            <p>Không có OT</p>
          </div>
        </div>
      </GeneralInformation>
      <CompanyReasons>
        <h2>{t("Company overview")}</h2>
        <ul>
          <li>Phát triển các ứng dụng Android theo tài liệu</li>
          <li>Tìm hiểu kỹ thuật công nghệ mới cho từng bài toán</li>
          <li>Phối hợp với nhóm Kiểm thử, kiểm tra và sửa lỗi của ứng dụng</li>
          <li>Hỗ trợ, sửa lỗi sau triển khai.</li>
        </ul>
      </CompanyReasons>
      <CompanyReasons>
        <h2>{t("Why you'll love working here")}</h2>
        <ul>
          <li>Chế độ đãi ngộ tương xứng năng lực và đóng góp</li>
          <li>Chăm sóc sức khỏe và đời sống văn hóa tinh thần</li>
          <li>Cơ hội được học hỏi, đào tạo và phát triển nhanh</li>
        </ul>
        <Link to={""} className="company-path">
          <FiGlobe />
          <span>{t("Company website")}</span>
        </Link>
      </CompanyReasons>
      <CompanySpecialize>
        <h2>{t("Our key skills")}</h2>
        <p>{t("Our key skills")}</p>
        <ul>
          <li>
            <Link to={""}>ReactJS</Link>
          </li>
        </ul>
      </CompanySpecialize>
    </>
  );
};

export default Overview;
