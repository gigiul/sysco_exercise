
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

  const [message, setMessage] = useState({});
  const [array, setArray] = useState([]);


  useEffect(() => {
      const ws = new WebSocket(socketUrl);
      ws.onmessage = (event) => {
          const data = (event.data);
          setMessage(data);
          console.log(JSON.parse(data));
          let tmp = array;
          tmp.push(JSON.parse(data));
          setArray(tmp);
        };
      return () => {
          ws.close();
      }
  }, [])

  useEffect(() => {
    console.log(array);
  }, [JSON.stringify(array)])

  const lastObject = array[array.length-1];

  return(
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold mb-4'>Websocket Client</h1>
        {lastObject ? (null) : 
        (
          <div className='text-center mb-4'>
            <p className='mb-8'>Please start the server and send a valid json</p>
            <p className='text-xs' dangerouslySetInnerHTML={{__html: 'echo \'{"IDR":1,"event_start":"2023-01-24 14:30","event_stop":"2023-01-24 14:35","mag_avg":100,"mag_min":100,"mag_max":200,"dist_min":400,"dist_max":1600}\' | nc -u localhost 8081'}} />
          </div>)}
      <div className="border-separate border border-slate-400 p-16">
          {lastObject ? (Object.keys(lastObject).map((key, index) => (
            <div key={index}>
              <span className='font-bold'>{key}:</span> <span>{lastObject[key]}</span>
            </div>
          ))) : null}
     </div>
    </div>
  )
}

export default App;
