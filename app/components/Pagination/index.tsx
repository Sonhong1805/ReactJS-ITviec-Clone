import { PageItem, PaginationWrapper } from "./styled";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface IProps {
  pagination: Pagination;
}

const Pagination = ({ pagination }: IProps) => {
  return (
    <PaginationWrapper className="pagination-wrapper">
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
