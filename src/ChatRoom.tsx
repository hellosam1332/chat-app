import React, {FormEvent, useContext, useEffect, useRef, useState} from "react";
import firebase from "firebase";
import 'firebase/firestore'
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "./chatMessage";
import {MyContext} from "./app";

const ChatRoom = () => {
    const firestore = firebase.firestore();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const {user} = useContext(MyContext);

    const bottomScrollDummy = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomScrollDummy.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (!user || formValue === '') return;
        const {uid, photoURL} = user;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        setFormValue('');
        bottomScrollDummy.current?.scrollIntoView({behavior: 'smooth'})
    }


    return (
        <>
            <main>
                {messages && messages.map((msg: any) =>
                    <ChatMessage key={msg.id} message={msg}/>
                )}
                <div ref={bottomScrollDummy} />
            </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} placeholder='메세지 입력해주실?' />
                <button type='submit' disabled={!formValue}>😘</button>
            </form>
        </>
    );
}

export default ChatRoom;