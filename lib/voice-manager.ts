import { ttsService } from "./tts-service";

export interface VoiceSettings {
  engine: "browser" | "kokoro";
  gender: "female" | "male";
}

export interface ChatMessage {
  id: string;
  timestamp: number;
  type: "user" | "assistant";
  text: string;
}

export interface MCPResponse {
  action: "speak" | "redirect";
  audio?: string;
  url?: string;
  audioData?: string;
  audioSize?: number;
  useBrowserTTS?: boolean;
}

export class VoiceManager {
  private voiceSettingsRef: React.MutableRefObject<VoiceSettings>;

  constructor(voiceSettingsRef: React.MutableRefObject<VoiceSettings>) {
    this.voiceSettingsRef = voiceSettingsRef;
  }

  async handleVoiceInput(
    text: string,
    chatHistory: ChatMessage[],
    callbacks: {
      onLoading: (loading: boolean) => void;
      onProcessing: (processing: boolean) => void;
      onError: (error: string) => void;
      onStatus: (status: string) => void;
      onResponse: (response: string) => void;
      onChatHistoryUpdate: (message: ChatMessage) => void;
      onPlayAudio: (audioData: string) => Promise<void>;
      onSpeakResponse: (text: string) => Promise<void>;
    }
  ): Promise<void> {
    callbacks.onLoading(true);
    callbacks.onProcessing(true);
    callbacks.onError("");
    callbacks.onStatus("🤔 Aria is thinking about your question...");

    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      type: "user",
      text: text,
    };
    callbacks.onChatHistoryUpdate(userMessage);

    // Play processing audio
    let processingAudio: HTMLAudioElement | null = null;
    try {
      processingAudio = new Audio("/processing.wav");
      await processingAudio.play();
    } catch (error) {
      console.warn("Could not play processing audio:", error);
    }

    try {
      // Get current voice settings
      const currentVoiceSettings = this.voiceSettingsRef.current;
      const payload = {
        message: text,
        chatHistory: chatHistory.slice(-5),
        voiceSettings: currentVoiceSettings,
      };
      console.log("Sending payload to backend:", payload);

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MCPResponse = await response.json();
      console.log("Backend response:", data);
      callbacks.onResponse(data.audio || "");

      // Stop processing audio
      if (processingAudio) {
        processingAudio.pause();
        processingAudio.currentTime = 0;
        processingAudio = null;
      }
      callbacks.onProcessing(false);

      if (currentVoiceSettings.engine === "browser") {
        callbacks.onStatus("🎵 Aria is preparing to speak (Fast Mode)...");
      } else {
        callbacks.onStatus("🎵 Aria is preparing to speak (High Quality)...");
      }

      // Add assistant message to chat history
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: Date.now(),
        type: "assistant",
        text: data.audio || "",
      };
      callbacks.onChatHistoryUpdate(assistantMessage);

      if (data.action === "redirect" && data.url) {
        console.log("Speaking redirect response:", data.audio);
        if (data.audioData && !data.useBrowserTTS) {
          await callbacks.onPlayAudio(data.audioData);
        } else {
          await callbacks.onSpeakResponse(data.audio || "");
        }
        window.open(data.url, "_blank");
      } else if (data.action === "speak" && data.audio) {
        console.log("Speaking response:", data.audio);
        if (data.audioData && !data.useBrowserTTS) {
          await callbacks.onPlayAudio(data.audioData);
        } else {
          await callbacks.onSpeakResponse(data.audio || "");
        }
      }
    } catch (error) {
      // Stop processing audio on error
      if (processingAudio) {
        processingAudio.pause();
        processingAudio.currentTime = 0;
        processingAudio = null;
      }
      callbacks.onProcessing(false);

      console.error("Error calling MCP server:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      callbacks.onResponse(errorMessage);
      callbacks.onError("API Error: Check console for details");
      callbacks.onStatus("❌ Error occurred");

      // Add error message to chat history
      const errorMessageObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: Date.now(),
        type: "assistant",
        text: errorMessage,
      };
      callbacks.onChatHistoryUpdate(errorMessageObj);

      await callbacks.onSpeakResponse(errorMessage);
    } finally {
      callbacks.onLoading(false);
      callbacks.onStatus("✨ Ready to chat with Aria!");
    }
  }

  async playAudioFromBase64(
    base64Audio: string,
    callbacks: {
      onPlaying: (playing: boolean) => void;
      onSpeaking: (speaking: boolean) => void;
      onStatus: (status: string) => void;
      onError: (error: string) => void;
    }
  ): Promise<void> {
    callbacks.onPlaying(true);
    callbacks.onSpeaking(true);
    callbacks.onStatus("🔊 Aria is speaking to you...");

    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      audio.onended = () => {
        callbacks.onPlaying(false);
        callbacks.onSpeaking(false);
        callbacks.onStatus("✨ Ready to chat with Aria!");
      };
      audio.onerror = (error) => {
        console.error("Failed to play base64 audio:", error);
        callbacks.onPlaying(false);
        callbacks.onSpeaking(false);
        callbacks.onStatus("✨ Ready to chat with Aria!");
      };
      await audio.play();
    } catch (error) {
      console.error("Failed to play base64 audio:", error);
      callbacks.onPlaying(false);
      callbacks.onSpeaking(false);
      callbacks.onStatus("✨ Ready to chat with Aria!");
    }
  }

  async speakResponse(
    text: string,
    voiceSettings: VoiceSettings,
    callbacks: {
      onPlaying: (playing: boolean) => void;
      onSpeaking: (speaking: boolean) => void;
      onStatus: (status: string) => void;
      onError: (error: string) => void;
    }
  ): Promise<void> {
    callbacks.onPlaying(true);
    callbacks.onSpeaking(true);
    callbacks.onStatus("🔊 Aria is speaking to you...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await ttsService.playAudio(text, voiceSettings);
    } catch (error) {
      console.error("Failed to play audio:", error);

      // Try fallback with default settings
      try {
        console.log("Trying fallback with default voice settings...");
        await ttsService.playAudio(text, { engine: "browser", gender: "female" });
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        callbacks.onError("Audio playback failed, but you can still chat with Aria!");
        callbacks.onStatus("🔇 Audio error");
      }
    } finally {
      callbacks.onPlaying(false);
      callbacks.onSpeaking(false);
      callbacks.onStatus("✨ Ready to chat with Aria!");
    }
  }

  testVoice(
    voiceSettings: VoiceSettings,
    callbacks: {
      onError: (error: string) => void;
      onSpeakResponse: (text: string) => Promise<void>;
    }
  ): void {
    if (!("speechSynthesis" in window)) {
      callbacks.onError("Speech synthesis not supported in this browser");
      return;
    }

    const testText = "Hello! I'm Aria, your voice assistant. How can I help you today?";
    callbacks.onSpeakResponse(testText);
  }
} 