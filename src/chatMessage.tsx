import React, {useContext} from 'react';
import {MyContext} from "./app";

interface ChatMessageProps {
    message: any;
}
const ChatMessage = ({message}: ChatMessageProps) => {
    const {text, uid, photoURL} = message;

    const {user} = useContext(MyContext);

    const messageClass = uid === user?.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt=""/>
            <p>{text}</p>
        </div>

    )
}

export default ChatMessage;
