import './App.css';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';


function App() {

  const socketUrl = 'ws://localhost:8080';

  const { /* definire i metodi da usare */} = useWebSocket(socketUrl, {
    onOpen: () => console.log('Connected to the websocket: ' + socketUrl),
    onClose: () => console.log('Impossible to connect to: ' + socketUrl),
    shouldReconnect: (closeEvent) => true,
  });
  
  const [array, setArray] = useState([]); // array per contenere i dati ricevuti
  
  useEffect(() => {
    console.log(array); /*stampo l'array così lo inizializzo e non ho
                         il problema di perdere i dati la prima volta
                          che vengono inviati al client */
  }, [JSON.stringify(array)]);

  useEffect (() => {
    const ws = new WebSocket(socketUrl);
    ws.onmessage = function (event) {
      try {
        setArray([...array, JSON.parse(event.data)]); // aggiungere i dati ricevuti all'array
      }
      catch (e) {
        alert("Errore: " + e);
      }
    };
    return () => { /* necessario per non ricevere dati duplicati */
      ws.close();
    };
  }, [array]);

  return (
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
        {
          array.map((item, index) => {
            return (
              <tr key={item.IDR}>
                <td>{index + 1}</td>
                <td>{item.IDR}</td>
                <td>{item.event_start}</td>
                <td>{item.event_stop}</td>
                <td>{item.mag_avg}</td>
                <td>{item.mag_min}</td>
                <td>{item.mag_max}</td>
                <td>{item.dist_min}</td>
                <td>{item.dist_max}</td>
                {console.log("item dist " + item.dist_max)}
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );

}

export default App;
