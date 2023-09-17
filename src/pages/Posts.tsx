import { useSelector } from "react-redux";
import { DataTable } from "../components";
import { RootState } from "../redux/store";
import {
  useGetBlogQuery,
  usePublishBlogMutation,
} from "../redux/services/apiSlice";
import { useMemo, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import moment from "moment";
import Loader from "../components/Loader";

const tableHeading: { key: string; width: `${number}rem` | "auto" }[] = [
  { key: "s.no", width: "auto" },
  { key: "title", width: "18rem" },
  { key: "description", width: "25rem" },
  { key: "author", width: "auto" },
  { key: "publist at", width: "auto" },
  { key: "status", width: "auto" },
];

const Posts = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetBlogQuery({ token, page: page, query });
  const [publishBlog] = usePublishBlogMutation();

  const generateTableRow = useMemo(() => {
    return data
      ? data?.results?.map((item, index) => {
          return {
            id: item._id,
            url: `/posts/edit/${item.slug}`,
            SNO: () => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {10 * data.page - (10 - (index + 1))}
              </Typography>
            ),
            Title: () => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.title}
              </Typography>
            ),
            Description: () => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.description}
              </Typography>
            ),
            Author: () => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.author.name}
              </Typography>
            ),
            PublishAt: () => (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {moment(item.createdAt).format("DD MMMM YYYY")}
              </Typography>
            ),
            IsPublished: () => (
              <Switch
                defaultChecked={item.is_published}
                id={item._id}
                ripple={false}
                className="h-full w-full checked:bg-[#41aaff]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                onChange={(e) => {
                  publishBlog({ token, id: item._id as string })
                    .unwrap()
                    .then((data) => {
                      toast.success(data.message);
                    })
                    .catch((err) => {
                      toast.error("Some problem occured!");
                    });
                }}
              />
            ),
          };
        })
      : [];
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        heading="All Posts"
        description="Your all blogs"
        tableHeading={tableHeading}
        tableData={generateTableRow}
        isExport={false}
        totalItems={data?.totalItem as number}
        handlePageClick={(e) => {
          setPage(e.selected + 1);
        }}
        query={query}
        handleSearch={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default Posts;
