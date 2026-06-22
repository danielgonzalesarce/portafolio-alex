
import React, { useEffect, useRef } from 'react';

const SoundManager: React.FC = () => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const transitionSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize sounds
    hoverSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    transitionSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2592/2592-preview.mp3');

    // Set volumes
    if (hoverSound.current) hoverSound.current.volume = 0.2;
    if (clickSound.current) clickSound.current.volume = 0.4;
    if (transitionSound.current) transitionSound.current.volume = 0.3;

    const playHover = () => {
      if (hoverSound.current) {
        hoverSound.current.currentTime = 0;
        hoverSound.current.play().catch(() => {});
      }
    };

    const playClick = () => {
      if (clickSound.current) {
        clickSound.current.currentTime = 0;
        clickSound.current.play().catch(() => {});
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default SoundManager;
