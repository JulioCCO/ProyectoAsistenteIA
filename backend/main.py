import io
import os
import openai
import whisper
from flask import Flask, redirect, request
from flask_cors import CORS

# Abrir el archivo key.txt en modo lectura
with open('key.txt', 'r') as f:
    # Leer la primera línea y quitar espacios en blanco adicionales
    key_value = f.readline().strip()

# Ahora key_value contendrá el valor de la clave
print("Valor de la clave:", key_value)

openai.api_key = key_value

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

            audio_file.save(f'audios/{audio_file.filename}.mp3')

            # Devolver una respuesta exitosa si es necesario
            path = "E:/Proyectos/ProyectoIA/backend/audios/blob.mp3"
            print('path: ', path)
            text = transcribe_audio(path)

            return {'message': 'Archivo de audio recibido correctamente', 'transcription': text}, 200
        except Exception as e:
            # Manejar cualquier error que pueda ocurrir durante el procesamiento del archivo
            return f'Error al procesar el archivo: {str(e)}', 500


def transcribe_audio(audio_file_path):

    try:

        model = whisper.load_model("base")
        result = model.transcribe(audio_file_path)

        # Extract the transcription
        transcription = result["text"]

        # Print transcription for debugging
        print(transcription)

        if os.path.exists(audio_file_path):
            # Eliminar el archivo
            os.remove(audio_file_path)
            print(f"El archivo {audio_file_path} ha sido eliminado correctamente.")
        else:
            print(f"El archivo {audio_file_path} no existe.")
        return transcription
    except Exception as e:
        # Manejar excepciones e imprimir el mensaje de error
        print(f"Error processing transcription: {e}")
        return None


def enruter(task):
    if task.find('pokemon'):
        print('frontend pokemon')
    print(task)


if __name__ == "__main__":
    app.run(debug=True)
