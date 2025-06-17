
from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/organize', methods=['POST'])
def organize_note():
    data = request.json
    user_note = data.get('note', '')

    prompt = [
        {"role": "system", "content": "You are a productivity assistant that cleans up messy notes and organizes them into: Tasks, Schedule, People to Contact."},
        {"role": "user", "content": user_note}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=prompt
        )
        message = response['choices'][0]['message']['content']
        return jsonify({"output": message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
