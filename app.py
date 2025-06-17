from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI  # ✅ correct import for new version

# Load .env
load_dotenv()

# Flask setup
app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # ✅ correct use

@app.route('/organize', methods=['POST'])
def organize_note():
    data = request.json
    user_note = data.get('note', '')

    try:
        # Make ChatCompletion request using new format
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a productivity assistant that cleans up messy notes and organizes them into: Tasks, Schedule, People to Contact."},
                {"role": "user", "content": user_note}
            ]
        )

        message = response.choices[0].message.content
        return jsonify({"output": message})

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
