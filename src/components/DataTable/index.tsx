import { HiPencil, HiMagnifyingGlass } from 'react-icons/hi2'
import { FiDownload } from 'react-icons/fi'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import PaginatedItems from './Pagination';

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];


interface DataTableType {
  heading: string
  description: string
  isExport: boolean
  tableHeading: string[]
}

export default function DataTable({ heading, description, isExport = false, tableHeading = [] }: DataTableType) {
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
              <Input color='gray' label="Search" icon={<HiMagnifyingGlass className="h-5 w-5" />} />
            </div>
            {
              isExport ?
                <Button className="flex items-center gap-3" color="blue" size="sm">
                  <FiDownload strokeWidth={2} className="h-4 w-4" /> Export
                </Button>
                : <></>
            }
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-scroll px-0 pt-0 h-96 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead className='sticky top-0 z-10 bg-blue-gray-50'>
            <tr>
              {tableHeading.map((head) => (
                <th key={head} className='p-4'>
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

          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {/* <div className="flex items-center gap-2"> */}
        {/* <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton> */}
        {/* <Typography color="gray" className="font-normal">
            Page <strong className="text-blue-gray-900">{1}</strong> of{" "}
            <strong className="text-blue-gray-900">10</strong>
          </Typography> */}
        {/* </div> */}
        <PaginatedItems itemsPerPage={5} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 1, 3, 4, 2, 1, 2, 4, 5, 7, 9, 2, 3, 1, 3, 4, 2, 1, 2, 4, 5, 7, 9, 2, 3, 1, 3, 4, 2, 1, 2, 4, 5, 7, 9]} />
      </CardFooter>
    </Card>
  );
}