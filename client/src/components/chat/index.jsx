import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import  Header  from '@/components/customHeader';
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from '@/components/customMessageForms/Ai';
import AiCode from '@/components/customMessageForms/AiCode';
import AiAssist from '@/components/customMessageForms/AiAssist';
const Chat = () => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID, "testuser", "1234"
    );
    return (
        <div style={{ flexBasis: "100%" }}>
            {/* Sockets = Some JavaScript functions for state manegement  !!!cannot do much in this*/}
            <MultiChatSocket {...chatProps} />
            {/* Component = Chat UI components to show
            We can do a lot of styling and customization on how it worksa
        */}
            <MultiChatWindow {...chatProps} style={{ height: "100vh" }} 
            renderChatHeader={(chat) => <Header chat={chat}/>} 
            renderMessageForm={(props)=> {
                if(chatProps.chat?.title.startsWith("AiChat_")){
                    return <Ai props={props} activeChat={chatProps.chat} />
                }
                if(chatProps.chat?.title.startsWith("AiCode_")){
                    return <AiCode props={props} activeChat={chatProps.chat} />
                }
                if(chatProps.chat?.title.startsWith("AiChat_test")){
                    console.log('working')
                    return <AiAssist props={props} activeChat={chatProps.chat} />
                }
                return(
                    <StandardMessageForm props={props} activeChat={chatProps.chat} />
                )
            }}/>
        </div>
    )
}

export default Chat
