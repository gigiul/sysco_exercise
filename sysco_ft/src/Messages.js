import React from 'react'

const Messages = (messages) => {
  return (
    console.log(messages),
    <div>
        { Object.keys.messages?.map((message, index) => (
        <div key={index}>{message}</div>
        ))}
    </div>
  )
}

export default Messages