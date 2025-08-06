export interface PaginationResult<T> {
  data: T[]; // Array of items of generic type T
  total: number; // Total number of items (all pages)
  page: number; // Current page number
  limit: number; // Number of items per page
  totalPages: number; // Total pages count (optional, but useful)
}
