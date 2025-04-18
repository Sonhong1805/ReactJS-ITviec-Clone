import { ChevronLeft, ChevronRight } from "feather-icons-react";
import { PageItem, PaginationWrapper } from "./styled";

interface IProps {
  pagination: Pagination;
}

const Pagination = ({ pagination }: IProps) => {
  return (
    <PaginationWrapper className="pagination-wrapper">
      <PageItem className={false ? "hide" : "show"}>
        <ChevronLeft />
      </PageItem>
      <PageItem className="active">1</PageItem>
      <PageItem>2</PageItem>
      <PageItem className="dot">...</PageItem>
      <PageItem className={false ? "hide" : "show"}>
        <ChevronRight />
      </PageItem>
    </PaginationWrapper>
  );
};

export default Pagination;
