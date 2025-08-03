"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChatMessage {
  id: string;
  timestamp: number;
  type: "user" | "assistant";
  text: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatMessage[];
}

export function ChatInterface({
  isOpen,
  onClose,
  chatHistory,
}: ChatInterfaceProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed bottom-20 right-4 md:right-6 w-80 h-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Aria</span>
          <Heart className="w-4 h-4 text-pink-300" />
        </div>
        <Button
          onClick={onClose}
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
            <p>Start chatting with Aria!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
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
  );
}
