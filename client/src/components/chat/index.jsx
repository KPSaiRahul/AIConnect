import React from 'react';
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import  Header  from '@/components/customHeader';
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
const Chat = () => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID, "testuser", "1234"
    );
    return (
        <div style={{ flexBasis: "100%" }}>
            {/* Sockets = Some JavaScript functions for state manegement  !!!cannot do much in this*/}
            <MultiChatSocket {...chatProps} />
            {/* Component = Chat UI components to show
            We can do a lot of styling and customization on how it works
        */}
            <MultiChatWindow {...chatProps} style={{ height: "100vh" }} 
            renderChatHeader={(chat) => <Header chat={chat}/>} 
            renderMessageForm={(props)=> {
                return(
                    <StandardMessageForm props={props} activeChat={chatProps.chat} />
                )
            }}/>
        </div>
    )
}

export default Chat
