from typing import Any

import whisper
import tempfile
import os
from flask import Flask, redirect, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/favicon.ico')
def favicon():
    return redirect('/static/favicon.ico')


@app.route("/")
def hello_world():
    return "Hola mundo"


@app.route("/audioTask", methods=['POST'])
def getAudioTask():
    if request.method == 'POST':
        try:
            # Verificar si se envió un archivo
            if 'file' not in request.files:
                return 'No se envió ningún archivo', 400

            # Obtener el archivo enviado
            audio_file = request.files['file']
            print('request.files', request.files)
            print('audio_file', audio_file)
            # Realizar alguna operación con el archivo, como guardarlo en el servidor
            # Por ejemplo, para guardarlo en una carpeta llamada "uploads" en el directorio actual:
            audio_file.save(f'audios/{audio_file.filename}')

            # Devolver una respuesta exitosa si es necesario
            text = transcribe_audio(audio_file)
            #enruter(text)
            return 'Archivo de audio recibido correctamente', 200
        except Exception as e:
            # Manejar cualquier error que pueda ocurrir durante el procesamiento del archivo
            return f'Error al procesar el archivo: {str(e)}', 500


def enruter(task):
    if task.find('pokemon'):
        print('frontend pokemon')
    print(task)


def transcribe_audio(audio_file):
    """
    Transcribes the audio file.

    This function takes an audio file and transcribes its content
    using a speech-to-text model. It saves the audio file to a
    temporary file, transcribes it, and returns the transcription.

    Parameters:
    - audio_file: Audio file to transcribe.

    Returns:
    - transcription (str): Transcription of the audio file.
    """
    try:
        # Save the audio file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(audio_file.read())
            temp_file_path = temp_file.name

        # Transcribe the content of the audio
        model = whisper.load_model("base")
        result = model.transcribe(temp_file_path)

        # Extract the transcription
        transcription = result["text"]

        # Clean up the temporary file
        os.unlink(temp_file_path)

        # Print transcription for debugging
        print(transcription)

        return transcription

    except Exception as e:
        # Handle exceptions and print error message
        print(f"Error processing transcription: {e}")
        return None

if __name__ == "__main__":
    app.run(debug=True)





