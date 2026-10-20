/**
 * Authoritative Data Model for Juan Camilo Calvache Giraldo Portfolio V1.2
 * 
 * Strict Source Hierarchy:
 * - Evidence Bank: Source of truth for professional claims.
 * - Original Portfolio: Source of visual/project evidence.
 * - New Portfolio: Curated presentation layer combining verified claims with evidence.
 *
 * HOW TO EDIT THIS FILE:
 * - To add a new project, add an object to the `projects` array below.
 * - To update contact details or resume info, edit `candidateProfile`.
 * - To update skills, edit `capabilitiesMatrix`.
 * - See `js/project.template.js` for ready-to-copy project boilerplate schemas.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PORTFOLIO_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

const candidateProfile = {
  name: "Juan Camilo Calvache Giraldo",
  title: "Game Programmer | Unreal Engine & Unity | VR & Interactive Experiences",
  headline: "Game & Simulation Programmer",
  summary: "I develop interactive game and VR experiences using Unreal Engine and Unity, working across gameplay mechanics, interaction systems, experience design, and software integration with physical simulation hardware.",
  location: "Medellín, Colombia",
  availability: "Open to Local & Remote Opportunities",
  email: "juan.calvache2@gmail.com",
  linkedin: "https://www.linkedin.com/in/juan-camilo-calvache/",
  portfolioUrl: "https://bit.ly/4zCb4bO",
  github: null,
  
  verifications: [
    {
      label: "Education",
      value: "Digital Entertainment Design Engineering",
      institution: "Universidad Pontificia Bolivariana (UPB)",
      year: "2022",
      badgeText: "Engineering Degree"
    },
    {
      label: "Current Role",
      value: "Developer",
      company: "WayGroup / WayGroupSST",
      period: "July 2021 – Present",
      badgeText: "Professional Experience"
    },
    {
      label: "Version Control",
      value: "Git / GitHub Workflow",
      detail: "Daily use for simulation & game codebases",
      badgeText: "Daily Practice"
    },
    {
      label: "Professional Training",
      value: "Unreal Engine 5 C++ (Udemy 2025)",
      detail: "Ultimate Game Developer Course",
      badgeText: "Professional Training"
    }
  ]
};

const capabilitiesMatrix = [
  {
    category: "Core Engines & Programming",
    description: "Core platforms and programming languages utilized across game development and interactive simulation.",
    items: [
      { name: "Unreal Engine", level: "Production", detail: "VR simulators, subsystem refactoring, native audio, physics & hardware integration." },
      { name: "Unreal Blueprints", level: "Production", detail: "Primary implementation method for Unreal Engine simulation logic." },
      { name: "Unity", level: "Academic & Professional", detail: "Interactive applications, C# gameplay scripting, scene management." },
      { name: "C#", level: "Academic & Professional", detail: "Scripting gameplay mechanics, interaction flows, and simulation events." },
      { name: "JavaScript", level: "Supporting", detail: "Self-taught to build functional internal inventory database application." },
      { name: "Unreal Engine 5 C++", level: "Professional Training", detail: "Completed structured UE5 C++ training focused on gameplay framework concepts, C++ classes and Blueprint integration." }
    ]
  },
  {
    category: "Gameplay & Simulation",
    description: "Specialized technical capabilities across mechanics programming, VR systems, and interactive experiences.",
    items: [
      { name: "Gameplay Programming", level: "Core Focus", detail: "Character flight feel, digging/loading kinematics, evidence inspection, interactive triggers." },
      { name: "VR Interaction Systems", level: "Core Focus", detail: "Headset interaction, spatial user interfaces, two-user networked VR scene inspection." },
      { name: "Simulation Systems", level: "Core Focus", detail: "Industrial training flows, vehicle driving simulation, procedural scenario systems." },
      { name: "Physics & Movement", level: "Core Focus", detail: "Kinematics, vehicle physics, acceleration curves, air-resistance dynamics." },
      { name: "Interactive Experience Design", level: "Core Focus", detail: "Structuring procedural training flows, puzzle progression, and user guidance." }
    ]
  },
  {
    category: "Tools & Integration",
    description: "Version control, hardware interfacing, and production tooling.",
    items: [
      { name: "Git / Version Control", level: "Daily Practice", detail: "Version control for team codebases, branch management, collaboration." },
      { name: "Hardware Input Integration", level: "Core Focus", detail: "Real-time input mapping for physical joysticks, pedals and simulation controls." },
      { name: "Input Mapping", level: "Core Focus", detail: "DirectInput signal mapping and physical peripheral calibration." },
      { name: "Debugging & Testing", level: "Core Focus", detail: "Multi-session QA testing, interaction flow stabilization, bug resolution." },
      { name: "Interactive Production Pipelines", level: "Core Focus", detail: "Cross-functional workflows with 3D art, electronics, and instructional design." }
    ]
  },
  {
    category: "Specialized Systems",
    description: "Multiplayer replication, networked VR, and physical hardware control integration.",
    items: [
      { name: "Networked VR", level: "Production", detail: "2-User synchronized inspection state, evidence marker replication & RPCs (Fiscalía VR)." },
      { name: "Multiplayer Synchronization", level: "Production", detail: "Local network synchronization replicating shared state between connected users." },
      { name: "Physical Control Integration", level: "Production", detail: "Connecting software with steering wheels, pedals, excavator joysticks, and physical sensor tools." },
      { name: "Sensor / Input Integration", level: "Production", detail: "Real-world physical tool motion sensing and posture validation in VR." }
    ]
  }
];

const projects = [
  // --- 1. SKYDIVING (Featured 01: Media Left / Content Right) ---
  {
    id: "skydiving",
    title: "Skydiving Game Prototype",
    subtitle: "Internal prototype focused on player movement, aerial control and dynamic gameplay systems.",
    tier: "featured",
    layout: "media-left",
    role: "Main Developer",
    statusBadge: "Internal Prototype · Development Paused",
    statusDetail: "Internal game development prototype focused on player movement, aerial control and dynamic gameplay systems.",
    summary: "An internal skydiving game prototype focused on player movement, aerial control and dynamic gameplay systems.",
    
    personalContribution: [
      "[CORE MECHANICS] Designed and implemented core gameplay systems, including player movement, acceleration and air-resistance behaviour, camera interaction and gameplay state logic.",
      "[GAME STATE LOOP] Built the complete interactive game state flow and transition logic from scratch.",
      "[LEVEL PACING] Designed the 3D level layout, trajectory pacing, and spatial gameplay flow.",
      "[DYNAMIC AUDIO] Implemented sound effects and audio triggers responsive to descent speed."
    ],
    teamScope: [
      "Visual assets and 3D environment models created or sourced in collaboration with the WayGroup art team."
    ],
    
    projectTech: [
      { name: "Gameplay Programming", verified: true },
      { name: "Level Design", verified: true },
      { name: "Movement Systems", verified: true },
      { name: "Physics & Air Resistance", verified: true },
      { name: "Unreal Engine", verified: true }
    ],
    media: {
      primary: {
        src: "assets/projects/skydiving/hero-freefall-16x9.jpg",
        alt: "Skydiving freefall flight mechanics and altitude HUD capture",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 4)",
        caption: "Character freefall descent & trajectory pacing ring",
        expectedFile: "hero-freefall-16x9.jpg"
      },
      secondary: [],
      schematic: {
        title: "Velocity-Driven Audio & Altitude Threshold Architecture",
        label: "ILLUSTRATIVE SYSTEM VIEW",
        description: "Descent velocity parameters drive pitch-modulated wind audio and progressive trigger checkpoints.",
        flow: [
          { step: "01", node: "Velocity Vector", detail: "Real-time descent rate" },
          { step: "02", node: "Drag Resolver", detail: "Air-resistance physics" },
          { step: "03", node: "Audio Modulator", detail: "Pitch/Volume Sound Cue" },
          { step: "04", node: "Trajectory Gate", detail: "Checkpoint validation" }
        ]
      }
    },

    evidence: {
      assetType: "3 Progressive Video Recordings",
      whatItShows: "Gameplay programming, movement systems, physics-driven behaviour and Unreal Engine development across 3 progressive milestones.",
      actionLabel: "Watch Gameplay Demo",
      actionUrl: "https://youtu.be/Vk5Vx1HyMUs",
      status: "Internal Prototype",
      videos: [
        { label: "v3 Latest Build (Current)", url: "https://youtu.be/Vk5Vx1HyMUs", desc: "Polished environment, flight mechanics & descent pacing" },
        { label: "v2 Mechanics Iteration", url: "https://www.youtube.com/watch?v=0_zq1CtJD8s", desc: "Speed curves & air resistance dynamics" },
        { label: "v1 Prototype Milestone", url: "https://youtu.be/DDZlHefD7DQ", desc: "Initial freefall system test" }
      ]
    },

    deepDive: {
      challenge: "Building a fluid, immersive skydiving simulation from scratch that delivers immediate kinetic feedback and altitude awareness.",
      solution: "Engineered responsive acceleration curves and air-resistance braking mechanics, paired with velocity-driven audio pitch adjustments and strategic level trajectory markers.",
      collaboration: "Juan independently programmed all mechanics, interaction, and level design; art team supplied visual 3D assets."
    }
  },

  // --- 2. FISCALÍA VR (Featured 02: Content Left / Media Right) ---
  {
    id: "fiscalia-vr",
    title: "Fiscalía VR — Interactive Investigation Simulator",
    subtitle: "Recreated a legacy Unity VR simulator in Unreal Engine with synchronized two-user inspection.",
    tier: "featured",
    layout: "media-right",
    role: "Programmer (Co-developer in 2-person programming team)",
    statusBadge: "Professional Training Simulator (WayGroup / Fiscalía)",
    statusDetail: "Built for training prosecutors in crime scene inspection and evidence preservation procedures.",
    summary: "Recreated a legacy Unity VR simulator in Unreal Engine, rebuilding its core interaction systems and implementing a synchronized two-user inspection workflow.",
    
    personalContribution: [
      "[SYSTEMS MIGRATION] Implemented the Unreal Engine interaction architecture and rebuilt core interaction systems.",
      "[VR INTERACTION] Programmed VR interaction systems, inspection tools, photographic documentation and physical evidence-marking mechanics.",
      "[NETWORKED VR] Implemented synchronized multiplayer behaviour and 2-user connected inspection workflow.",
      "[SPATIAL AUDIO] Implemented ambient soundscapes and contextual acoustic feedback."
    ],
    teamScope: [
      "3D environments, characters and visual assets were produced by the art team.",
      "Co-programmed with a fellow WayGroup developer."
    ],
    
    projectTech: [
      { name: "Unreal Engine", verified: true },
      { name: "VR Interaction Systems", verified: true },
      { name: "Networked VR & Sync", verified: true },
      { name: "Investigation Tools", verified: true },
      { name: "Spatial Audio", verified: true },
      { name: "Unity (Legacy Codebase Transition)", verified: true }
    ],
    
    media: {
      primary: {
        src: "assets/projects/fiscalia-vr/hero-inspection-16x9.jpg",
        alt: "Fiscalía VR two-user crime scene inspection capture",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 5)",
        caption: "Shared VR crime scene inspection & evidence tagging",
        expectedFile: "hero-inspection-16x9.jpg"
      },
      secondary: [
        {
          src: "assets/projects/fiscalia-vr/camera-evidence-tool-16x9.jpg",
          alt: "Physical 2-user VR tracking setup with mannequin inspection",
          aspectRatio: "16/9",
          source: "Original Portfolio (p. 5)",
          caption: "2-User physical mannequin VR tracking setup",
          expectedFile: "camera-evidence-tool-16x9.jpg"
        }
      ],
      schematic: {
        title: "2-User VR Event Replication & State Synchronization",
        label: "ILLUSTRATIVE SYSTEM VIEW",
        description: "Local network synchronization replicating evidence markers, camera flash events, and spatial presence between two investigators.",
        flow: [
          { step: "01", node: "VR Controller Tool", detail: "Forensic photo trigger" },
          { step: "02", node: "Local State Event", detail: "Proof asset generation" },
          { step: "03", node: "Server RPC Broadcast", detail: "Network replication payload" },
          { step: "04", node: "Client Sync", detail: "2-User shared scene state" }
        ]
      }
    },

    evidence: {
      assetType: "VR Scene Inspection Walkthrough",
      whatItShows: "VR interaction programming, Unreal Engine development, system architecture and synchronized multiplayer interaction.",
      actionLabel: "Watch Scene Inspection Walkthrough (YouTube)",
      actionUrl: "https://youtu.be/vk_N8ZcD7hk",
      status: "Production Simulator"
    },

    deepDive: {
      challenge: "Rebuilding a legacy Unity VR simulation in Unreal Engine to fix stability issues while introducing a synchronized 2-user investigative workflow.",
      solution: "Restructured event loops, rebuilt forensic inspection mechanics, and established local network replication for real-time evidence tagging between two connected investigators.",
      collaboration: "Software rebuilt collaboratively by 2 programmers; environments and forensic models created by 3D art team."
    }
  },

  // --- 3. HEAVY MACHINERY (Featured 03: Media Left / Content Right) ---
  {
    id: "heavy-machinery",
    title: "Heavy Machinery Simulator",
    subtitle: "Heavy equipment physics, digging/loading mechanics, and physical control hardware integration.",
    tier: "featured",
    layout: "media-left",
    role: "Primary Programmer",
    statusBadge: "Professional Industrial VR Simulator (WayGroup)",
    statusDetail: "Industrial safety and machinery operation training simulator with integrated physical hardware platform.",
    summary: "Developed the programming systems for a heavy-machinery training simulator integrating Unreal Engine gameplay and simulation logic with physical control hardware.",
    
    personalContribution: [
      "[KINEMATICS & CONTROLS] Implemented machine operation mechanics, terrain interaction, digging, soil loading, and vehicle driving mechanics.",
      "[HARDWARE INTEGRATION] Integrated software logic with physical controls, sensors, and simulation hardware (joysticks, pedals, platform).",
      "[SCENARIO ARCHITECTURE] Structured experience flow and operational scenario guidelines.",
      "[DYNAMIC VOXELS] Integrated base loader assets with Voxel World dynamic terrain interaction."
    ],
    teamScope: [
      "Electronics integration, 3D art and third-party assets were contributed by other team members or external technologies."
    ],
    
    projectTech: [
      { name: "Unreal Engine", verified: true },
      { name: "Simulation Systems", verified: true },
      { name: "Hardware Input Integration", verified: true },
      { name: "Voxel World Terrain", verified: true },
      { name: "Machine Kinematics & Physics", verified: true }
    ],
    
    media: {
      primary: {
        src: "assets/projects/heavy-machinery/cabin-controls-16x9.jpg",
        alt: "Heavy machinery 3D loader model and cabin equipment",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 7)",
        caption: "3D Loader Model & Physical Control Integration (Supporting Render)",
        expectedFile: "cabin-controls-16x9.jpg"
      },
      secondary: [],
      schematic: {
        title: "Kinematic Joint Constraints & Voxel Terrain Displacement",
        label: "ILLUSTRATIVE SYSTEM VIEW",
        description: "Translating physical joystick inputs into hydraulic joint torque and real-time volumetric voxel mesh carving.",
        flow: [
          { step: "01", node: "Hardware Input", detail: "Joystick inputs / DirectInput" },
          { step: "02", node: "Kinematic Resolver", detail: "Boom & bucket torque limits" },
          { step: "03", node: "Voxel Intersect", detail: "Bucket collision mesh" },
          { step: "04", node: "Dynamic Mesh Carve", detail: "Volumetric soil displacement" }
        ]
      }
    },

    evidence: {
      assetType: "Simulator Operation Video",
      whatItShows: "Simulation programming, gameplay systems, hardware integration and interactive training development.",
      actionLabel: "Watch Machinery Operation Footage (YouTube)",
      actionUrl: "https://youtu.be/gygNHTmOank",
      status: "Production Simulator"
    },

    deepDive: {
      challenge: "Simulating heavy construction equipment operation with realistic soil displacement and direct physical hardware control feedback.",
      solution: "Programmed kinematic bucket joint constraints and bridged physical joystick/pedal inputs with Voxel World volumetric deformation logic to enable real-time soil excavation.",
      collaboration: "Software, physics, and input mapping by Juan; physical cabin and electronics by hardware team; 3D models by art team."
    }
  },

  // --- 4. OSH IN RURAL CONTEXTS ---
  {
    id: "osh-rural",
    title: "Occupational Safety & Health VR Simulator",
    subtitle: "Interactive VR training experience simulating agricultural hazard assessment and PPE selection.",
    tier: "strong",
    layout: "media-right",
    role: "Programmer & Experience Designer",
    statusBadge: "Professional Safety Simulator (WayGroup / SENA Delivery)",
    statusDetail: "Delivered as part of a multi-simulator training rollout for SENA.",
    summary: "An interactive VR training experience designed to simulate occupational safety scenarios and support practical learning through immersive interaction.",
    
    personalContribution: [
      "[SCENARIO DESIGN] Developed interaction logic, gameplay systems and scenario behaviour supporting the training experience across 5 rural workplace scenarios.",
      "[PPE VALIDATION] Implemented rule-based PPE selection logic and hazard consequence triggers.",
      "[PEDAGOGICAL FLOW] Structured instructional experience flow supporting practical learning."
    ],
    teamScope: [
      "Visual models and rural environment artwork produced by 3D art team.",
      "Posture-sensing hardware interfaces provided by partner technical team."
    ],
    
    projectTech: [
      { name: "VR Training Simulation", verified: true },
      { name: "Experience Design", verified: true },
      { name: "Scenario Programming", verified: true },
      { name: "PPE Logic Architecture", verified: true },
      { name: "Interactive Systems", verified: true }
    ],
    
    media: {
      primary: {
        src: "assets/projects/osh-rural/hero-scenario-ppe-16x9.jpg",
        alt: "SENA agricultural safety scenario and interactive PPE selection menu",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 8)",
        caption: "5 Rural safety training scenarios & PPE compliance logic",
        expectedFile: "hero-scenario-ppe-16x9.jpg"
      },
      secondary: [],
      schematic: {
        title: "Modular Scenario Event Sequence & PPE Validation Matrix",
        label: "ILLUSTRATIVE SYSTEM VIEW",
        description: "Rule-based state machine validating equipment selection against 5 rural hazard types with branching pedagogical feedback.",
        flow: [
          { step: "01", node: "Hazard Trigger", detail: "5 Rural workplace scenarios" },
          { step: "02", node: "PPE Rule Logic", detail: "Equipment selection matrix" },
          { step: "03", node: "Consequence Loop", detail: "Sensor & posture validation" },
          { step: "04", node: "Branching Review", detail: "Instructional feedback" }
        ]
      }
    },

    evidence: {
      assetType: "VR Training Scenario Walkthrough",
      whatItShows: "VR development, interaction programming and simulation-based training experiences.",
      actionLabel: "Watch SENA VR Training Flow (YouTube)",
      actionUrl: "https://youtu.be/1xFh1Va2Osg",
      status: "Production Simulator (Delivered to SENA)"
    },

    deepDive: {
      challenge: "Creating an accessible, pedagogically sound VR safety training experience for diverse agricultural workers under a strict 4-month delivery window.",
      solution: "Developed modular scenario architecture with clear visual affordances and procedural PPE validation loops across 5 high-risk agricultural tasks.",
      collaboration: "Scenarios and programming by Juan; visual artwork and posture sensors by partner teams."
    }
  },

  // --- SUPPORTING PROJECTS ---
  {
    id: "road-safety",
    title: "Road Safety Driving Simulator (Seguridad Vial)",
    subtitle: "Native Unreal audio subsystem refactor and simulation event sequence architecture.",
    tier: "supporting",
    role: "Subsystem Programmer (Audio & Event Systems)",
    statusBadge: "Professional Driving Simulator (WayGroup)",
    summary: "Replaced an unstable third-party audio plugin with Unreal Engine's native audio architecture, rebuilding dynamic vehicle soundscapes and implementing accident event trigger sequences.",
    personalContribution: "[AUDIO SUBSYSTEM] Architected native Unreal audio system replacement; [EVENT LOGIC] Implemented accident trigger sequences and menu navigation.",
    teamScope: "Main simulation loop and vehicle physics developed by lead simulation programmer; 3D city by art team.",
    projectTech: ["Unreal Engine", "Unreal Native Audio System", "Event Logic", "QA & Sound Design"],
    media: {
      primary: {
        src: "assets/projects/road-safety/hero-city-driving-16x9.jpg",
        alt: "Road Safety simulator cockpit and virtual city driving capture",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 3)",
        expectedFile: "hero-city-driving-16x9.jpg"
      }
    },
    evidence: {
      assetType: "Driving Simulator Video Capture",
      whatItShows: "Demonstrates vehicle driving in virtual city, dynamic engine/collision audio, and accident event trigger sequences.",
      actionLabel: "Watch Simulator Driving Capture",
      actionUrl: "https://youtu.be/iXkMKuT2q7E"
    }
  },
  {
    id: "emtelco",
    title: "EMTELCO VR Training Simulator",
    subtitle: "Rework of interaction mechanics, experience flow redesign, and bug resolution.",
    tier: "supporting",
    role: "Developer (Mechanics & Flow Rework)",
    statusBadge: "Enterprise VR Simulator (WayGroup / EMTELCO)",
    summary: "Executed a comprehensive technical overhaul of the simulation mechanics and user experience flow, addressing legacy bugs and refining interaction responsiveness.",
    personalContribution: "[INTERACTION OVERHAUL] Refactored interaction flow and stabilized buggy event sequences; [SYSTEM STABILITY] Conducted rigorous multi-session QA testing.",
    teamScope: "Pre-existing codebase and art assets supplied by original development team.",
    projectTech: ["Unreal Engine", "Interaction Rework", "QA & Bug Fixing", "Flow Optimization"],
    media: {
      primary: {
        src: "assets/projects/emtelco/flow-comparison-deepdive.jpg",
        alt: "EMTELCO interaction flow overhaul and event state comparison",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 6)",
        expectedFile: "flow-comparison-deepdive.jpg"
      }
    },
    evidence: {
      assetType: "Interaction Flow Comparison Documentation",
      whatItShows: "Demonstrates before-and-after interaction sequences and resolved event state bugs.",
      actionLabel: "Watch Flow Comparison",
      actionUrl: "https://youtu.be/k-vQlrwxvF0"
    }
  },
  {
    id: "slimescape",
    title: "Slimescape — Puzzle Adventure Game",
    subtitle: "Complete level design and progression puzzle architecture for an academic puzzle game.",
    tier: "supporting",
    role: "Level Designer",
    statusBadge: "Academic Project (UPB Degree)",
    summary: "Designed and paced every puzzle level for an academic game project, focusing on spatial problem-solving, difficulty curves, and mechanic discovery.",
    personalContribution: "[PUZZLE ARCHITECTURE] Sole responsibility for designing all puzzle levels, layout pacing, and obstacle choreography.",
    teamScope: "Core programming and 2D/3D visual art developed by fellow student team members.",
    projectTech: ["Unity", "Level Design", "Puzzle Architecture", "Spatial Pacing", "Playable Android Build"],
    media: {
      primary: {
        src: "assets/projects/slimescape/level-map-puzzle-4x3.jpg",
        alt: "Slimescape isometric puzzle level design layout map",
        aspectRatio: "4/3",
        source: "Original Portfolio (p. 11)",
        expectedFile: "level-map-puzzle-4x3.jpg"
      }
    },
    evidence: {
      assetType: "Level Design Overview & Playable Android APK",
      whatItShows: "Demonstrates isometric puzzle layouts, obstacle placement, mechanic pacing, and complete playable Android APK build.",
      actionLabel: "Watch Mobile Gameplay",
      actionUrl: "https://youtu.be/re-GdwLIflw",
      playableBuildUrl: "https://drive.google.com/file/d/1ndsXtrduDKJ2SV06u5uha6clOKP7Ji20/view",
      playableBuildLabel: "Download Playable APK (Android)"
    }
  },
  {
    id: "five-rules",
    title: "5 Golden Rules — Electrical Safety Simulator",
    subtitle: "Interactive VR safety training integrating real physical tool motion sensing.",
    tier: "supporting",
    role: "Contributing Interaction Programmer",
    statusBadge: "Professional VR Simulator (WayGroup)",
    summary: "Developed VR interaction logic connecting real-world physical electrical intervention tools with the virtual simulation to teach hazardous protocol compliance.",
    personalContribution: "[TOOL SENSING] Programmed software interaction responses triggered by physical tool motion and sensor inputs.",
    teamScope: "Physical sensor hardware engineered by electronics team; 3D substation assets by art team.",
    projectTech: ["VR Simulation", "Physical Tool Sensing", "Safety Protocols", "Engine: [Unity Context To Verify]"],
    media: {
      primary: {
        src: "assets/projects/five-rules/tool-sensing-interaction-16x9.jpg",
        alt: "5 Golden Rules physical tool motion sensor integration in VR",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 9)",
        expectedFile: "tool-sensing-interaction-16x9.jpg"
      }
    },
    evidence: {
      assetType: "Physical Tool Motion Sensing Walkthrough",
      whatItShows: "Demonstrates virtual electrical intervention responding to physical tool motion inputs.",
      actionLabel: "Watch Haptic Pole Simulation (YouTube)",
      actionUrl: "https://www.youtube.com/watch?v=aRnCxaOG8h4"
    }
  },
  {
    id: "game-jam",
    title: "Global Game Jam Prototypes",
    subtitle: "Rapid 48-hour hackathon game prototypes exploring experimental mechanics.",
    tier: "supporting",
    role: "Prototype Developer",
    statusBadge: "48h Hackathon Prototypes",
    summary: "Built rapid experimental prototypes under tight time constraints during Global Game Jam events, testing novel gameplay mechanics and collaborative pipelines.",
    personalContribution: "[RAPID PROTOTYPING] Rapid gameplay scripting, prototype mechanics, and immediate team problem-solving under 48-hour constraints.",
    teamScope: "Collaborative multi-person jam teams (artists, musicians, programmers).",
    projectTech: ["Unity / C#", "Rapid Prototyping", "Mechanics Exploration", "Jam Architecture"],
    media: {
      primary: {
        src: "assets/projects/game-jam/jam-prototypes-grid.jpg",
        alt: "El Caballero Enraizado point-and-click adventure gameplay",
        aspectRatio: "16/9",
        source: "Original Portfolio (p. 14)",
        expectedFile: "jam-prototypes-grid.jpg"
      }
    },
    evidence: {
      assetType: "Hackathon Prototype Snapshots & Links",
      whatItShows: "Demonstrates experimental gameplay loops and rapid mechanics created within 48-hour sprints.",
      actionLabel: "Watch GGJ Gameplay Demo (YouTube)",
      actionUrl: "https://youtu.be/g7MQaCc_PQw?si=Y9-9y4C9vOrQ3tob"
    }
  }
];

const roleFilterOrders = {
  all: ["skydiving", "heavy-machinery", "fiscalia-vr", "osh-rural", "road-safety", "emtelco", "slimescape", "five-rules", "game-jam"],
  gameplay: ["skydiving", "slimescape", "game-jam"],
  unreal: ["fiscalia-vr", "heavy-machinery", "osh-rural", "road-safety", "five-rules"],
  simulation: ["heavy-machinery", "osh-rural", "road-safety", "five-rules", "emtelco"]
};

  return {
    candidateProfile,
    capabilitiesMatrix,
    projects,
    roleFilterOrders
  };
});
