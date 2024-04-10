import { useState } from "react";
import { postTaskData } from "../../../client/api";


let recognition = null;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-EN';
    console.log('El navegador soporta la API de reconocimiento de voz de WebKit.')
} else {
    console.log('El navegador no soporta la API de reconocimiento de voz de WebKit.');
}

export const SpeechRecognitionIndex = () => {

    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListeningRecognition = () => {
        setText('');
        setIsListening(true);
        recognition.start();

        recognition.onresult = async (event) => {
            console.log('event', event);
            setText(event.results[0][0].transcript);
            let data = event.results[0][0].transcript;
            const response = await postTaskData(data);
            console.log('respuesta recibida del backend', response);
            recognition.stop();
            setIsListening(false);
        }
    }
    
    const stopListeningRecognition = () => {
        setIsListening(false);
        recognition.stop();
    }

    const speakText = () => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Puedes especificar una voz concreta
        const voices = window.speechSynthesis.getVoices();
        console.log(voices)
        utterance.voice = voices[2]//voices.find(voice => voice.lang === 'en-US');

        // Ajusta la velocidad de habla (valor predeterminado: 1)
        utterance.rate = 1.5; // Aumenta la velocidad para que suene más fluido

        speechSynthesis.speak(utterance);
    }

    return (
        <div>
            <button onClick={() => startListeningRecognition()}>Start listening</button>
            {isListening === true && <div>Your browser is currently listening</div>}
            <div><p>{text}</p></div>
            <button onClick={() => stopListeningRecognition()}>Stop listening</button>
            <button onClick={() => speakText()}>Speak text</button>
        </div>
    )
}
