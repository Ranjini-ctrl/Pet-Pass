/* ===== Theme Toggle ===== */
(function () {
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('petpass-theme') || 'light';
  html.setAttribute('data-theme', saved);
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('petpass-theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
})();
