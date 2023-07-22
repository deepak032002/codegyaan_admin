import { ReactNode } from "react";

export interface PaginatedItemsProps {
  itemsPerPage: number;
  items: number[];
  handlePageClick: () => void;
}

export interface DataTableProps {
    heading: string
    description: string
    isExport: boolean
    tableHeading: string[]
    tableData: any
  }