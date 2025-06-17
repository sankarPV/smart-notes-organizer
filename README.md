# Smart Notes Organizer 📝

This project helps you clean and structure your messy notes into organized outputs like tasks, schedules, and contacts.

## 🛠 Tech Stack
- **Frontend**: React (with Axios)
- **Backend**: Flask (Python)
- **AI**: OpenAI GPT API

## 🚀 Features
- Paste unorganized notes and get a cleaned-up version
- Easy to run locally or deploy online
- Can be extended with OCR or reminder functionality

## 📦 Setup Instructions

### Backend (Flask)
```bash
cd smart-notes-organizer
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
pip install flask openai
export OPENAI_API_KEY=your_openai_key_here
python app.py
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

### Environment
Rename `.env.example` to `.env` and add your OpenAI API key.

---

## 🔐 Note
Don’t forget to keep your API keys secret in production!

