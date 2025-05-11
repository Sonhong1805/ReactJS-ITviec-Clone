import { ChevronLeft, ChevronRight } from "feather-icons-react";
import { PageItem, PaginationWrapper } from "./styled";
import { usePagination } from "~/hooks/usePagination";

interface IProps {
  pagination: Pagination;
  onChangePagination: any;
}

const Pagination = ({ pagination, onChangePagination }: IProps) => {
  const paginationRange: (number | string)[] | undefined = usePagination({
    siblingCount: 1,
    currentPage: pagination.page,
    totalCount: pagination.totalItems,
    pageSize: pagination.limit,
  });
  return (
    <PaginationWrapper className="pagination-wrapper">
      <PageItem
        className={pagination.page === 1 ? "hide" : "show"}
        onClick={() =>
          onChangePagination({ ...pagination, page: pagination.page - 1 })
        }>
        <ChevronLeft />
      </PageItem>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <PageItem key={index} className="dot">
              ...
            </PageItem>
          );
        }
        return (
          <PageItem
            key={index}
            className={pagination.page === pageNumber ? "active" : ""}
            onClick={() =>
              onChangePagination({ ...pagination, page: +pageNumber })
            }>
            {pageNumber}
          </PageItem>
        );
      })}
      <PageItem
        className={pagination.page === pagination.totalPages ? "hide" : "show"}
        onClick={() =>
          onChangePagination({ ...pagination, page: pagination.page + 1 })
        }>
        <ChevronRight />
      </PageItem>
    </PaginationWrapper>
  );
};

export default Pagination;
