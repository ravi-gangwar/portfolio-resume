class TTSService {
  private isInitialized = false;
  private currentAudio: HTMLAudioElement | null = null;
  private useServerTTS = true;

  // Custom audio files for different states
  private customAudios = {
    initializing: '/Initializing.wav',
    processing: '/processing.wav',
    error: '/error.wav'
  };

  async initialize() {
    if (this.isInitialized) return;

    console.log("TTS Service: Starting initialization...");
    
    try {
      // Play initializing audio
      console.log("TTS Service: Playing initializing audio...");
      await this.playCustomAudio('initializing');
      console.log("TTS Service: Initializing audio completed");
      
      this.isInitialized = true;
      this.useServerTTS = false;
      console.log("TTS Service: Initialized for browser fallback only");
    } catch (error) {
      console.error("TTS Service: Failed to initialize TTS:", error);
      this.isInitialized = true;
      this.useServerTTS = false;
    }
  }

  async playAudio(text: string, voiceSettings?: { engine: "browser" | "kokoro"; gender: "female" | "male" }): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // If Pretty Voice is selected, don't use browser TTS
    if (voiceSettings?.engine === "kokoro") {
      console.log("TTS Service: Pretty Voice selected, skipping browser TTS");
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        // Stop any currently playing audio
        this.stopAudio();

        console.log("TTS Service: Using voice settings:", voiceSettings);
        this.fallbackToBrowserTTS(text, resolve, reject, voiceSettings);

      } catch (error) {
        console.error("Failed to play audio:", error);
        this.playCustomAudio('error').then(() => {
          this.fallbackToBrowserTTS(text, resolve, reject, voiceSettings);
        });
      }
    });
  }

  private async playCustomAudio(type: 'initializing' | 'processing' | 'error'): Promise<void> {
    return new Promise((resolve) => {
      try {
        const audio = new Audio(this.customAudios[type]);
        
        audio.onloadeddata = () => {
          console.log(`Custom ${type} audio loaded successfully`);
        };
        
        audio.onended = () => {
          console.log(`Custom ${type} audio completed`);
          resolve();
        };
        
        audio.onerror = (error) => {
          console.warn(`Failed to play custom ${type} audio:`, error);
          resolve();
        };
        
        audio.onloadstart = () => {
          console.log(`Loading custom ${type} audio...`);
        };
        
        audio.oncanplay = () => {
          console.log(`Custom ${type} audio can play, starting...`);
          audio.play().catch((error) => {
            console.warn(`Failed to play custom ${type} audio:`, error);
            resolve();
          });
        };
        
        // If audio is already loaded, play it immediately
        if (audio.readyState >= 2) {
          audio.play().catch((error) => {
            console.warn(`Failed to play custom ${type} audio:`, error);
            resolve();
          });
        }
        
        // Set a timeout in case audio doesn't load
        setTimeout(() => {
          console.warn(`Custom ${type} audio timeout, resolving...`);
          resolve();
        }, 3000);
        
      } catch (error) {
        console.warn(`Error setting up custom ${type} audio:`, error);
        resolve();
      }
    });
  }

  private fallbackToBrowserTTS(
    text: string, 
    resolve: () => void, 
    reject: (error: Error) => void,
    voiceSettings?: { engine: "browser" | "kokoro"; gender: "female" | "male" }
  ) {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      const gender = voiceSettings?.gender || "female";
      const engine = voiceSettings?.engine || "browser";
      
      console.log("TTS Service: Configuring voice for:", { gender, engine });
      
      // Basic configuration
      utterance.rate = 0.9;
      utterance.pitch = gender === "female" ? 1.15 : 0.85;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      // Get available voices
      let voices = speechSynthesis.getVoices();
      
      // If voices are not loaded yet, wait for them
      if (voices.length === 0) {
        console.log("TTS Service: Voices not loaded yet, waiting...");
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          console.log("TTS Service: Voices loaded:", voices.map(v => v.name));
          this.setupVoiceAndSpeak(utterance, voices, gender, resolve, reject);
        };
        return;
      }

      this.setupVoiceAndSpeak(utterance, voices, gender, resolve, reject);
      
    } catch (error) {
      console.error("TTS Service: Error setting up speech:", error);
      reject(new Error(`TTS setup error: ${error}`));
    }
  }

  private setupVoiceAndSpeak(
    utterance: SpeechSynthesisUtterance,
    voices: SpeechSynthesisVoice[],
    gender: "female" | "male",
    resolve: () => void,
    reject: (error: Error) => void
  ) {
    try {
      console.log(`TTS Service: Available voices:`, voices.map(v => `${v.name} (${v.lang})`));
      
      // Select voice based on gender
      let selectedVoice = null;
      
      if (gender === "female") {
        // Try multiple strategies for female voice selection
        selectedVoice = voices.find(voice => 
          voice.name.includes('Nicole') || 
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Alexandra') ||
          voice.name.includes('Female') || 
          (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'))
        );
        
        // If no specific female voice found, try any English voice that sounds female
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.toLowerCase().includes('samantha') ||
             voice.name.toLowerCase().includes('victoria') ||
             voice.name.toLowerCase().includes('karen') ||
             voice.name.toLowerCase().includes('alexandra'))
          );
        }
      } else {
        // Enhanced male voice selection
        selectedVoice = voices.find(voice => 
          voice.name.includes('Daniel') || 
          voice.name.includes('James') ||
          voice.name.includes('Michael') ||
          voice.name.includes('David') ||
          voice.name.includes('Alex') ||
          voice.name.includes('Tom') ||
          voice.name.includes('John') ||
          voice.name.includes('Mark') ||
          voice.name.includes('Paul') ||
          voice.name.includes('Steve') ||
          voice.name.includes('Chris') ||
          voice.name.includes('Male') || 
          (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('male'))
        );
        
        // If no specific male voice found, try any English voice that sounds male
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.toLowerCase().includes('daniel') ||
             voice.name.toLowerCase().includes('james') ||
             voice.name.toLowerCase().includes('michael') ||
             voice.name.toLowerCase().includes('david') ||
             voice.name.toLowerCase().includes('alex'))
          );
        }
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`TTS Service: Using ${gender} voice:`, selectedVoice.name);
      } else {
        console.log(`TTS Service: No ${gender} voice found, using default voice`);
        // Try to find any English voice as fallback
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
          console.log(`TTS Service: Using fallback English voice:`, englishVoice.name);
        }
      }

      utterance.onstart = () => {
        console.log("TTS Service: Browser TTS started for Aria");
      };

      utterance.onend = () => {
        console.log("TTS Service: Browser TTS completed for Aria");
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error("TTS Service: Browser TTS error:", event.error);
        reject(new Error(`TTS error: ${event.error}`));
      };
      
      // Cancel any existing speech
      speechSynthesis.cancel();
      
      // Speak the text
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error("TTS Service: Error in setupVoiceAndSpeak:", error);
      reject(new Error(`Voice setup error: ${error}`));
    }
  }

  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    speechSynthesis.cancel();
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  // Method to test voice switching
  async testVoice(voiceSettings: { engine: "browser" | "kokoro"; gender: "female" | "male" }): Promise<void> {
    const testText = "Hello! I'm Aria, your voice assistant. How can I help you today?";
    console.log("TTS Service: Testing voice with settings:", voiceSettings);
    await this.playAudio(testText, voiceSettings);
  }
}

// Export singleton instance
export const ttsService = new TTSService();