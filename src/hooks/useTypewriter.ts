import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let intervalTimer: ReturnType<typeof setInterval> | null = null;

    const timeoutTimer = setTimeout(() => {
      intervalTimer = setInterval(() => {
        currentIndex++;
        setDisplayed(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          setDone(true);
          if (intervalTimer) clearInterval(intervalTimer);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
