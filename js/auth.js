/* ===== Auth: Signup & Login ===== */

// ---- Ripple Effect ----
function addRipple(btn) {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

// ---- Signup ----
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  // Image preview
  const petImageInput = document.getElementById('petImage');
  const imgPreview = document.getElementById('imgPreview');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');

  petImageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgPreview.src = e.target.result;
        imgPreview.style.display = 'block';
        uploadPlaceholder.style.display = 'none';
        // Save to localStorage for card display
        localStorage.setItem('petpass-petImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Password toggle
  const togglePwd = document.getElementById('togglePwd');
  const pwdInput = document.getElementById('password');
  togglePwd.addEventListener('click', () => {
    const isText = pwdInput.type === 'text';
    pwdInput.type = isText ? 'password' : 'text';
    togglePwd.textContent = isText ? '👁️' : '🙈';
  });

  // Validation helpers
  function showError(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('show', show);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Submit
  const submitBtn = document.getElementById('submitBtn');
  addRipple(submitBtn);

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const ownerName = document.getElementById('ownerName').value.trim();
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petType').value;
    const petAge = document.getElementById('petAge').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let valid = true;

    showError('err-owner', !ownerName);
    if (!ownerName) valid = false;

    showError('err-pet', !petName);
    if (!petName) valid = false;

    showError('err-type', !petType);
    if (!petType) valid = false;

    showError('err-age', !petAge);
    if (!petAge) valid = false;

    showError('err-email', !validateEmail(email));
    if (!validateEmail(email)) valid = false;

    showError('err-pwd', password.length < 6);
    if (password.length < 6) valid = false;

    if (!valid) return;

    // Save to localStorage
    const userData = { ownerName, petName, petType, petAge, email, password };
    localStorage.setItem('petpass-user', JSON.stringify(userData));

    // Animate button
    submitBtn.textContent = '✅ Account Created!';
    submitBtn.style.background = 'linear-gradient(135deg, #43a047, #1b5e20)';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });
}

// ---- Login ----
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  // Password toggle
  const toggleLoginPwd = document.getElementById('toggleLoginPwd');
  const loginPwdInput = document.getElementById('loginPassword');
  toggleLoginPwd.addEventListener('click', () => {
    const isText = loginPwdInput.type === 'text';
    loginPwdInput.type = isText ? 'password' : 'text';
    toggleLoginPwd.textContent = isText ? '👁️' : '🙈';
  });

  function showError(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('show', show);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const loginBtn = document.getElementById('loginBtn');
  addRipple(loginBtn);

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const ownerInput = document.getElementById('loginOwner').value.trim();
    const emailInput = document.getElementById('loginEmail').value.trim();
    const pwdInput = document.getElementById('loginPassword').value;

    let valid = true;

    showError('err-login-owner', !ownerInput);
    if (!ownerInput) valid = false;

    showError('err-login-email', !validateEmail(emailInput));
    if (!validateEmail(emailInput)) valid = false;

    showError('err-login-pwd', !pwdInput);
    if (!pwdInput) valid = false;

    if (!valid) return;

    // Check credentials
    const saved = JSON.parse(localStorage.getItem('petpass-user') || '{}');
    const loginError = document.getElementById('loginError');

    if (
      saved.email === emailInput &&
      saved.password === pwdInput &&
      saved.ownerName.toLowerCase() === ownerInput.toLowerCase()
    ) {
      loginBtn.textContent = '✅ Welcome Back!';
      loginBtn.style.background = 'linear-gradient(135deg, #43a047, #1b5e20)';
      loginError.style.display = 'none';
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      loginError.style.display = 'block';
      loginBtn.textContent = 'Login to PetPass 🐾';
    }
  });
}
