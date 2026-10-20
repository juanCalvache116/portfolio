(function () {
// Authoritative Data Layer Binding (Universal Global / Module Support)
const portfolioData = (typeof window !== 'undefined' && window.PORTFOLIO_DATA) || {};
const candidateProfile = portfolioData.candidateProfile || {};
const capabilitiesMatrix = portfolioData.capabilitiesMatrix || [];
const projects = portfolioData.projects || [];
const roleFilterOrders = portfolioData.roleFilterOrders || {
  all: [],
  gameplay: [],
  unreal: [],
  simulation: []
};

// Defensive Data Normalization Helpers
function normalizeTeamScope(scope) {
  if (Array.isArray(scope)) return scope.filter(Boolean).join(' ');
  return typeof scope === 'string' ? scope.trim() : '';
}

function normalizeContributionItems(contrib) {
  if (Array.isArray(contrib)) {
    return contrib.map(item => {
      if (typeof item !== 'string') return '';
      const match = item.match(/^(\[[^\]]+\])\s*(.*)$/);
      return match ? `<span class="stream-item-chip">${match[1]}</span>${match[2]}` : item;
    }).filter(Boolean);
  }
  if (typeof contrib === 'string') {
    const parts = contrib.split(/;\s*(?=\[)/g);
    return parts.map(item => {
      const match = item.match(/^(\[[^\]]+\])\s*(.*)$/);
      return match ? `<span class="stream-item-chip">${match[1]}</span>${match[2]}` : item;
    });
  }
  return [];
}

function normalizeTechTags(techList) {
  if (!Array.isArray(techList)) return [];
  return techList.map(t => {
    if (typeof t === 'string') return { name: t, verified: false, note: '' };
    if (typeof t === 'object' && t !== null) {
      return { name: t.name || '', verified: Boolean(t.verified), note: t.note || '' };
    }
    return { name: String(t || ''), verified: false, note: '' };
  }).filter(t => t.name.length > 0);
}

let currentFilter = 'all';

// Initialize Application
function initApp() {
  renderHero();
  renderFilterBar();
  renderProjects();
  renderCapabilities();
  renderBackground();
  renderFooter();
  setupModal();
  setupMobileNav();
  setupScrollspy();
  setupCopyEmail();
  setupBackToTop();
  handleUrlParams();
  setupHistoryListener();
  setupScrollObserver();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Reusable YouTube Video ID Extractor
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

// Reusable Media Component Helper
function renderProjectMedia(mediaItem, options = {}) {
  if (!mediaItem || !mediaItem.src) return '';
  const { isSupporting = false, actionUrl = '', projectTitle = '', projectId = '' } = options;
  
  const containerClass = isSupporting ? 'supporting-media-thumb' : 'viewport-media-screen';
  const aspectRatio = mediaItem.aspectRatio || '16/9';
  const hasYouTubeVideo = Boolean(actionUrl && getYouTubeId(actionUrl));
  
  const hudBracketsHtml = isSupporting ? '' : `
    <div class="hud-bracket hud-bracket-tl"></div>
    <div class="hud-bracket hud-bracket-tr"></div>
    <div class="hud-bracket hud-bracket-bl"></div>
    <div class="hud-bracket hud-bracket-br"></div>
  `;

  let hoverOverlayHtml = '';
  if (hasYouTubeVideo) {
    hoverOverlayHtml = `
      <div class="media-hover-overlay">
        <span class="media-play-pill">
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span>Watch Video Demo ▶</span>
        </span>
      </div>
    `;
  } else if (projectId) {
    hoverOverlayHtml = `
      <div class="media-hover-overlay">
        <span class="media-play-pill">
          <span>Inspect Breakdown →</span>
        </span>
      </div>
    `;
  }
  
  const mediaInner = `
    ${hudBracketsHtml}
    <img 
      src="${mediaItem.src}" 
      alt="${mediaItem.alt || 'Project Media'}" 
      class="${isSupporting ? 'supporting-screen-img' : 'viewport-screen-img'}" 
      loading="lazy"
      decoding="async"
      onerror="this.style.display='none'; const p=this.closest('.${containerClass}').querySelector('.media-pending-state'); if(p) p.style.display='flex'; const b=this.closest('.${containerClass}').querySelector('.media-badge-overlay'); if(b) b.style.display='none';"
    />
    <div class="media-pending-state" style="display: none;">
      <span class="pending-label-badge">Media Pending</span>
      <div class="pending-desc">Project capture required</div>
      <div class="pending-path">${mediaItem.expectedFile || mediaItem.src}</div>
      ${mediaItem.source ? `<div class="mono" style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Source: ${mediaItem.source}</div>` : ''}
    </div>
    <div class="media-badge-overlay">
      Project Media
    </div>
    ${hoverOverlayHtml}
  `;

  if (projectId) {
    return `
      <div class="${containerClass}" style="aspect-ratio: ${aspectRatio};">
        <a href="#${projectId}" class="project-modal-trigger ${isSupporting ? 'supporting-media-link' : 'viewport-media-link'}" data-project-id="${projectId}" role="button" aria-haspopup="dialog" aria-label="Open detailed breakdown for ${projectTitle || 'project'}">
          ${mediaInner}
        </a>
      </div>
    `;
  }

  if (actionUrl) {
    return `
      <div class="${containerClass}" style="aspect-ratio: ${aspectRatio};">
        <a href="${actionUrl}" target="_blank" rel="noopener" class="${isSupporting ? 'supporting-media-link' : 'viewport-media-link'}" aria-label="Watch ${projectTitle || 'project'} video footage on YouTube">
          ${mediaInner}
        </a>
      </div>
    `;
  }

  return `
    <div class="${containerClass}" style="aspect-ratio: ${aspectRatio};">
      ${mediaInner}
    </div>
  `;
}

// Render Asymmetrical Hero Section
function renderHero() {
  const heroContainer = document.getElementById('hero-mount');
  if (!heroContainer) return;

  const credCellsHtml = candidateProfile.verifications.map(v => `
    <div class="credential-cell">
      <div>
        <div class="cred-label">${v.label}</div>
        <div class="cred-value">${v.value}</div>
        <div class="cred-sub">${v.institution || v.company || v.detail || ''} ${v.period || ''}</div>
      </div>
      <div class="cred-badge mono">${v.badgeText}</div>
    </div>
  `).join('');

  heroContainer.innerHTML = `
    <div class="hero-layout">
      <div class="hero-content">
        <div class="hero-meta-strip">
          <span class="badge badge-neutral">
            <span class="status-indicator-dot" style="background: var(--accent-cyan); width: 6px; height: 6px;"></span>
            GAMEPLAY • VR • SIMULATION
          </span>
          <span class="badge badge-neutral">${candidateProfile.location}</span>
          <span class="badge badge-neutral">${candidateProfile.availability}</span>
        </div>
        
        <h1 class="hero-title">${candidateProfile.title}</h1>
        <p class="hero-summary">${candidateProfile.summary}</p>
        
        <div class="hero-actions">
          <a href="#work" class="btn btn-primary">
            <span>Explore Featured Work</span>
            <span class="btn-icon-pill">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </a>
          <a href="${candidateProfile.linkedin}" target="_blank" rel="noopener" class="btn btn-secondary">
            <span>View LinkedIn</span>
            <span class="btn-icon-pill">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div class="hero-credentials-box">
        <div class="credentials-header">
          <span class="credentials-title">Professional Profile</span>
        </div>
        <div class="credentials-grid">
          ${credCellsHtml}
        </div>
      </div>
    </div>
  `;
}

// Render Filter Bar (Presentation Priority Only)
function renderFilterBar() {
  const filterMount = document.getElementById('filter-mount');
  if (!filterMount) return;

  const totalCount = projects.length;
  const filters = [
    { id: 'all', label: 'All Projects', count: totalCount },
    { id: 'gameplay', label: 'Game & Mechanics', count: (roleFilterOrders.gameplay || []).length },
    { id: 'unreal', label: 'Unreal Engine & VR', count: (roleFilterOrders.unreal || []).length },
    { id: 'simulation', label: 'Simulation & Hardware', count: (roleFilterOrders.simulation || []).length }
  ];

  filterMount.innerHTML = `
    <div class="filter-wrapper">
      <div class="filter-header">
        <span class="filter-label">Filter by Focus Area</span>
      </div>
      <div class="filter-pills">
        ${filters.map(f => `
          <button class="filter-pill ${f.id === currentFilter ? 'active' : ''}" data-filter="${f.id}">
            <span>${f.label}</span>
            <span class="filter-count" style="font-size: 0.72rem; opacity: 0.8; margin-left: 4px;">(${f.count})</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  filterMount.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentFilter = e.currentTarget.dataset.filter;
      updateFilterState();
      renderProjects();

      // Smoothly scroll to the top of the Featured Work section
      const workSection = document.getElementById('work');
      if (workSection) {
        const navHeight = 70;
        const filterNav = document.querySelector('.filter-section');
        const filterHeight = filterNav ? filterNav.offsetHeight : 60;
        const totalOffset = navHeight + filterHeight + 8;
        const workTop = workSection.getBoundingClientRect().top + window.pageYOffset - totalOffset;
        window.scrollTo({
          top: Math.max(0, workTop),
          behavior: 'smooth'
        });
      }
    });
  });
}

function updateFilterState() {
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });

  const sectionDescEl = document.getElementById('work-section-desc');
  if (sectionDescEl) {
    const totalCount = projects.length;
    const activeCount = currentFilter === 'all' ? totalCount : (roleFilterOrders[currentFilter] || []).length;
    const filterLabels = {
      all: 'All Projects',
      gameplay: 'Game & Mechanics',
      unreal: 'Unreal Engine & VR',
      simulation: 'Simulation & Hardware'
    };

    const sectionDescriptions = {
      all: 'Selected game, VR and simulation projects demonstrating gameplay programming, interactive systems, Unreal Engine and Unity development, and hardware integration.',
      gameplay: 'Focusing on player movement mechanics, gameplay state systems, physics-driven interactions, and puzzle level design.',
      unreal: 'Focusing on Unreal Engine production simulators, two-user networked VR interaction, subsystem audio refactoring, and VR training systems.',
      simulation: 'Focusing on heavy machinery kinematics, real-time voxel terrain interaction, and software integrated with physical joysticks, pedals, and hardware controls.'
    };

    if (currentFilter === 'all') {
      sectionDescEl.innerHTML = sectionDescriptions.all;
    } else {
      sectionDescEl.innerHTML = `
        ${sectionDescriptions[currentFilter]}
        <div style="margin-top: 10px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 9999px; padding: 4px 14px; flex-wrap: wrap;">
          <span style="color: var(--text-secondary);">Showing <strong>${activeCount} of ${totalCount}</strong> projects in <strong>${filterLabels[currentFilter]}</strong></span>
          <button id="reset-filter-link" style="background: none; border: none; color: var(--accent-cyan); font-weight: 600; cursor: pointer; text-decoration: underline; font-family: inherit; font-size: inherit; padding: 0;">Show all (${totalCount}) ↺</button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filter-link');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentFilter = 'all';
          updateFilterState();
          renderProjects();
        });
      }
    }
  }
}

// Render Projects (Featured with Alternating Rhythm & Supporting)
function renderProjects() {
  const featuredMount = document.getElementById('featured-mount');
  const supportingMount = document.getElementById('supporting-mount');
  if (!featuredMount || !supportingMount) return;

  const order = roleFilterOrders[currentFilter] || roleFilterOrders.all || [];
  
  // True Filtering: show all projects if 'all', or only the projects belonging to the active focus area
  const matchingProjects = currentFilter === 'all'
    ? [...projects]
    : projects.filter(p => order.includes(p.id));

  // Sort matching projects according to priority order
  const orderedProjects = matchingProjects.sort((a, b) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  const featuredList = orderedProjects.filter(p => p.tier === 'featured' || p.tier === 'strong');
  const supportingList = orderedProjects.filter(p => p.tier === 'supporting');

  // Render Featured Projects with Direction C Viewports & Alternating Layout
  featuredMount.innerHTML = featuredList.map(project => {
    const isReversed = project.layout === 'media-right';
    const cardClass = `featured-card reveal-on-scroll ${isReversed ? 'layout-media-right' : ''}`;
    const contribItems = normalizeContributionItems(project.personalContribution);
    const teamScopeText = normalizeTeamScope(project.teamScope);
    const techList = normalizeTechTags(project.projectTech);
    const statusBadge = project.statusBadge || 'Featured Project';
    const isPaused = statusBadge.includes('Paused');

    return `
      <article class="${cardClass}" id="card-${project.id}">
        <!-- Real Media / Simulation Viewport Container -->
        <div class="viewport-container">
          <div class="viewport-terminal">
            <div class="terminal-header">
              <span class="terminal-title">${project.title}</span>
              <div class="terminal-status-dot">
                <span class="status-indicator-dot"></span>
                <span>Project Media</span>
              </div>
            </div>
            
            ${renderProjectMedia(project.media?.primary, { isFeatured: true, actionUrl: project.evidence?.actionUrl, projectTitle: project.title, projectId: project.id })}
          </div>

          <div class="viewport-evidence-bar">
            <div class="evidence-what-shows">
              <strong>What This Demonstrates:</strong> ${project.evidence?.whatItShows || 'Gameplay programming and interactive systems.'}
            </div>
            <a href="#${project.id}" class="evidence-action-link project-modal-trigger" data-project-id="${project.id}" role="button" aria-haspopup="dialog" aria-label="Inspect ${project.title} technical breakdown">
              <span>Inspect Breakdown</span>
              <span class="btn-icon-pill" style="width: 18px; height: 18px;">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Project Details & Personal Contribution -->
        <div class="project-details">
          <div>
            <div class="project-header-meta">
              <span class="badge ${isPaused ? 'badge-prototype' : 'badge-verified'}">
                ${statusBadge}
              </span>
              <span class="badge badge-neutral mono">Role: ${project.role || 'Developer'}</span>
            </div>
            
            <h2 class="project-title">${project.title || 'Untitled Project'}</h2>
            <p class="project-subtitle">${project.subtitle || ''}</p>
            <p class="project-summary-text">${project.summary || ''}</p>
            
            <!-- Integrated Personal Contribution Stream with High-Scan Action Chips -->
            <div class="contribution-stream">
              <div class="stream-label">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Personal Contribution (What Juan Built)
              </div>
              <ul class="stream-list">
                ${contribItems.map(item => `<li class="stream-item">${item}</li>`).join('')}
              </ul>

              ${teamScopeText ? `
                <div class="team-scope-footnote">
                  <strong>Team Scope:</strong> ${teamScopeText}
                </div>
              ` : ''}
            </div>

            <!-- Project-Level Tech Tags -->
            <div class="tech-tag-row">
              ${techList.map(t => `
                <span class="tech-tag ${t.note ? 'tag-verify' : ''}">
                  ${t.name} ${t.note ? `<small>${t.note}</small>` : ''}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Render Supporting Projects Bento Grid with Action Chips and Interactive Media Links
  supportingMount.innerHTML = supportingList.map(project => {
    const contribItems = normalizeContributionItems(project.personalContribution);
    const teamScopeText = normalizeTeamScope(project.teamScope);
    const techList = normalizeTechTags(project.projectTech);
    const statusBadge = project.statusBadge || 'Supporting Project';

    return `
      <article class="supporting-card reveal-on-scroll" data-project-id="${project.id}">
        <div>
          ${project.media?.primary ? renderProjectMedia(project.media.primary, { isSupporting: true, actionUrl: project.evidence?.actionUrl, projectTitle: project.title, projectId: project.id }) : ''}

          <div class="supporting-header">
            <span class="badge badge-neutral mono">${project.role || 'Developer'}</span>
            <h3 class="supporting-title">${project.title || 'Untitled Project'}</h3>
            <span class="badge ${statusBadge.includes('Hackathon') || statusBadge.includes('Academic') ? 'badge-prototype' : 'badge-verified'}">
              ${statusBadge}
            </span>
          </div>
          
          <p class="supporting-summary">${project.summary || ''}</p>
          
          <div class="supporting-contribution-box">
            <div class="supporting-attr-label">Personal Contribution</div>
            <div class="supporting-attr-text">
              ${contribItems.length > 1 
                ? `<ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 4px;">${contribItems.map(c => `<li>${c}</li>`).join('')}</ul>` 
                : (contribItems[0] || '')}
            </div>
          </div>

          ${teamScopeText ? `
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 12px;">
              <strong>Team Scope:</strong> ${teamScopeText}
            </div>
          ` : ''}
        </div>

        <div>
          <div class="tech-tag-row" style="margin-top: 8px; margin-bottom: 12px;">
            ${techList.map(t => `<span class="tech-tag">${t.name}</span>`).join('')}
          </div>
          
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span class="mono" style="font-size: 0.72rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${project.evidence?.assetType || 'Project Overview'}</span>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
              ${project.evidence?.playableBuildUrl ? `
                <a href="${project.evidence.playableBuildUrl}" target="_blank" rel="noopener" class="mono" style="font-size: 0.7rem; color: #04070d; background: var(--accent-cyan); padding: 2px 8px; border-radius: 9999px; font-weight: 700; text-decoration: none;" title="Download Playable Android APK">
                  <span>APK ↗</span>
                </a>
              ` : ''}
              <a href="#${project.id}" class="inspect-btn project-modal-trigger mono" data-project-id="${project.id}" role="button" aria-haspopup="dialog" aria-label="Inspect ${project.title} technical breakdown" style="font-size: 0.7rem; color: var(--accent-cyan); white-space: nowrap; text-decoration: none; cursor: pointer;">Details →</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  setupScrollObserver();

  // Attach modal triggers to both inspect buttons and media thumbnails
  document.querySelectorAll('.inspect-btn, .project-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = e.currentTarget.dataset.projectId;
      if (pid) openModal(pid, true);
    });
  });
}

// Render Capabilities Matrix (Candidate-Level Stack)
function renderCapabilities() {
  const mount = document.getElementById('capabilities-mount');
  if (!mount) return;

  const categoryTags = [
    "01 // CORE ENGINES & PROGRAMMING",
    "02 // GAMEPLAY & SIMULATION",
    "03 // TOOLS & INTEGRATION",
    "04 // SPECIALIZED SYSTEMS"
  ];

  mount.innerHTML = capabilitiesMatrix.map((cat, idx) => `
    <div class="matrix-category category-rim-${idx} reveal-on-scroll">
      <div class="category-header-row">
        <span class="category-index-tag">[ ${categoryTags[idx] || `0${idx + 1} // TECH`} ]</span>
      </div>
      <h3 class="category-title">${cat.category}</h3>
      <p class="category-desc">${cat.description}</p>
      
      <div class="skills-list">
        ${cat.items.map(item => {
          const lvl = (item.level || '').toLowerCase();
          const levelClass = lvl.includes('production') ? 'level-production' :
            (lvl.includes('proficient') || lvl.includes('advanced')) ? 'level-proficient' : 'level-supporting';
          return `
            <div class="skill-entry">
              <div class="skill-header">
                <span class="skill-name">${item.name}</span>
                <span class="skill-level ${levelClass}">
                  <span class="status-dot-mini"></span>
                  <span>${item.level}</span>
                </span>
              </div>
              <p class="skill-detail">${item.detail}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

// Render Background & Experience
function renderBackground() {
  const mount = document.getElementById('background-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="experience-layout">
      <div class="experience-box">
        <h3 class="category-title" style="margin-bottom: 20px;">Professional Experience</h3>
        
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-role">Developer</div>
          <div class="timeline-company">WayGroup / WayGroupSST • July 2021 – Present</div>
          <p class="timeline-desc">
            Game and simulation developer working across Unreal Engine, Unity, VR applications and interactive training experiences. Developed gameplay and interaction systems, built VR experiences and simulation applications, implemented mechanics and scenario logic, integrated software with physical controls and sensors, and collaborated across programming, 3D art, and electronics teams.
          </p>
        </div>
      </div>

      <div class="experience-box">
        <h3 class="category-title" style="margin-bottom: 20px;">Education & Training</h3>
        
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-role">Digital Entertainment Design Engineering</div>
          <div class="timeline-company">Universidad Pontificia Bolivariana (UPB) • Graduated 2022</div>
          <p class="timeline-desc">
            Engineering degree focused on digital entertainment, interactive experiences and technology development.
          </p>
        </div>

        <div class="timeline-item" style="margin-top: 20px;">
          <div class="timeline-dot" style="background-color: var(--accent-cyan);"></div>
          <div class="timeline-role">Unreal Engine 5 C++ — Professional Training</div>
          <div class="timeline-company">Udemy • Completed 2025</div>
          <p class="timeline-desc">
            Completed structured UE5 C++ training focused on gameplay framework concepts, C++ classes and Blueprint integration.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Render Footer
function renderFooter() {
  const mount = document.getElementById('footer-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="footer-wrapper">
       <div class="footer-info">
         <strong>${candidateProfile.name}</strong>
         <span class="footer-copy">Email: ${candidateProfile.email}</span>
         <span class="footer-copy">© 2026 Juan Camilo Calvache Giraldo • Game & Simulation Programmer</span>
       </div>
       <div class="footer-links">
         <a href="${candidateProfile.linkedin}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">LinkedIn</a>
         <a href="mailto:${candidateProfile.email}" class="btn btn-primary btn-sm">Contact</a>
       </div>
     </div>
   `;
}

// Module-level focus tracker for accessible modal restoration
let lastFocusedElement = null;

// Sets background landmarks inert / aria-hidden when modal dialog is open (WCAG AA)
function setBackgroundInert(isInert) {
  const backgroundElements = [
    document.querySelector('header'),
    document.querySelector('main'),
    document.querySelector('footer'),
    document.querySelector('.mobile-bottom-nav'),
    document.getElementById('back-to-top')
  ];
  backgroundElements.forEach(el => {
    if (!el) return;
    if (isInert) {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('inert', '');
    } else {
      el.removeAttribute('aria-hidden');
      el.removeAttribute('inert');
    }
  });
}

// Setup Deep-Dive Modal with Secondary Real Media and Explanatory Schematics
function setupModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => closeModal(true));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal(true);
    });
  }

  // Keyboard Escape listener (only triggers when modal is open)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalOverlay = document.getElementById('project-modal');
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal(true);
      }
    }
  });

  // WCAG AA Keyboard Focus Trap (Tab & Shift+Tab)
  if (modalOverlay) {
    modalOverlay.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (!modalOverlay.classList.contains('active')) return;

      const focusableElements = modalOverlay.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
      );
      const focusable = Array.prototype.filter.call(focusableElements, el => {
        return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
      });

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement || !modalOverlay.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement || !modalOverlay.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}

function openModal(projectId, pushState = false) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modalOverlay || !modalBody) return;

  // Track element focused before modal opened for focus restoration
  lastFocusedElement = document.activeElement;

  // Make background inert and aria-hidden for assistive technologies
  setBackgroundInert(true);

  // Render secondary media if available
  const secondaryMediaHtml = project.media?.secondary?.map(m => `
    <div style="margin-bottom: 16px;">
      <div class="cred-label" style="margin-bottom: 6px;">Additional Media: ${m.caption || ''}</div>
      ${renderProjectMedia(m, { isSupporting: false })}
    </div>
  `).join('') || '';

  // Render schematic if available with visual node flowchart
  const schematicFlowHtml = project.media?.schematic?.flow ? `
    <div class="schematic-flow-diagram">
      ${project.media.schematic.flow.map((step, idx, arr) => `
        <div class="flow-node">
          <div class="flow-node-step mono">STEP ${step.step}</div>
          <div class="flow-node-title">${step.node}</div>
          <div class="flow-node-desc">${step.detail}</div>
        </div>
        ${idx < arr.length - 1 ? `
          <div class="flow-arrow">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        ` : ''}
      `).join('')}
    </div>
  ` : '';

  const schematicHtml = project.media?.schematic ? `
    <div class="schematic-box">
      <div class="schematic-banner">
        <span class="schematic-tag mono">${project.media.schematic.label || 'ILLUSTRATIVE SYSTEM VIEW'}</span>
        <span class="mono text-muted" style="font-size: 0.65rem;">System Architecture Pipeline</span>
      </div>
      <div class="schematic-title">${project.media.schematic.title}</div>
      <p class="schematic-desc">${project.media.schematic.description}</p>
      ${schematicFlowHtml}
    </div>
  ` : '';

  const youtubeId = getYouTubeId(project.evidence?.actionUrl);
  const isLocalFile = window.location.protocol === 'file:';
  const isGameplay = ['skydiving', 'slimescape', 'game-jam'].includes(project.id);
  const isSimulator = ['heavy-machinery', 'road-safety', 'fiscalia-vr', 'osh-rural', 'five-rules', 'emtelco'].includes(project.id);
  const videoHeading = isGameplay ? 'Gameplay Demonstration' : isSimulator ? 'Simulator Demonstration' : 'Video Demonstration';
  
  let videoPlayerHtml = '';
  if (youtubeId && project.evidence?.actionUrl) {
    const videoTabsHtml = (project.evidence.videos && project.evidence.videos.length > 1) ? `
      <div class="modal-video-selector" role="tablist" aria-label="Project Video Demonstrations" style="display: flex; gap: 8px; padding: 10px 14px; background: rgba(4, 7, 13, 0.7); border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap;">
        ${project.evidence.videos.map((v, idx) => {
          const vId = getYouTubeId(v.url) || youtubeId;
          const isPrimary = idx === 0;
          return `
            <button class="modal-video-tab ${isPrimary ? 'active' : ''}" role="tab" aria-selected="${isPrimary ? 'true' : 'false'}" aria-controls="modal-video-iframe-el" id="video-tab-${idx}" data-video-id="${vId}" data-video-label="${v.label}" title="${v.desc || ''}" style="background: ${isPrimary ? 'var(--accent-cyan)' : 'var(--bg-surface-elevated)'}; color: ${isPrimary ? '#04070d' : 'var(--text-secondary)'}; border: 1px solid ${isPrimary ? 'var(--accent-cyan)' : 'var(--border-medium)'}; border-radius: 9999px; padding: 4px 12px; font-size: 0.72rem; font-weight: 700; cursor: pointer; font-family: var(--font-mono); transition: all var(--transition-fast);">
              ${v.label}
            </button>
          `;
        }).join('')}
      </div>
    ` : '';

    videoPlayerHtml = `
      <div class="modal-video-box">
        <div class="modal-video-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-indicator-dot" style="background: var(--accent-cyan); width: 6px; height: 6px;"></span>
            <span class="mono" style="font-size: 0.68rem; color: var(--accent-cyan); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
              ${videoHeading}
            </span>
          </div>
          <span class="mono text-muted" style="font-size: 0.68rem;">1080p Interactive Player</span>
        </div>
        ${videoTabsHtml}
        <div class="modal-video-frame-wrapper">
          <iframe 
            id="modal-video-iframe-el"
            src="https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1" 
            title="${project.title} Video Demonstration"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            class="modal-video-iframe"
          ></iframe>
        </div>
        ${isLocalFile ? `
          <div style="padding: 8px 14px; background-color: rgba(0, 240, 255, 0.06); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; flex-wrap: wrap; gap: 6px;">
            <span class="mono text-secondary">Local Finder file mode: To watch without browser disk restrictions:</span>
            <a href="http://localhost:3000/portfolio-prototype/index.html?project=${project.id}" target="_blank" class="mono" style="color: var(--accent-cyan); font-weight: 600; text-decoration: underline;">
              Switch to Live Local Server (Port 3000) ➔
            </a>
          </div>
        ` : ''}
      </div>
    `;
  } else if (project.media?.primary?.src) {
    // If project has NO YouTube video link, render the clean visual capture without any YouTube references
    videoPlayerHtml = `
      <div class="modal-video-box">
        <div class="modal-video-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-indicator-dot" style="background: var(--badge-verified-text); width: 6px; height: 6px;"></span>
            <span class="mono" style="font-size: 0.68rem; color: var(--text-primary); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
              Project Media
            </span>
          </div>
          <span class="mono text-muted" style="font-size: 0.68rem;">16:9 Production Screen</span>
        </div>
        <div class="modal-video-frame-wrapper" style="position: relative;">
          <img 
            src="${project.media.primary.src}" 
            alt="${project.title} Visual Capture" 
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
        </div>
      </div>
    `;
  }

  const contribItems = normalizeContributionItems(project.personalContribution);
  const teamScopeText = normalizeTeamScope(project.teamScope);
  const techList = normalizeTechTags(project.projectTech);
  const statusBadge = project.statusBadge || 'Project Deep Dive';
  const isPaused = statusBadge.includes('Paused');
  const collaborationText = project.deepDive?.collaboration || teamScopeText || 'Collaborative production environment.';

  modalBody.innerHTML = `
    <div class="project-header-meta">
      <span class="badge ${isPaused ? 'badge-prototype' : 'badge-verified'}">
        ${statusBadge}
      </span>
      <span class="badge badge-neutral mono">Role: ${project.role || 'Developer'}</span>
    </div>

    <h2 class="project-title" id="modal-project-title" style="font-size: 1.65rem; margin-bottom: 4px;">${project.title || 'Untitled Project'}</h2>
    <p class="project-subtitle" id="modal-project-subtitle" style="font-size: 0.95rem; margin-bottom: 20px;">${project.subtitle || ''}</p>

    <!-- Embedded Video Demonstration Player -->
    ${videoPlayerHtml}

    <!-- Technical Challenge & Solution Grid -->
    ${(project.deepDive?.challenge || project.deepDive?.solution) ? `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div style="background-color: var(--bg-surface-elevated); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div class="cred-label" style="color: var(--accent-steel);">Engineering Challenge</div>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.45;">${project.deepDive?.challenge || 'High-fidelity simulation requirements.'}</p>
        </div>
        <div style="background-color: var(--bg-surface-elevated); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div class="cred-label" style="color: var(--badge-verified-text);">Implementation Solution</div>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.45;">${project.deepDive?.solution || 'Modular architecture and optimized event loop.'}</p>
        </div>
      </div>
    ` : ''}

    <!-- Personal Contribution vs Team Scope -->
    <div class="contribution-stream" style="margin-bottom: 20px;">
      <div class="stream-label">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Personal Contribution (What Juan Built)
      </div>
      <ul class="stream-list">
        ${contribItems.map(item => `<li class="stream-item">${item}</li>`).join('')}
      </ul>
      <div class="team-scope-footnote">
        <strong>Team Scope:</strong> ${collaborationText}
      </div>
    </div>

    <!-- Secondary Media Evidence -->
    ${secondaryMediaHtml}

    <!-- Explanatory Technical Schematic (Labeled) -->
    ${schematicHtml}

    <!-- Project Technologies -->
    <div style="margin-bottom: 20px;">
      <div class="cred-label" style="margin-bottom: 8px;">Technologies</div>
      <div class="tech-tag-row">
        ${techList.map(t => `
          <span class="tech-tag ${t.note ? 'tag-verify' : ''}">
            ${t.name} ${t.note ? `<small>${t.note}</small>` : ''}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Direct Project Action -->
    <div style="background-color: #121a2d; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 20px; text-align: center;">
      <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${project.evidence?.assetType || 'Project Documentation'}</div>
      <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px;">${project.evidence?.whatItShows || 'Project demonstration.'}</p>
      
      ${project.evidence?.playableBuildUrl ? `
        <div style="display: flex; justify-content: center; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;">
          <a href="${project.evidence.playableBuildUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="box-shadow: 0 0 16px rgba(0, 240, 255, 0.35);">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>${project.evidence.playableBuildLabel || 'Download Playable APK (Android)'} ↗</span>
          </a>
        </div>
      ` : ''}

      <div class="mono" style="font-size: 0.76rem; color: var(--accent-cyan); display: inline-flex; align-items: center; gap: 6px;">
        <span>✓ Verified Code & Systems Implementation</span>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Automatically set initial focus to the close button for accessibility
  setTimeout(() => {
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }, 50);

  // Multi-video switcher interactivity (ARIA state & Arrow key navigation)
  const videoTabs = modalBody.querySelectorAll('.modal-video-tab');
  const videoIframe = modalBody.querySelector('#modal-video-iframe-el');
  if (videoTabs.length && videoIframe) {
    videoTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const vId = e.currentTarget.dataset.videoId;
        if (!vId) return;

        videoTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.style.background = 'var(--bg-surface-elevated)';
          t.style.color = 'var(--text-secondary)';
          t.style.borderColor = 'var(--border-medium)';
        });

        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        e.currentTarget.style.background = 'var(--accent-cyan)';
        e.currentTarget.style.color = '#04070d';
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';

        videoIframe.src = `https://www.youtube.com/embed/${vId}?rel=0&modestbranding=1&autoplay=1`;
      });

      // Keyboard arrow key navigation between tabs (W3C Tablist Pattern)
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const tabsArr = Array.from(videoTabs);
          const currIdx = tabsArr.indexOf(e.currentTarget);
          const nextIdx = e.key === 'ArrowRight'
            ? (currIdx + 1) % tabsArr.length
            : (currIdx - 1 + tabsArr.length) % tabsArr.length;
          tabsArr[nextIdx].focus();
          tabsArr[nextIdx].click();
        }
      });
    });
  }

  if (pushState) {
    history.pushState({ modalOpen: true, projectId: projectId }, '', `?project=${projectId}`);
  }
}

function closeModal(updateHistory = false) {
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  if (modalOverlay && modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restore background landmark accessibility
    setBackgroundInert(false);

    // Stop YouTube audio and clean iframe memory
    setTimeout(() => {
      if (modalBody && !modalOverlay.classList.contains('active')) {
        modalBody.innerHTML = '';
      }
    }, 280);

    // Restore focus to the element that triggered the modal
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }

    if (updateHistory && window.location.search.includes('project=')) {
      history.pushState({ modalOpen: false }, '', window.location.pathname);
    }
  }
}

// Browser History Back/Forward Listener
function setupHistoryListener() {
  if (typeof window === 'undefined' || !window.addEventListener) return;
  window.addEventListener('popstate', (e) => {
    if (typeof URLSearchParams === 'undefined') return;
    const params = new URLSearchParams(window.location.search || '');
    const projectId = params.get('project');
    
    if (projectId) {
      openModal(projectId, false);
    } else {
      closeModal(false);
    }
  });
}

function handleUrlParams() {
  if (typeof window === 'undefined' || typeof URLSearchParams === 'undefined') return;
  const params = new URLSearchParams(window.location.search || '');
  const projectId = params.get('project');
  const role = params.get('role');
  
  if (role && roleFilterOrders[role]) {
    currentFilter = role;
    updateFilterState();
    renderProjects();
  }
  
  if (projectId) {
    setTimeout(() => openModal(projectId, false), 100);
  }
}

// Setup Mobile Quick-Jump Nav
function setupMobileNav() {
  const navItems = document.querySelectorAll('.mobile-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(n => n.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });
}

// Scroll-Triggered Staggered Entrance Physics (GPU Accelerated)
function setupScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, Math.min(idx * 30, 150));
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px 100px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-revealed'));
  }
}

// 1-Click Interactive Email Copy with Haptic Visual Feedback
function setupCopyEmail() {
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.email || 'juan.calvache2@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          const statusText = btn.querySelector('.copy-status-text');
          if (statusText) {
            const original = statusText.textContent;
            statusText.textContent = 'Copied! ✓';
            btn.style.borderColor = 'var(--accent-cyan)';
            btn.style.color = 'var(--accent-cyan)';
            setTimeout(() => {
              statusText.textContent = original;
              btn.style.borderColor = '';
              btn.style.color = '';
            }, 2200);
          }
        }).catch(() => {
          window.prompt('Copy candidate email:', email);
        });
      } else {
        window.prompt('Copy candidate email:', email);
      }
    });
  });
}

// Floating Smooth-Scroll Back to Top
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dynamic Header Navigation Scrollspy
function setupScrollspy() {
  const sections = ['work', 'supporting', 'capabilities', 'background'];
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 140;
    let activeId = '';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          activeId = id;
          break;
        }
      }
    }

    navLinks.forEach(link => {
      const href = (link && typeof link.getAttribute === 'function') ? link.getAttribute('href') : '';
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

})();
