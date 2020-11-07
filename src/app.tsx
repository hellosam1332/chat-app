import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import {useAuthState} from "react-firebase-hooks/auth";

import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";

firebase.initializeApp({
    apiKey: "AIzaSyDMW3BzTmpOuO0nXcr01S5SzpZhCwciadk",
    authDomain: "hellosam-server.firebaseapp.com",
    databaseURL: "https://hellosam-server.firebaseio.com",
    projectId: "hellosam-server",
    storageBucket: "hellosam-server.appspot.com",
    messagingSenderId: "115900156294",
    appId: "1:115900156294:web:d7ae54b463b724d512c407",
    measurementId: "G-BGXL7Z80E5"
})
firebase.analytics();

const auth = firebase.auth();

interface MyContextProps {
    user: firebase.User | null;
}

export const MyContext = React.createContext<MyContextProps>({
    user: null
});

const signOut = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>로그아웃</button>
    )
}
const App = () => {

    const [user] = useAuthState(auth);


    if (auth.currentUser) {
        console.info(`Hello! ${auth.currentUser.displayName}`);
    }

    return (
        <div className='App'>
            <MyContext.Provider value={{user: auth.currentUser}}>
                <header>
                    <h1>😂🤣🤪</h1>
                    {signOut()}
                </header>
                <section>
                    {user ? <ChatRoom/> : <SignIn/>}
                </section>
            </MyContext.Provider>
        </div>
    );
}

export default App;