from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3, json, requests

app = Flask(__name__, static_folder="public", static_url_path="/")
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/chat"
    
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")

    payload = {
        "model": "llama3",  # или "openchat", "llama3"
        "messages": [
            {"role": "system", "content": "Ты — дружелюбный помощник преподавателя."},
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(OLLAMA_URL, json=payload)
    data = response.json()

    ai_response = data.get("message", {}).get("content", "Нет ответа от модели.")
    return jsonify({"response": ai_response})
    

@app.route("/get-questions", methods=["GET"])
def get_questions():
    conn = sqlite3.connect("questions.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quiz_questions")
    rows = cursor.fetchall()
    conn.close()

    data = {}
    for id_, level, question, answers, correct, solved in rows:
        if level not in data:
            data[level] = []
        data[level].append({
            "id": id_,
            "question": question,
            "answers": json.loads(answers),
            "correct": correct,
            "solved": solved
        })

    return jsonify(data)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/start")
def formPage():
    return app.send_static_file("form.html")

if __name__ == "__main__":
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)
    app.run(debug=True, port=5000)