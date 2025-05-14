export class AudioManager {
    constructor(scene) {
        this.scene = scene;
        
        this.currentMusic = null;
        this.sfxSounds = {};

        this.config = this.loadAudioSettings();
        
        console.log("AudioManager initialized with config:", this.config);
    }

    loadAudioSettings() {
        const DEFAULT_SETTINGS = {
            sfxVolume: 0.7,
            musicVolume: 0.5,
            sfxMuted: false,
            musicMuted: false
        };
        
        try {
            const savedSettings = localStorage.getItem('game_audio_settings');
            if (savedSettings) {
                return JSON.parse(savedSettings);
            }
        } catch (e) {
            console.error('Error al cargar configuraciones de audio:', e);
        }
        
        return { ...DEFAULT_SETTINGS };
    }

    saveAudioSettings() {
        try {
            localStorage.setItem('game_audio_settings', JSON.stringify(this.config));
        } catch (e) {
            console.error('Error al guardar configuraciones de audio:', e);
        }
    }

    playSfx(key, config = {}) {
        console.log(`Playing SFX: ${key}`, this.config.sfxMuted ? "(muted)" : "");
        
        if (this.config.sfxMuted) return null;
        
        const sfxConfig = {
            volume: this.config.sfxVolume,
            ...config
        };
        
        try {
            const sound = this.scene.sound.add(key, sfxConfig);
            sound.play();
            this.sfxSounds[key] = sound;
            return sound;
        } catch (e) {
            console.error(`Error playing SFX ${key}:`, e);
            return null;
        }
    }


    playMusic(key, config = {}) {
        console.log(`Playing Music: ${key}`, this.config.musicMuted ? "(muted)" : "");
        
        this.stopMusic();
        
        const musicConfig = {
            volume: this.config.musicMuted ? 0 : this.config.musicVolume,
            loop: true,
            ...config
        };
        
        try {
            this.currentMusic = this.scene.sound.add(key, musicConfig);
            this.currentMusic.play();
            return this.currentMusic;
        } catch (e) {
            console.error(`Error playing music ${key}:`, e);
            return null;
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            console.log("Stopping current music");
            this.currentMusic.stop();
            this.currentMusic = null;
        }
    }

    pauseMusic() {
        if (this.currentMusic) {
            console.log("Pausing current music");
            this.currentMusic.pause();
        }
    }

    resumeMusic() {
        if (this.currentMusic) {
            console.log("Resuming current music");
            this.currentMusic.resume();
        }
    }

    setMusicVolume(volume) {
        console.log(`Setting music volume to ${volume}`);
        this.config.musicVolume = volume;
        
        if (this.currentMusic && !this.config.musicMuted) {
            this.currentMusic.setVolume(volume);
        }
        
        this.saveAudioSettings();
    }

    setSfxVolume(volume) {
        console.log(`Setting SFX volume to ${volume}`);
        this.config.sfxVolume = volume;
        
        Object.values(this.sfxSounds).forEach(sound => {
            if (sound && sound.isPlaying) {
                sound.setVolume(volume);
            }
        });
        
        this.saveAudioSettings();
    }

    toggleMusicMute() {
        this.config.musicMuted = !this.config.musicMuted;
        console.log(`Music mute toggled to: ${this.config.musicMuted}`);
        
        if (this.currentMusic) {
            this.currentMusic.setVolume(this.config.musicMuted ? 0 : this.config.musicVolume);
        }
        
        this.saveAudioSettings();
        
        return this.config.musicMuted;
    }

    toggleSfxMute() {
        this.config.sfxMuted = !this.config.sfxMuted;
        console.log(`SFX mute toggled to: ${this.config.sfxMuted}`);
        
        this.saveAudioSettings();
        
        return this.config.sfxMuted;
    }
}