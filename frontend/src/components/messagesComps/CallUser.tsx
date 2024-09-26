import { FaVideo } from "react-icons/fa6";
import { IRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";
import { messagesActions } from "../../store/slices/messagesSlice";

interface CallUserProps {
  activeInbox: any;
}
const CallUser = ({ activeInbox }: CallUserProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootState) => state.auth);
  const { globalSocket, stream, connectionRef, userVideoRef } = useSelector(
    (state: IRootState) => state.messages
  );
  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      globalSocket?.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user._id,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });
    globalSocket?.on("callAccepted", (signal) => {
      dispatch(messagesActions.setCallAccepted(true));
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  return (
    <FaVideo
      onClick={() =>
        callUser(
          activeInbox?.secondUser?._id === user._id
            ? activeInbox?.firstUser?._id
            : activeInbox?.secondUser?._id
        )
      }
      className="text-mainColor cursor-pointer text-xl"
    />
  );
};
export default CallUser;
