from flask import Flask, request, jsonify
import uuid
import requests
from translate import translate_ar_to_en
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins (you can adjust origins if needed)
CORS(app, origins="http://localhost:3000")  # Only allow localhost:3000 (React app)

USER_SERVICE_URL = "http://localhost:3000"

@app.route("/translate/ar2en", methods=["POST"])
def translate_ar2en():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No text provided."}), 400

    translation_id = str(uuid.uuid4())
    try:
        # Translate text
        translated_text = translate_ar_to_en(data["text"])
        
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/translate/ar2en/status/<id>", methods=["GET"])
def get_status(id):
    try:
        # Fetch logs for translation status
        response = requests.get(f"{USER_SERVICE_URL}/auth/logs/{id}")
        if response.status_code == 200:
            logs = response.json()
            return jsonify({"id": id, "status": "completed", "logs": logs})
        else:
            return jsonify({"error": "Failed to fetch logs from user-service"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)
