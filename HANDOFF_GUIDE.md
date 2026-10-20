# Owner Handover & Maintainer Guide
**Portfolio & Simulation Showcase — Juan Camilo Calvache Giraldo**

Welcome! This guide explains everything you need to know to manage, update, extend, and deploy this portfolio platform.

---

## 1. Quick Architecture Overview

This portfolio is built with pure, modern web standards (**HTML5, CSS3, and JavaScript**) with **zero build tool dependencies** required for editing.

```
portfolio-prototype/
├── index.html                # Main application entry point
├── css/
│   └── style.css             # High-tech design system, dark mode theme & animations
├── js/
│   ├── data.js               # ⭐ SINGLE SOURCE OF TRUTH: All profile, skill & project data
│   ├── app.js                # Core rendering engine, modals, filtering & video handling
│   └── project.template.js   # Ready-to-copy boilerplate schemas for new projects
├── assets/
│   ├── resume/
│   │   └── Juan_Camilo_Calvache_Resume.docx  # Master downloadable CV
│   └── projects/
│       ├── skydiving/        # Project-specific screenshots & captures
│       ├── fiscalia-vr/
│       ├── heavy-machinery/
│       ├── osh-rural/
│       └── ...
├── package.json              # Local developer scripts
├── README.md                 # Project summary
└── HANDOFF_GUIDE.md          # This complete guide
```

---

## 2. How to Preview Locally (3 Quick Ways)

### Option A: Direct Offline Double-Click (Zero Setup)
Simply double-click `index.html` in your file explorer (Finder or Windows Explorer).
- Works 100% offline.
- When run locally via `file://`, clicking YouTube demonstration links will open YouTube directly in a new tab to avoid local browser security restrictions.

### Option B: Local Web Server via Terminal
If you have Node.js installed:
```bash
# 1. Navigate to the folder
cd path/to/portfolio-prototype

# 2. Run the local dev server
npm start
# or: npx serve .
```
Open your browser at `http://localhost:3000`.

### Option C: VS Code "Live Server"
If using Visual Studio Code, right-click `index.html` and select **"Open with Live Server"**.

---

## 3. How to Add a New Project (Step-by-Step)

Adding a new project takes less than 3 minutes:

### Step 1: Create a Folder for Project Images
Inside `assets/projects/`, create a new folder with your project's unique ID (e.g. `assets/projects/my-new-game/`).
Place your 16:9 screenshot there (e.g. `hero-capture-16x9.png`).

### Step 2: Open `js/data.js`
Scroll to the `projects` array and paste your project object. You can copy the boilerplate from `js/project.template.js`.

#### Example: Adding a Featured Project
```javascript
{
  id: "space-station-vr",
  title: "Space Station Zero-G VR",
  subtitle: "Physics-driven zero-gravity interaction system and tool mechanics in Unreal Engine 5.",
  tier: "featured",              // "featured" for large card, "supporting" for bento grid
  layout: "media-left",          // "media-left" or "media-right"
  role: "Lead Gameplay Programmer",
  statusBadge: "Internal Prototype",
  summary: "Programmed zero-g character inertia, physics grab mechanics, and airlock decompression sequences.",
  
  personalContribution: [
    "[ZERO-G PHYSICS] Programmed 6-DOF movement inertia and rotational thruster mechanics.",
    "[VR TOOL INTERACTION] Built modular grab and socket system for space station repair tools.",
    "[SCENARIO LOGIC] Implemented decompression alarm state machine and airlock sequence."
  ],
  teamScope: [
    "3D station modular meshes crafted by 3D art team."
  ],
  
  projectTech: [
    { name: "Unreal Engine 5", verified: true },
    { name: "C++ / Blueprints", verified: true },
    { name: "VR Interaction", verified: true },
    { name: "Physics Constraints", verified: true }
  ],
  
  media: {
    primary: {
      src: "assets/projects/space-station-vr/hero-capture-16x9.png",
      alt: "Space Station Zero-G VR Gameplay",
      aspectRatio: "16/9",
      source: "Production Evidence Bank",
      caption: "Zero-g floating mechanics and tool interaction in airlock chamber"
    }
  },

  evidence: {
    assetType: "Gameplay Video Demonstration",
    whatItShows: "Demonstrates 6-DOF zero-g movement and physics tool grabbing.",
    actionLabel: "Watch Zero-G Gameplay (YouTube)",
    actionUrl: "https://youtu.be/your-youtube-id"
  },

  deepDive: {
    challenge: "Simulating convincing zero-gravity momentum while mitigating VR motion sickness.",
    solution: "Implemented angular damping thresholds and fixed reference horizon cues in the helmet HUD.",
    collaboration: "Programmed all physics systems; 3D station interior supplied by art team."
  }
}
```

### Step 3 (Optional): Add to Role Filter Orders
At the bottom of `js/data.js`, add your project ID to the relevant filter tabs in `roleFilterOrders`:
```javascript
const roleFilterOrders = {
  all: ["space-station-vr", "skydiving", "heavy-machinery", ...],
  gameplay: ["space-station-vr", "skydiving", ...],
  unreal: ["space-station-vr", "fiscalia-vr", ...],
  simulation: [...]
};
```
*(Note: If you omit the ID from `roleFilterOrders`, the system will still automatically and gracefully show it at the end of the project lists).*

### Step 4: Refresh your browser!
Save `js/data.js` and refresh your browser. Your new project will appear immediately with full modal breakdown, video player, and filtering support.

---

## 4. How to Update Personal Info, Bio & Skills

All candidate information is stored at the top of `js/data.js`:

1. **Contact Details & LinkedIn**:
   Edit `candidateProfile.email`, `candidateProfile.linkedin`, etc.
2. **Hero Headline & Summary**:
   Edit `candidateProfile.title`, `candidateProfile.headline`, and `candidateProfile.summary`.
3. **Capabilities Matrix**:
   Edit the categories and items in `capabilitiesMatrix` (add new languages, tools, or production proficiencies).

---

## 5. Contact Channels & Resume Policy

- **Privacy-First Sharing**: By default, public CV downloads and personal phone numbers are withheld to preserve privacy until requested directly by recruiters.
- **Primary Channels**: Verified **Email** (`juan.calvache2@gmail.com`) and **LinkedIn Profile**.
- **Resume Distribution**: The master CV file remains available in `assets/resume/Juan_Camilo_Calvache_Resume.docx` for direct submission or attachment when requested.

---

## 6. How to Deploy to the Web (100% Free)

Because this project is a static web application with no server runtime requirements, you can host it for free on any platform:

### Option A: GitHub Pages (Recommended)
1. Push this repository to GitHub.
2. Go to **Repository Settings** > **Pages**.
3. Under **Branch**, select `main` (root) and click **Save**.
4. Your site is live in ~60 seconds at `https://<username>.github.io/<repo-name>/`.

### Option B: Vercel (1-Click)
1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. Click **Deploy** (no build settings required).

### Option C: Netlify
1. Drag and drop the `portfolio-prototype` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Live instantly.

---

## 7. Media Guidelines

- **Primary Screenshots**: Recommended resolution is `1920x1080` (16:9 ratio) saved as `.png` or `.webp` for maximum crispness.
- **Puzzle / Level Maps**: 4:3 or 16:9 format.
- **YouTube Demonstration Videos**: Use standard YouTube URLs (`https://youtu.be/ID` or `https://www.youtube.com/watch?v=ID`). The rendering engine automatically extracts the 11-character video ID and sets up responsive HD playback.

---

## 8. Summary Checklist for Handover

- [x] **Data Decoupling**: All content centralized in `js/data.js`.
- [x] **Defensive Runtime**: Safe handling of arrays, strings, and missing fields.
- [x] **Zero-Build Editing**: Edit `data.js` and refresh browser immediately.
- [x] **Deep-Dive Modals**: Auto-generated technical breakdown drawers with video demos.
- [x] **Responsive & Accessible**: Dark mode studio palette, mobile bottom navigation, keyboard navigation (`Escape` closes modals).
