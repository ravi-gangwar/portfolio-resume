"use client";

import { PERSONAL_INFO } from "@/lib/constants";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Code,
  Instagram,
  Twitter,
} from "lucide-react";
import { LeetCodeIcon } from "@/components/ui/leetcode-icon";
import { HackerRankIcon } from "@/components/ui/hackerrank-icon";

export default function ResumeHeader() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <div className="flex-1">
          <div className="space-y-1 md:space-y-2 lg:space-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-medium leading-tight">
              {PERSONAL_INFO.title}
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              {PERSONAL_INFO.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 md:items-end">
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 text-sm">
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

          <div className="flex gap-2 md:gap-3 lg:gap-4">
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
              <LeetCodeIcon className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.hackerrank}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
              aria-label="HackerRank"
            >
              <HackerRankIcon className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.instagram}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.twitter}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
