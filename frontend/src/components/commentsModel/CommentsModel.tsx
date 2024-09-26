import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import customAxios from "../../axios/customAxios";

interface CommentsModelProps {
  setIsPostCommentsShow: (show: boolean) => void;
  post: any;
}

const CommentsModel = ({ setIsPostCommentsShow, post }: CommentsModelProps) => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [comments, setComments] = useState(post?.comments);
  const [text, setText] = useState("");
  // const [isDropDownOpen, setIsDropDownOpen] = useState(true);
  const [replyToCommentText, setReplyToCommentText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null
  );

  const createComment = async () => {
    try {
      const { data } = await customAxios.post(`/comments/${post?._id}`, {
        text,
        userId: user?._id,
      });
      renewPostCommentsHandler();
      setText(""); // Clear the comment input field
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const renewPostCommentsHandler = async () => {
    try {
      const { data } = await customAxios.get(`/posts/comments/${post?._id}`);
      setComments(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const replyToComment = async (commentId: string) => {
    try {
      const { data } = await customAxios.post(
        `/comments/${post?._id}/${commentId}/replyToComment`,
        {
          text: replyToCommentText,
          userId: user?._id,
        }
      );
      renewPostCommentsHandler();
      setReplyingToCommentId(null); // Reset the reply input visibility
      setReplyToCommentText(""); // Clear the reply input field
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    renewPostCommentsHandler();
  }, []);

  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 z-10"
      onClick={() => setIsPostCommentsShow(false)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="sm:w-[80vw] p-6 sm:left-[10vw] flex flex-col left-0 top-[15vh] w-screen h-[70vh] overflow-auto rounded-2xl container fixed bg-white dark:bg-darkThemeBGLight mt-6"
      >
        <FaX
          onClick={() => setIsPostCommentsShow(false)}
          className="text-redColor absolute top-6 right-6 cursor-pointer"
        />
        <div className="flex flex-col gap-5 justify-center items-center mt-12">
          <section className="bg-white dark:bg-darkThemeBGLight antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({comments?.length})
                </h2>
              </div>
              {user && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createComment();
                  }}
                  className="mb-6 flex flex-col items-end"
                >
                  <div className="py-2 w-full px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-darkThemeBG dark:border-gray-700">
                    <label
                      htmlFor="comment"
                      className="sr-only dark:!text-red-300"
                    >
                      Your comment
                    </label>
                    <input
                      id="comment"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-darkThemeBG"
                      placeholder="Write a comment..."
                      required
                    ></input>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-mainColor flex-end bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    create comment
                  </button>
                </form>
              )}
              <div className="">
                {comments?.map((comment: any) => (
                  <div key={comment._id} className="p-6 border-b">
                    <article className="p-6 text-base bg-white rounded-lg dark:bg-darkThemeBG pb-6   mb-6">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center justify-between w-full">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={comment?.comment?.user?.profileImg}
                              alt={comment?.comment?.user?.username}
                            />
                            {comment?.comment?.user?.username}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {comment.comment?.createdAt.slice(0, 10)}
                          </p>
                        </div>
                        {user && user.id === comment?.comment?.user?._id && (
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-darkThemeBGLight dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                          </button>
                        )}
                        {/* {isDropDownOpen && (
                          <div
                            id="dropdownComment1"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Report
                                </a>
                              </li>
                            </ul>
                          </div>
                        )} */}
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment?.comment?.text}
                      </p>
                      {user ? (
                        <>
                          {comment?.comment?.replies?.length === 0 ||
                            (!comment?.comment?.replies?.length && (
                              <div className="flex items-center mt-4 space-x-4">
                                <button
                                  type="button"
                                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                  onClick={() => {
                                    if (
                                      replyingToCommentId ===
                                      comment?.comment?._id
                                    ) {
                                      setReplyingToCommentId(null);
                                    }
                                    setReplyingToCommentId(
                                      comment?.comment?._id
                                    );
                                  }}
                                >
                                  <svg
                                    className="mr-1.5 w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                  </svg>
                                  Reply
                                </button>
                              </div>
                            ))}
                          {replyingToCommentId === comment?.comment?._id && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                replyToComment(comment?.comment?._id);
                              }}
                              className="mt-4"
                            >
                              <input
                                value={replyToCommentText}
                                onChange={(e) =>
                                  setReplyToCommentText(e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-darkThemeBG dark:text-white"
                                placeholder="Write a reply..."
                                required
                              ></input>
                              <button
                                type="submit"
                                className="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-mainColor rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                              >
                                Reply
                              </button>
                            </form>
                          )}
                        </>
                      ) : (
                        <Link
                          to={"/register"}
                          className="flex items-center mt-4 space-x-4"
                        >
                          <button
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                          >
                            <svg
                              className="mr-1.5 w-3.5 h-3.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                            </svg>
                            Reply
                          </button>
                        </Link>
                      )}
                    </article>
                    {comment?.replies?.map((reply: any, ind: number) => (
                      <article
                        key={reply?._id}
                        className="p-6 mb-3 ml-6 lg:ml-12 text-base mt-3 bg-white rounded-lg dark:bg-darkThemeBG"
                      >
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={reply?.user.profileImg}
                                alt={reply?.user.username}
                              />
                              {reply?.user.username}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {reply?.createdAt?.slice(0, 10)}
                            </p>
                          </div>
                          {user && user.id === reply?.user._id && (
                            <button
                              id="dropdownComment2Button"
                              data-dropdown-toggle="dropdownComment2"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                              >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                              </svg>
                              <span className="sr-only">Comment settings</span>
                            </button>
                          )}
                          <div
                            id="dropdownComment2"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Report
                                </a>
                              </li>
                            </ul>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          {reply?.text}
                        </p>
                        {/* {user && ind == comment.replies.length - 1 && (
                          <>
                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                onClick={() =>
                                  setReplyingToCommentId(reply?._id)
                                }
                              >
                                <svg
                                  className="mr-1.5 w-3.5 h-3.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                  />
                                </svg>
                                Reply
                              </button>
                            </div>
                            {replyingToCommentId === reply?._id && (
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  replyToComment(comment?.comment?._id);
                                }}
                                className="mt-4"
                              >
                                <textarea
                                  rows={3}
                                  value={replyToCommentText}
                                  onChange={(e) =>
                                    setReplyToCommentText(e.target.value)
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-darkThemeBG dark:text-white"
                                  placeholder="Write a reply..."
                                  required
                                ></textarea>
                                <button
                                  type="submit"
                                  className="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-mainColor rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  Reply
                                </button>
                              </form>
                            )}
                          </>
                        )} */}
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommentsModel;
