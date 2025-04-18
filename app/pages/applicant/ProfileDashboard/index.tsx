import {
  CVAttachment,
  DashboardActivities,
  DashboardCompletion,
  DashboardInformation,
  DashboardWrapper,
} from "./styled";
import AVATAR_DEFAULT from "/assets/svg/avatar-default.svg";
import { Link } from "react-router";
import UPLOADED_RESUME from "/assets/svg/uploaded-resume.svg";
import { Briefcase, ChevronRight, Mail } from "feather-icons-react";

const ProfileDashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardInformation>
        <figure>
          <img src={AVATAR_DEFAULT} alt="avatar" />
        </figure>
        <div className="information">
          <h1>Nguyen Hong Son</h1>
          <div className="info-text">
            <Briefcase />
            <span>Cập nhật chức danh</span>
          </div>
          <div className="info-text mail">
            <Mail />
            <span>hongson180503@gmail.com</span>
          </div>
          <Link to={""} className="next-link">
            <span>Cập nhật hồ sơ</span>
            <ChevronRight />
          </Link>
        </div>
      </DashboardInformation>
      <CVAttachment>
        <h2>Hồ sơ đính kèm của bạn</h2>
        <div className="profile-preview">
          <figure>
            <img src={UPLOADED_RESUME} alt="uploaded resume" />
          </figure>
          <div className="profile-manage">
            <Link to={""} className="filename">
              NGUYEN-HONG-SON-CV.pdf
            </Link>
            <p>Cập nhật lần cuối: 22/07/2024</p>
            <Link to={""} className="next-link">
              <span>Quản lý hồ sơ đính kèm</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </CVAttachment>
      <DashboardCompletion>
        <h2>Hồ sơ ITviec</h2>
        <div className="profile-progress">
          <div className="profile-score-progress">
            <div className="progress-background">
              <div
                className="progress-circle"
                style={
                  { "--progress-degree": `${9.0}deg` } as React.CSSProperties
                }></div>
            </div>
            <div className="percentage-text">
              5%
              <div className="text">hoàn thành</div>
            </div>
          </div>
          <div className="profile-update-link">
            <p>
              Nâng cấp hồ sơ của bạn lên <span>70%</span> để bắt đầu tạo mẫu CV
              IT chuyên nghiệp.
            </p>
            <Link to={""} className="next-link">
              <span>Nâng cấp hồ sơ</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </DashboardCompletion>
      <DashboardActivities>
        <h2>Hoạt động của bạn</h2>
        <div className="infos">
          <Link to={""} className="blue">
            <div className="content">
              <p>Việc làm đã ứng tuyển</p>
              <div className="counter">
                <div className="number">10</div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/paper-plane.svg"} alt="paper plane" />
          </Link>
          <Link to={""} className="red">
            <div className="content">
              <p>Việc làm đã lưu</p>
              <div className="counter">
                <div className="number">10</div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/healthcare.svg"} alt="paper plane" />
          </Link>
          <Link to={""} className="green">
            <div className="content">
              <p>Lời mời công việc</p>
              <div className="counter">
                <div className="number">10</div>
                <ChevronRight />
              </div>
            </div>
            <img src={"/assets/svg/mail.svg"} alt="paper plane" />
          </Link>
        </div>
      </DashboardActivities>
    </DashboardWrapper>
  );
};

export default ProfileDashboard;
