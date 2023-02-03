import './App.css';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';


function App() {
  
  const DEBUG = false;
  
  const socketUrl = 'ws://localhost:8080';

  const { lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log('Connected to the websocket: ' + socketUrl),
    onClose: () => console.log('Impossible to connect to: ' + socketUrl),
    shouldReconnect: (closeEvent) => true,
  });

  const [array, setArray] = useState([]); // array per contenere i dati ricevuti

  const ws = new WebSocket(socketUrl);
  
  useEffect(() => {
    ws.onmessage = (event) => {
      let msg = event.data;
      if (DEBUG) {
        console.log("MSG RECEIVED", msg)
      }
      setArray(array => [...array, msg]);
      };
      }, [])
  
      
  function parseArray (item, index) {
    let parsed = JSON.parse(item)
    if (DEBUG) {
      console.log("item: ", parsed.type)
    }

     switch(parsed.type) {
      case "data":
        return (<>
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{parsed.payload.IDR}</td>
          <td>{parsed.payload.event_start}</td>
          <td>{parsed.payload.event_stop}</td>
          <td>{parsed.payload.mag_avg}</td>
          <td>{parsed.payload.mag_min}</td>
          <td>{parsed.payload.mag_max}</td>
          <td>{parsed.payload.dist_min}</td>
          <td>{parsed.payload.dist_max}</td>
        </tr>
        </>)
      case "json_error":
        if (DEBUG) {
          console.log("invalid item")
        }
      break;
      default:
        console.log("Default")
    }
  }

  return (
    <>
    <Table striped border={3}>
      <thead>
        <tr>
          <th>#</th>
          <th>IDR</th>
          <th>event_start</th>
          <th>event_stop</th>
          <th>mag_avg</th>
          <th>mag_min</th>
          <th>mag_max</th>
          <th>dist_min</th>
          <th>dist_max</th>
        </tr>
      </thead>
      <tbody>
          {array.map((item, index) => {
            return (
              parseArray(item, index)
            )
          })
        }
      </tbody>
    </Table>
    </>
  );

}

export default App;
