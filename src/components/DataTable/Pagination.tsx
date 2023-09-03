import ReactPaginate from "react-paginate";
import { PaginatedItemsProps } from "./interface";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  items,
  handlePageClick,
}) => {
  const pageCount = Math.ceil(items / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        previousLabel={<GoChevronLeft fontSize={28} />}
        nextLabel={<GoChevronRight fontSize={28} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        className="flex gap-4 justify-end items-center w-full"
        pageClassName="h-5 w-5 rounded-full flex justify-center items-center p-4 hover:bg-gray-200 hover:text-inherit"
        activeClassName="bg-blue-500 h-5 w-5 flex justify-center items-center p-4 rounded-full text-white"
        disabledLinkClassName="block h-full rounded-full text-gray-300 pointer-events-none select-none bg-gray-400"
        previousClassName=""
        nextClassName=""
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
