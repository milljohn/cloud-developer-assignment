import json
import os.path
import time
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

# Flask object
app = Flask(__name__)
CORS(app)

# app.register_blueprint(function_name, url_prefix="")
# Starts the debugger
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


# TODO: CORS seems to not be working correctly and blocking requests
# This is working with postman
@app.route('/upload', methods=['post'])
@cross_origin()
def upload_file():
    try:
        file = request.files['file']
        file_path = secure_filename(file.filename)
        file.save(file_path)
        file_size = os.path.getsize(file_path)

        response = {
            'file_name': file_path,
            'file_size': file_size
        }

        print(response)

        emit(json.dumps(response), json=True, namespace='/upload', broadcast=True)

        return response
    except Exception as e:
        print(e)
        return {'error': str(e)}


@app.route('/test', methods=['post'])
@cross_origin()
def test():
    print(request.json['file_path'])
    print(request)
    emit({'received': True}, json=True, namespace='/test', broadcast=True)
    return {'received': True}

if __name__ == "__main__":
    # app.run()
    socketio.run(app)
