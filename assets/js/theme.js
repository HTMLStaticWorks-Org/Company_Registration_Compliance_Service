/* ==========================================================================
   VERDANT BUSINESS SERVICES - THEME & RTL CONTROLLER
   Manages Light/Dark Theme, RTL/LTR Direction, and LocalStorage Persistence
   ========================================================================== */

(function () {
  'use strict';

  // Constants
  const THEME_KEY = 'verdant_theme';
  const DIR_KEY = 'verdant_dir';

  // Get initial preferences
  const storedTheme = localStorage.getItem(THEME_KEY);
  const storedDir = localStorage.getItem(DIR_KEY);

  // Apply Theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcons(theme);
  }

  // Apply Direction
  function applyDir(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    localStorage.setItem(DIR_KEY, dir);
    updateDirButtons(dir);
  }

  // Update theme icons on buttons
  function updateThemeIcons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      btn.innerHTML = theme === 'dark' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Update RTL buttons with bidirectional Right to Left and Left to Right icon
  function updateDirButtons(dir) {
    const buttons = document.querySelectorAll('.rtl-toggle-btn');
    buttons.forEach((btn) => {
      const isRtl = dir === 'rtl';
      btn.setAttribute('aria-label', isRtl ? 'Switch to Left to Right (LTR)' : 'Switch to Right to Left (RTL)');
      btn.setAttribute('title', isRtl ? 'Switch to Left to Right (LTR)' : 'Switch to Right to Left (RTL)');
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 7h16M16 3l4 4-4 4"/>
          <path d="M20 17H4M8 21l-4-4 4-4"/>
        </svg>
      `;
      if (isRtl) {
        btn.classList.add('active-rtl');
      } else {
        btn.classList.remove('active-rtl');
      }
    });
  }

  // Initialize immediately on script load
  const initialTheme = storedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const initialDir = storedDir || 'ltr';

  applyTheme(initialTheme);
  applyDir(initialDir);

  // Attach event listeners after DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    updateThemeIcons(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    updateDirButtons(document.documentElement.getAttribute('dir') || 'ltr');

    // Theme Toggle Handler
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });

    // RTL Toggle Handler
    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDir(nextDir);
      });
    });
  });

  // Expose to window for dynamic use
  window.VerdantTheme = {
    applyTheme,
    applyDir,
    getTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
    getDir: () => document.documentElement.getAttribute('dir') || 'ltr'
  };
})();

