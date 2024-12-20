from flask import Flask, request, jsonify
import uuid
import requests
from translate import translate_ar_to_en

app = Flask(__name__)

# رابط user-service
USER_SERVICE_URL = "http://localhost:3000"

@app.route("/translate/ar2en", methods=["POST"])
def translate_ar2en():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No text provided."}), 400

    translation_id = str(uuid.uuid4())
    try:
        # ترجمة النص
        translated_text = translate_ar_to_en(data["text"])
        
        # إرسال سجل العملية إلى user-service
        log_data = {
            "user_id": translation_id,
            "action": "Translation from Arabic to English completed"
        }
        log_response = requests.post(f"{USER_SERVICE_URL}/auth/logs", json=log_data)
        if log_response.status_code != 201:
            return jsonify({"error": "Failed to log the translation action"}), 500

        return jsonify({"id": translation_id, "translated_text": translated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/translate/ar2en/status/<id>", methods=["GET"])
def get_status(id):
    try:
        # استعلام عن السجل في user-service
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