import { useState } from "react";
import customAxios from "../../axios/customAxios";
import { IRootState } from "../../store/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import CallUser from "./CallUser";

interface MessagesRoomProps {
  activeInbox: any;
}
const MessagesRoom = ({ activeInbox }: MessagesRoomProps) => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [messageInput, setMessageInput] = useState("");

  const createMessage = async (secondUserId: string) => {
    try {
      await customAxios.post(`/messages/message/create`, {
        text: messageInput,
        firstUserId: user._id,
        secondUserId: secondUserId,
      });
      setMessageInput("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col rounded-xl dark:bg-darkThemeBG dark:text-white bg-white px-6 py-6 gap-6 flex-1 max-w-[700px] mx-4">
      <div className="flex border-b-2 pb-2 items-center justify-between">
        <p className="">
          {activeInbox?.secondUser?._id === user._id ? (
            <>{activeInbox?.firstUser?.username}</>
          ) : (
            <>{activeInbox?.secondUser?.username}</>
          )}
        </p>
        {/* web rtc */}
        <CallUser activeInbox={activeInbox} />
      </div>
      <div className="flex flex-col rounded-xl bg-white dark:bg-darkThemeBG dark:text-black px-6 py-6 gap-6 flex-1 max-h-[300px] overflow-auto mx-4">
        {activeInbox?.messages?.map((message: any) => (
          <div key={message._id + "msg room"}>
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
                <p className="bg-[#F5F5F5] p-6 rounded-xl">{message.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMessage(
            activeInbox?.secondUser?._id === user._id
              ? activeInbox?.firstUser?._id
              : activeInbox?.secondUser?._id
          );
        }}
        className="flex justify-between items-center"
      >
        <input
          type="text"
          placeholder="Write Message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="focus:outline-none w-full border-t  dark:bg-darkThemeBG border-mainColor my-6 p-2 mx-2"
        />
        <button
          type="submit"
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
      </form>
    </div>
  );
};
export default MessagesRoom;
