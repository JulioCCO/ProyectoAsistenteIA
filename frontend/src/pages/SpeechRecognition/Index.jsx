import { useEffect, useState } from "react";
import { sendBlob } from "../../../client/api";
import { blobToWav } from "../../utils/Utils";

export const SpeechRecognitionIndex = () => {
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorderState, setMediaRecorderState] = useState(null);

    useEffect(() => {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('mediaDevices supported..')

            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    setMediaRecorderState(mediaRecorder);
                    console.log('mediaRecorder', mediaRecorder);

                    let chunks = [];
                    mediaRecorder.ondataavailable = e => {
                        chunks.push(e.data);
                    }

                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks, { type: 'audio/wav' });
                        console.log('blob', blob)
                        const audioURL = window.URL.createObjectURL(blob);
                        console.log('audioURL', audioURL)
                        setAudioURL(blob);
                        chunks = []; // Clear chunks for next recording
                        // Ejemplo de uso:
                        blobToWav(blob).then((wavBlob) => {
                            // Ahora puedes usar el archivo .wav (wavBlob) como desees
                            console.log('Archivo .wav:', wavBlob);
                            sendBlobToBackend(wavBlob);
                        });

                    }
                })
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                });
        }
    }, []);

    const sendBlobToBackend = async (audioBlob) => {
        try {
            await sendBlob(audioBlob)
        } catch (error) {
            console.error('Error al enviar el audio al backend:', error);
        }
    }
    const record = () => {
        console.log('start record');
        setAudioURL(''); // Clear current audio URL when starting a new recording
        mediaRecorderState.start();
        setIsRecording(true);
    }

    const stopRecording = () => {
        console.log('stop record');
        mediaRecorderState.stop();
        setIsRecording(false);
    }

    return (
        <div>

            <button type="button" onClick={isRecording ? stopRecording : record}>

                {isRecording ? "Stop Record" : "Start Record"}
            </button>
            {audioURL && (
                <div>
                    <audio controls src={audioURL}></audio>
                </div>
            )}
        </div>
    )
}
