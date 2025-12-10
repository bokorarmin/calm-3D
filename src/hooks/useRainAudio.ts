import { useEffect, useRef } from "react";

interface UseRainAudioOptions {
  volume?: number;
  loop?: boolean;
}

export function useAudio(src: string, options?: UseRainAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);

    if (options) {
      if (options.volume !== undefined) {
        audioRef.current.volume = options.volume;
      }
      if (options.loop !== undefined) {
        audioRef.current.loop = options.loop;
      }
    }

    const playAudio = async () => {
      try {
        audioRef.current!.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, options?.volume, options?.loop, options]);

  return audioRef;
}
