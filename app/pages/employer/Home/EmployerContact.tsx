import React, { useState } from "react";
import {
  AgreementCheck,
  EmployerContactWrapper,
  SubmitContact,
  SuccessCheck,
} from "./styled";
import { FiClock, FiPhone } from "react-icons/fi";
import InputFloating from "~/components/InputFloating";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import IconCloudflare from "~/components/Icon/cloudflare";
import sources from "~/constants/sources";
import SelectFloating from "~/components/SelectFloating";
import companyAddresses from "~/constants/companyAddresses";

const EmployerContact = () => {
  const { t } = useTranslation(["auth"]);
  const [agreementCheck, setAgreementCheck] = useState(false);
  return (
    <EmployerContactWrapper id="employer-contact">
      <div className="employer-contact-container">
        <h1>Tìm kiếm Nhân tài IT phù hợp</h1>
        <p>
          Để lại thông tin liên hệ để nhận tư vấn từ Phòng Chăm sóc Khách hàng
          của ITviec.
        </p>
        <div className="contact">
          <div className="contact-form">
            <form>
              <h3>Thông tin Quý khách</h3>
              <div className="form-group space">
                <InputFloating
                  id="username"
                  label="Họ và tên"
                  required={true}
                  message="Vui lòng điền tên của bạn"
                />
                <InputFloating
                  id="role"
                  label="Chức vụ"
                  required={true}
                  message="Vui lòng điền chức vụ của bạn"
                />
              </div>
              <div className="form-group space">
                <InputFloating
                  id="email"
                  label="Email làm việc"
                  required={true}
                  message="Vui lòng cung cấp email công ty của bạn"
                />
                <InputFloating
                  id="phone"
                  label="Số điện thoại"
                  required={true}
                  message="Vui lòng cung cấp số điện thoại"
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  id="sources"
                  label="Bạn biết đến ITviec từ đâu?"
                  required={false}
                  options={sources}
                />
              </div>
              <h3>Thông tin công ty</h3>
              <div className="form-group">
                <InputFloating
                  id="companyName"
                  label="Tên công ty"
                  required={true}
                  message="Vui lòng điền tên công ty"
                />
              </div>
              <div className="form-group">
                <SelectFloating
                  id="companies"
                  label="Địa chỉ công ty"
                  required={true}
                  message="Vui lòng chọn 1 thành phố"
                  options={companyAddresses}
                />
              </div>
              <div className="form-group off-bottom">
                <InputFloating
                  id="companyWebsite"
                  label="Địa chỉ website"
                  required={false}
                />
                <div className="helper-text">
                  URL bao gồm đầy đủ giao thức (https), ví dụ:
                  https://itviec.com
                </div>
              </div>
              <AgreementCheck htmlFor="agreement-check">
                <input
                  type="checkbox"
                  id="agreement-check"
                  onChange={() => setAgreementCheck((prev) => !prev)}
                />
                <span>
                  {t("I have read and agree to ITviec")}{" "}
                  <span className="register-rules">
                    {t("Terms & Conditions")}
                  </span>{" "}
                  {t("and")}{" "}
                  <span className="register-rules">{t("Privacy Policy")}</span>{" "}
                  {t("in relation to your privacy information.")}
                </span>
              </AgreementCheck>
              <SuccessCheck>
                <div className="success">
                  <FaCheckCircle color="#038127" />
                  <span>Thành công!</span>
                </div>
                <div className="cloudflare">
                  <IconCloudflare />
                  <Link to={""}>Quyền riêng tư</Link>
                  <Link to={""}>Điều khoản</Link>
                </div>
              </SuccessCheck>
              <SubmitContact>
                <div className="already-account">
                  <p>Đã có tài khoản Khách hàng?</p>
                  <Link to={"/employer/login"}>Đăng nhập</Link>
                </div>
                <div>
                  <button>Liên hệ tôi</button>
                </div>
              </SubmitContact>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-box">
              <FiPhone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline Hồ Chí Minh</p>
                <h3>0977 460 519</h3>
              </div>
            </div>
            <div className="contact-box">
              <FiPhone size={24} color="#ed1b2f" />
              <div className="text">
                <p>Hotline Hà Nội</p>
                <h3>0983 131 531</h3>
              </div>
            </div>
            <div className="contact-box">
              <FiClock size={24} color="#ed1b2f" />
              <div className="text">
                <p>Thời gian làm việc</p>
                <h3>Thứ 2 - Thứ 6 | 8:30 - 17:00</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployerContactWrapper>
  );
};

export default EmployerContact;
