interface Pagination {
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
}

interface CursorPagination {
  totalItems: number;
  next: number | null;
  limit: number;
}

interface CustomPagination {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}
