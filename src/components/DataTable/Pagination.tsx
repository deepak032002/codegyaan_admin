import { Button } from "@material-tailwind/react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PaginatedItemsProps } from "./interface";

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  items,
  handlePageClick,
}) => {
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
        }
        className="flex justify-between items-center w-full"
        activeClassName="bg-blue-500 h-5 w-5 flex justify-center items-center p-4 rounded-full text-white"
        disabledLinkClassName="block h-full rounded-lg pointer-events-none select-none bg-gray-400"
        previousClassName="pr-16"
        nextClassName="pl-16"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
