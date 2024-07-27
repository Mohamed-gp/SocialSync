import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
// import io from "socket.io-client";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Messages = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [messageInput, setmessageInput] = useState("");
  const [inbox, setinbox] = useState([]);
  const [activeInboxIndex, setactiveInboxIndex] = useState(0);
  //   const getChats = async () => {
  //     try {
  //       const { data } = await customAxios.get("/messages");
  //       setinbox(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const [singleMessages, setsingleMessages] = useState([]);
  //   const getSingleMessages = async () => {
  //     try {
  //       const { data } = await customAxios.get(
  //         `/messages/${inbox[activeInboxIndex]?.id}`
  //       );

  //       setsingleMessages(data);
  //     } catch (error: any) {
  //       toast.error(error.resonse.data);
  //     }
  //   };
  //   const createMessage = async () => {
  //     try {
  //       const { data } = await customAxios.post(
  //         `/messages/${inbox[activeInboxIndex]?.id}/messages`,
  //         {
  //           text: messageInput,
  //         }
  //       );
  //       setmessageInput("");
  //     } catch (error: any) {
  //       toast.error(error.resonse.data);
  //     }
  //   };
  //   useEffect(() => {
  //     getChats();
  //   }, []);

  //   useEffect(() => {
  //     getSingleMessages();
  //   }, [activeInboxIndex, inbox]);

  //   useEffect(() => {
  //     const socket = io("https://krelli-x86.onrender.com", {
  //       query: {
  //         userId: user?.id,
  //       },
  //     }); // Replace with your server URL

  //     // socket.on("message", (messages) => {
  //     //   if (singleMessages?.Messages?.length == 0) {
  //     //     setsingleMessages({
  //     //       Messages: [messages],
  //     //     });
  //     //   } else {
  //     //     setsingleMessages((prev) => prev?.Messages?.push(messages));
  //     //   }
  //     // });

  //     socket.on("message", (message) => {
  //       setsingleMessages((prevMessages) => {
  //         if (prevMessages.Messages?.length === 0) {
  //           return { Messages: [message] };
  //         } else {
  //           return { Messages: [...prevMessages.Messages, message] };
  //         }
  //       });
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);
  useEffect(() => {
    if (user?._id) {
      const socket = io("http://localhost:3000/", {
        query: { userId: user?._id },
      });

      socket.on("onlineUsers", (msg) => {
        console.log(msg);
      });
    }
  }, []);
  return (
    <div className="container">
      <div className=" flex    mt-12 gap-6 ">
        <div className="flex-1">
          <p className="text-3xl font-bold mb-6">Inbox</p>
          <div className="  flex md:flex-row gap-6 justify-center flex-col">
            <div className="flex flex-col px-6 gap-6">
              <div className="flex justify-center">
                <div className="justify-center  flex flex-col items-center  gap-6">
                  {inbox?.length == 0 ? (
                    <div
                      className="flex justify-center items-center w-full"
                      style={{ minHeight: "calc(100vh - 350px)" }}
                    >
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-mainColor">
                          No Chat Found
                        </p>
                        <p className="opacity-70 text-sm mt-1 mb-3 text-center">
                          Try Connecting With People
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                          <Link
                            to="/friends"
                            className="border w-[160px] font-bold border-mainColor text-mainColor px-6 py-2 rounded-xl text-center cursor-pointer"
                          >
                            Find People
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {inbox.map((host, index) => (
                        // i neeed to fix the view of the hoster
                        <div
                          onClick={() => setactiveInboxIndex(index)}
                          className={`flex gap-3 items-center relative px-2 bg-white rounded-xl py-2 justify-center hover:opacity-85 duration-300 cursor-pointer w-[250px] ${
                            index == activeInboxIndex
                              ? " text-white  !bg-buttonColor"
                              : ""
                          }`}
                        >
                          <div>
                            {/* <img
                              src={host?.users[0]?.profileImage}
                              alt="avatar"
                              className="w-12 h-12 object-cover rounded-full"
                            /> */}
                          </div>
                          {/* <div className="flex flex-col">
                            {host?.users[0]?.firstName == user?.firstName &&
                            host?.users[0]?.lastName == user?.lastName ? (
                              <>
                                <p className="text-sm">
                                  {host?.users[1]?.firstName.slice(0, 11)}...
                                </p>
                                <p>Property Tenant</p>
                              </>
                            ) : (
                              <>
                                <p className="text-sm">
                                  {host?.users[0]?.firstName.slice(0, 11)}...
                                </p>
                                <p>Property owner</p>
                              </>
                            )}
                          </div> */}
                          <div>
                            {/* <img
                              src={host?.picture}
                              className="w-12 h-12 rounded-xl object-cover"
                              alt=""
                            /> */}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            {inbox?.length != 0 && (
              <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 flex-1 max-w-[700px] mx-4">
                <div className="flex border-b-2 justify-between">
                  <p className="">
                    {/* {inbox[activeInboxIndex]?.users[1]?.firstName} */}
                  </p>
                  {/* <FaTrash /> */}
                </div>
                <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 flex-1 max-h-[300px] overflow-auto mx-4">
                  {/* {singleMessages?.Messages?.map((message) => (
                    <>
                      {message?.userId == user?.id && (
                        <div className="flex items-end gap-2">
                          <p className="bg-[#4880FF] text-white p-6 rounded-xl w-full">
                            {message?.message}
                          </p>
                          <img
                            src={user.profileImage}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </div>
                      )}
                      {message?.userId != user?.id && (
                        <div className="flex items-end gap-2 w-full">
                          <img
                            src="/profile.jpg"
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          <p className="bg-[#F5F5F5] p-6 rounded-xl">
                            {message.message}
                          </p>
                        </div>
                      )}
                    </>
                  ))} */}
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Write Message"
                    value={messageInput}
                    onChange={(e) => setmessageInput(e.target.value)}
                    className="focus:outline-none w-full border-t border-mainColor py-6"
                  />
                  <button
                    // onClick={() => createMessage()}
                    className={`flex text-white  font-bold gap-2 bg-mainColor items-center px-6 py-2 rounded-xl disabled:opacity-50 ${
                      messageInput.length < 1
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100"
                    }`}
                    disabled={messageInput.length < 1}
                  >
                    <p>Send</p>
                    <IoMdSend />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messages;
