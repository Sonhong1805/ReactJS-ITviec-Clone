import { TopEmployersWrapper } from "./styled";
import topCompanies from "~/constants/topCompanies";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import feedbackCompanies from "~/constants/feedbackCompanies";
import { useTranslation } from "react-i18next";

const TopEmployers = () => {
  const { t } = useTranslation(["home"]);
  return (
    <TopEmployersWrapper>
      <div className="top-employer-container">
        <div className="companies">
          <div className="h1">{t("Top Companies on ITviec")}</div>
          <p>
            {t(
              "Our Customers and Partners include well-known IT firms as well as innovative startups."
            )}
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
          <div className="h1">{t("What do Customers say about us?")}</div>
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
                  <p>{t(feedback.content)}</p>
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
