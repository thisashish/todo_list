import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <GoogleOAuthProvider clientId="324664989557-bd6kmtul6vg317avtdl0du1pjaoqsr1e.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode></GoogleOAuthProvider>
);
