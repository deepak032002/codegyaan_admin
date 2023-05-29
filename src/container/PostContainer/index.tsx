import React from "react";
import { BlogProps } from "./interface";
import DataTable from "react-data-table-component";
import { AiOutlineEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import Toggle from "./ToggleButton";

const columns = [
  {
    name: "title",
  },
  {
    name: "PublishedAt",
  },
  {
    name: "Description",
  },
  {
    name: "Action",
  },
  {
    name: "Publish",
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    PublishedAt: "1988",
    desc: "abcdddds",
    edit: (
      <div className="flex gap-2">
        <AiOutlineEdit />
        <GrView />
      </div>
    ),
    publish: <Toggle />,
  },
  {
    id: 2,
    title: "Ghostbusters",
    PublishedAt: "1984",
    desc: "abcdfff",
    edit: (
      <div className="flex gap-2">
        <AiOutlineEdit /> <GrView />
      </div>
    ),
    publish: <Toggle />,
  },
];

export const Posts: React.FC<BlogProps> = () => {
  return (
    <div>
      BlogSection
      <DataTable
        columns={columns}
        selectableRows
        data={data}
        // onSelectedRowsChange={handleChange}
        pagination
        // clearSelectedRows={toggledClearRows}
      />
    </div>
  );
};
