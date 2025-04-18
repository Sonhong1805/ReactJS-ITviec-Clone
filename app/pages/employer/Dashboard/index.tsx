import { Link } from "react-router";
import { DashboardWrapper, GeneralWrapper } from "./styled";
import { ChevronRight } from "feather-icons-react";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="heading">
        <h2>Tổng quan</h2>
      </div>
      <GeneralWrapper>
        <div className="general-info">
          <div className="general-box info">
            <div className="box-header">
              <h3>
                Số lượng việc làm:{" "}
                <strong className="counter primary">2</strong>
              </h3>
            </div>
            <div className="box-body">
              <div className="title">
                Việc làm hoạt động:<strong className="counter">1</strong>
              </div>
              <div className="title">
                Việc làm hết hạn:<strong className="counter">0</strong>
              </div>
            </div>
            <div className="box-footer">
              <Link to="">
                Xem chi tiết
                <ChevronRight />
              </Link>
            </div>
          </div>
          <div className="general-box success">
            <div className="box-header">
              <h3>
                Số lượng CV: <strong className="counter primary">10</strong>
              </h3>
            </div>
            <div className="box-body">
              <div className="title">
                CV đã duyệt:<strong className="counter">1</strong>
              </div>
              <div className="title">
                CV chờ duyệt:<strong className="counter">9</strong>
              </div>
            </div>
            <div className="box-footer">
              <Link to="">
                Xem chi tiết
                <ChevronRight />
              </Link>
            </div>
          </div>
          <div className="general-box warning">
            <div className="box-header">
              <h3>Số lượng đánh giá</h3>
            </div>
            <div className="box-body">
              <div className="title">
                Đã có <strong className="counter primary">1</strong> bài đánh
                giá
              </div>
            </div>
            <div className="box-footer">
              <Link to="">
                Xem chi tiết
                <ChevronRight />
              </Link>
            </div>
          </div>
          <div className="general-box error">
            <div className="box-header">
              <h3>Số lượng theo dõi</h3>
            </div>
            <div className="box-body">
              <div className="title">
                Đã có <strong className="counter primary">3</strong> người theo
                dõi
              </div>
            </div>
            <div className="box-footer">
              <Link to="">
                Xem chi tiết
                <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
        <div className="general-chart"></div>
      </GeneralWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
