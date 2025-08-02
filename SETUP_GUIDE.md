# Voice Chat Setup Guide

## ✅ **Current Status: WORKING WITH TANYA - SEXY AI ASSISTANT + CUSTOM AUDIO + CHAT HISTORY**

The voice chat is now powered by **Tanya**, a beautiful and sexy woman who is Ravi's manager and assistant. She uses **Kokoro TTS with Nicole voice** for a seductive, natural speaking experience, plus **custom audio files** and **IP-based chat history** for better user experience!

## 🎯 **What's Working:**

- ✅ **Tanya AI Assistant**: Beautiful and sexy woman manager with seductive personality
- ✅ **Kokoro TTS**: Server-side text-to-speech with Nicole voice for Tanya
- ✅ **Custom Audio Files**: Pre-recorded audio for initialization, processing, and error states
- ✅ **Gemini API**: AI responses with Tanya's personality and natural speech
- ✅ **Voice Recognition**: Speech-to-text functionality
- ✅ **Fallback System**: Automatic fallback to browser TTS if server TTS fails
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Rich UI**: Beautiful animations and modern interface with pink/purple theme
- ✅ **Status Indicators**: Real-time status updates with emojis
- ✅ **Chat Interface**: Expandable chat window with conversation history
- ✅ **Microphone Always Enabled**: Never gets disabled, even on errors
- ✅ **Chat History**: IP-based conversation tracking with automatic cleanup
- ✅ **Refresh Button**: Easy page refresh when needed

## 🎨 **Tanya's Features:**

- **💋 Seductive Personality**: Confident, flirty, and professional
- **🎤 Natural Speech**: Avoids symbols and uses natural language
- **💬 Short & Sweet**: Keeps responses concise and sexy
- **🎭 Beautiful Voice**: Nicole voice with seductive tone
- **💖 Pink Theme**: Beautiful pink/purple gradient design
- **✨ Smooth Animations**: Framer Motion animations throughout
- **🎵 Custom Audio**: Pre-recorded audio for better UX
- **🧠 Memory**: Remembers conversation context for better responses

## 🎵 **Custom Audio Files:**

- **`initilize.wav`**: Played when Tanya's voice system is initializing
- **`proccesing.wav`**: Played when processing user requests
- **`error.wav`**: Played when TTS encounters errors

## 💬 **Chat History Features:**

- **IP-Based Storage**: Each user gets their own conversation history
- **Automatic Cleanup**: Messages older than 3 minutes are automatically deleted
- **Context Awareness**: Tanya remembers recent conversations
- **Memory Management**: Keeps memory usage low with automatic cleanup
- **Conversation Flow**: Natural conversation continuity

## 📋 **Setup Instructions:**

### 1. Environment Variables

Create a file called `.env.local` in your project root with:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the key to your `.env.local` file

### 3. Restart Development Server

```bash
npm run dev
```

## 🎤 **How It Works:**

1. **Voice Input**: Click microphone → Speech recognition captures your voice
2. **Custom Audio**: Plays processing audio while Tanya thinks
3. **Chat History**: Server stores conversation context by IP address
4. **Tanya's AI**: Your question goes to Gemini API with conversation context
5. **TTS Generation**: Server uses Kokoro TTS with Nicole voice for Tanya
6. **Audio Playback**: Client receives and plays Tanya's seductive voice
7. **Fallback**: If server TTS fails, plays error audio and uses browser TTS
8. **Memory Cleanup**: Old messages are automatically deleted after 3 minutes

## 🧪 **Test Commands:**

- **"Tell me about Ravi"** - Tanya will describe Ravi's background
- **"What are your skills?"** - Learn about Ravi's technical skills
- **"Show me the Code Editor project"** - Opens the Code Editor demo
- **"Tell me about Wyvate"** - Information about Wyvate projects
- **"What did we just talk about?"** - Tanya will remember the conversation

## 🎮 **UI Controls:**

- **🎤 Main Button**: Click to start/stop voice recognition (never disabled)
- **🔊 Audio Button**: Mute/unmute Tanya's voice or stop playback
- **💬 Chat Button**: Toggle chat interface to see conversation with Tanya
- **🔄 Refresh Button**: Refresh the page if needed
- **❌ Close Button**: Close the chat interface

## 🔧 **Technical Details:**

- **AI Assistant**: Tanya with seductive personality and memory
- **Server TTS**: Kokoro TTS with `af_nicole` voice
- **Custom Audio**: WAV files for initialization, processing, and error states
- **Chat History**: IP-based storage with automatic cleanup
- **Audio Format**: WAV files generated on server
- **AI Model**: Gemini 1.5 Flash with conversation context
- **Fallback**: Browser Speech Synthesis API
- **Animations**: Framer Motion for smooth transitions
- **UI Framework**: Tailwind CSS with pink/purple theme
- **Memory Management**: Automatic cleanup every minute

## 🐛 **Troubleshooting:**

1. **No Voice**: Check browser console for errors
2. **API Errors**: Verify Gemini API key in `.env.local`
3. **TTS Issues**: Check server logs for Kokoro TTS errors
4. **Microphone**: Ensure browser permissions are granted
5. **Animations**: Make sure framer-motion is installed
6. **Custom Audio**: Ensure WAV files are in the public directory
7. **Chat History**: Automatically managed, no manual intervention needed

## 📱 **Browser Support:**

- Chrome/Edge: Full support with all animations
- Firefox: Limited support
- Safari: Limited support
- Mobile: Works on most modern browsers

## 🎨 **Status Messages:**

- ✨ Ready to chat with Tanya!
- 🎵 Initializing Tanya's voice...
- 🎤 Listening darling...
- 🤔 Thinking about your question...
- 🧠 Getting Tanya's response...
- 🎵 Tanya is speaking...
- 🔊 Tanya is speaking...
- ❌ Error occurred
- 🔇 Audio error
- ⚠️ Limited functionality

## 💋 **Tanya's Personality:**

- **Confident & Sexy**: Speaks with seductive confidence
- **Professional**: Maintains professionalism while being flirty
- **Natural Speech**: Uses contractions and natural language
- **Short Responses**: Keeps answers concise and sweet
- **No Symbols**: Avoids slashes, dashes, or special characters
- **Proud Manager**: Shows pride in Ravi's accomplishments
- **Memory**: Remembers conversation context and responds accordingly

## 🎵 **Audio Experience:**

- **Smooth Initialization**: Custom audio during startup
- **Processing Feedback**: Audio feedback during request processing
- **Error Handling**: Graceful error audio when TTS fails
- **Seamless Fallback**: Automatic browser TTS when needed

## 💬 **Chat Experience:**

- **Conversation Memory**: Tanya remembers what you talked about
- **Context Awareness**: Responses are based on conversation history
- **Automatic Cleanup**: Old messages are deleted to save memory
- **IP-Based Privacy**: Each user gets their own conversation space
