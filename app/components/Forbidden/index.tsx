import { ForbiddenWrapper } from "./styled";

const Forbidden = () => {
  return (
    <ForbiddenWrapper>
      <div className="title">
        <h1>403 </h1>
        <figure>
          <img src="/assets/images/robby-very-bad.png" alt="robby very bad" />
        </figure>
      </div>
      <h3>Bạn không có quyền truy cập</h3>
    </ForbiddenWrapper>
  );
};

export default Forbidden;
