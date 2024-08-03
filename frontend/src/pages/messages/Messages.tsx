import { useEffect, useState } from "react";
import { FaTrash, FaVideo } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
// import io from "socket.io-client";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import customAxios from "../../axios/customAxios";

const Messages = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [messageInput, setMessageInput] = useState("");
  const [inbox, setInbox] = useState<any[]>([]);
  const [activeInboxIndex, setActiveInboxIndex] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getChats = async () => {
    try {
      const { data } = await customAxios.get(`/messages/${user?._id}`);
      setInbox(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = async (secondUserId: string) => {
    try {
      const { data } = await customAxios.post(`/messages/message/create`, {
        text: messageInput,
        firstUserId: user._id,
        secondUserId: secondUserId,
      });
      setMessageInput("");
      getChats();
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    const Env = "production";
    const url =
      Env == "production"
        ? "https://socialsync-qw94.onrender.com/"
        : "http://localhost:3000/";

    if (user?._id) {
      const socket = io(url, {
        query: { userId: user?._id },
      });

      socket.on("onlineUsers", (msg) => {
        setOnlineUsers(msg);
      });

      socket.on("message", (msg) => {
        if (user?._id === msg.receiverId) {
          setInbox((prevInbox) =>
            prevInbox.map((room) => {
              if (room?._id === msg?.roomId) {
                return {
                  ...room,
                  messages: [
                    ...room.messages,
                    {
                      userId: msg.senderId,
                      message: msg.message,
                    },
                  ],
                };
              }

              return room;
            })
          );
          if (!inbox.find((room) => room._id == msg.roomId)) {
            setInbox((prev) => {
              prev.push({
                _id: msg.roomId,
                firstUser: msg.senderId,
                secondUser: user,
                messages: [{ userId: msg.senderId, message: msg.message }],
              });
              return prev;
            });
          }
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, inbox]);
  useEffect(() => {
    console.log(inbox);
  }, [inbox]);

  return (
    <div
      className="container my-6"
      style={inbox.length === 0 ? {} : { minHeight: "calc(100vh - 200px)" }}
    >
      <div className="flex mt-12 gap-6">
        <div className="flex-1">
          <p className="text-3xl font-bold mb-6">Inbox</p>
          <div className="flex lg:flex-row gap-6 justify-center items-center lg:items-start flex-col">
            <div className="flex flex-col px-6 gap-6">
              <div className="flex justify-center">
                <div className="justify-center flex flex-col items-center gap-6">
                  {inbox?.length === 0 ? (
                    <div
                      className="flex justify-center items-center w-full"
                      style={{ minHeight: "calc(100vh - 200px)" }}
                    >
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-mainColor">
                          No Chat Found
                        </p>
                        <p className="opacity-70 text-sm mt-1 mb-3 text-center">
                          Try Connecting With People
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-[500px] overflow-auto flex flex-col gap-3 mt-3 px-2">
                      {inbox?.map((host, index) => (
                        <div
                          key={host?._id}
                          onClick={() => {
                            setActiveInboxIndex(index);
                          }}
                          className={`flex gap-3 items-center relative px-2  rounded-xl  py-2 justify-center hover:opacity-85 duration-300 cursor-pointer w-[250px] ${
                            index == activeInboxIndex
                              ? "text-white bg-mainColor"
                              : "bg-white"
                          }`}
                        >
                          {host?.secondUser?._id === user?._id ? (
                            <>
                              <div>
                                <img
                                  src={host?.firstUser?.profileImg}
                                  alt="avatar"
                                  className="w-12 h-12 object-cover rounded-full"
                                />
                              </div>
                              <p className="flex-1">
                                {host?.firstUser.username}
                              </p>
                              {onlineUsers?.find(
                                (id: string) => id == host?.firstUser?._id
                              ) && (
                                <span className=" bg-[#14ff00] w-2 h-2 rounded-full"></span>
                              )}
                            </>
                          ) : (
                            <>
                              <div>
                                <img
                                  src={host?.secondUser?.profileImg}
                                  alt="avatar"
                                  className="w-12 h-12 object-cover rounded-full"
                                />
                              </div>
                              <p className="flex-1">
                                {host?.secondUser?.username}
                              </p>
                              {onlineUsers.find(
                                (userId: string) =>
                                  userId == host?.secondUser?._id
                              ) && (
                                <span className=" bg-[#14ff00] w-2 h-2 rounded-full"></span>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {inbox?.length !== 0 && (
              <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 flex-1 max-w-[700px] mx-4">
                <div className="flex border-b-2 pb-2 items-center justify-between">
                  <p className="">
                    {inbox[activeInboxIndex]?.secondUser?._id === user._id ? (
                      <>{inbox[activeInboxIndex]?.firstUser?.username}</>
                    ) : (
                      <>{inbox[activeInboxIndex]?.secondUser?.username}</>
                    )}
                  </p>
                  <FaVideo className="text-mainColor cursor-pointer text-xl" />
                </div>
                <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 flex-1 max-h-[300px] overflow-auto mx-4">
                  {inbox[activeInboxIndex]?.messages?.map((message: any) => (
                    <div key={message._id}>
                      {message?.userId?._id === user?._id ? (
                        <div className="flex items-end gap-2">
                          <p className="bg-mainColor text-white p-6 rounded-xl w-full">
                            {message?.message}
                          </p>
                          <img
                            src={user?.profileImg}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="flex items-end gap-2 w-full">
                          <img
                            src={message?.userId?.profileImg}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          <p className="bg-[#F5F5F5] p-6 rounded-xl">
                            {message.message}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <textarea
                    // type="text"
                    placeholder="Write Message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="focus:outline-none w-full border-t border-mainColor my-6 p-2 mx-2"
                  />
                  <button
                    onClick={() => {
                      createMessage(
                        inbox[activeInboxIndex]?.secondUser?._id === user._id
                          ? inbox[activeInboxIndex]?.firstUser?._id
                          : inbox[activeInboxIndex]?.secondUser?._id
                      );
                    }}
                    className={`flex text-white font-bold gap-2 bg-mainColor items-center px-6 py-2 rounded-xl ${
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
