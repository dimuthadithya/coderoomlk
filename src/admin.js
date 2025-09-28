// Sidebar Navigation
const navItems = document.querySelectorAll('.nav-item');
const formSections = document.querySelectorAll('.form-section');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const targetSection = item.dataset.section;

    // Update active navigation
    navItems.forEach((nav) => nav.classList.remove('active'));
    item.classList.add('active');

    // Show corresponding section
    formSections.forEach((section) => {
      if (section.id === targetSection) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});

// Form validation and enhancement
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Add success feedback
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="mr-2 fas fa-check"></i>Saved!';
    button.classList.remove('btn-primary');
    button.classList.add('btn-success');

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('btn-success');
      button.classList.add('btn-primary');
    }, 2000);
  });
});

// Input focus enhancements
const inputs = document.querySelectorAll('.modern-input, .modern-select');
inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    input.style.transform = 'scale(1.02)';
  });

  input.addEventListener('blur', () => {
    input.style.transform = 'scale(1)';
  });
});

// Auto-save functionality (placeholder)
let autoSaveTimeout;
inputs.forEach((input) => {
  input.addEventListener('input', () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      // Auto-save logic would go here
      console.log('Auto-saving...');
    }, 3000);
  });
});
