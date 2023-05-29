import React, { useEffect, useRef, useState } from "react";
import { Card, Input, Button, Textarea } from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from "formik";
import { object, string, array } from "yup";
// import PhotoGallery from "./PhotoGallery";
import axios from "axios";

const options = [
  { id: "2", value: "chocolate", label: "Chocolate" },
  { id: "3", value: "strawberry", label: "Strawberry" },
  { id: "4", value: "vanilla", label: "Vanilla" },
];


const MyEditor = () => {
  const editor = useRef<Editor>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [contentCb, setContentCb] = useState<any>()
  const [images, setImages] = useState<[]>([])
  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      tags: [],
    },

    validationSchema: object({
      title: string().required("Title is required"),
      description: string().required("Description is required"),
      content: string().required("Content is required"),
      category: string().required("Category is required"),
      tags: array().max(3, "Maximum 3 tags").min(1, "Minimum 1 tag"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });


  useEffect(() => {
    (async () => {
      const res = await axios.get('https://api.unsplash.com/search/photos?client_id=IJzE1M1qYTd4lZ9PH6et0Sg_tUHcnIGkunCRO3_eIOk&query=nature')
      setImages(res.data.results)
      console.log(res.data);
    })()
  }, [])

  useEffect(() => {
    const html = new DOMParser().parseFromString(values.content, "text/html");
    const h1 = html.querySelector("h1");
    const h1Text = h1 ? h1.innerText : "";
    setFieldValue("title", h1Text);
  }, [values.content]);

  const handleCreateOption = (inputValue: string) => {
    console.log(inputValue);
  };


  const dialogConfig = {
    title: 'Image Gallery',
    body: {
      type: 'panel',
      items: [
        {
          type: 'grid',
          columns: 6,
          items: images.map((item: any, index) => {
            return {
              type: 'imagepreview',
              name: `preview-${index}`,
              height: '500px',
              item:
              {
                url: 'asdfa',
                zoom: 1.5
              }
            }
          })
        }
      ]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'closeButton',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'submitButton',
        text: 'Do Cat Thing',
        buttonType: 'primary'
      }
    ],
    initialData: {
      catdata: 'initial Cat',
      isdog: false
    },
    onSubmit: () => {
      console.log('Submit');

    }
  }

  return (
    <div className="editor">
      <div className="grid grid-cols-12 gap-1">
        <div className="md:col-span-9 col-span-12">
          <Editor
            ref={editor}
            apiKey="bk4525mq1cq90gtb85qarmtdv6gugjza50rzu5qbx73fg0hc"
            onEditorChange={(data: string) => {
              setFieldValue('content', data)
            }}
            value={values.content}
            init={{
              toolbar:
                "fullscreen wordcount undo redo | bold italic underline strikethrough numlist bullist | fontfamily fontsize blocks searchreplace | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist codesample emoticons | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags restoredraft",
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
              setup: (editor) => {
                editor.ui.registry.addButton('image-gallery', {
                  icon: 'image',
                  onAction: () => editor.windowManager.open(dialogConfig as any)
                })
              },
              images_upload_handler: async (blob, progress) => {
                console.log(blob.blob(), progress(11));

                const res = await axios.post('http://localhost:5000/api/v1/blog/upload-image', {
                  upload: blob.blob()
                }, {
                  headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzEwOGM0YThhYWQ1NTljYTQ3NDYzNyIsImlhdCI6MTY4NTIwNDA4MH0.eADcEQu93r3x7tO7HY1LYWek3iOiCuRxxRCCPYxUzp0'}`,
                    "Content-Type": "multipart/form-data"
                  }
                })

                return new Promise((resolve, reject) => {
                  if (res.status === 200) {
                    resolve(res.data.url)
                  } else {
                    reject('Some thing went wrong')
                  }
                })
              }
            }}
          />

          <span className="text-xs text-red-500">
            {touched.content && errors.content ? errors.content : ""}
          </span>
        </div>

        <div className="md:col-span-3 col-span-12 md:pt-0 pt-6">
          <Card color="transparent" shadow={false}>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="mb-4 flex flex-col gap-6">
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
                  <CreatableSelect
                    options={options}
                    placeholder="Category"
                    name="category"
                    onChange={(value) => setFieldValue("category", value?.id)}
                    onBlur={handleBlur}
                    onCreateOption={handleCreateOption}
                  />
                  <span className="text-xs text-red-500">
                    {touched.category && errors.category ? errors.category : ""}
                  </span>
                </div>
                <div>
                  <CreatableSelect
                    options={options}
                    isMulti
                    placeholder="Tags"
                    onBlur={handleBlur}
                    onChange={(value) =>
                      setFieldValue(
                        "tags",
                        value.map((item) => item?.id)
                      )
                    }
                    onCreateOption={handleCreateOption}
                  />
                  <span className="text-xs text-red-500">
                    {touched.tags && errors.tags ? errors.tags : ""}
                  </span>
                </div>
              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Save & Upload
              </Button>
            </form>
          </Card>
        </div>
      </div>
      {/* <PhotoGallery isOpen={isOpen} handleOpen={() => setIsOpen(prev => !prev)} callback={contentCb} /> */}
    </div>
  );
};

export default React.memo(MyEditor);
