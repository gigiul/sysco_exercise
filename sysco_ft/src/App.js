
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import MessageInput from './MessageInput';


function App() {


  const socketUrl = 'ws://localhost:8000';
  
  const {
    sendMessage,
    onmessage,
    lastMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
      const ws = new WebSocket(socketUrl);
      ws.onmessage = (event) => {
          const data = (event.data);
          setMessage(data);
      };
      return () => {
          ws.close();
      }
  }, [])

  return (
    <>
      <MessageInput send={sendMessage}/>
      <p>{message}</p>
    </>
  );
}

export default App;
