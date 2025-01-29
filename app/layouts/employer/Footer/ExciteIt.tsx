import React from "react";
import { ExciteItContainer, ExciteItWrapper } from "./styled";

const ExciteIt = () => {
  return (
    <ExciteItWrapper>
      <img src="/assets/svg/excite-it-desktop.svg" alt="excite it desktop" />
      <ExciteItContainer>
        <div className="excite-content">
          <div className="h1">
            Sẵn sàng Hứng Khởi ngành IT tại Việt Nam với Tuyển Dụng "Chất"
          </div>
          <p>
            Khởi đầu từ năm 2013, sứ mệnh của ITviec chính là luôn hướng đến
            tuyển dụng "chất" ngành IT. Chúng tôi giúp nhân sự ngành IT thăng
            tiến sự nghiệp, giúp doanh nghiệp tìm được những ứng viên tuyệt vời.
            Hãy cùng chúng tôi hứng khởi ngành IT tại Việt Nam với tuyển dụng
            "Chất"!
          </p>
        </div>
        <div className="excite-video">
          <iframe
            width="835"
            height="500"
            src="https://www.youtube.com/embed/iRL0gIHFAgQ?si=82NlgUEBIgd7UDjm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </ExciteItContainer>
    </ExciteItWrapper>
  );
};

export default ExciteIt;
