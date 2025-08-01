import './style.css';

// Using jQuery's ready function
$(function () {
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
});
