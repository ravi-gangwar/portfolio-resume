# Voice Chat Assistant Setup

## 🎤 Real-time Voice Chat with MCP Server

This portfolio now includes a real-time voice chat assistant powered by Google Gemini API and MCP (Model Context Protocol) server.

## 🏗️ Architecture

```
User Voice Input → Speech-to-Text → MCP Server → Gemini API → Response Processing → Text-to-Speech/Actions
```

## 🚀 Features

- **Voice Input**: Click the microphone button to start voice recognition
- **AI Responses**: Get intelligent responses about Ravi's background and projects
- **Project Navigation**: Say "show me [project name]" to open project URLs
- **High-Quality TTS**: Hear responses with Kokoro TTS using Nicole voice
- **Real-time UI**: Visual feedback for listening, processing, and responses
- **Fallback Support**: Automatic fallback to browser TTS if Kokoro fails

## ⚙️ Setup Instructions

### 1. Environment Variables

Add your Gemini API key to `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env.local` file

### 3. Install Dependencies

```bash
npm install @google/generative-ai
```

## 🎯 Usage Examples

### Voice Commands:

- **"Tell me about Ravi"** - Get background information
- **"What are your skills?"** - Learn about technical skills
- **"Show me the Code Editor project"** - Opens the Code Editor demo
- **"Tell me about Wyvate"** - Information about Wyvate projects
- **"What projects have you built?"** - List of all projects

### Response Actions:

- **Speak**: AI responds with voice and text
- **Redirect**: Opens project URLs in new tab
- **Info**: Displays resume information

## 🔧 Technical Details

### Components:

- **`/api/mcp/route.ts`**: MCP server with Gemini integration
- **`VoiceChat.tsx`**: Voice interface component
- **`types/global.d.ts`**: TypeScript declarations for Web Speech API

### API Response Format:

```json
{
  "action": "speak" | "redirect",
  "audio": "Response text for speech synthesis",
  "url": "Project URL (only for redirect action)"
}
```

## 🎨 UI Features

- **Floating Voice Button**: Bottom-right corner
- **Visual Feedback**: 
  - Red pulsing dot when listening
  - Loading spinner during processing
  - Audio controls (mute/unmute)
- **Transcript Display**: Shows what you said
- **Response Display**: Shows AI response

## 🔒 Security

- API key stored in environment variables
- HTTPS required for speech recognition
- No voice data stored permanently

## 🌐 Browser Support

- Chrome/Edge: Full support
- Firefox: Limited support
- Safari: Limited support
- Mobile browsers: Varies

## 🐛 Troubleshooting

1. **Speech Recognition Not Working**: Ensure HTTPS and microphone permissions
2. **API Errors**: Check Gemini API key and quota
3. **No Audio**: Check browser audio permissions and mute settings

## 📱 Mobile Support

- Voice input works on mobile devices
- Touch-friendly interface
- Responsive design for all screen sizes 