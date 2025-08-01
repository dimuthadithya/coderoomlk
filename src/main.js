document.addEventListener('DOMContentLoaded', function () {
  // Initialize Typed.js
  new Typed('#typed-text', {
    strings: [
      'Master Modern JavaScript',
      'Learn Git & Version Control',
      'Deep Dive into SCSS',
      'Deploy Your Projects',
      'Domain & Hosting Setup',
      'JS ES6 Features',
      'Projects with GitHub'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    smartBackspace: true
  });

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

  // Initialize FlipDown timer
  let flipdown;
  try {
    // Set target date to August 15, 2025 at 11:59:59 PM
    const targetDate = new Date(2025, 7, 15, 23, 59, 59); // Month is 0-indexed, so 7 = August

    // Convert to Unix timestamp
    const timestamp = Math.floor(targetDate.getTime() / 1000);

    // Initialize FlipDown
    flipdown = new FlipDown(timestamp, {
      theme: document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light',
      headings: ['DAYS', 'HOURS', 'MINUTES', 'SECONDS']
    });

    // Start the countdown
    flipdown.start().ifEnded(() => {
      console.log('The countdown has ended!');
    });
  } catch (error) {
    console.error('Error initializing FlipDown:', error);
  }

  // Update date and time
  function updateDateTime() {
    const now = new Date();

    // Format time
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', timeOptions);

    // Format date
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateString = now.toLocaleDateString('en-US', dateOptions);

    // Update elements
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');

    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
  }

  // Update immediately and then every second
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
