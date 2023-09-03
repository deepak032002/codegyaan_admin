import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogBySlugQuery } from "../redux/services/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Editor } from "../components";
import { Blog } from "../types/apislice";

const PostCreate = () => {
  const { postId } = useParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data } = useGetBlogBySlugQuery({ token, slug: postId as string });
  return (
    <div className="h-full">
      <Editor fetchedData={data?.results as Blog} />
    </div>
  );
};

export default PostCreate;
