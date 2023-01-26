import { useEffect, useState } from "react";
import * as io from 'socket.io-client'
import MessageInput from "./MessageInput";
import Messages from "./Messages";

function App() {

  const [socket, setSocket] = useState();
  const[messages, setMessages] = useState([]);
  const send = (value) => {
    socket?.emit("message", value);
  }
  useEffect(() => {
    const newSocket=io.connect("http://localhost:8000");
    setSocket(newSocket);
  }, [setSocket])
  
  const messageListener = (message) => {
    setMessages([...messages, message]);
  }

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    }
  }, [messageListener]);

  return (
    <>
      {" "}
      <MessageInput send={send} />
      <Messages messages={messages} />
    </>
  );
}

export default App;
