import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechRecognitionIndex } from './pages/SpeechRecognition/Index.jsx';
import { App } from './pages/App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
