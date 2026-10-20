/**
 * Project Template & Schema Reference
 * 
 * Use this file as a copy-paste reference when adding a new project to `js/data.js`.
 * Simply copy one of the templates below and paste it into the `projects` array in `js/data.js`.
 */

// ============================================================================
// TEMPLATE 1: FEATURED FLAGSHIP PROJECT (Large Direction C Card + Full Deep Dive)
// Use for major simulation systems, gameplay mechanics, or primary production projects.
// ============================================================================

export const featuredProjectTemplate = {
  // Unique alphanumeric slug (used in URL hash #my-project and image folder names)
  id: "my-project-id",

  // Display title and concise technical subtitle
  title: "Project Name — Game Experience / Simulation",
  subtitle: "One-sentence technical summary of the core systems and mechanics built.",

  // Tier must be "featured" or "strong" for the large cards
  tier: "featured",

  // Layout rhythm: "media-left" (image on left) or "media-right" (image on right)
  layout: "media-left",

  // Verified candidate role
  role: "Main Developer",

  // Status badge shown on card (e.g., "Professional Training Simulator", "Internal Prototype", etc.)
  statusBadge: "Professional Training Simulator (Client / Engine)",
  statusDetail: "Contextual background on the production timeline or delivery scope.",

  // 1-2 sentence executive summary of the developer's ownership
  summary: "Engineered gameplay mechanics, state machines, and hardware integration from the ground up.",

  // Personal contributions (What YOU built). Use [BRACKETED TAGS] for high-scan visual chips.
  personalContribution: [
    "[CORE MECHANICS] Programmed player movement physics, collision handling, and interaction loops.",
    "[SYSTEM STATE] Built game flow, scenario state machine, and dynamic event triggers.",
    "[HARDWARE / AUDIO] Integrated DirectInput steering controls and native spatial audio cues.",
    "[OPTIMIZATION] Profiled and refactored tick loops to maintain stable 90 FPS in VR."
  ],

  // Team scope (Transparently distinguishes your work from art/electronics team)
  teamScope: [
    "3D environment models and textures crafted by 3D art team; physical motion base wired by electronics team."
  ],

  // Verified technical competencies demonstrated in this project
  projectTech: [
    { name: "Unreal Engine", verified: true },
    { name: "VR Interaction Systems", verified: true },
    { name: "Gameplay Programming", verified: true },
    { name: "C++ / Blueprints", verified: true }
  ],

  // Media captures and illustrative architectural schematic
  media: {
    primary: {
      src: "assets/projects/my-project-id/hero-capture-16x9.png",
      alt: "Descriptive alt text for accessibility and recruiters",
      aspectRatio: "16/9",
      source: "Evidence Bank v1.0",
      caption: "In-game system capture showing active HUD and mechanics",
      expectedFile: "hero-capture-16x9.png"
    },
    // Optional secondary captures shown inside deep-dive modal
    secondary: [
      {
        src: "assets/projects/my-project-id/secondary-capture-16x9.png",
        alt: "Secondary system capture",
        aspectRatio: "16/9",
        caption: "Hardware interfacing setup or tool calibration"
      }
    ],
    // Optional architectural flowchart displayed in modal
    schematic: {
      title: "Input Signal to Kinematic Constraint Pipeline",
      label: "ILLUSTRATIVE SYSTEM VIEW",
      description: "Real-time DirectInput translation into physics torque constraints and voxel displacement.",
      flow: [
        { step: "01", node: "Hardware Input", detail: "DirectInput voltage signal" },
        { step: "02", node: "Kinematic Resolver", detail: "Torque & angle constraints" },
        { step: "03", node: "Collision Intersect", detail: "Mesh overlap verification" },
        { step: "04", node: "Dynamic State Update", detail: "Synchronized simulation frame" }
      ]
    }
  },

  // Recruiter proof & video walkthrough
  evidence: {
    assetType: "Gameplay Video Demonstration",
    whatItShows: "Demonstrates character physics, responsiveness of controls, and state transitions.",
    actionLabel: "Watch Gameplay Demo (YouTube)",
    actionUrl: "https://youtu.be/your-video-id", // Paste full YouTube or youtu.be link here
    status: "Verified in Evidence Bank"
  },

  // Technical interview deep-dive (Challenge, Solution, Collaboration)
  deepDive: {
    challenge: "What technical bottleneck or system complexity needed to be solved?",
    solution: "How did you engineer the solution (algorithms, architecture, optimization)?",
    collaboration: "How did you collaborate with artists, QA, or hardware specialists?"
  }
};


// ============================================================================
// TEMPLATE 2: SUPPORTING / SUBSYSTEM PROJECT (Bento Grid Card)
// Use for subsystem refactors, level design, rapid game jam prototypes, or academic work.
// ============================================================================

export const supportingProjectTemplate = {
  // Unique alphanumeric slug
  id: "my-subsystem-id",

  // Display title and subtitle
  title: "Subsystem Refactor / Prototype Name",
  subtitle: "Subsystem engineering, native audio refactoring, or level design.",

  // Tier must be "supporting" for the bento grid
  tier: "supporting",

  // Role
  role: "Subsystem Programmer",

  // Badge (e.g. "Professional Driving Simulator", "Academic Project", "48h Hackathon")
  statusBadge: "Professional Simulator (WayGroup)",

  // Summary
  summary: "Refactored legacy systems, improved stability, and resolved core interaction bugs.",

  // Personal contribution (Can be an array of bracketed chips or single string)
  personalContribution: [
    "[ARCHITECTURE REFACTOR] Replaced legacy plugin with native engine architecture.",
    "[STABILITY & QA] Eliminated frame hitching and memory leaks during multi-hour sessions."
  ],

  // Team scope
  teamScope: "Base gameplay loop and 3D environment authored by core development team.",

  // Technologies (Can be array of strings or objects)
  projectTech: ["Unreal Engine", "Audio Architecture", "Performance Optimization"],

  // Primary media thumbnail
  media: {
    primary: {
      src: "assets/projects/my-subsystem-id/thumb-16x9.png",
      alt: "Subsystem overview capture",
      aspectRatio: "16/9",
      source: "Evidence Bank v1.0",
      expectedFile: "thumb-16x9.png"
    }
  },

  // Evidence video / documentation
  evidence: {
    assetType: "Subsystem Walkthrough Video",
    whatItShows: "Demonstrates audio frequency modulation and responsive input triggers.",
    actionLabel: "Watch Subsystem Demo (YouTube)",
    actionUrl: "https://youtu.be/your-video-id"
  }
};
