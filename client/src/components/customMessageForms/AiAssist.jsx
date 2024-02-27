import { useEffect, useState } from 'react'
import { usePostAiAssistMutation } from "@/state/api";
import MessageFormUI from './MessageFormUI'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };

    }, [value, delay]);
    return debouncedValue;
}
const AiAssist = ({ props, activeChat }) => {

    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [trigger, resultAssist] = usePostAiAssistMutation();
    const [appendText, setAppendText] = useState("");


    // const [preview, setPreview] = useState("");
    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);  //Formatting the date
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];     //This is how we can send attachments
        const form = { attachments: at, created: date, sender_username: props.username, text: message, activeChatId: activeChat.id }

        props.onSubmit(form);
        setMessage("");
        setAttachment("");
    };

    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        if (debouncedValue) {
            const form = { text: message };
            trigger(form);
        }
    }, [debouncedValue]); //eslint-disable-line

    const handleKeyDown = (e) => {
        //handle enter and tab
        if (e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            setMessage(`${message} ${appendText}`)
        }
        setAppendText("");
    }

    useEffect(() => {
        if (resultAssist.data?.text) {
            setAppendText(resultAssist.data?.text);
        }
    }, [resultAssist]) //esline-disable-line

    return (
        <MessageFormUI
            setAttachment={message}
            handleChange={handleChange}
            message={message}
            handleSubmit={handleSubmit} 
            appendText={appendText}
            handleKeyDown={handleKeyDown}/>
    )
}

export default AiAssist
