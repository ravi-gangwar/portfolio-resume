"use client";

import { PERSONAL_INFO } from "@/lib/constants";
import { Mail, Phone, Linkedin, Github, Code, Trophy } from "lucide-react";

export default function ResumeHeader() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 md:p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              {PERSONAL_INFO.title}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {PERSONAL_INFO.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 md:items-end">
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{PERSONAL_INFO.email}</span>
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{PERSONAL_INFO.phone}</span>
            </a>
          </div>

          <div className="flex gap-3 md:gap-4">
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.github}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.leetcode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
              aria-label="LeetCode"
            >
              <Code className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.hackerrank}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
              aria-label="HackerRank"
            >
              <Trophy className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
