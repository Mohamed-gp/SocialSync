import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { io } from "socket.io-client";
import customAxios from "../../axios/customAxios";
import VideoChat from "../../components/messagesComps/VideoChat";
import Inbox from "../../components/messagesComps/Inbox";
import { messagesActions } from "../../store/slices/messagesSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.auth.user);
  const [inbox, setInbox] = useState<any[]>([]);
  const [activeInboxIndex, setActiveInboxIndex] = useState(0);
  const [activeInbox, setActiveInbox] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const getChats = async () => {
    try {
      const { data } = await customAxios.get(`/messages/${user?._id}`);
      setInbox(data.data);
      setActiveInbox(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      const socket = io(
        import.meta.env.VITE_ENV == "development"
          ? "http://localhost:3002"
          : "https://socialsync1.production-server.tech",
        {
          auth: { userId: null },
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: Infinity,
        }
      );
      dispatch(messagesActions.setGlobalSocket(socket));
      socket.on("onlineUsers", (msg) => {
        setOnlineUsers(msg);
      });
      socket.on("message", (msg) => {
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
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, inbox]);

  useEffect(() => {
    setActiveInbox(inbox[activeInboxIndex]);
  }, [inbox, activeInbox]);
  useEffect(() => {
    getChats();
  }, []);
  return (
    <div
      className="container my-6"
      style={inbox.length === 0 ? {} : { minHeight: "calc(100vh - 200px)" }}
    >
      <Inbox
        activeInboxIndex={activeInboxIndex}
        activeInbox={activeInbox}
        inbox={inbox}
        onlineUsers={onlineUsers}
        setActiveInbox={setActiveInbox}
        setActiveInboxIndex={setActiveInboxIndex}
      />
      <VideoChat />
    </div>
  );
};

export default Messages;
