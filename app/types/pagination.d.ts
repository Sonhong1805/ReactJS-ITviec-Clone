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
