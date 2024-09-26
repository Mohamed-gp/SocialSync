import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import { Socket } from "socket.io-client";

interface InitialState {
  globalSocket: null | Socket;
  caller: string | null;
  receivingCall: boolean;
  callerSignal: any;
  callAccepted: boolean;
  idToCall: string | null;
  callEnded: boolean;
  name: string | null;
  stream: MediaStream | null;
  userVideoRef: RefObject<HTMLVideoElement> | null;
  connectionRef: RefObject<RTCPeerConnection | null> | null;
}

const initialState: InitialState = {
  globalSocket: null,
  caller: null,
  receivingCall: false,
  callerSignal: null,
  callAccepted: false,
  idToCall: null,
  callEnded: false,
  name: null,
  stream: null,
  userVideoRef: null,
  connectionRef: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setGlobalSocket(state, action: PayloadAction<Socket | null>) {
      state.globalSocket = action.payload;
    },
    setCaller: (state, action: PayloadAction<string | null>) => {
      state.caller = action.payload;
    },
    setReceivingCall: (state, action: PayloadAction<boolean>) => {
      state.receivingCall = action.payload;
    },
    setCallerSignal: (state, action: PayloadAction<any>) => {
      state.callerSignal = action.payload;
    },
    setCallAccepted: (state, action: PayloadAction<boolean>) => {
      state.callAccepted = action.payload;
    },
    setIdToCall: (state, action: PayloadAction<string | null>) => {
      state.idToCall = action.payload;
    },
    setCallEnded: (state, action: PayloadAction<boolean>) => {
      state.callEnded = action.payload;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.stream = action.payload;
    },
    setUserVideoRef: (
      state,
      action: PayloadAction<RefObject<HTMLVideoElement>>
    ) => {
      state.userVideoRef = action.payload;
    },
    setConnectionRef: (
      state,
      action: PayloadAction<RefObject<RTCPeerConnection | null>>
    ) => {
      state.connectionRef = action.payload;
    },
  },
});

const messagesActions = messagesSlice.actions;
const messagesReducer = messagesSlice.reducer;

export default messagesReducer;
export { messagesActions };
