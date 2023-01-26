# sysco_exercise

### SAMPLE APP ###

Sviluppa una webapp che:

1. Implementa un server UDP
2. Implementa un server WEBSOCKET
3. Alla ricezione di una stringa sul socket UDP, controlla se è parsabile in formato JSON:
    3.1 Se sì, prosegue
    3.2 Se no, resituisce errore (lato frontend ignora il dato)
4. Una volta parsato il dato, invia tramite websocket il suddetto dato al frontend
5. Il frontend riceve il dato ed inserisce i valori estrapolati dall'oggetto JSON in una tabella
6. La tabella deve mostrare in ogni momento il dato più aggiornato (valori dell'ultimo oggetto JSON ricevuto)

### DETTAGLI ###

La stringa ricevuta deve essere il risultato di JSON.stringify() eseguito sul seguente oggetto:

    {
        "IDR": 1,
        "event_start": "2023-01-24 14:30",
        "event_stop": "2023-01-24 14:35",
        "mag_avg": 100,
        "mag_min": 10,
        "mag_max": 200,
        "dist_min": 400,
        "dist_max": 1600
    }

### VINCOLI ###

1. L'applicazione deve essere sviluppata nei seguenti linguaggi:

    - React.JS (HTML + CSS) per il frontend
    - NodeJS per il backend

2. L'intercomunicazione tra il modulo frontend e backend deve essere di tipo WEBSOCKET
3. Il design dell'interfaccia è a discrezione dell'implementatore
