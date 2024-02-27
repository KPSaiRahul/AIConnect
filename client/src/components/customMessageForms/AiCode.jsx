import  { useState } from 'react'
import { usePostAiCodeMutation } from "@/state/api";
import MessageFormUI from './MessageFormUI'
const AiCode = ({ props, activeChat }) => {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [trigger] = usePostAiCodeMutation();
    // const [preview, setPreview] = useState("");
    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);  //Formatting the date
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];     //This is how we can send attachments
        const form = { attachments: at, created: date, sender_username: props.username, text: message, activeChatId: activeChat.id }

        props.onSubmit(form);
        trigger(form);    //triggering api call for openai so it responds to our msg
        setMessage("");
        setAttachment("");
    }
    return (
        <MessageFormUI
            setAttachment={message}
            handleChange={handleChange}
            message={message}
            handleSubmit={handleSubmit} />
    )
}

export default AiCode
