import React from "react";
import { TopEmployersWrapper } from "./styled";
import topCompanies from "~/constants/topCompanies";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import feedbackCompanies from "~/constants/feedbackCompanies";

const TopEmployers = () => {
  return (
    <TopEmployersWrapper>
      <div className="top-employer-container">
        <div className="companies">
          <div className="h1">Top Công ty hàng đầu tại ITviec</div>
          <p>
            Nhà tuyển dụng và đối tác của chúng tôi bao gồm các công ty IT hàng
            đầu, và các công ty khởi nghiệp sáng tạo
          </p>
          <div className="company-list">
            {topCompanies.map((logo: string, index: number) => (
              <div className="company-item" key={index}>
                <figure>
                  <img src={logo} alt={logo} />
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="feedback">
          <div className="h1">Khách hàng nói gì về chúng tôi?</div>
          <div className="feedback-swiper">
            <Swiper
              pagination={{
                type: "fraction",
              }}
              loop={true}
              slidesPerView={2}
              slidesPerGroup={2}
              navigation={true}
              spaceBetween={28}
              autoplay={{
                delay: 5000, // Chuyển slide mỗi 5s
                disableOnInteraction: false, // Không tắt autoplay khi tương tác
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="feedback-wrapper">
              {feedbackCompanies.map((feedback) => (
                <SwiperSlide className="feedback-item" key={feedback.id}>
                  <p>{feedback.content}</p>
                  <div className="recruiter-feedback-author">
                    <div className="author">
                      <h4>{feedback.author}</h4>
                      <p>{feedback.position}</p>
                    </div>
                    {feedback.logo && (
                      <figure>
                        <img src={feedback.logo} alt={feedback.logo} />
                      </figure>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </TopEmployersWrapper>
  );
};

export default TopEmployers;
