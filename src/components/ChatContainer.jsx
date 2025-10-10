import React from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

function ChatContainer() {
  return (
    <>
    <div className='flex flex-col '>
    <ChatHeader/>
    <div>Message History</div>
    <MessageInput/>
    </div>
    </>
  )
}

export default ChatContainer