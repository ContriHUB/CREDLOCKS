import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { formattedDate } from "../utils/formattedDate";
import { useSelector } from "react-redux";
import {
  getSingleBlog,
  dislikeBlog,
  likeBlog,
  addComments,
  deleteBlog,
  deleteComment,
} from "../services/operations/blogAPI";
import { BiCommentDots, BiDislike, BiLike, BiTrash } from "react-icons/bi";
import { FaCalendarDay } from "react-icons/fa";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io("/", { reconnection: true });

const IndividualBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { userDetails } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getSingleBlog(id, token);
        setBlog(response.data);
        setShowComments(true);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, token]);

  const handleUpVote = async () => {
    try {
      await likeBlog(id, token);
      const response = await getSingleBlog(id, token);
      setBlog(response.data);
    } catch (error) {
      console.error("Error upvoting blog:", error);
    }
  };

  const handleDownVote = async () => {
    try {
      await dislikeBlog(id, token);
      const response = await getSingleBlog(id, token);
      setBlog(response.data);
    } catch (error) {
      console.error("Error downvoting blog:", error);
    }
  };

  const onDelete = async (blogId) => {
    const result = await deleteBlog(blogId, token);
    if (result) {
      navigate("/");
    }
  };

  const onDeleteComment = async (commentId) => {
    await deleteComment(commentId, token);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await addComments(id, comment, token);
      setComment("");
      toast.success("Comment added!");
      socket.emit("comment", response.data.data.comments);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!blog) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      <div className="cs-blog-detail">
        <div className="cs-main-post mb-6">
          <figure className="w-full h-80 overflow-hidden rounded-lg shadow-md">
            <img
              src={blog?.coverImg}
              alt="Blog Cover"
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
            />
          </figure>
        </div>

        <div className="cs-post-title mt-4 mb-6">
          <div className="flex justify-between items-center px-6">
            <div className="cs-author">
              <p className="bg-gray-200 text-center text-gray-900 mb-2 px-4 py-2 rounded-full font-bold text-lg uppercase">
                {blog?.status}
              </p>
              <a
                href={`/auth/getUserByUsername/${blog?.createdBy?.username}`}
                className="text-gray-800 font-extrabold text-3xl hover:text-amber-600 transition duration-300"
              >
                {blog?.createdBy?.firstName} {blog?.createdBy?.lastName}
              </a>
            </div>
            <div className="flex gap-6 items-center">
              {userDetails?.data?.isModerator && (
                <BiTrash
                  className="text-red-600 cursor-pointer hover:text-red-800 transition duration-300 transform hover:scale-110"
                  size={32}
                  onClick={() => onDelete(blog?._id)}
                />
              )}
              <div className="flex items-center text-gray-700">
                <BiLike size={32} className="cursor-pointer" onClick={handleUpVote} />
                <span className="ml-2 text-xl">{blog?.upvotes?.length}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <BiDislike size={32} className="cursor-pointer" onClick={handleDownVote} />
                <span className="ml-2 text-xl">{blog?.downvotes?.length}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaCalendarDay size={28} />
                <span className="ml-2 text-lg">{formattedDate(blog?.createdBy?.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <BiCommentDots size={32} />
                <span className="ml-2 text-xl">{blog?.comments?.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Share Buttons */}
        <div className="flex gap-6 mb-6 px-6">
          <FacebookShareButton url={window.location.href} quote={blog?.title}>
            <FaFacebook size={40} className="text-gray-600 cursor-pointer hover:text-gray-800 transition-transform duration-300 transform hover:scale-110" />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={blog?.title}>
            <FaTwitter size={40} className="text-gray-600 cursor-pointer hover:text-gray-800 transition-transform duration-300 transform hover:scale-110" />
          </TwitterShareButton>
        </div>

        {/* Blog Content */}
        <div className="cs-post-option-panel mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-4xl text-center font-bold text-gray-800 mb-4 hover:text-amber-500 transition-colors duration-300">
            {blog?.title}
          </h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          <div className="mt-4 flex gap-4 items-center text-gray-500">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm font-semibold">
              {blog?.status}
            </span>
            <span className="text-sm">{formattedDate(blog?.createdBy?.createdAt)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="cs-tags mb-6 px-6">
          <h3 className="font-semibold text-gray-800 mb-2 text-2xl">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog?.tags.map((tag, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-700 bg-gray-200 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-300"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="comment-section mb-8 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add a Comment</h3>
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition duration-300"
            >
              Add Comment
            </button>
          </form>

          {showComments && blog?.comments?.length > 0 && (
            <div className="comments mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Comments</h3>
              {blog?.comments.map((comment) => (
                <div key={comment._id} className="mb-4 border-b pb-4 flex flex-col">
                  <p className="text-base text-gray-700 font-medium bg-gray-100 p-3 rounded-lg shadow-sm transition duration-300 hover:shadow-md">
                    {comment.content}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <p>
                      By {comment?.createdBy?.firstName} {comment?.createdBy?.lastName}
                    </p>
                    <p>{formattedDate(comment?.createdAt)}</p>
                    {userDetails?.data?.isModerator && (
                      <BiTrash
                        className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300"
                        size={20}
                        onClick={() => onDeleteComment(comment._id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
