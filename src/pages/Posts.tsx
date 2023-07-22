import { useSelector } from "react-redux";
import { DataTable } from "../components";
import { RootState } from "../redux/store";
import { useGetBlogQuery } from "../redux/services/apiSlice";
import { useMemo, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";

const tableHeading: string[] = [
  "s.no",
  "title",
  "description",
  "author",
  "status",
];

const Posts = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isLoading } = useGetBlogQuery(token);

  if (isLoading) {
    return <>Loading...</>;
  }

  const generateTableRow = useMemo(() => {
    return data?.blogs?.map((item, index) => {
      return {
        id: item._id,
        SNO: () => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {index + 1}
          </Typography>
        ),
        Title: () => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {item.title}
          </Typography>
        ),
        Description: () => <>{item.description}</>,
        Author: () => <>{item?.author?.name}</>,
        IsPublished: () => <Switch checked={item.is_published} />,
      };
    });
  }, []);

  return (
    <div>
      <DataTable
        heading="All Posts"
        description="Your all blogs"
        tableHeading={tableHeading}
        tableData={generateTableRow}
        isExport={false}
      />
    </div>
  );
};

export default Posts;
