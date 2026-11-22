import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type LogoVariant = 'gold' | 'white';

export interface MeritwiseLogoProps {
  variant?: LogoVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  height?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  dotClassName?: string;
  className?: string;
  priority?: boolean;
  alt?: string;
}

const SIZE_MAP = {
  xs: { height: 18, width: 30, text: 'text-xs font-extrabold tracking-[0.12em]', gap: 'gap-1.5', dot: 'h-1 w-1' },
  sm: { height: 22, width: 36, text: 'text-sm sm:text-base font-extrabold tracking-[0.14em]', gap: 'gap-2', dot: 'h-1.5 w-1.5' },
  md: { height: 26, width: 43, text: 'text-lg sm:text-xl font-extrabold tracking-[0.14em]', gap: 'gap-2.5', dot: 'h-1.5 w-1.5' },
  lg: { height: 34, width: 56, text: 'text-xl sm:text-2xl font-extrabold tracking-[0.14em]', gap: 'gap-3', dot: 'h-2 w-2' },
  xl: { height: 46, width: 76, text: 'text-2xl sm:text-3xl font-extrabold tracking-[0.14em]', gap: 'gap-3.5', dot: 'h-2.5 w-2.5' },
  '2xl': { height: 58, width: 96, text: 'text-3xl sm:text-4xl font-extrabold tracking-[0.14em]', gap: 'gap-4', dot: 'h-3 w-3' },
  '3xl': { height: 72, width: 119, text: 'text-4xl sm:text-5xl font-extrabold tracking-[0.14em]', gap: 'gap-5', dot: 'h-3.5 w-3.5' },
};

export function MeritwiseLogo({
  variant = 'gold',
  size = 'md',
  height: customHeight,
  showWordmark = true,
  wordmarkClassName,
  dotClassName,
  className,
  priority = false,
  alt = 'MERITWISE Logo',
}: MeritwiseLogoProps) {
  const config = SIZE_MAP[size] || SIZE_MAP.md;
  const logoHeight = customHeight || config.height;
  const logoWidth = customHeight ? Math.round(customHeight * 1.647) : config.width;
  const logoSrc = variant === 'white' ? '/brand/logo-white.png' : '/brand/logo-gold.png';

  return (
    <div className={cn('inline-flex items-center select-none', config.gap, className)}>
      <Image
        src={logoSrc}
        alt={alt}
        width={logoWidth}
        height={logoHeight}
        priority={priority}
        className="h-auto shrink-0 object-contain"
        style={{
          height: `${logoHeight}px`,
          width: 'auto',
        }}
      />

      {showWordmark && (
        <div className="inline-flex items-center gap-2 leading-none">
          <span
            className={cn(
              'font-sans uppercase transition-colors',
              config.text,
              variant === 'white' ? 'text-white' : 'text-[#121316]',
              wordmarkClassName
            )}
          >
            MERITWISE
          </span>
          <span
            className={cn(
              'rounded-full shrink-0',
              config.dot,
              variant === 'white' ? 'bg-white/80' : 'bg-[#8C6D3B]',
              dotClassName
            )}
          />
        </div>
      )}
    </div>
  );
}

export default MeritwiseLogo;
