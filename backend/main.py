import os
import openai
import whisper
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from dataModels.model import DataLoader
# Abrir el archivo key.txt en modo lectura

from fer import FER
import matplotlib.pyplot as plt

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
@app.route('/avocado', methods=['POST'])
def avocado():
    input_date = request.form.get('input_date')
    prediction = data_loader.process_SARIMAX('avocado', input_date)
    return jsonify(prediction=prediction)
#endpoint wine
@app.route('/wine', methods=['POST'])
def wine():
    volatile_acidity = float(request.form.get('volatile_acidity'))
    density = float(request.form.get('density'))
    alcohol = float(request.form.get('alcohol'))
    free_sulfur_dioxide = (float(request.form.get('free_sulfur_dioxide')))
    prediction = data_loader.wine_prediction(density, alcohol, volatile_acidity, free_sulfur_dioxide)
    return jsonify(prediction=prediction)
@app.route('/stroke', methods=['POST'])
def stroke():
    ever_married = int(request.form.get('ever_married'))
    age = int(request.form.get('age'))
    prediction = data_loader.stroke_prediction(ever_married, age)
    return jsonify(prediction=prediction)
@app.route('/heart', methods=['POST'])
def heart():
    age = int(request.form.get('age'))
    trtbps = int(request.form.get('trtbps'))
    thalachh = int(request.form.get('thalachh'))
    exng = int(request.form.get('exng'))
    oldpeak = float(request.form.get('oldpeak'))
    slp = int(request.form.get('slp'))
    prediction = data_loader.heart_prediction(age, trtbps, thalachh, exng, oldpeak, slp)
    return jsonify(prediction=prediction)
@app.route('/recruitment', methods=['POST'])
def recruitment():
    ssc_p = float(request.form.get('ssc_p'))
    hsc_p = float(request.form.get('hsc_p'))
    degree_p = float(request.form.get('degree_p'))
    ssc_b_cat = int(request.form.get('ssc_b_cat'))
    hsc_b_cat = int(request.form.get('hsc_b_cat'))
    prediction = data_loader.recruitment_prediction(ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat)
    return jsonify(prediction=prediction)
@app.route('/bank', methods=['POST'])
def bank():
    complain = int(request.form.get('complain'))
    age = int(request.form.get('age'))
    num_of_products = int(request.form.get('num_of_products'))
    balance = float(request.form.get('balance'))
    is_active_member = int(request.form.get('is_active_member'))
    credit_score = int(request.form.get('credit_score'))
    prediction = data_loader.bank_prediction(complain, age, num_of_products, balance, is_active_member, credit_score)
    return jsonify(prediction=prediction)
@app.route('/flight', methods=['POST'])
def flight():
    airline = int(request.form.get('airline'))
    departure_time = int(request.form.get('departure_time'))
    stops = int(request.form.get('stops'))
    arrival_time = int(request.form.get('arrival_time'))
    class_var = int(request.form.get('class_var'))
    duration = float(request.form.get('duration'))
    days_left = float(request.form.get('days_left'))
    prediction = data_loader.flight_prediction(airline,departure_time,stops,arrival_time,class_var,duration, days_left)
    return jsonify(prediction=prediction)
@app.route('/mood', methods=['POST'])
def mood():
    days_indoors = int(request.form.get('days_indoors'))
    social_weakness = int(request.form.get('social_weakness'))
    mental_health_history = int(request.form.get('mental_health_history'))
    work_interest = int(request.form.get('work_interest'))
    growing_stress = int(request.form.get('growing_stress'))
    occupation = int(request.form.get('occupation'))
    changes_habits = int(request.form.get('changes_habits'))
    prediction = data_loader.mood_prediction(days_indoors, social_weakness, mental_health_history, work_interest, growing_stress, occupation, changes_habits)
    return jsonify(prediction=prediction)
@app.route('/salary', methods=['POST'])
def salary():
    age = float(request.form.get('age'))
    gender = int(request.form.get('gender'))
    job_title = int(request.form.get('job_title'))
    education_level = int(request.form.get('education_level'))
    years_of_experience = float(request.form.get('years_of_experience'))
    prediction = data_loader.salary_prediction(age, gender, job_title, education_level, years_of_experience)
    return jsonify(prediction=prediction)
@app.route('/titanic', methods=['POST'])
def titanic():
    pclass = int(request.form.get('pclass'))
    sex = int(request.form.get('sex'))
    age = int(request.form.get('age '))
    sibsp = int(request.form.get('sibsp'))
    parch = int(request.form.get('parch'))
    fare = float(request.form.get('fare'))
    embarked = int(request.form.get('embarked'))
    prediction = data_loader.titanic_prediction(pclass, sex, age, sibsp, parch, fare, embarked)
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


@app.route("/uploadImage", methods=['POST'])
def upload_image():
    if request.method == 'POST':
        try:
            # Verificar si se envió un archivo
            if 'image' not in request.files:
                return 'No se envió ninguna imagen', 400

            # Obtener el archivo de imagen enviado
            image_file = request.files['image']

            # Guardar la imagen en el servidor
            image_file.save(f'images/{image_file.filename}')

            # Devolver una respuesta exitosa si es necesario
            path = f'images/{image_file.filename}'
            print('path: ', path)
            # Aquí deberías realizar cualquier procesamiento adicional que necesites con la imagen, como análisis, procesamiento de datos, etc.
            # Por ejemplo, podrías llamar a una función para procesar la imagen y devolver el resultado.

            return {'message': 'Imagen recibida correctamente', 'image_path': path}, 200
        except Exception as e:
            # Manejar cualquier error que pueda ocurrir durante el procesamiento de la imagen
            return f'Error al procesar la imagen: {str(e)}', 500

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

def processEmotion(ruta):
    try:
        test_image_one = plt.imread(ruta)
        emo_detector = FER(mtcnn=True)
        # Capture all the emotions on the image
        captured_emotions = emo_detector.detect_emotions(test_image_one)
        # Print all captured emotions with the image
        print(captured_emotions[0]['emotions'])
        plt.imshow(test_image_one)

        # Use the top Emotion() function to call for the dominant emotion in the image
        dominant_emotion, emotion_score = emo_detector.top_emotion(test_image_one)
        print(dominant_emotion, emotion_score)
        return emotion_score

    except Exception as e:
        # Manejar excepciones e imprimir el mensaje de error
        print(f"Error al calcular emociones: {e}")
        return None


if __name__ == "__main__":
    app.run(debug=True)
