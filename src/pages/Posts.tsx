import React from "react";
import { DataTable } from "../components";

const tableHeading: string[] = [
  "s.no",
  "title",
  "description",
  "author",
  "published",
]
const Posts = () => {
  return <div>
    <DataTable heading="All Posts" description="Your all blogs" tableHeading={tableHeading} isExport={false} />
  </div>;
};

export default Posts;
