// Auspicious Gujarati Lagna Geet Arrangement of "Vela Milan Ni" (Jigardan Gadhavi)
// Key: A Major — Celebratory, sweet romantic melody

interface Note {
  pitch: number; // Hz
  duration: number; // beats
}

// Frequencies (A4 = 440 Hz)
const E3 = 164.81, A3 = 220.00, B3 = 246.94, Csharp4 = 277.18, D4 = 293.66;
const E4 = 329.63, Fsharp4 = 369.99, Gsharp4 = 415.30, A4 = 440.00, B4 = 493.88;
const Csharp5 = 554.37, D5 = 587.33, E5 = 659.25, Fsharp5 = 739.99, Gsharp5 = 830.61;
const REST = 0;

// "Pehla Pyaar" chorus & verse melody sequence
// "Khaabon ke bina main toh jee na sakun..."
// "Tere bina main toh reh na sakun..."
// "Pehla pehla pyaar hai mera..."
const PEHLA_PYAAR_MELODY: Note[] = [
  // Verse 1
  { pitch: Csharp4, duration: 1.0 },
  { pitch: E4, duration: 1.0 },
  { pitch: A4, duration: 2.0 },
  { pitch: Gsharp4, duration: 1.0 },
  { pitch: Fsharp4, duration: 1.5 },
  { pitch: E4, duration: 1.5 },
  { pitch: REST, duration: 0.5 },

  // "Khaabon ke bina..."
  { pitch: E4, duration: 0.8 },
  { pitch: Fsharp4, duration: 0.8 },
  { pitch: Gsharp4, duration: 1.2 },
  { pitch: A4, duration: 1.2 },
  { pitch: Gsharp4, duration: 1.0 },
  { pitch: Fsharp4, duration: 1.0 },
  { pitch: E4, duration: 2.0 },
  { pitch: REST, duration: 0.8 },

  // "Tere bina main..."
  { pitch: D4, duration: 0.8 },
  { pitch: E4, duration: 0.8 },
  { pitch: Fsharp4, duration: 1.2 },
  { pitch: Gsharp4, duration: 1.2 },
  { pitch: Fsharp4, duration: 1.0 },
  { pitch: E4, duration: 1.0 },
  { pitch: D4, duration: 2.0 },
  { pitch: REST, duration: 0.8 },

  // "Pehla pehla pyaar hai mera..."
  { pitch: Csharp4, duration: 0.7 },
  { pitch: E4, duration: 0.7 },
  { pitch: A4, duration: 1.5 },
  { pitch: Gsharp4, duration: 0.8 },
  { pitch: Fsharp4, duration: 1.2 },
  { pitch: E4, duration: 2.0 },
  { pitch: REST, duration: 0.6 },

  // "Kab se intezaar tha tera..."
  { pitch: D4, duration: 0.7 },
  { pitch: Fsharp4, duration: 0.7 },
  { pitch: B4, duration: 1.5 },
  { pitch: A4, duration: 0.8 },
  { pitch: Gsharp4, duration: 1.2 },
  { pitch: A4, duration: 3.0 },
  { pitch: REST, duration: 1.5 },

  // Chorus crescendo flourish
  { pitch: Csharp5, duration: 1.2 },
  { pitch: B4, duration: 0.8 },
  { pitch: A4, duration: 1.2 },
  { pitch: Gsharp4, duration: 0.8 },
  { pitch: Fsharp4, duration: 1.5 },
  { pitch: E4, duration: 2.0 },
  { pitch: REST, duration: 1.0 },

  // Final resolving phrase
  { pitch: E4, duration: 0.8 },
  { pitch: Fsharp4, duration: 0.8 },
  { pitch: A4, duration: 1.5 },
  { pitch: B4, duration: 1.0 },
  { pitch: Csharp5, duration: 2.5 },
  { pitch: B4, duration: 1.5 },
  { pitch: A4, duration: 3.5 },
  { pitch: REST, duration: 2.0 },
];

// Arpeggiated guitar/piano harmony chords
const CHORD_PROGRESSION = [
  [A3, Csharp4, E4, A4],       // A maj
  [Fsharp4 - 200, A3, Csharp4, Fsharp4], // F# min
  [D4 - 100, Fsharp4, A4, D5], // D maj
  [E3, B3, E4, Gsharp4],       // E maj
];

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private melodyTimeout: number | null = null;
  private arpeggioInterval: number | null = null;
  private stepIndex = 0;
  private chordIndex = 0;
  public songTitle = "Vela Milan Ni — Jigardan Gadhavi (Acoustic Arrangement)";

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic tone (sine + gentle harmonics)
  private playAcousticNote(freq: number, durationSeconds: number, velocity = 0.12) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm, rounded acoustic tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    // Dynamic envelope (attack, decay, sustain, release)
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(velocity, t + 0.06);
    gain.gain.exponentialRampToValueAtTime(velocity * 0.7, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSeconds);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + durationSeconds + 0.1);
  }

  // Soft strumming / arpeggio in the background
  private playBackgroundArpeggio() {
    if (!this.isPlaying || !this.ctx) return;
    const chord = CHORD_PROGRESSION[this.chordIndex % CHORD_PROGRESSION.length];
    this.chordIndex++;

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isPlaying) return;
        this.playAcousticNote(freq, 2.2, 0.035);
      }, idx * 160);
    });
  }

  // Recursive loop playing the melody
  private playNextMelodyNote = () => {
    if (!this.isPlaying || !this.ctx) return;

    const note = PEHLA_PYAAR_MELODY[this.stepIndex % PEHLA_PYAAR_MELODY.length];
    this.stepIndex++;

    const tempoFactor = 0.55; // slow romantic pace
    const noteDuration = Math.max(0.2, note.duration * tempoFactor);

    if (note.pitch > 0) {
      this.playAcousticNote(note.pitch, noteDuration * 1.2, 0.14);
      // Soft sub-octave layer for warmth
      this.playAcousticNote(note.pitch / 2, noteDuration * 0.9, 0.04);
    }

    this.melodyTimeout = window.setTimeout(
      this.playNextMelodyNote,
      noteDuration * 1000
    );
  };

  public play() {
    if (this.isPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.85, now + 1.2);
    this.masterGain.connect(this.ctx.destination);

    // Start melody
    this.playNextMelodyNote();

    // Start backing arpeggio every 1.8s
    this.playBackgroundArpeggio();
    this.arpeggioInterval = window.setInterval(() => {
      this.playBackgroundArpeggio();
    }, 1800);
  }

  public pause() {
    if (!this.isPlaying) return;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    if (this.arpeggioInterval) {
      clearInterval(this.arpeggioInterval);
      this.arpeggioInterval = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
    this.isPlaying = false;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public playTempleChime() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chimeFreqs = [587.33, 880.0, 1174.66, 1760.0];

    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }
}

export const weddingAudio = new WeddingAudioPlayer();
