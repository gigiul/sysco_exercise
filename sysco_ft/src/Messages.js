import React, { useState } from 'react'

const Messages = (messages) => {
    const [obj, setObj] = useState({messages: []})

  return (
    console.log(messages),
    <div>
        { Object.keys.obj?.map((message, index) => {
            return (
            <div key={index}>{message.index}</div>
        )})}
    </div>
  )
}

export default Messages