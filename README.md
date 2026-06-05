# 🎮 Yash Somwanshi — Portfolio

An immersive, cyberpunk-inspired gaming dossier and developer portfolio website. Designed as a high-tech Game HUD interface, it highlights professional statistics, level progressions, project portfolios, and game developer achievements.

🌐 **Live Website:** [https://github.com/YashSomwanshi/Portfolio-Website](https://github.com/YashSomwanshi/Portfolio-Website)

---

## 🚀 Key Features

* **Terminal-Style Loading Screen**: An animated initialization console detailing stages like system loading, asset compilation, and skill unlocking.
* **Game HUD Navigation**: A floating cyberpunk command unit that tracks scroll progression and acts as a central hub for sections.
* **Character Dossier**: A profile card showing core developer details, contact nodes (GitHub, LinkedIn, Email, Phone), and matched-height layout structures.
* **Interactive Skill Tree**: Game-style tree map where skills are categorized into nodes (e.g., Unity, C#, React.js, C++) with active hover feedback and level metrics.
* **Live Statistics Dashboard**: An animated vertical bar graph mapping skill proficiencies to level-based numerical ratings (`LV.XX`) with custom tooltips.
* **Featured Project Spotlight**: Showcase of the **VR Treasure Collector Simulator**, featuring an autoplaying gameplay video loop with a custom CRT scanline screen overlay.
* **Boss Battles Dossier**: A customized card grid highlighting major engineering projects and battle-tested software achievements.
* **Konami Code Easter Egg**: Typing the classic sequence `↑↑↓↓←→←→BA` anywhere on the page unlocks a hidden modal detailing developer lore and backstories.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS & Custom CSS Variables (Cyberpunk neon-gold, neon-blue, and deep-space backgrounds)
* **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid transitions, typing effects, and hover cards
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YashSomwanshi/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View local application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── public/                 # Static media assets (profile image, video loop, SVGs)
├── src/
│   ├── app/                # Next.js App Router (pages, global styles, metadata)
│   ├── components/         # Game-themed React components
│   │   ├── about/          # Character Dossier & stats
│   │   ├── achievements/   # Achievement medals
│   │   ├── arsenal/        # Core Tech stack modules
│   │   ├── battles/        # Boss Battles project dossier
│   │   ├── contact/        # Terminal contact card
│   │   ├── easter-eggs/    # Konami Code secrets
│   │   ├── effects/        # Custom mouse glows
│   │   ├── hero/           # Hero title, starfields & typing overlays
│   │   ├── loading/        # CLI boot/loading screen
│   │   ├── navigation/     # Floating Game HUD
│   │   ├── projects/       # Featured VR gameplay spotlights
│   │   ├── skills/         # Dynamic skill nodes
│   │   └── stats/          # Animated level-based vertical stats
│   └── hooks/              # Custom React hooks (Konami listener, typing effect, mouse tracker)
```

---

## 🏆 Backstory & Secrets

Try typing the legendary **Konami Code** on your keyboard while visiting the portfolio:
$$\mathbf{\uparrow \ \uparrow \ \downarrow \ \downarrow \ \leftarrow \ \rightarrow \ \leftarrow \ \rightarrow \ B \ A}$$
*(Up, Up, Down, Down, Left, Right, Left, Right, B, A)*
