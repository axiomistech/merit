'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface CursorTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 6: 5-7 deg per spec)
  hoverLift?: number; // Hover lift in px (default 6: 6px per spec)
  perspective?: number; // Perspective in px (default 1200)
  disabled?: boolean;
}

export function CursorTiltCard({
  children,
  className,
  maxTilt = 6,
  hoverLift = 6,
  perspective = 1200,
  disabled = false,
  ...props
}: CursorTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [specular, setSpecular] = useState({ x: 50, y: 50 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaMotion.matches);
      const motionListener = () => setReducedMotion(mediaMotion.matches);
      mediaMotion.addEventListener('change', motionListener);

      const mediaTouch = window.matchMedia('(pointer: coarse)');
      setIsTouch(mediaTouch.matches);
      const touchListener = () => setIsTouch(mediaTouch.matches);
      mediaTouch.addEventListener('change', touchListener);

      return () => {
        mediaMotion.removeEventListener('change', motionListener);
        mediaTouch.removeEventListener('change', touchListener);
      };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || reducedMotion || isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate 3D tilt angles: rotateX is inverted (moving mouse down tilts forward/down)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setCoords({ x: rotateX, y: rotateY });
      setSpecular({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
      });
    },
    [disabled, maxTilt, reducedMotion, isTouch]
  );

  const handleMouseEnter = () => {
    if (disabled || reducedMotion || isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const isInteractive = !disabled && !reducedMotion && !isTouch;

  // Dynamic 3D transform with 1200px perspective
  const transformStyle =
    isInteractive && isHovered
      ? `perspective(${perspective}px) rotateX(${coords.x.toFixed(2)}deg) rotateY(${coords.y.toFixed(2)}deg) translateY(-${hoverLift}px)`
      : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`;

  // Depth-sensitive dynamic shadows displaced subtly based on cursor position
  const shadowX = isHovered ? (-coords.y * 1.2).toFixed(1) : '0';
  const shadowY = isHovered ? (16 + coords.x * 1.0).toFixed(1) : '10';
  const dynamicShadow = isInteractive
    ? `${shadowX}px ${shadowY}px 28px -6px rgba(0, 0, 0, 0.28), 0 6px 14px -3px rgba(0, 0, 0, 0.16)`
    : '0 12px 24px -6px rgba(0, 0, 0, 0.20), 0 4px 10px -3px rgba(0, 0, 0, 0.12)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.18s ease-out'
          : 'transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.58s ease-out',
        boxShadow: dynamicShadow,
        willChange: 'transform',
      }}
      className={cn('relative rounded-[28px] sm:rounded-[32px] select-none', className)}
      {...props}
    >
      {/* Moving Diffused Fogged Light Reflection (Matte Sage Diffusion: 0.04 idle, 0.13 hover) */}
      {isInteractive && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-500 overflow-hidden"
          style={{
            opacity: isHovered ? 0.13 : 0.04,
            background: `radial-gradient(circle 460px at ${specular.x}% ${specular.y}%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.10) 40%, transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default CursorTiltCard;
