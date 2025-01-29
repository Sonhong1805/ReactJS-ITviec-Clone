import React from "react";
import { HightValueServicesWrapper } from "./styled";
import { Link } from "react-router";

const HightValueServices = () => {
  return (
    <HightValueServicesWrapper>
      <div className="hight-value-services-container">
        <div className="container">
          <div className="h1">
            Dịch vụ chất lượng cao dành cho Nhà tuyển dụng IT
          </div>
          <div className="box-wrapper">
            <div className="box-content">
              <div className="h1">Đăng tin tuyển dụng</div>
              <p>
                Đăng tuyển vị trí công việc IT, dễ dàng quản lý hồ sơ ứng viên
                với giao diện trực quan, đội ngũ hỗ trợ, và công cụ mạnh mẽ từ
                ITviec
              </p>
              <div className="job-posting-content-box">
                <div className="box-item">
                  <img
                    src="/assets/svg/opportunities.svg"
                    alt="opportunities"
                  />
                  <p>
                    Gia tăng cơ hội để tiếp cận ứng viên IT chất lượng từ ITviec
                  </p>
                </div>
                <div className="box-item">
                  <img
                    src="/assets/svg/right-skill-be.svg"
                    alt="right skill be"
                  />
                  <p>Thu hút ứng viên phù hợp với yêu cầu về kỹ năng IT</p>
                </div>
              </div>
            </div>
            <div className="img-content">
              <figure>
                <img src="/assets/webp/job-posting.webp" alt="job posting" />
              </figure>
            </div>
          </div>
          <div className="box-wrapper reverse">
            <div className="box-content">
              <div className="h1">Gợi ý ứng viên AI Match</div>
              <p>
                Kết nối với nguồn hồ sơ ứng viên IT đa dạng, hoạt động tích cực.
                Dễ dàng tiếp cận ứng viên với thao tác đơn giản. Mở khóa để giúp
                tìm kiếm ứng viên phù hợp.
              </p>
              <div className="aim-content-box">
                <div className="box-item">
                  <img
                    src="/assets/svg/second-candidate.svg"
                    alt="second candidate"
                  />
                  <p>
                    Các ứng viên phù hợp nhất được lựa chọn dựa trên kỹ năng,
                    kinh nghiệm, nhu cầu công việc và hơn thế nữa
                  </p>
                </div>
                <div className="box-item">
                  <img
                    src="/assets/svg/first-candidate.svg"
                    alt="first candidate"
                  />
                  <p>
                    Chỉ kết nối nhà tuyển dụng với những nhân tài IT đang có ý
                    định chuyển việc
                  </p>
                </div>
              </div>
              <Link
                to={
                  "https://itviec.com/ai-match?itm_campaign=ai_match&itm_medium=service&itm_source=employer_page_vi"
                }>
                Xem thêm về AI Match
              </Link>
            </div>
            <div className="img-content">
              <figure>
                <img src="/assets/images/ai-match.png" alt="ai match" />
              </figure>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="box-content">
              <div className="h1">Thương hiệu tuyển dụng</div>
              <p>
                Nâng cao nhận diện thương hiệu của Nhà tuyển dụng, tiếp cận các
                chuyên gia IT trên ITviec qua các điểm chạm đặc biệt, và kết nối
                với các ứng viên IT hàng đầu tại Việt Nam
              </p>
              <div className="aim-content-box">
                <div className="aim-item">
                  <figure>
                    <img
                      src="/assets/svg/first-employer-branding.svg"
                      alt="first employer branding"
                    />
                  </figure>
                  <div>
                    <p className="normal-text">Nhà tuyển dụng hàng đầu</p>
                    <p className="normal-paragraph">
                      Xuất hiện với vị trí công ty IT nổi bật hàng đầu tại Việt
                      Nam
                    </p>
                  </div>
                </div>
                <div className="aim-item">
                  <figure>
                    <img
                      src="/assets/svg/second-employer-branding.svg"
                      alt="second employer branding"
                    />
                  </figure>
                  <div>
                    <p className="normal-text">Nhà tuyển dụng nổi bật</p>
                    <p className="normal-paragraph">
                      Tăng cường xây dựng thương hiệu nhà tuyển dụng đến với
                      những nhân tài IT hàng đầu
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="img-content">
              <figure>
                <img
                  src="/assets/webp/employer-branding.webp"
                  alt="employer branding"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <h3>Trải nghiệm dịch vụ của ITviec ngay hôm nay</h3>
        <Link to={"#employer-contact"} className="button">
          Liên hệ ngay
        </Link>
      </div>
    </HightValueServicesWrapper>
  );
};

export default HightValueServices;
