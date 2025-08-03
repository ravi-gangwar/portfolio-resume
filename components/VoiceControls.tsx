"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  MessageCircle,
  RefreshCw,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  isMuted: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
  onToggleChat: () => void;
  onToggleSettings: () => void;
  onRefresh: () => void;
  status?: string;
  className?: string;
}

export function VoiceControls({
  isListening,
  isProcessing,
  isSpeaking,
  isLoading,
  isInitializing,
  isMuted,
  onToggleListening,
  onToggleMute,
  onToggleChat,
  onToggleSettings,
  onRefresh,
  status,
  className,
}: VoiceControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      {/* Status Indicator */}
      {status && (
        <motion.div
          className="absolute -top-16 right-0 bg-black/90 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap backdrop-blur-sm shadow-lg hidden md:block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex items-center gap-2">
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
          onClick={onToggleListening}
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

      {/* Expand/Collapse Toggle Button */}
      <motion.div className="flex justify-end mt-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleExpanded}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="up"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="down"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      {/* Control Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col gap-3 mt-3 items-end"
            initial={{ opacity: 0, height: 0, scale: 0.8 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onToggleMute}
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
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onToggleSettings}
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onToggleChat}
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRefresh}
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
