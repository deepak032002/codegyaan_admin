import React, { useEffect, useRef, useState } from "react";
import { Card, Input, Button, Textarea } from "@material-tailwind/react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { object, string, array } from "yup";
// import PhotoGallery from "./PhotoGallery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useCreateBlogMutation,
  useGetBlogQuery,
  // useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdateBlogMutation,
} from "../../redux/services/apiSlice";
import ImageUploader from "../ImageUploader";
import { Blog } from "../../types/apislice";
import { getPatchObject } from "../../utils/getPatchObject";
import { toast } from "react-hot-toast";
import { setIsLoad } from "../../redux/features/LoaderSlice";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_URL;

const MyEditor = ({ fetchedData }: { fetchedData: Blog }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const category = useGetCategoriesQuery({ token });
  const { refetch } = useGetBlogQuery({ token });

  const editor = useRef<Editor>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tag = useGetTagsQuery({ token });

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    setValues,
  } = useFormik<Blog>({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: { _id: "", name: "" },
      meta_title: "",
      meta_description: "",
      banner: "",
      tags: [],
      author: { name: "", avtar: "", email: "" },
      is_published: false,
      slug: "",
      createdAt: "",
    },

    validationSchema: object({
      title: string().required("Title is required"),
      description: string().required("Description is required"),
      meta_description: string().required("Meta Description is required"),
      meta_title: string().required("Meta Title is required"),
      content: string().required("Content is required"),
      category: object().nonNullable(),
      tags: array().max(3, "Maximum 3 tags").min(1, "Minimum 1 tag"),
    }),

    onSubmit: async (values) => {
      dispatch(setIsLoad(true));
      if (fetchedData) {
        const data = getPatchObject(values, fetchedData);
        const newData: { [key: string]: any } = { ...data };

        if (data?.category) {
          newData.category = data.category._id;
        }

        if (data?.tags) {
          newData.tags = data.tags.map((item) => item._id);
        }

        updateBlog({
          data: newData,
          token: token,
          slug: values.slug,
        })
          .unwrap()
          .then((data) => {
            console.log(data);
            dispatch(setIsLoad(false));
            toast.success(data.message);
            if (data.blog.slug !== values.slug) {
              navigate("/posts/all");
              refetch();
            }
          })
          .catch((err) => {
            dispatch(setIsLoad(false));
            toast.error(err.data.message);
            console.log(err);
          });
      } else {
        createBlog({ data: values, token: token })
          .unwrap()
          .then((data) => {
            dispatch(setIsLoad(false));
            toast.success(data.message);
          })
          .catch((err) => {
            dispatch(setIsLoad(false));
            toast.error(err.data.message);
            console.log(err);
          });
      }
    },
  });

  useEffect(() => {
    if (fetchedData) setValues(fetchedData);
  }, [fetchedData]);

  // useEffect(() => {
  //   const html = new DOMParser().parseFromString(values.content, "text/html");
  //   const h1 = html.querySelector("h1");
  //   const h1Text = h1 ? h1.innerText : "";
  //   setFieldValue("title", h1Text);
  // }, [values.content]);

  return (
    <div className="editor">
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <Editor
              ref={editor}
              apiKey="bk4525mq1cq90gtb85qarmtdv6gugjza50rzu5qbx73fg0hc"
              onEditorChange={(data: string) => {
                setFieldValue("content", data);
              }}
              value={values.content}
              init={{
                toolbar:
                  "fullscreen wordcount undo redo | bold italic underline strikethrough numlist bullist | fontfamily fontsize blocks searchreplace | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist codesample emoticons | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap | preview save print | insertfile image galleryUpload media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags restoredraft",
                plugins:
                  "image lists emoticons wordcount codesample table fullscreen searchreplace advlist autosave",
                menubar: "file edit view insert format tools table tc help",
                file_picker_types: "file image media",
                image_caption: true,
                image_advtab: true,
                height: 500,
                browser_spellcheck: true,
                quickbars_selection_toolbar:
                  "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                autosave_ask_before_unload: true,
                images_upload_handler: async (blob, progress) => {
                  try {
                    const res = await axios.post(
                      `${baseUrl}/blog/upload-image`,
                      {
                        upload: blob.blob(),
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                          const { loaded, total } = progressEvent;
                          const percent = Math.floor(
                            (loaded * 100) / (total || 1)
                          );

                          console.log(
                            `${loaded} bytes of ${total} bytes. ${percent}%`
                          );
                          if (percent <= 100) {
                            progress(percent);
                          }
                        },
                      }
                    );
                    return res.data.url;
                  } catch (error) {
                    return error;
                  }
                },
                setup: (editor) => {
                  editor.ui.registry.addButton("galleryUpload", {
                    icon: "gallery",
                    tooltip: "Uploader",
                    onAction: (_) => {
                      // const a = window.cloudinary.openUploadWidget({
                      //   cloudName: 'dn9mifnsi',
                      //   uploadPreset: 'ml_default',
                      //   maxImageWidth: 600,
                      //   sources: ["local", "url", "camera"]
                      // },
                      //   function (error: any, result: any) {
                      //     console.log(error, result);

                      //   }).open()

                      const mloptions = {
                        cloud_name: "dn9mifnsi",
                        api_key: "838995219365944",
                        folder: "code_gyaan",
                      };

                      const trigger = window.cloudinary.createMediaLibrary(
                        mloptions,
                        {
                          insertHandler: (data) => {
                            console.log(data);
                          },
                        }
                      );

                      trigger.show();
                    },
                  });
                },
              }}
            />

            <span className="text-xs text-red-500">
              {touched.content && errors.content ? errors.content : ""}
            </span>
          </div>

          <div className="col-span-12 md:pt-0 pt-6">
            <Card color="transparent" shadow={false}>
              <div className="mb-4 flex flex-col gap-6">
                <div>
                  <ImageUploader
                    onChange={(e) =>
                      setFieldValue(
                        "banner",
                        e.target.files ? e.target.files[0] : ""
                      )
                    }
                    value={values.banner}
                  />
                </div>
                <div>
                  <Input
                    size="lg"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Title"
                  />
                  <span className="text-xs text-red-500">
                    {touched.title && errors.title ? errors.title : ""}
                  </span>
                </div>
                <div>
                  <Textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Description"
                  />
                  <span className="text-xs text-red-500">
                    {touched.description && errors.description
                      ? errors.description
                      : ""}
                  </span>
                </div>
                <div>
                  <Input
                    size="lg"
                    name="meta_title"
                    value={values.meta_title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Meta Title"
                  />
                  <span className="text-xs text-red-500">
                    {touched.meta_title && errors.meta_title
                      ? errors.meta_title
                      : ""}
                  </span>
                </div>
                <div>
                  <Textarea
                    name="meta_description"
                    value={values.meta_description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Meta Description"
                  />
                  <span className="text-xs text-red-500">
                    {touched.meta_description && errors.meta_description
                      ? errors.meta_description
                      : ""}
                  </span>
                </div>

                <div>
                  <Select
                    options={category.data?.categories.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    placeholder="Category"
                    name="category"
                    isClearable
                    onChange={(value) =>
                      setFieldValue("category", {
                        _id: value?.value,
                        name: value?.label,
                      })
                    }
                    value={{
                      value: values.category._id,
                      label: values.category.name,
                    }}
                    onBlur={handleBlur}
                  />
                  {/* <span className="text-xs text-red-500">
                    {touched.category && errors.category ? errors.category : ""}
                  </span> */}
                </div>
                <div>
                  <Select
                    options={tag?.data?.tags.map((item) => ({
                      value: item._id,
                      label: item.name.toUpperCase(),
                    }))}
                    isMulti
                    placeholder="Tags"
                    onBlur={handleBlur}
                    value={values.tags.map((item) => ({
                      value: item._id,
                      label: item.name.toUpperCase(),
                    }))}
                    onChange={(value) =>
                      setFieldValue(
                        "tags",
                        value.map((item) => ({
                          _id: item.value,
                          name: item.label,
                        }))
                      )
                    }
                  />
                  <span className="text-xs text-red-500">
                    {touched.tags && errors.tags ? (errors.tags as string) : ""}
                  </span>
                </div>
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Save & Upload
              </Button>
            </Card>
          </div>
        </div>
      </form>
      {/* <PhotoGallery isOpen={isOpen} handleOpen={() => setIsOpen(prev => !prev)} callback={contentCb} /> */}
    </div>
  );
};

export default React.memo(MyEditor);
