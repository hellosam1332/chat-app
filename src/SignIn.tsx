import React from "react";
import firebase from 'firebase';
import 'firebase/auth'
import {useAuthState} from "react-firebase-hooks/auth";


const SignIn = () => {

    const auth = firebase.auth();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(err => console.warn(err));
    }

    return (
        <>
         <button onClick={signInWithGoogle}>구글로 로그인 하기</button>
        </>
    )
}

export default SignIn;