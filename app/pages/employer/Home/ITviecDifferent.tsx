import React from "react";
import { ITviecDifferentWrapper } from "./styled";

const ITviecDifferent = () => {
  return (
    <ITviecDifferentWrapper>
      <div className="different-container">
        <div className="different-heading">
          <div className="h1">Điều gì tạo nên sự khác biệt ở ITviec?</div>
          <p>
            ITviec là trang tuyển dụng và cơ sở dữ liệu hàng đầu về các chuyên
            gia IT tại Việt Nam.
          </p>
        </div>
        <div className="different-grid">
          <div className="different-item">
            <img src="/assets/svg/first-hand.svg" alt="first-hand" />
            <p className="large-number">10,000+</p>
            <p className="normal-text">Công ty và Doanh nghiệp IT</p>
          </div>
          <div className="different-item space">
            <img src="/assets/svg/second-hand.svg" alt="second-hand" />
            <p className="large-number">1,500,000+</p>
            <p className="normal-text">Hồ sơ đã gửi đến Nhà tuyển dụng</p>
          </div>
          <div className="different-item">
            <img src="/assets/svg/third-hand.svg" alt="third-hand" />
            <p className="large-number">300,000+</p>
            <p className="normal-text">Hồ sơ Ứng viên kinh nghiệm cao</p>
          </div>
        </div>
      </div>
    </ITviecDifferentWrapper>
  );
};

export default ITviecDifferent;
