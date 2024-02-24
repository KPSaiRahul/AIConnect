import React from 'react'
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
// import { ChatBubbleLeftRightIcon } from '@/assets/icons';
const CustomHeader = ({ chat }) => {
    console.log(chat.description);
    return (
        <div className='chat-header'>
            <div className="flexbetween">
                <ChatBubbleLeftRightIcon className='icon-chat' />

                <h3 className='header-text'>{chat.title}</h3>
            </div>
            <div className='flexbetween'>
                <PhoneIcon className='icon-phone' />

                {chat.description !== "⬅️ ⬅️ ⬅️" ? <p className='header-text'>{chat.description}</p> : <p className='header-text'>no chats selected</p>}
            </div>
        </div>
    )
}

export default CustomHeader
