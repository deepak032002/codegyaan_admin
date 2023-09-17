import { ReactNode } from "react";

export interface PaginatedItemsProps {
  itemsPerPage: number;
  items: number;
  handlePageClick: (e: { selected: number }) => void;
}

export interface DataTableProps {
  heading: string
  description: string
  isExport: boolean
  tableHeading: { key: string; width: number | string }[]
  tableData: any[],
  totalItems: number
  handlePageClick: (e: { selected: number }) => void;
  query:string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}