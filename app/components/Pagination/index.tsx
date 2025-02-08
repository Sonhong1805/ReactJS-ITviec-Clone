import { PageItem, PaginationWrapper } from "./styled";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = () => {
  return (
    <PaginationWrapper>
      <PageItem className={false ? "hide" : "show"}>
        <FiChevronLeft />
      </PageItem>
      <PageItem className="active">1</PageItem>
      <PageItem>2</PageItem>
      <PageItem className="dot">...</PageItem>
      <PageItem className={false ? "hide" : "show"}>
        <FiChevronRight />
      </PageItem>
    </PaginationWrapper>
  );
};

export default Pagination;
