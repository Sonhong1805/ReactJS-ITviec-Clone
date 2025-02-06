import React from "react";
import { CampaignHighlightWrapper } from "./styled";
import { Link } from "react-router";
import { FiArrowRightCircle } from "react-icons/fi";

const CampaignHighlight = () => {
  return (
    <CampaignHighlightWrapper>
      <div className="container">
        <img
          src="/assets/webp/growth-icon-report.webp"
          alt="growth icon report"
        />
        <Link to={""}>
          <div className="content">
            <p className="title">Báo Cáo Thị Trường IT 2024-2025 | </p>
            <p className="subtitle">
              ĐỊNH HÌNH XU HƯỚNG NGÀNH IT TỪ DỮ LIỆU ĐA CHIỀU
            </p>
          </div>
          <FiArrowRightCircle size={20} color="#ed1b2f" />
        </Link>
      </div>
    </CampaignHighlightWrapper>
  );
};

export default CampaignHighlight;
