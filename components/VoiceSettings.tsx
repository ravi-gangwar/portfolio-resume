"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, User, Users, X } from "lucide-react";
import { motion } from "framer-motion";

export interface VoiceSettings {
  engine: "browser" | "kokoro";
  gender: "female" | "male";
}

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSettings: VoiceSettings;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
  onTestVoice: () => void;
}

export function VoiceSettings({
  isOpen,
  onClose,
  voiceSettings,
  onVoiceSettingsChange,
  onTestVoice,
}: VoiceSettingsProps) {
  const updateVoiceSettings = (newSettings: Partial<VoiceSettings>) => {
    const updatedSettings = { ...voiceSettings, ...newSettings };
    onVoiceSettingsChange(updatedSettings);
    console.log("Voice settings updated:", updatedSettings);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed bottom-20 right-4 md:right-6 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 z-[9999]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Voice Settings</span>
          <Settings className="w-4 h-4" />
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
      <div className="p-4 space-y-4">
        {/* Voice Engine Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Voice Engine</label>
          <div className="flex gap-2">
            <Button
              onClick={() => updateVoiceSettings({ engine: "browser" })}
              variant={
                voiceSettings.engine === "browser" ? "default" : "outline"
              }
              size="sm"
              className="flex-1 relative"
            >
              <div className="flex items-center justify-center gap-1">
                <span>Browser Native</span>
                <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                  Fast
                </span>
              </div>
            </Button>
            <Button
              onClick={() => updateVoiceSettings({ engine: "kokoro" })}
              variant={
                voiceSettings.engine === "kokoro" ? "default" : "outline"
              }
              size="sm"
              className="flex-1 relative"
            >
              <div className="flex items-center justify-center gap-1">
                <span>Pretty Voice</span>
                <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                  Slow
                </span>
              </div>
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Browser Native uses your device&apos;s built-in voice synthesis for
            faster responses. Pretty Voice uses server-generated high-quality
            audio.
          </p>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Voice Gender</label>
          <div className="flex gap-2">
            <Button
              onClick={() => updateVoiceSettings({ gender: "female" })}
              variant={
                voiceSettings.gender === "female" ? "default" : "outline"
              }
              size="sm"
              className="flex-1"
            >
              <User className="w-4 h-4 mr-1" />
              Female
            </Button>
            <Button
              onClick={() => updateVoiceSettings({ gender: "male" })}
              variant={voiceSettings.gender === "male" ? "default" : "outline"}
              size="sm"
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-1" />
              Male
            </Button>
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current:{" "}
            {voiceSettings.engine === "browser"
              ? "Browser Native (Fast)"
              : "Pretty Voice (Slow)"}
            {` - ${voiceSettings.gender}`}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {voiceSettings.engine === "browser"
              ? `💡 Using your device's best available ${voiceSettings.gender} voice`
              : `💡 Using server-generated high-quality ${voiceSettings.gender} audio`}
          </p>
        </div>

        {/* Test Voice Button */}
        <Button
          onClick={onTestVoice}
          variant="outline"
          size="sm"
          className="w-full"
        >
          🎤 Test Current Voice
        </Button>
      </div>
    </motion.div>
  );
}
