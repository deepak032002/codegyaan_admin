import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import PaginatedItems from "./Pagination";
import { DataTableProps } from "./interface";

export default function DataTable({
  heading,
  description,
  isExport = false,
  tableHeading = [],
  tableData = [],
}: DataTableProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {heading}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {description}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                color="gray"
                label="Search"
                icon={<HiMagnifyingGlass className="h-5 w-5" />}
              />
            </div>
            {isExport ? (
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <FiDownload strokeWidth={2} className="h-4 w-4" /> Export
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-scroll px-0 pt-0 h-96 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 z-10 bg-blue-gray-50">
            <tr>
              {tableHeading.map((head) => (
                <th key={head} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 capitalize"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: { [key: string]: any }, index: number) => {
              return (
                <tr key={item.id} className="cursor-pointer">
                  {Object.values(item).map((Children, idx) => {
                    return typeof Children !== "number" &&
                      typeof Children !== "string" ? (
                      <td
                        className="p-4 border-b border-blue-gray-50"
                        key={idx}
                      >
                        <Children />
                      </td>
                    ) : (
                      <></>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <PaginatedItems
          handlePageClick={() => {}}
          itemsPerPage={5}
          items={Array.from(Array(200))}
        />
      </CardFooter>
    </Card>
  );
}
