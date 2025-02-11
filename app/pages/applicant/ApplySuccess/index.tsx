import { Link } from "react-router";
import {
  ApplySuccessBranding,
  ApplySuccessContainer,
  ApplySuccessWrapper,
  ApplySucsessBox,
} from "./styled";
import LOGO from "/assets/images/logo.png";
import ROBBY_APPLY_SUCCESS from "/assets/svg/robby-apply-success.svg";
import { LuCircleDollarSign } from "react-icons/lu";

const ApplySuccess = () => {
  return (
    <ApplySuccessWrapper>
      <ApplySuccessContainer>
        <ApplySuccessBranding>
          <img src={LOGO} alt="logo itviec" />
        </ApplySuccessBranding>
        <ApplySucsessBox>
          <div className="robby-success">
            <img src={ROBBY_APPLY_SUCCESS} alt="robby apply success" />
          </div>
          <div className="thankyou-message">
            <h1>Tuyệt vời! CV của bạn đã được ghi nhận</h1>
            <p>Chúng tôi đã nhận được CV của bạn cho:</p>
            <ul>
              <li>
                Vị trí: <strong>Frontend Software Engineer (ReactJs)</strong>{" "}
              </li>
              <li>
                Công ty: <strong>Employment Hero</strong>{" "}
              </li>
            </ul>
            <div className="message">
              CV của bạn sẽ được gửi tới nhà tuyển dụng sau khi được ITviec xét
              duyệt. Vui lòng theo dõi email hongson180503@gmail.com để cập nhật
              thông tin về tình trạng CV.
            </div>
          </div>
          <div className="similar-jobs">
            <h2>Việc làm tương tự tại Hồ Chí Minh</h2>
            <div className="job-list">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="job-item">
                  <figure>
                    <img
                      src={"/assets/images/Thankslab-Logo.png"}
                      alt="robby apply success"
                    />
                  </figure>
                  <div style={{ paddingLeft: "1.2rem" }}>
                    <Link to={""} className="job-name">
                      Remote Senior Fullstack Developer (NodeJS, ReactJS)
                    </Link>
                    <div className="job-salary">
                      <LuCircleDollarSign />
                      <span>You&apos;ll love it</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="search-button">
              <Link to={"/it-jobs"}>Tìm kiếm việc làm tương tự khác</Link>
            </div>
          </div>
        </ApplySucsessBox>
      </ApplySuccessContainer>
    </ApplySuccessWrapper>
  );
};

export default ApplySuccess;
