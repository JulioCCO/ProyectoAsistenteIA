import io
import os
import openai
import whisper
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from dataModels.model import DataLoader
# Abrir el archivo key.txt en modo lectura
with open('key.txt', 'r') as f:
    # Leer la primera línea y quitar espacios en blanco adicionales
    key_value = f.readline().strip()

# Ahora key_value contendrá el valor de la clave
print("Valor de la clave:", key_value)

openai.api_key = key_value

app = Flask(__name__)
CORS(app)

data_loader = DataLoader()
#endpoint avocado
@app.route('/avocado', methods=['GET'])
def avocado():
    input_date = request.args.get('input_date')
    prediction = data_loader.process_SARIMAX('avocado', input_date)
    return jsonify(prediction=prediction)
#endpoint wine
@app.route('/wine', methods=['GET'])
def wine():
    volatile_acidity = float(request.args.get('volatile_acidity'))
    density = float(request.args.get('density'))
    alcohol = float(request.args.get('alcohol'))
    free_sulfur_dioxide = (float(request.args.get('free_sulfur_dioxide')))
    prediction = data_loader.wine_prediction(density, alcohol, volatile_acidity, free_sulfur_dioxide)
    return jsonify(prediction=prediction)
@app.route('/stroke', methods=['GET'])
def stroke():
    ever_married = int(request.args.get('ever_married'))
    age = int(request.args.get('age'))
    prediction = data_loader.stroke_prediction(ever_married, age)
    return jsonify(prediction=prediction)
@app.route('/heart', methods=['GET'])
def heart():
    age = int(request.args.get('age'))
    trtbps = int(request.args.get('trtbps'))
    thalachh = int(request.args.get('thalachh'))
    exng = int(request.args.get('exng'))
    oldpeak = float(request.args.get('oldpeak'))
    slp = int(request.args.get('slp'))
    prediction = data_loader.heart_prediction(age, trtbps, thalachh, exng, oldpeak, slp)
    return jsonify(prediction=prediction)
@app.route('/recruitment', methods=['GET'])
def recruitment():
    ssc_p = float(request.args.get('ssc_p'))
    hsc_p = float(request.args.get('hsc_p'))
    degree_p = float(request.args.get('degree_p'))
    ssc_b_cat = int(request.args.get('ssc_b_cat'))
    hsc_b_cat = int(request.args.get('hsc_b_cat'))
    prediction = data_loader.recruitment_prediction(ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat)
    return jsonify(prediction=prediction)
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
            path = r"audios\blob.mp3"
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
