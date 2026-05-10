/* ===== Main JS – Landing Page ===== */

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Scroll Fade-In Animations ----
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ---- Profile Panel ----
const profileTrigger = document.getElementById('profileTrigger');
const profilePanel = document.getElementById('profilePanel');

if (profileTrigger && profilePanel) {
  profileTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    profilePanel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!profilePanel.contains(e.target) && e.target !== profileTrigger) {
      profilePanel.classList.remove('open');
    }
  });
}

// ---- Load User Data into Cards ----
function loadUserData() {
  const user = JSON.parse(localStorage.getItem('petpass-user') || '{}');
  const petImg = localStorage.getItem('petpass-petImage');

  if (!user.petName) return;

  const petTypeEmoji = {
    Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇',
    Fish: '🐠', Hamster: '🐹', Other: '🐾'
  };
  const emoji = petTypeEmoji[user.petType] || '🐾';

  // Profile panel
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  if (profileName) profileName.textContent = user.ownerName || 'Pet Owner';
  if (profileEmail) profileEmail.textContent = user.email || '';

  // Profile avatar
  const profileAvatar = document.getElementById('profileAvatar');
  if (profileAvatar && petImg) {
    profileAvatar.innerHTML = `<img src="${petImg}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="pet" />`;
  }

  // Update all cards
  const cardFields = [
    { petName: 'miniCardPetName', petType: 'miniCardPetType', owner: 'miniCardOwner', ownerName: 'miniCardOwnerName', img: 'miniCardImg' },
    { petName: 'heroCardPetName', petType: 'heroCardPetType', owner: 'heroCardOwnerLabel', ownerName: 'heroCardOwnerName', img: 'heroCardImg' }
  ];

  cardFields.forEach(f => {
    const pn = document.getElementById(f.petName);
    const pt = document.getElementById(f.petType);
    const ow = document.getElementById(f.owner);
    const own = document.getElementById(f.ownerName);
    const imgEl = document.getElementById(f.img);

    if (pn) pn.textContent = user.petName;
    if (pt) pt.textContent = `${user.petType} · ${user.petAge}`;
    if (ow) ow.textContent = `Owner: ${user.ownerName}`;
    if (own) own.textContent = user.ownerName;

    if (imgEl && petImg) {
      imgEl.innerHTML = `<img src="${petImg}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" alt="pet" />`;
    } else if (imgEl) {
      imgEl.textContent = emoji;
    }
  });

  // Profile trigger emoji
  const trigger = document.getElementById('profileTrigger');
  if (trigger && petImg) {
    trigger.innerHTML = `<img src="${petImg}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="pet" />`;
  }
}

loadUserData();

// ---- Download PetPass Card ----
const downloadBtn = document.getElementById('downloadCardBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('petpass-user') || '{}');
    if (!user.petName) {
      alert('Please sign up first to download your PetPass card!');
      return;
    }

    // Create a printable card
    const printWin = window.open('', '_blank', 'width=400,height=300');
    const petImg = localStorage.getItem('petpass-petImage') || '';
    const petTypeEmoji = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇', Fish: '🐠', Hamster: '🐹', Other: '🐾' };
    const emoji = petTypeEmoji[user.petType] || '🐾';

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PetPass Card – ${user.petName}</title>
        <style>
          body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f0fdf4; font-family: 'Segoe UI', sans-serif; }
          .card { width: 340px; height: 190px; background: linear-gradient(135deg, #2e7d32, #4caf50, #81c784); border-radius: 18px; padding: 20px 22px; color: white; position: relative; overflow: hidden; box-shadow: 0 16px 48px rgba(46,125,50,0.4); }
          .card::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.08); border-radius:50%; }
          .top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; font-size:0.7rem; font-weight:700; letter-spacing:2px; opacity:0.85; }
          .logo { width:28px; height:28px; border-radius:6px; }
          .info { display:flex; gap:14px; align-items:center; }
          .pet-img { width:52px; height:52px; border-radius:12px; border:2px solid rgba(255,255,255,0.4); display:flex; align-items:center; justify-content:center; font-size:1.5rem; overflow:hidden; flex-shrink:0; }
          .pet-img img { width:100%; height:100%; object-fit:cover; }
          .details h2 { font-size:1.1rem; font-weight:800; margin:0 0 2px; }
          .details p { font-size:0.72rem; opacity:0.8; margin:1px 0; }
          .bottom { display:flex; justify-content:space-between; align-items:flex-end; margin-top:12px; }
          .owner { font-size:0.7rem; opacity:0.75; }
          .owner span { display:block; font-size:0.82rem; font-weight:600; opacity:1; }
          .qr { width:40px; height:40px; background:white; border-radius:6px; display:grid; grid-template-columns:repeat(5,1fr); gap:1px; padding:4px; }
          .qr div { background:#333; border-radius:1px; }
          .qr .w { background:white; }
          @media print { body { background: white; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="top">
            <span>PetPass · PetOLife</span>
          </div>
          <div class="info">
            <div class="pet-img">${petImg ? `<img src="${petImg}" alt="pet" />` : emoji}</div>
            <div class="details">
              <h2>${user.petName}</h2>
              <p>${user.petType} · ${user.petAge}</p>
              <p>Owner: ${user.ownerName}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="owner"><span>${user.ownerName}</span>PetPass ID</div>
            <div class="qr">
              <div></div><div class="w"></div><div></div><div class="w"></div><div></div>
              <div class="w"></div><div></div><div class="w"></div><div></div><div class="w"></div>
              <div></div><div class="w"></div><div></div><div class="w"></div><div></div>
              <div class="w"></div><div></div><div class="w"></div><div></div><div class="w"></div>
              <div></div><div class="w"></div><div></div><div class="w"></div><div></div>
            </div>
          </div>
        </div>
        <script>window.onload = () => { window.print(); }<\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  });
}

// ---- Logout ----
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('petpass-user');
    localStorage.removeItem('petpass-petImage');
    window.location.href = 'login.html';
  });
}

// ---- Ripple on CTA buttons ----
document.querySelectorAll('.btn-primary, .btn-outline, .btn-submit').forEach(btn => {
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
});

// ---- Smooth active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--green-main)' : '';
  });
}, { passive: true });
