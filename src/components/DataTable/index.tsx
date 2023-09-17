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
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import PaginatedItems from "./Pagination";
import { DataTableProps } from "./interface";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function DataTable({
  heading,
  description,
  isExport = false,
  tableHeading = [],
  tableData = [],
  totalItems,
  handlePageClick,
  handleSearch,
  query,
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
                value={query}
                onChange={handleSearch}
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
      <CardBody className="overflow-y-scroll px-0 pt-0 table-wrapper">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 z-10 bg-blue-gray-50">
            <tr>
              {tableHeading.map((head) => {
                return (
                  <th
                    key={head.key}
                    style={{ width: head.width }}
                    className="p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 capitalize"
                    >
                      {head.key}
                    </Typography>
                  </th>
                );
              })}

              <th className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 capitalize"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: { [key: string]: any }) => {
              return (
                <tr key={item.id} className="hover:bg-gray-100">
                  {Object.values(item).map((Children, idx) => {
                    return (
                      <React.Fragment key={`${item.id}${idx}`}>
                        {typeof Children !== "number" &&
                        typeof Children !== "string" ? (
                          <td className="p-4 border-b border-blue-gray-50">
                            <Children />
                          </td>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    );
                  })}

                  <td className="p-4 border-b border-blue-gray-50">
                    <Menu>
                      <MenuHandler>
                        <IconButton variant="text">
                          <CiMenuKebab className="text-blue-gray-400 text-lg" />
                        </IconButton>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem>
                          <Link to={item.url}>Edit</Link>
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <PaginatedItems
          handlePageClick={handlePageClick}
          itemsPerPage={10}
          items={totalItems}
        />
      </CardFooter>
    </Card>
  );
}
