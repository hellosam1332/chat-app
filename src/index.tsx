import React from 'react';
import { render } from 'react-dom';
import App from "./app";
import './assets/index.scss'
import firebase from 'firebase';

const Application: React.SFC<{}> = () => (
    <App/>
);

render(<Application />, document.getElementById('root'));
