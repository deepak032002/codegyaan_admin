import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';


function PaginatedItems({ itemsPerPage, items }: { itemsPerPage: number, items: number[] }) {
    const [itemOffset, setItemOffset] = useState<number>(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Next
                    </Button>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel={
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Previous
                    </Button>
                }
                className='flex justify-between items-center w-full'
                previousClassName='pr-16'
                nextClassName='pl-16'
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems