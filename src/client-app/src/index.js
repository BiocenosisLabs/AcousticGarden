import React from 'react';
import './global.css';
import { createRoot } from 'react-dom/client';
import App from "./App";
import {HashRouter as Router} from "react-router-dom";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render( <Router>
    <App/>
</Router>)

