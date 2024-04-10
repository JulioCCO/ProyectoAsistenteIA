

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


@app.route("/postTask", methods=['POST'])
def postTask():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No se ha proporcionado ningún archivo de audio'})

        audio_file = request.files['audio']
        if audio_file.filename == '':
            return jsonify({'error': 'El archivo de audio no tiene nombre'})

        # Guarda el archivo de audio
        audio_file.save('C:/ProyectoIA/backend/audios/' + audio_file.filename)

        return jsonify({'message': 'Archivo de audio guardado correctamente', 'filename': audio_file.filename})
    except Exception as e:
        return jsonify({'error': str(e)})

"""
@app.route("/postTask", methods=['POST'])
def postTask():
    try:
        data = request.data.decode('utf-8')
        # Procesa el string recibido, por ejemplo, imprímelo
        print('data:', data)
        # Luego, puedes realizar cualquier operación que desees con el string
        return jsonify({'message': 'Datos actualizados correctamente', 'data': data})
    except Exception as e:
        # Maneja cualquier excepción que pueda ocurrir
        return jsonify({'error': str(e)})
"""



if __name__ == "__main__":
    app.run(debug=True)





