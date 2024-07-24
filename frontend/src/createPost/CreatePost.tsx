import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FaX } from "react-icons/fa6";
import customAxios from "../axios/customAxios";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [createPostData, setCreatePostData] = useState({
    images: [],
    description: "",
  });
  useEffect(() => {
    console.log(createPostData);
  }, [createPostData]);
  const createPostHandler = async () => {
    try {
      const { data } = await customAxios.post("/posts", createPostData);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col rounded-xl bg-white px-6 py-4 gap-6 ">
      <div className="flex gap-2 border-b-2 pb-4 items-center">
        <div className="img">
          <img
            src="../../../public/avatar.jpg"
            alt="avatar"
            className="w-11 h-11 object-cover rounded-full"
          />
        </div>
        <textarea
          value={createPostData.description}
          onChange={(e) =>
            setCreatePostData({
              ...createPostData,
              description: e.target.value,
            })
          }
          placeholder="What's on your mind..."
          className="bg-[#efefef] w-full rounded-lg pt-2 px-6 focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="flex-1">
              <div {...getRootProps()}>
                <input
                  {...getInputProps()}
                  onChange={(e) => {
                    if (e.target.files) {
                      setCreatePostData({
                        ...createPostData,
                        images: e.target.files as any,
                      });
                    }
                  }}
                />
                <p className="text-center px-2 cursor-pointer   border-mainColor border-2 py-4 rounded-xl border-dashed">
                  Drag 'n' drop your post Images here
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <button
          disabled={createPostData.description == ""}
          className="disabled:opacity-50 disabled:cursor-not-allowed text-white bg-mainColor px-6 py-1 rounded-xl"
        >
          Create
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {Array.from(createPostData.images).map((image) => (
          <div className="w-16 h-16 rounded-full mx-auto relative">
            <img
              className="w-16 h-16 rounded-full mx-auto"
              src={URL.createObjectURL(image)}
              alt=""
            />
            <FaX
              onClick={() => {
                const files = Array.from(createPostData.images);
                console.log(files);
                const newCreatePostData = files?.filter(
                  (file) => file != image
                );
                setCreatePostData({
                  ...createPostData,
                  images: newCreatePostData,
                });
              }}
              className="absolute top-0 -right-1 cursor-pointer bg-red-400 text-white p-1 text-xl rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CreatePost;
