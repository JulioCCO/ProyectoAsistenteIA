
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


@app.route("/procesar_audio", methods=['POST'])
def postTask():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No se ha proporcionado ningún archivo de audio'})

        audio_file = request.files['audio']
        if audio_file.filename == '':
            return jsonify({'error': 'El archivo de audio no tiene nombre'})

        # Guarda el archivo de audio
        #logica de procesamiento de consulta asincrono, para que el sistema espere la respuesta
        audio_file.save('E:/Proyectos/AIP1/ProyectoAsistenteIA/backend/audios/' + audio_file.filename)

        transcribe_audio(audio_file)
        return jsonify({'message': 'Archivo de audio guardado correctamente', 'filename': audio_file.filename})
    except Exception as e:
        return jsonify({'error': str(e)})


def transcribe_audio(audio_file):
    try:
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
        print(f"Error processing audio: {e}")
        return None



if __name__ == "__main__":
    app.run(debug=True)





