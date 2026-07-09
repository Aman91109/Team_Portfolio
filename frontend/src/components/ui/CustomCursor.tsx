'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [click, setClick] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth delayed tracking (outer ring)
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event listeners to handle custom hover states
    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll('a, button, [role="button"], .tilt-hover-trigger, input, textarea');
      hoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', () => setHovered(true));
        target.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Set up click animations
    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial triggers
    addHoverListeners();

    // Use a MutationObserver to listen for dynamically added links/buttons
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* 1. Core Pointer Dot (Instant Follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#06B6D4] rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 2. Outer Ring Glow (Lagged Spring Follow) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          borderColor: hovered ? '#8B5CF6' : '#3B82F6',
          backgroundColor: hovered ? 'rgba(139, 92, 246, 0.05)' : 'rgba(59, 130, 246, 0.0)',
          boxShadow: hovered 
            ? '0 0 12px rgba(139, 92, 246, 0.4)' 
            : '0 0 4px rgba(59, 130, 246, 0.1)',
          scale: click ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      />
    </>
  );
}
