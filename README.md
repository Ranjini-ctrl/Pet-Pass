# Pet-Pass
PetPass is a modern digital identity platform for pets developed using HTML, CSS, and JavaScript. The project helps pet owners securely register and manage pet information through responsive digital PetPass ID cards, creating a smart and accessible digital identity system for pets with a clean, pet-friendly UI/UX experience.

# PetPass 🐾
### A Digital Identity System for Pets — by PetOLife

> "Because Every Pet Deserves an Identity"

PetPass is a modern, premium web application that gives pets a verified digital identity card — carrying their health records, vaccinations, and personal details wherever they go.

---

## Pages & Flow

```
index.html   →   signup.html   →   login.html   →   home.html
(Loading)        (Register)        (Login)           (Landing)
```

| File | Purpose |
|------|---------|
| `index.html` | Animated 5-second loading screen, auto-redirects to signup |
| `signup.html` | Pet registration form with image upload and validation |
| `login.html` | Login page with credential check |
| `home.html` | Full landing page with all sections and profile panel |
| `css/loading.css` | Styles for the loading screen only |
| `css/main.css` | All styles — navbar, sections, cards, auth, dark mode |
| `js/theme.js` | Dark/light mode toggle, persisted via localStorage |
| `js/auth.js` | Signup/login logic, form validation, image preview |
| `js/main.js` | Navbar, scroll animations, profile panel, card download |

---

## Features

- **Loading Screen** — floating logo animation, progress bar, 5s auto-redirect
- **Signup** — pet photo upload with preview, full form validation, password toggle
- **Login** — validates against localStorage credentials
- **PetPass Card** — dynamic ID card populated from signup data, downloadable
- **Profile Panel** — floating slide-in panel (top-right) with mini card, download & logout
- **Dark / Light Mode** — toggle on every page, preference saved across sessions
- **Scroll Animations** — fade-in sections as you scroll
- **Fully Responsive** — mobile hamburger menu, fluid layouts on all screen sizes

---

## Landing Page Sections

1. **Hero** — headline, CTA buttons, live PetPass card preview
2. **About PetPass** — mission and key values
3. **Features** — 6 animated feature cards
4. **How It Works** — 3-step animated timeline
5. **Digital Pet Identity** — why pets need digital IDs
6. **Vaccination Records** — stylish tracker UI preview
7. **Why Choose PetPass** — icon cards with hover effects
8. **Our Mission** — emotional brand statement
9. **Footer** — links, social icons, copyright

---

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables, Glassmorphism)
- Vanilla JavaScript
- localStorage (no backend required)

---

## Getting Started

No build tools or installs needed. Just open in a browser:

```
index.html
```

Or serve locally with any static server:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## Project Structure

```
petpass/
├── index.html          # Loading screen
├── signup.html         # Registration page
├── login.html          # Login page
├── home.html           # Landing page
├── logo.jpeg           # PetPass logo
├── css/
│   ├── loading.css     # Loading screen styles
│   └── main.css        # Global styles
└── js/
    ├── theme.js        # Dark/light mode
    ├── auth.js         # Signup & login logic
    └── main.js         # Landing page interactions
```

---

## Made by

**Ranjini** — Built for PetOLife  
Portfolio & Internship Showcase Project
