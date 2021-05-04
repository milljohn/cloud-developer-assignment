import json
import time
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

# Flask object
app = Flask(__name__)
# app.register_blueprint(function_name, url_prefix="")
# Starts the debugger
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


# @app.route('/upload', methods=["post"])
@socketio.on('/', namespace='/upload')
def upload(file):
    print(json.dumps(file))
    file_info = request.json['file']
    metadata = [{""}]
    emit(json.dumps(file), json=True, namespace="/flask-io-data", broadcast=True)
    print(file_info)
    return jsonify(metadata)


if __name__ == "__main__":
    # app.run()
    socketio.run(app)