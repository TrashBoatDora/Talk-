# AI English Conversation Practice App

A web-based English conversation practice application that uses speech recognition, text-to-speech, and AI to help users practice English conversations.

## Features

- 🎤 **Speech-to-Text**: Uses browser's Web Speech API to recognize your voice
- 🔊 **Text-to-Speech**: AI responses are spoken back to you
- 🤖 **AI Conversation Partner**: Powered by Google Gemini API
- 💬 **Real-time Chat Interface**: Clean, modern chat UI
- 🔒 **Secure API**: API keys are safely stored on the backend

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Speech**: Web Speech API (Browser native)
- **AI**: Google Gemini Pro API
- **Backend**: Serverless Functions (Node.js)
- **Deployment**: Vercel/Netlify

## Local Development

### Prerequisites

- Modern web browser (Chrome or Edge recommended for best speech recognition)
- Node.js (for running serverless functions locally)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI-Talk
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Install Vercel CLI (for local testing)**
   ```bash
   npm install -g vercel
   ```

4. **Run locally**
   ```bash
   vercel dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Deployment Guide

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/AI-Talk.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Set Environment Variable** (MOST IMPORTANT!)
   - Go to your project dashboard on Vercel
   - Click "Settings" → "Environment Variables"
   - Add new variable:
     - **Name**: `GEMINI_API_KEY`
     - **Value**: Your actual Gemini API key
     - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy" to apply the environment variable

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Click "Deploy site"

3. **Set Environment Variable**
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - Click "Save"

4. **Redeploy**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

## Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Edge (Recommended)
- ⚠️ Safari (Limited speech recognition support)
- ⚠️ Firefox (No speech recognition support)

## Usage

1. Click the "Speak" button
2. Grant microphone permission if prompted
3. Speak in English
4. The app will transcribe your speech
5. AI will respond and speak back to you
6. Continue the conversation!

## Project Structure

```
AI-Talk/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Frontend JavaScript
├── api/
│   └── chat.js         # Serverless function (Backend API)
├── .gitignore          # Git ignore file
├── README.md           # This file
└── .env                # Environment variables (DO NOT COMMIT)
```

## Security Notes

⚠️ **Never commit your API key to Git!** Always use environment variables and the `.env` file should be in `.gitignore`.

## License

MIT

## Contributing

Feel free to open issues or submit pull requests!
