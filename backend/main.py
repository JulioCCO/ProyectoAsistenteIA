from flask import Flask, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/favicon.ico')
def favicon():
    return redirect('/static/favicon.ico')


@app.route("/")
def hello_world():
    return "Hola mundo"


if __name__ == "__main__":
    app.run(debug=True)
