class TTSService {
  private isInitialized = false;
  private currentAudio: HTMLAudioElement | null = null;
  private useServerTTS = true; // Try server TTS first

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
      
      // Since we're using combined API, just mark as initialized
      this.isInitialized = true;
      this.useServerTTS = false; // We don't need separate TTS calls anymore
      console.log("TTS Service: Initialized for browser fallback only");
    } catch (error) {
      console.error("TTS Service: Failed to initialize TTS:", error);
      // Fallback to browser speech synthesis
      this.isInitialized = true;
      this.useServerTTS = false;
    }
  }

  async playAudio(text: string): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      try {
        // Stop any currently playing audio
        this.stopAudio();

        // Use browser TTS directly since we're using combined API
        console.log("Using browser TTS fallback for Tanya:", text);
        this.fallbackToBrowserTTS(text, resolve, reject);

      } catch (error) {
        console.error("Failed to play audio:", error);
        // Play error audio and fallback to browser TTS
        this.playCustomAudio('error').then(() => {
          this.fallbackToBrowserTTS(text, resolve, reject);
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

  private fallbackToBrowserTTS(text: string, resolve: () => void, reject: (error: Error) => void) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure for Tanya's sexy voice
      utterance.rate = 0.85;  // Slightly slower for seductive tone
      utterance.pitch = 1.2; // Higher pitch for feminine voice
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      // Try to find a good female voice for Tanya
      const voices = speechSynthesis.getVoices();
      console.log("Available voices:", voices.map(v => v.name));
      
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Nicole') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Alexandra') ||
        voice.name.includes('Female') || 
        (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log("Using voice for Tanya:", preferredVoice.name);
      } else {
        // If no preferred voice, try to find any English female voice
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          voice.name.toLowerCase().includes('female')
        );
        if (englishVoice) {
          utterance.voice = englishVoice;
          console.log("Using English female voice for Tanya:", englishVoice.name);
        } else {
          console.log("No preferred voice found for Tanya, using default");
        }
      }

      utterance.onstart = () => {
        console.log("Browser TTS started for Tanya");
      };

      utterance.onend = () => {
        console.log("Browser TTS completed for Tanya");
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error("Browser TTS error:", event.error);
        reject(new Error(`TTS error: ${event.error}`));
      };
      
      // Cancel any existing speech
      speechSynthesis.cancel();
      
      // Speak the text
      speechSynthesis.speak(utterance);
    } else {
      reject(new Error('Speech synthesis not supported in this browser'));
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
}

// Export singleton instance
export const ttsService = new TTSService();