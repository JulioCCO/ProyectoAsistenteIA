import os
import openai
import whisper
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from dataModels.model import DataLoader
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow import keras
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.optimizers import Adam, Adamax
from PIL import Image
# Abrir el archivo key.txt en modo lectura

from fer import FER
import matplotlib.pyplot as plt

print(tf.__version__)

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
    age = int(request.form.get('age'))
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

            audio_file.save(f'audios/{audio_file.filename}.wav')

            # Devolver una respuesta exitosa si es necesario
            path = r"audios\blob.wav"
            print('path: ', path)
            text = predict_single_sample(path)

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

            #jsonInfo = processEmotion(path)

            jsonInfo = processEmotionLuz()

            print('text: ', jsonInfo)
            return {'message': 'Imagen recibida correctamente', 'image_path': jsonInfo}, 200
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
        #print(captured_emotions[0]['emotions'])
        plt.imshow(test_image_one)

        # Use the top Emotion() function to call for the dominant emotion in the image
        dominant_emotion, emotion_score = emo_detector.top_emotion(test_image_one)
        #print(dominant_emotion, emotion_score)

        # Convertir el diccionario de emociones en una lista de tuplas (emoción, valor)
        emotions_list = [(emotion, value) for emotion, value in captured_emotions[0]['emotions'].items()]

        #print({'emotions': emotions_list, 'dominant_emotion': dominant_emotion})
        return {'emotions': emotions_list, 'dominant_emotion': dominant_emotion}

    except Exception as e:
        # Manejar excepciones e imprimir el mensaje de error
        print(f"Error al calcular emociones: {e}")
        return None


def processEmotionLuz():
    try:
        print('antes de cargar el modelo')
        loaded_model = tf.keras.models.load_model('dataModels/models/emotions.h5', compile=False)
        loaded_model.compile(Adamax(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

        print('despues de cargar el modelo')

        path = r"images\blob"
        image = Image.open(path)

        img = image.resize((100, 100))  # Redimensionar la imagen a 100x100 (según el tamaño utilizado en el modelo)
        img_array = tf.keras.preprocessing.image.img_to_array(img)  # Convertir la imagen a un array
        img_array = np.expand_dims(img_array, axis=0)  # Añadir una dimensión adicional para la muestra (batch)

        img_array = img_array / 255.0
        predictions = loaded_model.predict(img_array)
        predicted_index = np.argmax(predictions[0])
        class_labels = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sad', 'Surprise']
        predicted_label = class_labels[predicted_index]

        # Crear una lista de tuplas (emoción, valor de predicción)
        emotions_list = [(class_labels[i].lower(), float(predictions[0][i])) for i in range(len(class_labels))]

        # Encontrar la emoción dominante
        dominant_emotion = predicted_label.lower()

        print(f"emotions_list: {emotions_list}")
        print(f"dominant_emotion: {dominant_emotion}")

        return {'emotions': emotions_list, 'dominant_emotion': dominant_emotion}

    except Exception as e:
        # Manejar excepciones e imprimir el mensaje de error
        print(f"Error al procesar las emociones: {e}")
        return None

def CTCLoss(y_true, y_pred):
    # Compute the training-time loss value
    batch_len = tf.cast(tf.shape(y_true)[0], dtype="int64")
    input_length = tf.cast(tf.shape(y_pred)[1], dtype="int64")
    label_length = tf.cast(tf.shape(y_true)[1], dtype="int64")

    input_length = input_length * tf.ones(shape=(batch_len, 1), dtype="int64")
    label_length = label_length * tf.ones(shape=(batch_len, 1), dtype="int64")

    loss = keras.backend.ctc_batch_cost(y_true, y_pred, input_length, label_length)
    return loss


# Cargar el modelo entrenado
model = load_model('dataModels/models/speech_to_text.h5', custom_objects={"CTCLoss": CTCLoss})

# The set of characters accepted in the transcription.
characters = [x for x in "abcdefghijklmnopqrstuvwxyz'?! "]
# Mapping characters to integers
char_to_num = keras.layers.StringLookup(vocabulary=characters, oov_token="")
# Mapping integers back to original characters
num_to_char = keras.layers.StringLookup(
    vocabulary=char_to_num.get_vocabulary(), oov_token="", invert=True
)

# Función para preprocesar una muestra individual
def preprocess_single_sample(wav_file):
    file = tf.io.read_file(wav_file)
    audio, sample_rate = tf.audio.decode_wav(file, desired_channels=1)
    audio = tf.squeeze(audio, axis=-1)
    audio = tf.cast(audio, tf.float32)
    spectrogram = tf.signal.stft(audio, frame_length=256, frame_step=160, fft_length=384)
    spectrogram = tf.abs(spectrogram)
    spectrogram = tf.math.pow(spectrogram, 0.5)
    means = tf.math.reduce_mean(spectrogram, 1, keepdims=True)
    stddevs = tf.math.reduce_std(spectrogram, 1, keepdims=True)
    spectrogram = (spectrogram - means) / (stddevs + 1e-10)
    spectrogram = tf.expand_dims(spectrogram, axis=0)
    return spectrogram

# Función para decodificar la predicción individual usando la lógica de batch
def decode_single_prediction(pred):
    input_len = np.ones(pred.shape[0]) * pred.shape[1]
    results = keras.backend.ctc_decode(pred, input_length=input_len, greedy=True)[0][0]
    result = tf.strings.reduce_join(num_to_char(results[0])).numpy().decode("utf-8")
    return result

# Función para predecir una muestra individual
def predict_single_sample(wav_file):
    spectrogram = preprocess_single_sample(wav_file)
    prediction = model.predict(spectrogram)
    decoded_prediction = decode_single_prediction(prediction)
    if os.path.exists(wav_file):
        # Eliminar el archivo
        os.remove(wav_file)
        print(f"El archivo {wav_file} ha sido eliminado correctamente.")
    else:
        print(f"El archivo {wav_file} no existe.")
    return decoded_prediction

if __name__ == "__main__":
    app.run(debug=True)
    getAudioTask()
