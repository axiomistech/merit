'use client';

import React from 'react';
import { Sun, Moon, ZoomIn, ZoomOut, ArrowUp, ArrowDown, PanelRightClose, PanelRightOpen, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CbtAccessibilityBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  isPaletteCollapsed: boolean;
  onTogglePalette: () => void;
  onScrollTop: () => void;
  onScrollBottom: () => void;
  selectedLanguage: string;
  onChangeLanguage: (lang: string) => void;
}

export function CbtAccessibilityBar({
  isDarkMode,
  onToggleDarkMode,
  fontSize,
  onChangeFontSize,
  isPaletteCollapsed,
  onTogglePalette,
  onScrollTop,
  onScrollBottom,
  selectedLanguage,
  onChangeLanguage,
}: CbtAccessibilityBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 border-b px-4 py-1.5 text-xs select-none transition-colors',
        isDarkMode
          ? 'border-gray-700 bg-gray-900 text-gray-200'
          : 'border-[#DCE2E6] bg-[#F8FAFB] text-[#20252B]'
      )}
    >
      {/* Left: Language & Accessibility Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium">
          <Globe className="h-3.5 w-3.5 text-[#66727D]" />
          <span className="hidden sm:inline text-[#66727D]">Paper Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => onChangeLanguage(e.target.value)}
            className={cn(
              'rounded border px-2 py-0.5 text-xs font-semibold focus:outline-none',
              isDarkMode
                ? 'border-gray-700 bg-gray-800 text-gray-100'
                : 'border-[#DCE2E6] bg-white text-[#20252B]'
            )}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
          </select>
        </div>
      </div>

      {/* Right: Accessibility Controls (Dark Mode, Font size, Quick Scroll, Palette Toggle) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Font Size Adjusters: A- / A / A+ */}
        <div className="flex items-center rounded-lg border border-[#DCE2E6] bg-white/70 p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => onChangeFontSize('normal')}
            className={cn(
              'px-2 py-0.5 text-xs font-bold rounded',
              fontSize === 'normal'
                ? 'bg-[#20252B] text-white'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
            title="Standard Font Size"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => onChangeFontSize('large')}
            className={cn(
              'px-2 py-0.5 text-sm font-bold rounded',
              fontSize === 'large'
                ? 'bg-[#20252B] text-white'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
            title="Large Font Size"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => onChangeFontSize('xlarge')}
            className={cn(
              'px-2 py-0.5 text-base font-bold rounded',
              fontSize === 'xlarge'
                ? 'bg-[#20252B] text-white'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
            title="Extra Large Font Size"
          >
            A++
          </button>
        </div>

        {/* Dark/Light mode toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors',
            isDarkMode
              ? 'border-gray-600 bg-gray-800 text-amber-400 hover:bg-gray-700'
              : 'border-[#DCE2E6] bg-white text-[#20252B] hover:bg-gray-100'
          )}
          title="Toggle Dark Mode (NTA Accessibility)"
        >
          {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span className="hidden md:inline">{isDarkMode ? 'Light Console' : 'Dark Console'}</span>
        </button>

        {/* Scroll To Top & Bottom Buttons */}
        <div className="hidden sm:flex items-center gap-1 border-l pl-2 border-[#DCE2E6]">
          <button
            type="button"
            onClick={onScrollTop}
            className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE2E6] bg-white text-[#66727D] hover:text-[#20252B]"
            title="Scroll to Top of Question"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onScrollBottom}
            className="flex h-7 w-7 items-center justify-center rounded border border-[#DCE2E6] bg-white text-[#66727D] hover:text-[#20252B]"
            title="Scroll to Bottom of Question"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Collapse Palette Toggle Button (NTA '>' and '<') */}
        <button
          type="button"
          onClick={onTogglePalette}
          className={cn(
            'flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors',
            isPaletteCollapsed
              ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
              : 'border-[#DCE2E6] bg-white text-[#20252B] hover:bg-gray-100'
          )}
          title={isPaletteCollapsed ? 'Expand Question Palette (<)' : 'Collapse Question Palette (>)'}
        >
          {isPaletteCollapsed ? (
            <>
              <PanelRightOpen className="h-3.5 w-3.5" />
              <span>Show Palette (&lt;)</span>
            </>
          ) : (
            <>
              <PanelRightClose className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Maximize View (&gt;)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
