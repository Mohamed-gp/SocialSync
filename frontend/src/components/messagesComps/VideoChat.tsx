import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import Peer from "simple-peer";
import { messagesActions } from "../../store/slices/messagesSlice";

const VideoChat = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const {
    globalSocket,
    caller,
    receivingCall,
    callerSignal,
    callAccepted,
    idToCall,
    callEnded,
    name,
    stream,
  } = useSelector((state: IRootState) => state.messages);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        dispatch(messagesActions.setStream(stream));
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      });

    globalSocket?.on("callUser", (data) => {
      dispatch(messagesActions.setReceivingCall(true));
      dispatch(messagesActions.setCaller(data.from));
      dispatch(messagesActions.setName(data.name));
      dispatch(messagesActions.setCallerSignal(data.signal));
    });
  }, [globalSocket]);

  const answerCall = () => {
    dispatch(messagesActions.setCallAccepted(true));
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      globalSocket?.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    dispatch(messagesActions.setCallEnded(true));
    connectionRef.current?.destroy();
  };

  useEffect(() => {
    dispatch(messagesActions.setUserVideoRef(userVideoRef));
    dispatch(messagesActions.setMyVideoRef(myVideoRef));
    dispatch(messagesActions.setConnectionRef(connectionRef));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideoRef}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideoRef}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          <div className="call-button">
            {callAccepted && !callEnded && (
              <button onClick={leaveCall}>End Call</button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button color="primary" onClick={answerCall}>
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default VideoChat;
