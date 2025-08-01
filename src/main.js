import './style.css';

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get all the elements we need
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById(
    'theme-toggle-light-icon'
  );
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Function to enable dark mode
  function enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
  }

  // Function to disable dark mode
  function disableDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIcon.classList.add('hidden');
  }

  // Check the initial theme preference
  const userPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const storedTheme = localStorage.getItem('color-theme');

  // Set the initial theme
  if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Add click event listener to toggle button
  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Initialize FlipDown counter
  // Set countdown for 4 days, 11 hours, and 5 minutes from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 4);
  targetDate.setHours(targetDate.getHours() + 11);
  targetDate.setMinutes(targetDate.getMinutes() + 5);

  new FlipDown(targetDate.getTime() / 1000, {
    theme: 'dark',
    headings: ['Days', 'Hours', 'Minutes', 'Seconds']
  }).start();
});
