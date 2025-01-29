import { Link } from "react-router";
import { HireTheBestITWrapper } from "./styled";
import HIRE_THE_BEST_IT from "/assets/webp/hire-the-best-it.webp";
const HireTheBestIT = () => {
  return (
    <HireTheBestITWrapper>
      <div className="banner-container">
        <div className="banner-left">
          <h1>Tuyển dụng Nhân tài IT tại Việt Nam cùng ITviec</h1>
          <p className="parapraph">
            Với hiểu biết sâu sắc về lĩnh vực IT và các kỹ năng chuyên môn,
            chúng tôi có thể giúp bạn tiếp cận và tuyển dụng những ứng viên IT
            tốt nhất.
          </p>
          <Link to={"#employer-contact"} className="button">
            Liên hệ ngay
          </Link>
          <div className="login">
            <p>Đã có tài khoản Khách hàng?</p>
            <Link to={"employer/login"}>Đăng nhập</Link>
          </div>
        </div>
        <div className="banner-right">
          <figure>
            <img src={HIRE_THE_BEST_IT} alt="hire-the-best-it" />
          </figure>
        </div>
      </div>
    </HireTheBestITWrapper>
  );
};

export default HireTheBestIT;
