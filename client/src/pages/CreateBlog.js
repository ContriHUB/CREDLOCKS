import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../slices/blogSlice";
import IconBtn from "../components/common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import JoditEditor from "jodit-react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { createBlog, getAllCategory } from "../services/operations/blogAPI";
import { htmlToText } from "html-to-text";
const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //get all category
    const fetchAllCategory = async () => {
      console.log("get all category");
      try {
        const response = await getAllCategory(null);
        console.log("response", response);
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching all categories:", error);
      }
    };
    fetchAllCategory();
  }, []);

  const onSubmit = async (blogData) => {
    const formData = new FormData();
    console.log("BlogData", blogData);
    formData.append("title", blogData.title);
    formData.append("content", content);
    formData.append("status", blogData.status);
    formData.append("category", blogData.category);
    formData.append("tags", tags.join(","));
    formData.append("coverImg", blogData.coverImg[0]); // assuming coverImg is a file input
    console.log("Blog Data", blogData);
    setLoading(true);
    try {
      const result = await createBlog(formData, token);
      console.log("result1", result);
      dispatch(addBlog(result)); // Assuming result contains the newly created blog data
      console.log("result of add blog", addBlog);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    setLoading(false);
  };
  console.log("categoriesss", categories);
  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: placeholder || "Start typings...",
  //   },
  //   [placeholder]
  // );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-r from-gray-50 to-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto space-y-10 transform transition duration-500 ease-in-out"
    >
      {/* Blog Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="title">
          Blog Title <sup className="text-red-500">*</sup>
        </label>
        <input
          id="title"
          placeholder="Enter Blog Title"
          {...register("title", { required: true })}
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        />
        {errors.title && (
          <span className="text-xs text-red-500">Blog Title is required*</span>
        )}
      </div>
  
      {/* Blog Content */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="content">
          Blog Content <sup className="text-red-500">*</sup>
        </label>
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
          className="rounded-lg border border-gray-300 p-3 min-h-[150px] bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        />
        {errors.content && (
          <span className="text-xs text-red-500">Blog Content is required*</span>
        )}
      </div>
  
      {/* Status */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="status">
          Status <sup className="text-red-500">*</sup>
        </label>
        <select
          id="status"
          {...register("status", { required: true })}
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        {errors.status && (
          <span className="text-xs text-red-500">Status is required*</span>
        )}
      </div>
  
      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="category">
          Category <sup className="text-red-500">*</sup>
        </label>
        <select
          id="category"
          {...register("category", { required: true })}
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        >
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-xs text-red-500">Category is required*</span>
        )}
      </div>
  
      {/* Tags */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="tags">
          Tags <sup className="text-red-500">*</sup>
        </label>
        <ReactTagInput
          id="tags"
          placeholder="Enter Tags"
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        />
        {errors.tags && (
          <span className="text-xs text-red-500">Tags are required*</span>
        )}
      </div>
  
      {/* Cover Image */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold text-gray-700" htmlFor="coverImg">
          Cover Image <sup className="text-red-500">*</sup>
        </label>
        <input
          type="file"
          id="coverImg"
          {...register("coverImg", { required: true })}
          className="w-full file-input rounded-lg border border-gray-300 p-3 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300 ease-in-out"
        />
        {errors.coverImg && (
          <span className="text-xs text-red-500">Cover Image is required*</span>
        )}
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <IconBtn
          disabled={loading}
          text={loading ? "Submitting..." : "Submit"}
          className="transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
  
  
  
};

export default CreateBlog;
