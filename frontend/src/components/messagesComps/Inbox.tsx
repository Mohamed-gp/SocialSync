import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import MessagesRoom from "./MessagesRoom";
import NoChatFound from "./NoChatFound";

interface InboxProps {
  inbox: any;
  onlineUsers: string[];
  activeInbox: any;
  setActiveInbox: any;
  activeInboxIndex: number;
  setActiveInboxIndex: any;
}

const Inbox = ({
  inbox,
  onlineUsers,
  activeInbox,
  setActiveInbox,
  setActiveInboxIndex,
  activeInboxIndex,
}: InboxProps) => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="flex mt-12 gap-6">
      <div className="flex-1">
        <p className="text-3xl font-bold mb-6 dark:text-white">Inbox</p>
        <div className="flex lg:flex-row gap-6 justify-center items-center lg:items-start flex-col">
          <div className="flex flex-col px-6 gap-6">
            <div className="flex justify-center">
              <div className="justify-center flex flex-col items-center gap-6">
                {inbox?.length === 0 ? (
                  <NoChatFound />
                ) : (
                  <div className="max-h-[500px] overflow-auto flex flex-col gap-3 mt-3 px-2">
                    {inbox?.map((host, index) => (
                      <div
                        key={host?._id + "inbox-div"}
                        onClick={() => {
                          setActiveInbox(inbox[index]);
                          setActiveInboxIndex(index);
                        }}
                        className={`flex gap-3 items-center relative px-2  rounded-xl dark:bg-darkThemeBG dark:text-white  py-2 justify-center hover:opacity-85 duration-300 cursor-pointer w-[250px] ${
                          index == activeInboxIndex
                            ? "text-white !bg-mainColor"
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
                            <p className="flex-1">{host?.firstUser.username}</p>
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
          {inbox.length != 0 && activeInbox && (
            <MessagesRoom activeInbox={activeInbox} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
