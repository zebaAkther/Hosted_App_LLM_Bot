

# Hosted_App_LLM_Bot

A simple AI-powered chatbot web application built with React.js frontend and FastAPI backend. The backend uses a Groq LLM API for natural language processing to answer user questions, with a SQLite database logging Q&A history.

***

## Features

- User-friendly chat interface built with React  
- Sends user queries to a FastAPI backend  
- Backend queries a Groq language model (LLM) API for answers  
- Logs each question/answer pair in a local SQLite database  
- Fetches chat history with API endpoint (last 50 queries)  
- Responsive UI with timestamps for messages  
- CORS enabled for frontend-backend communication  

***

## Tech Stack

- Frontend: React.js (JavaScript)  
- Backend: Python FastAPI  
- Database: SQLite  
- LLM API: Groq Llama 4 Scout  
- Deployment: Backend hosted on Render; Frontend can be hosted separately (e.g., Netlify)  

***

## Getting Started

### Prerequisites

- Node.js and npm (for React frontend)  
- Python 3.8+ environment  
- Groq API key (`GROQ_API_KEY`) for accessing LLM endpoint  

### Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/zebaAkther/Hosted_App_LLM_Bot.git
   cd Hosted_App_LLM_Bot
   ```

2. Backend setup:

   - Create and activate a Python virtual environment  
   - Install dependencies:  
     ```bash
     pip install fastapi uvicorn requests python-dotenv groq
     ```
   - Set the environment variable for API key:  
     ```bash
     export GROQ_API_KEY="your_groq_api_key_here"
     ```
   - Run the backend server:  
     ```bash
     uvicorn main:app --reload
     ```

3. Frontend setup:

   - Navigate to the frontend directory (if separate) or root if combined  
   - Install dependencies:  
     ```bash
     npm install
     ```
   - Update the API base URL in the React app if required in `App.js`  
   - Run the React frontend locally:  
     ```bash
     npm start
     ```

### Usage

- Open the React app in your browser, usually at `http://localhost:3000`  
- Ask the chatbot questions via the input box and send button  
- The bot will respond with answers from the LLM API, displayed in the chat window  
- View recent Q&A history via backend `/history` endpoint  

***

## API Endpoints

| Endpoint    | Method | Description                              |
|-------------|--------|-------------------------------------- |
| `/ask`      | POST   | Sends a question, returns LLM answer   |
| `/history`  | GET    | Retrieves last 50 Q&A pairs from DB    |

***

## Code Overview

- `App.js` – React frontend chat interface with message state and API calls  
- `main.py` – FastAPI backend serving `/ask` and `/history` routes  
- `qna.db` – SQLite database storing questions and answers  
- `styles` – Inline CSS for chat UI layout and styling  

***

## Environment Variables

- `GROQ_API_KEY` — Your Groq API token to access the LLM chat completions  

***

## License

This project is open source and available under the MIT License.

***

For questions or contributions, feel free to open an issue or submit a pull request.

***

