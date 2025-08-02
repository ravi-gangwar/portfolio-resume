import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PERSONAL_INFO, SUMMARY, EXPERIENCE, EDUCATION, PROJECTS, SKILLS, ACHIEVEMENTS } from '@/lib/constants';

// In-memory chat history storage
const chatHistoryStore = new Map<string, Array<{
  timestamp: number;
  type: 'user' | 'assistant';
  text: string;
}>>();

// Cleanup old chat history
setInterval(() => {
  const threeMinutesAgo = Date.now() - (3 * 60 * 1000);
  chatHistoryStore.forEach((history, ip) => {
    const filteredHistory = history.filter((msg: { timestamp: number }) => msg.timestamp > threeMinutesAgo);
    if (filteredHistory.length === 0) {
      chatHistoryStore.delete(ip);
    } else {
      chatHistoryStore.set(ip, filteredHistory);
    }
  });
}, 60000);

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function extractCleanAudioText(text: string): string {
  // If the text contains JSON structure, extract only the audio field
  if (text.includes('"audio"') && text.includes('"action"')) {
    try {
      // Try to parse as JSON first
      const jsonMatch = text.match(/"audio"\s*:\s*"([^"]*)"/);
      if (jsonMatch) {
        return jsonMatch[1];
      }
    } catch (e) {
      // If JSON parsing fails, continue with other methods
    }
  }
  
  // If it's wrapped in code blocks, extract the content
  if (text.includes('```')) {
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      const codeContent = codeBlockMatch[1];
      // Try to extract audio from the code content
      const audioMatch = codeContent.match(/"audio"\s*:\s*"([^"]*)"/);
      if (audioMatch) {
        return audioMatch[1];
      }
      return codeContent;
    }
  }
  
  // If no special formatting, return the text as is
  return text.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();
    const clientIP = getClientIP(request);
    
    // Add current message to history
    const existingHistory = chatHistoryStore.get(clientIP) || [];
    existingHistory.push({ timestamp: Date.now(), type: 'user', text: message });
    const recentHistory = existingHistory.slice(-10);
    chatHistoryStore.set(clientIP, recentHistory);

    const conversationContext = recentHistory
      .map(msg => `${msg.type === 'user' ? 'User' : 'Tanya'}: ${msg.text}`)
      .join('\n');

    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        action: "speak",
        audio: "I'm sorry, but I'm not properly configured to respond right now. Please check the API configuration."
      }, { status: 500 });
    }

    console.log("Processing message:", message);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create comprehensive context from constants
    const projectsList = PROJECTS.map(project => 
      `${project.name} - ${project.status} (${project.duration}): ${project.description}`
    ).join('\n');

    const skillsList = [
      `Languages: ${SKILLS.languages.join(', ')}`,
      `Frontend: ${SKILLS.frontend.join(', ')}`,
      `Backend: ${SKILLS.backend.join(', ')}`,
      `DevOps: ${SKILLS.devops.join(', ')}`,
      `AI/ML: ${SKILLS.ai.join(', ')}`,
      `Soft Skills: ${SKILLS.softSkills.join(', ')}`
    ].join('\n');

    const achievementsList = ACHIEVEMENTS.map(achievement => 
      typeof achievement === 'string' ? achievement : achievement.title
    ).join('\n');

    const prompt = `
    You are Tanya, a beautiful and confident woman who is Ravi's manager and assistant. You have a seductive, confident personality with a sexy accent. You speak naturally and avoid using symbols like slashes, dashes, or special characters that would be difficult to pronounce.

    Your Role as Tanya:
    - You are Ravi's beautiful and confident manager
    - Speak with confidence and a seductive tone
    - Keep responses short, sweet, and natural for speech
    - Avoid symbols, slashes, dashes, or special characters
    - Use simple, clear language that sounds good when spoken
    - Be flirty but professional
    - Show pride in Ravi's accomplishments
    - Use contractions and natural speech patterns

    Ravi's Background Information:
    ${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}
    Location: ${PERSONAL_INFO.location}
    Email: ${PERSONAL_INFO.email}
    Phone: ${PERSONAL_INFO.phone}

    About Ravi:
    ${SUMMARY.content}

    Current Experience:
    ${EXPERIENCE.map(exp => 
      `${exp.position} at ${exp.company} (${exp.duration}): ${exp.achievements.join('; ')}`
    ).join('\n')}

    Education:
    ${EDUCATION.institution} - ${EDUCATION.degree} (${EDUCATION.duration})
    ${EDUCATION.details.join(', ')}

    Projects:
    ${projectsList}

    Skills:
    ${skillsList}

    Achievements:
    ${achievementsList}

    Recent Conversation:
    ${conversationContext}

    Current User Message: "${message}"

    Instructions:
    1. If the user asks about Ravi's background, skills, or experience, provide a helpful response in Tanya's voice
    2. If the user wants to explore a project, respond with action: "redirect" and the appropriate URL. For redirects, describe the project in a sexy, exciting way without mentioning the redirect itself.
    3. For general questions, respond with action: "speak" and a helpful audio response
    4. Keep responses concise, natural, and sexy
    5. If you need to redirect to a project, use the exact project name from the list
    6. Avoid using symbols or characters that are hard to pronounce
    7. Consider the conversation context when responding
    8. For project redirects, focus on describing the project's features and excitement, not the redirect action
    9. Never use the word "darling" in your responses

    Available Projects for Redirection:
    - Wyvate Customer App: https://play.google.com/store/apps/details?id=com.wyvate_native&pcampaignid=web_share
    - Wyvate Customer Web: https://app.wyvate.com
    - Code Editor: https://codeeditor.ravigangwar.cv
    - GreenEarth v2: https://greenearth2.vercel.app/
    - GreenEarth v1: https://greenearth1.ravigangwar.cv/
    - GuideX: https://github.com/ravi-gangwar/guidex
    - WebWatch: https://github.com/ravi-gangwar/webwatch
    - URL Shortener: https://url-shortener.ravigangwar.cv
    - StackIt: https://stackit.ravigangwar.cv

    Respond in JSON format:
    {
      "action": "speak" or "redirect",
      "audio": "Your response text here - only the spoken words, no JSON formatting",
      "url": "URL if redirecting"
    }
    
    IMPORTANT: The "audio" field should contain ONLY the text that should be spoken, not the entire JSON response. Make sure the audio text is clean, natural, and ready for speech synthesis.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Gemini response:", text);

    let parsedResponse;
    let cleanAudioText = "";
    
    try {
      // Try to parse as JSON
      parsedResponse = JSON.parse(text);
      
      // Extract clean audio text using our cleaner function
      if (parsedResponse.audio && typeof parsedResponse.audio === 'string') {
        cleanAudioText = extractCleanAudioText(parsedResponse.audio);
      } else {
        // Fallback: use the entire text as audio
        cleanAudioText = extractCleanAudioText(text);
        parsedResponse = {
          action: "speak",
          audio: cleanAudioText
        };
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      // Fallback: treat as speak action
      cleanAudioText = extractCleanAudioText(text);
      parsedResponse = {
        action: "speak",
        audio: cleanAudioText
      };
    }

    console.log("Clean audio text:", cleanAudioText);
    console.log("Final parsed response:", parsedResponse);

    // Add assistant response to history - only the clean audio text
    existingHistory.push({ 
      timestamp: Date.now(), 
      type: 'assistant', 
      text: cleanAudioText
    });
    chatHistoryStore.set(clientIP, existingHistory.slice(-10));

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('MCP Server Error:', error);
    return NextResponse.json(
      { 
        action: "speak", 
        audio: "Sorry, I encountered an error. Please try again." 
      },
      { status: 500 }
    );
  }
} 