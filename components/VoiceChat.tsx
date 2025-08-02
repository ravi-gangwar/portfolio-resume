"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  AlertCircle,
  MessageCircle,
  X,
  Sparkles,
  Heart,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ttsService } from "@/lib/tts-service";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceChatProps {
  className?: string;
}

interface MCPResponse {
  action: "speak" | "redirect";
  audio?: string;
  url?: string;
}

interface ChatMessage {
  id: string;
  timestamp: number;
  type: "user" | "assistant";
  text: string;
}

export default function VoiceChat({ className }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTTSReady, setIsTTSReady] = useState(false);
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [status, setStatus] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        setStatus("🤔 Thinking about your question...");
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setError("Speech recognition failed. Please try again.");
        setStatus("");
        // Don't disable the microphone on error
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
        setStatus("🎵 Initializing Tanya's voice...");
        console.log("Starting TTS initialization...");
        await ttsService.initialize();
        console.log("TTS initialization completed successfully");
        setIsTTSReady(true);
        setStatus("✨ Ready to chat with Tanya!");
      } catch (error) {
        console.error("Failed to initialize TTS:", error);
        setError(
          "TTS initialization failed, but you can still chat with Tanya!"
        );
        setStatus("⚠️ Limited functionality");
        // Still allow microphone usage even if TTS fails
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

  const handleVoiceInput = async (text: string) => {
    setIsLoading(true);
    setIsProcessing(true);
    setError("");
    setStatus("🤔 Tanya is thinking about your question...");

    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      type: "user",
      text: text,
    };
    setChatHistory((prev) => [...prev, userMessage]);

    // Play processing audio immediately when request starts
    let processingAudio: HTMLAudioElement | null = null;
    try {
      processingAudio = new Audio("/processing.wav");
      await processingAudio.play();
    } catch (error) {
      console.warn("Could not play processing audio:", error);
    }

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          chatHistory: chatHistory.slice(-5), // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MCPResponse = await response.json();
      setResponse(data.audio || "");

      // Stop processing audio and change state immediately when we get response
      if (processingAudio) {
        processingAudio.pause();
        processingAudio.currentTime = 0;
        processingAudio = null;
      }
      setIsProcessing(false);
      setStatus("🎵 Tanya is preparing to speak...");

      // Add assistant message to chat history
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: Date.now(),
        type: "assistant",
        text: data.audio || "",
      };
      setChatHistory((prev) => [...prev, assistantMessage]);

      if (data.action === "redirect" && data.url) {
        // Play the response first, then redirect after completion
        console.log("Speaking redirect response:", data.audio);
        await speakResponse(data.audio || "");
        // Redirect after audio is complete
        window.open(data.url, "_blank");
      } else if (data.action === "speak" && data.audio) {
        console.log("Speaking response:", data.audio);
        await speakResponse(data.audio);
      }
    } catch (error) {
      // Stop processing audio on error
      if (processingAudio) {
        processingAudio.pause();
        processingAudio.currentTime = 0;
        processingAudio = null;
      }
      setIsProcessing(false);

      console.error("Error calling MCP server:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setResponse(errorMessage);
      setError("API Error: Check console for details");
      setStatus("❌ Error occurred");

      // Add error message to chat history
      const errorMessageObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: Date.now(),
        type: "assistant",
        text: errorMessage,
      };
      setChatHistory((prev) => [...prev, errorMessageObj]);

      await speakResponse(errorMessage);
    } finally {
      setIsLoading(false);
      setStatus("✨ Ready to chat with Tanya!");
    }
  };

  const speakResponse = async (text: string): Promise<void> => {
    if (isMuted) return;

    console.log("TTS Service received text:", text);
    console.log("Text type:", typeof text);
    console.log("Text length:", text.length);

    setIsPlaying(true);
    setIsSpeaking(true);
    setStatus("🔊 Tanya is speaking to you...");
    try {
      await ttsService.playAudio(text);
    } catch (error) {
      console.error("Failed to play audio:", error);
      setError("Audio playback failed, but you can still chat with Tanya!");
      setStatus("🔇 Audio error");
    } finally {
      setIsPlaying(false);
      setIsSpeaking(false);
      setStatus("✨ Ready to chat with Tanya!");
    }
  };

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
    // Stop any currently playing audio
    ttsService.stopAudio();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsSpeaking(false);
    setStatus("✨ Ready to chat with Tanya!");
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const clearError = () => {
    setError("");
  };

  // Clean up old chat history (older than 3 minutes)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const threeMinutesAgo = Date.now() - 3 * 60 * 1000;
      setChatHistory((prev) =>
        prev.filter((msg) => msg.timestamp > threeMinutesAgo)
      );
    }, 60000); // Check every minute

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <>
      {/* Desktop Layout */}
      <div
        className={`hidden md:block fixed bottom-6 right-6 z-50 ${className}`}
      >
        {/* Status Indicator */}
        {status && (
          <motion.div
            className="absolute -top-16 right-0 bg-black/90 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{status}</span>
            </div>
          </motion.div>
        )}

        {/* Main Voice Button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleListening}
            disabled={isLoading || isInitializing}
            className={`w-20 h-20 rounded-full shadow-xl border-2 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white border-red-600"
                : isProcessing
                ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
                : isSpeaking
                ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-pink-600"
            } transition-all duration-300`}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8" />
                </motion.div>
              ) : isInitializing ? (
                <motion.div
                  key="initializing"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8" />
                </motion.div>
              ) : isProcessing ? (
                <motion.div
                  key="processing"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Loader2 className="w-8 h-8" />
                </motion.div>
              ) : isSpeaking ? (
                <motion.div
                  key="speaking"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Volume2 className="w-8 h-8" />
                </motion.div>
              ) : isListening ? (
                <motion.div
                  key="listening"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <MicOff className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mic className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Listening Animation */}
          {(isListening || isProcessing || isSpeaking) && (
            <motion.div
              className={`absolute inset-0 rounded-full border-4 ${
                isListening
                  ? "border-pink-400"
                  : isProcessing
                  ? "border-orange-400"
                  : "border-green-400"
              }`}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Control Buttons */}
        <motion.div className="flex flex-col gap-3 mt-4 items-end">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>

          <Button
            onClick={toggleChat}
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>

          <Button
            onClick={refreshPage}
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div
        className={`md:hidden fixed bottom-4 left-4 right-4 z-50 ${className}`}
      >
        {/* Status Indicator for Mobile */}
        {status && (
          <motion.div
            className="mb-4 bg-black/90 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap backdrop-blur-sm shadow-lg mx-auto w-fit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{status}</span>
            </div>
          </motion.div>
        )}

        {/* Glassmorphism Container */}
        <motion.div
          className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Main Voice Button */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={toggleListening}
                disabled={isLoading || isInitializing}
                className={`w-16 h-16 rounded-full shadow-xl border-2 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-600"
                    : isProcessing
                    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
                    : isSpeaking
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-pink-600"
                } transition-all duration-300`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-6 h-6" />
                    </motion.div>
                  ) : isInitializing ? (
                    <motion.div
                      key="initializing"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-6 h-6" />
                    </motion.div>
                  ) : isProcessing ? (
                    <motion.div
                      key="processing"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Loader2 className="w-6 h-6" />
                    </motion.div>
                  ) : isSpeaking ? (
                    <motion.div
                      key="speaking"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Volume2 className="w-6 h-6" />
                    </motion.div>
                  ) : isListening ? (
                    <motion.div
                      key="listening"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <MicOff className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mic className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Listening Animation */}
              {(isListening || isProcessing || isSpeaking) && (
                <motion.div
                  className={`absolute inset-0 rounded-full border-4 ${
                    isListening
                      ? "border-pink-400"
                      : isProcessing
                      ? "border-orange-400"
                      : "border-green-400"
                  }`}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>

              <Button
                onClick={toggleChat}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>

              <Button
                onClick={refreshPage}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed inset-4 md:inset-auto md:bottom-20 md:right-6 md:w-80 md:h-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 z-40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tanya</span>
                <Heart className="w-4 h-4 text-pink-300" />
              </div>
              <Button
                onClick={toggleChat}
                variant="ghost"
                size="icon"
                className="w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 h-64 md:h-80 overflow-y-auto">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Start chatting with Tanya!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl ${
                          message.type === "user"
                            ? "bg-pink-500 text-white"
                            : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          className="fixed top-4 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
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
    </>
  );
}
