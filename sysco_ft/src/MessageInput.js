import React, { useState } from 'react'

const MessageInput = ({send}) => {

    const [value, setValue] = useState('')
  return (
    <div>
        <input onChange={(e) => setValue(e.target.value)} placeholder='Type your message ...' value={value} />
        <button onClick={() => send(value)}>Send</button>
    </div>
  )
}

export default MessageInput