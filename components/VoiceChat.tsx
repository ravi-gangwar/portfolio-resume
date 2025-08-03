"use client";

import React, { useState, useRef, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ttsService } from "@/lib/tts-service";
import { VoiceManager, VoiceSettings, ChatMessage } from "@/lib/voice-manager";
import { VoiceControls } from "@/components/VoiceControls";
import { VoiceSettings as VoiceSettingsComponent } from "@/components/VoiceSettings";
import { ChatInterface } from "@/components/ChatInterface";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceChatProps {
  className?: string;
}

export default function VoiceChat({ className }: VoiceChatProps) {
  // State management
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTTSReady, setIsTTSReady] = useState(false);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [status, setStatus] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    engine: "browser",
    gender: "female",
  });

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceSettingsRef = useRef<VoiceSettings>({
    engine: "browser",
    gender: "female",
  });

  // Voice manager instance
  const voiceManager = new VoiceManager(voiceSettingsRef);

  // Initialize speech recognition and TTS
  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setError("");
        setStatus("🎤 Listening...");
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setStatus("🤔 Aria is thinking about your question...");
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setError("Speech recognition failed. Please try again.");
        setStatus("");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (!isLoading) {
          setStatus("");
        }
      };
    } else {
      setError("Speech recognition not supported in this browser.");
    }

    // Initialize TTS Service
    const initTTS = async () => {
      try {
        setIsInitializing(true);
        setStatus("🎵 Initializing Aria's voice...");
        console.log("Starting TTS initialization...");
        await ttsService.initialize();
        console.log("TTS initialization completed successfully");
        setIsTTSReady(true);
        setStatus("✨ Ready to chat with Aria!");
      } catch (error) {
        console.error("Failed to initialize TTS:", error);
        setError(
          "TTS initialization failed, but you can still chat with Aria!"
        );
        setStatus("⚠️ Limited functionality");
        setIsTTSReady(true);
      } finally {
        setIsInitializing(false);
      }
    };

    initTTS();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    voiceSettingsRef.current = voiceSettings;
  }, [voiceSettings]);

  // Clean up old chat history
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const threeMinutesAgo = Date.now() - 3 * 60 * 1000;
      setChatHistory((prev) =>
        prev.filter((msg) => msg.timestamp > threeMinutesAgo)
      );
    }, 60000);

    return () => clearInterval(cleanupInterval);
  }, []);

  // Voice input handler
  const handleVoiceInput = async (text: string) => {
    await voiceManager.handleVoiceInput(text, chatHistory, {
      onLoading: setIsLoading,
      onProcessing: setIsProcessing,
      onError: setError,
      onStatus: setStatus,
      onResponse: setResponse,
      onChatHistoryUpdate: (message) =>
        setChatHistory((prev) => [...prev, message]),
      onPlayAudio: async (audioData) => {
        await voiceManager.playAudioFromBase64(audioData, {
          onPlaying: setIsPlaying,
          onSpeaking: setIsSpeaking,
          onStatus: setStatus,
          onError: setError,
        });
      },
      onSpeakResponse: async (text) => {
        await voiceManager.speakResponse(text, voiceSettings, {
          onPlaying: setIsPlaying,
          onSpeaking: setIsSpeaking,
          onStatus: setStatus,
          onError: setError,
        });
      },
    });
  };

  // Control functions
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying) {
      stopAudio();
    }
  };

  const stopAudio = () => {
    ttsService.stopAudio();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsSpeaking(false);
    setStatus("✨ Ready to chat with Aria!");
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const clearError = () => {
    setError("");
  };

  const updateVoiceSettings = (newSettings: VoiceSettings) => {
    console.log(
      "Voice settings changing from:",
      voiceSettings,
      "to:",
      newSettings
    );
    setVoiceSettings(newSettings);
    console.log("Voice settings updated:", newSettings);

    // Update the ref immediately for the voice manager
    voiceSettingsRef.current = newSettings;
  };

  const testVoice = () => {
    console.log("Testing voice with settings:", voiceSettings);
    if (voiceSettings.engine === "browser") {
      // Use TTS service directly for browser testing
      ttsService.testVoice(voiceSettings).catch((error) => {
        console.error("Voice test failed:", error);
        setError("Voice test failed. Please try again.");
      });
    } else {
      // For Pretty Voice, use the voice manager
      voiceManager.testVoice(voiceSettings, {
        onError: setError,
        onSpeakResponse: async (text) => {
          await voiceManager.speakResponse(text, voiceSettings, {
            onPlaying: setIsPlaying,
            onSpeaking: setIsSpeaking,
            onStatus: setStatus,
            onError: setError,
          });
        },
      });
    }
  };

  return (
    <>
      {/* Voice Controls */}
      <VoiceControls
        isListening={isListening}
        isProcessing={isProcessing}
        isSpeaking={isSpeaking}
        isLoading={isLoading}
        isInitializing={isInitializing}
        isMuted={isMuted}
        onToggleListening={toggleListening}
        onToggleMute={toggleMute}
        onToggleChat={toggleChat}
        onToggleSettings={toggleSettings}
        onRefresh={refreshPage}
        status={status}
        className={className}
      />

      {/* Voice Settings */}
      <VoiceSettingsComponent
        isOpen={showSettings}
        onClose={toggleSettings}
        voiceSettings={voiceSettings}
        onVoiceSettingsChange={updateVoiceSettings}
        onTestVoice={testVoice}
      />

      {/* Chat Interface */}
      <ChatInterface
        isOpen={showChat}
        onClose={toggleChat}
        chatHistory={chatHistory}
      />

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="fixed top-4 right-4 md:right-6 w-80 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
              <Button
                onClick={clearError}
                variant="ghost"
                size="icon"
                className="w-6 h-6 ml-auto"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
