'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Level 2: Raised 3D Frosted Glass Frame Styling (Dark Glass-on-Glass second depth tier)
const glassFrameStyle: React.CSSProperties = {
  background:
    'linear-gradient(145deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 142, 156, 0.16) 28%, rgba(35, 40, 46, 0.35) 65%, rgba(18, 21, 25, 0.50) 100%)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: '1.5px solid rgba(255, 255, 255, 0.42)',
  boxShadow: [
    '0 24px 48px -10px rgba(0, 0, 0, 0.65)',
    '0 8px 18px -4px rgba(0, 0, 0, 0.40)',
    'inset 0 2px 2.5px 0 rgba(255, 255, 255, 0.85)',
    'inset 2px 0 2px 0 rgba(255, 255, 255, 0.55)',
    'inset 0 -2.5px 4.5px 0 rgba(0, 0, 0, 0.55)',
    'inset -2px 0 3px 0 rgba(0, 0, 0, 0.35)',
  ].join(', '),
  isolation: 'isolate',
};

// Level 3: Inner Recessed Video Screen Base (Sitting inside the glass frame without black borders)
const innerScreenStyle: React.CSSProperties = {
  backgroundColor: '#0D0E11',
  boxShadow:
    'inset 0 2px 8px rgba(0, 0, 0, 0.70), inset 0 0 0 1px rgba(255, 255, 255, 0.10), 0 1px 1px rgba(255, 255, 255, 0.25)',
};

export interface MeritwiseVideoPlayerRef {
  pause: () => void;
  play: () => void;
  getCurrentTime: () => number;
  isPlaying: () => boolean;
}

export interface MeritwiseVideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  enabled?: boolean;
  className?: string;
  onEnded?: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const MeritwiseVideoPlayer = forwardRef<
  MeritwiseVideoPlayerRef,
  MeritwiseVideoPlayerProps
>(({ src, poster, title, enabled = true, className = '', onEnded }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Clear error state whenever src changes
  useEffect(() => {
    setHasError(false);
    setFallbackAttempted(false);
  }, [src]);

  // Imperative handle exposed to parent components
  useImperativeHandle(ref, () => ({
    pause: () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    },
    play: () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    },
    getCurrentTime: () => videoRef.current?.currentTime || 0,
    isPlaying: () => !videoRef.current?.paused,
  }));

  // Auto-hide controls during active playback after inactivity
  const showControlsTemporarily = useCallback(() => {
    setControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, []);

  // Update buffered amount
  const handleProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const buffered = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedEnd(buffered);
    }
  };

  // Video playback toggling
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (hasEnded) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [hasEnded]);

  // Volume & Mute handling
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Seek & Scrubber handling
  const seekToPosition = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || !videoRef.current || !duration) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = clickPosition / rect.width;
      const targetTime = percentage * duration;

      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
      if (hasEnded) setHasEnded(false);
    },
    [duration, hasEnded]
  );

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsScrubbing(true);
    seekToPosition(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.stopPropagation();
      seekToPosition(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.touches[0]) {
      setIsScrubbing(true);
      seekToPosition(e.touches[0].clientX);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches[0]) {
          seekToPosition(moveEvent.touches[0].clientX);
        }
      };

      const handleTouchEnd = () => {
        setIsScrubbing(false);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };

      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
  };

  // Fullscreen handling
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation when player is focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime = Math.min(currentTime + 5, duration);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime = Math.max(currentTime - 5, 0);
    } else if (e.key === 'm') {
      e.preventDefault();
      toggleMute(e as any);
    } else if (e.key === 'f') {
      e.preventDefault();
      toggleFullscreen(e as any);
    }
  };

  // Empty or Disabled State
  if (!enabled || !src) {
    return (
      <div
        className={cn(
          'meritwise-video-frame relative w-full p-[6px] sm:p-[7px] rounded-[26px] sm:rounded-[28px] select-none',
          className
        )}
        style={glassFrameStyle}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div
          className="meritwise-video-screen relative w-full aspect-video rounded-[20px] sm:rounded-[22px] overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none"
          style={innerScreenStyle}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/70 mb-3 border border-white/15">
            <Play className="h-6 w-6 ml-0.5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-white mb-1">
            {title || 'Meritwise Platform Walkthrough'}
          </p>
          <p className="text-[11px] text-[#A1A1AA] max-w-sm">
            The video demonstration is currently being prepared. Check back shortly.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (hasError) {
    return (
      <div
        className={cn(
          'meritwise-video-frame relative w-full p-[6px] sm:p-[7px] rounded-[26px] sm:rounded-[28px] select-none',
          className
        )}
        style={glassFrameStyle}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div
          className="meritwise-video-screen relative w-full aspect-video rounded-[20px] sm:rounded-[22px] overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white space-y-3 select-none"
          style={innerScreenStyle}
        >
          <AlertCircle className="h-8 w-8 text-[#8C6D3B]" />
          <div className="space-y-1">
            <p className="text-sm font-bold">Video Playback Unavailable</p>
            <p className="text-xs text-[#A1A1AA] max-w-sm">
              Could not stream the requested video file. Please check server storage or upload a new MP4 video.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setHasError(false);
              setFallbackAttempted(false);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="rounded-full bg-white text-[#121316] px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Retry Playback
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Native Meritwise video player"
      onKeyDown={handleKeyDown}
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => {
        if (isPlaying) setControlsVisible(false);
      }}
      onClick={(e) => {
        // Prevent clicking inside player area from bubbling to parent 3D card
        e.stopPropagation();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      style={!isFullscreen ? glassFrameStyle : undefined}
      className={cn(
        'meritwise-video-frame relative w-full select-none transition-all duration-300 focus:outline-none',
        isFullscreen
          ? 'h-full p-0 rounded-none bg-black border-none shadow-none'
          : 'p-[6px] sm:p-[7px] rounded-[26px] sm:rounded-[28px]',
        className
      )}
    >
      {/* Level 3: Inner Recessed Screen Container */}
      <div
        className={cn(
          'meritwise-video-screen relative w-full overflow-hidden select-none group cursor-pointer',
          isFullscreen
            ? 'h-full rounded-none'
            : 'aspect-video rounded-[20px] sm:rounded-[22px]'
        )}
        style={!isFullscreen ? innerScreenStyle : undefined}
      >
        {/* HTML5 Native Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onDurationChange={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onProgress={handleProgress}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasEnded(true);
            setControlsVisible(true);
            if (onEnded) onEnded();
          }}
          onError={() => {
            if (!fallbackAttempted && src?.startsWith('/api/videos/')) {
              setFallbackAttempted(true);
              const staticUrl = src.replace('/api/videos/', '/uploads/videos/');
              if (videoRef.current) {
                videoRef.current.src = staticUrl;
                videoRef.current.load();
                return;
              }
            }
            setHasError(true);
          }}
          className="w-full h-full object-cover block"
          style={{ border: 'none', outline: 'none' }}
        />

        {/* Buffering Loading Spinner */}
        {isBuffering && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
        )}

        {/* Centered Large Play / Replay Icon when paused or ended */}
        {!isPlaying && !isBuffering && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={hasEnded ? 'Replay video' : 'Play video'}
            className="absolute inset-0 m-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white/30 z-20 active:scale-95"
          >
            {hasEnded ? (
              <RotateCcw className="h-8 w-8 sm:h-9 sm:w-9" />
            ) : (
              <Play className="h-8 w-8 sm:h-9 sm:w-9 ml-1 fill-white" />
            )}
          </button>
        )}

        {/* Subtle Bottom Vignette Gradient */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 z-10 ${
            controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Custom Bottom Control Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 z-30 flex flex-col gap-2 transition-opacity duration-300 ${
            controlsVisible || !isPlaying || isScrubbing ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Seekable Progress Bar */}
          <div
            ref={progressBarRef}
            role="slider"
            aria-label="Seek slider"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
            className="relative w-full h-1.5 sm:h-2 rounded-full bg-white/25 cursor-pointer transition-all hover:h-2.5 group/progress"
          >
            {/* Buffered Progress */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white/35 transition-all"
              style={{ width: `${Math.min(bufferedPercent, 100)}%` }}
            />

            {/* Played Progress */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white shadow-xs"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />

            {/* Scrubber Knob */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md transition-transform scale-0 group-hover/progress:scale-100"
              style={{ left: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>

          {/* Lower Controls Row */}
          <div className="flex items-center justify-between gap-3 text-white">
            {/* Left Controls: Play/Pause, Volume, Time */}
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-1 rounded-lg text-white hover:text-white/80 transition-colors focus:outline-none"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
                ) : (
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
                )}
              </button>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1 rounded-lg text-white hover:text-[#C7D3BD] transition-colors focus:outline-none"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume slider"
                  className="w-12 sm:w-16 h-1 accent-[#9CAF88] bg-white/30 rounded-lg cursor-pointer opacity-70 group-hover/vol:opacity-100 transition-opacity"
                />
              </div>

              {/* Time Stamp: Current / Total */}
              <div className="text-[11px] sm:text-xs font-mono font-medium text-white/90 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-white/40">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                className="p-1 rounded-lg text-white hover:text-[#C7D3BD] transition-colors focus:outline-none"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MeritwiseVideoPlayer.displayName = 'MeritwiseVideoPlayer';

export default MeritwiseVideoPlayer;
