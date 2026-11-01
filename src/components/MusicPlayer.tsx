import React, { useState, useEffect, useRef } from 'react';
import { WeddingMusicManager } from '../utils/musicManager';

interface MusicPlayerProps {
  autoStart?: boolean;
}

// YouTube video ID for "Tune Kaha" - Prateek Kuhad (Official)
const YOUTUBE_VIDEO_ID = 'GqagMyq2hGQ';
// Skip starting 7 seconds (jumps straight into the guitar melody & vocals)
const START_SECONDS = 10;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytPlayerRef = useRef<any>(null);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initYT = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initYT, 200);
        return;
      }
      try {
        ytPlayerRef.current = new window.YT.Player('yt-wedding-audio-player', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            loop: 1,
            start: START_SECONDS,
            playlist: YOUTUBE_VIDEO_ID,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(85);
              event.target.seekTo(START_SECONDS, true);
              if (autoStart) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.warn('YT Player init:', err);
      }
    };

    window.onYouTubeIframeAPIReady = initYT;
    if (window.YT && window.YT.Player) {
      initYT();
    }

    WeddingMusicManager.playSong = handlePlay;
    WeddingMusicManager.pauseSong = handlePause;

    return () => {
      handlePause();
    };
  }, []);

  useEffect(() => {
    WeddingMusicManager.playSong = handlePlay;
    WeddingMusicManager.pauseSong = handlePause;
    WeddingMusicManager.isPlaying = isPlaying;
  }, [isPlaying]);

  const handlePlay = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        const currentTime = ytPlayerRef.current.getCurrentTime ? ytPlayerRef.current.getCurrentTime() : 0;
        if (currentTime < START_SECONDS) {
          ytPlayerRef.current.seekTo(START_SECONDS, true);
        }
      } catch {
        // ignore
      }
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      ytPlayerRef.current.pauseVideo();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <>
      {/* Hidden YouTube audio player */}
      <div
        style={{
          position: 'fixed',
          bottom: '-100px',
          right: '-100px',
          width: '1px',
          height: '1px',
          opacity: 0.01,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div id="yt-wedding-audio-player" />
      </div>

      {/* Floating Music Widget */}
      <div className="floating-music-widget">
        {/* Track Title Badge */}
        <div
          className="music-pill-bubble"
          onClick={togglePlay}
          title={isPlaying ? 'Click to Pause' : 'Click to Play'}
        >
          <span className="disc-icon">{isPlaying ? '🎶' : '🎵'}</span>
          <div className="pill-text-col">
            <span className="pill-song-title">Tune Kaha</span>
            <span className="pill-artist-sub">Prateek Kuhad</span>
          </div>
        </div>

        {/* Main Play/Pause Button */}
        <button
          className={`music-control-button ${isPlaying ? 'playing' : 'paused'}`}
          onClick={togglePlay}
          title={isPlaying ? 'Pause "Tune Kaha"' : 'Play "Tune Kaha" (Prateek Kuhad)'}
          aria-label="Toggle Wedding Music"
        >
          {isPlaying ? (
            <div className="audio-wave-bars">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
              <span className="wave-bar bar-4" />
            </div>
          ) : (
            <div className="audio-play-icon">
              <span>▶</span>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
