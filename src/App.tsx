/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

import { Scene } from "./components/Scene";

export default function App() {
  const [environment, setEnvironment] = useState<"city" | "forest" | null>(
    null,
  );
  const controlsRef = useRef<any>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();

    audioRef.current = new Audio("/rain_sound.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 1;
    audioRef.current.preload = "auto";

    let source: MediaElementAudioSourceNode;

    const tryAutoplay = async () => {
      try {
        await audioContext.resume();

        source = audioContext.createMediaElementSource(audioRef.current!);
        source.connect(audioContext.destination);

        await audioRef.current!.play();
        console.log("Audio started successfully");
      } catch {
        console.log("Autoplay prevented, will play on interaction");
      }
    };

    tryAutoplay();

    const handleInteraction = async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioContext.resume();
          await audioRef.current.play();
        } catch {
          console.log("Audio play failed");
        }
      }
    };

    const events = [
      "click",
      "touchstart",
      "keydown",
      "mousedown",
      "pointerdown",
      "wheel",
      "scroll",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { passive: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(console.log);
      }
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
      document.removeEventListener("visibilitychange", handleInteraction);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (source) {
        source.disconnect();
      }

      if (audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, []);

  const handleEnvironmentChange = (env: "city" | "forest" | null) => {
    setEnvironment(env);
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .catch(() => console.log("Audio play failed on button click"));
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0f0f0f",
        position: "relative",
      }}
      onClick={() => {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(console.log);
        }
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 75 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#151515"]} />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={5}
          maxDistance={50}
          target={[0, 0, 0]}
          onChange={() => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().catch(console.log);
            }
          }}
        />

        <Scene environment={environment} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => handleEnvironmentChange(null)}
          style={{
            padding: "12px 24px",
            background: environment === null ? "#374151" : "rgba(0, 0, 0, 0.5)",
            color: "#d1d5db",
            border: "1px solid #4b5563",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "13px",
            transition: "all 0.3s ease",
            backdropFilter: "blur(5px)",
          }}
        >
          ALONE
        </button>

        <button
          onClick={() => handleEnvironmentChange("city")}
          style={{
            padding: "12px 24px",
            background:
              environment === "city" ? "#374151" : "rgba(0, 0, 0, 0.5)",
            color: "#d1d5db",
            border: "1px solid #4b5563",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "13px",
            transition: "all 0.3s ease",
            backdropFilter: "blur(5px)",
          }}
        >
          CITY
        </button>

        <button
          onClick={() => handleEnvironmentChange("forest")}
          style={{
            padding: "12px 24px",
            background:
              environment === "forest" ? "#374151" : "rgba(0, 0, 0, 0.5)",
            color: "#d1d5db",
            border: "1px solid #4b5563",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "13px",
            transition: "all 0.3s ease",
            backdropFilter: "blur(5px)",
          }}
        >
          FOREST
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "2%",
          display: "flex",
          zIndex: 10,
        }}
      >
        <caption
          style={{ color: "white", fontFamily: "monospace", fontSize: "15px" }}
        >
          Turn the sound up
        </caption>
      </div>
    </div>
  );
}
