let currentNodeId = "N1";
let typeInterval;
let hintTimeout;
let isTyping = false;
let currentFullText = "";

// Boot / interaction handler
document.getElementById('boot-screen').addEventListener('click', function () {
    this.style.opacity = '0';
    setTimeout(() => this.style.display = 'none', 1000);
    // Rain audio as ambient underlay — keep volume low so it doesn't compete with BGM
    document.getElementById('bgm-rain').volume = 0.2;
    document.getElementById('bgm-rain').play().catch(e => console.log("Audio play blocked", e));
    AudioEngine.start();
    renderNode();
});

// Bind click to skip typewriter animation
document.getElementById('story-content-box').addEventListener('click', function () {
    if (isTyping) {
        clearInterval(typeInterval);
        clearTimeout(hintTimeout);
        document.getElementById('skip-hint').style.opacity = '0';
        document.getElementById('story-text').innerHTML = currentFullText;
        document.getElementById('story-text').classList.remove('cursor');
        showChoices();
        isTyping = false;
    }
});

// Show the choices menu
function showChoices() {
    const choicesCont = document.getElementById('choices-container');
    if (choicesCont.children.length > 0) {
        const isEnding = ["N59", "N_u4", "N60", "N60_shoot", "N61"].includes(currentNodeId);
        // Ending page content is inside a scroll container — translate-y-0 is sufficient
        choicesCont.classList.remove('opacity-0', 'translate-y-2', 'translate-y-4', 'pointer-events-none');
        choicesCont.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
}

// Hide the choices menu
function hideChoices() {
    const choicesCont = document.getElementById('choices-container');
    const isEnding = ["N59", "N_u4", "N60", "N60_shoot", "N61"].includes(currentNodeId);
    const translateY = isEnding ? 'translate-y-4' : 'translate-y-2';

    choicesCont.classList.add('opacity-0', translateY, 'pointer-events-none');
    choicesCont.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
}

// Core typewriter logic
function typeWriter(text, element, speed = 35) {
    clearInterval(typeInterval);
    clearTimeout(hintTimeout);
    document.getElementById('skip-hint').style.opacity = '0';
    element.innerHTML = '';
    element.classList.add('cursor');
    hideChoices();

    isTyping = true;
    currentFullText = text;
    let i = 0;

    // Show the skip hint 1.5s after typing starts (short texts usually finish before this fires)
    hintTimeout = setTimeout(() => {
        if (isTyping) document.getElementById('skip-hint').style.opacity = '1';
    }, 1500);

    typeInterval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
            clearTimeout(hintTimeout);
            document.getElementById('skip-hint').style.opacity = '0';
            element.classList.remove('cursor');
            showChoices();
            isTyping = false;
        }
    }, speed);
}

// Screen shake and damage flash effect
function triggerEffect(effectType) {
    const container = document.getElementById('game-container');
    const damageOverlay = document.getElementById('damage-overlay');

    container.classList.remove('effect-shake');
    void container.offsetWidth;

    if (effectType === 'shake') {
        container.classList.add('effect-shake');
        damageOverlay.style.opacity = '1';
        setTimeout(() => damageOverlay.style.opacity = '0', 300);
    }
}

// Apply theme color and layout logic
function applyTheme(themeName, isEnding, rawThemeName) {
    const theme = THEMES[themeName] || THEMES.default;
    const contentWrapper = document.getElementById('content-wrapper');
    const storyContentBox = document.getElementById('story-content-box');
    const titleEl = document.getElementById('story-title');
    const textEl = document.getElementById('story-text');
    const headerBar = document.getElementById('header-bar');

    const endingBadge = document.getElementById('ending-badge');
    const endingColorOverlay = document.getElementById('ending-color-overlay');

    if (isEnding) {
        // --- Immersive ending layout ---
        // Semi-transparent dark overlay + enable scroll (lower opacity to reveal background)
        contentWrapper.className = "absolute inset-0 w-full h-full z-40 overflow-y-auto hide-scrollbar pointer-events-auto transition-all duration-1000 bg-black/50";

        // Hide the normal top bar, show the ending badge
        headerBar.classList.add('opacity-0');
        titleEl.classList.add('hidden');
        endingBadge.classList.remove('opacity-0', 'pointer-events-none');
        endingBadge.classList.add('opacity-100');

        // Choose ending color tint based on theme
        const endingColorMap = {
            badEnd: { overlay: 'radial-gradient(ellipse at center, rgba(127,0,0,0.45) 0%, rgba(0,0,0,0.1) 70%)', badgeColor: 'text-red-600', label: '— BAD END —' },
            normalEnd: { overlay: 'radial-gradient(ellipse at center, rgba(120,90,0,0.45) 0%, rgba(0,0,0,0.1) 70%)', badgeColor: 'text-yellow-400', label: '— NORMAL END —' },
            goodEnd: { overlay: 'radial-gradient(ellipse at center, rgba(0,80,60,0.45) 0%, rgba(0,0,0,0.1) 70%)', badgeColor: 'text-green-400', label: '— GOOD END —' },
        };
        const endingStyle = endingColorMap[themeName] || { overlay: 'radial-gradient(ellipse at center, rgba(0,40,80,0.45) 0%, rgba(0,0,0,0.1) 70%)', badgeColor: 'text-cyan-400', label: '— ENDING —' };

        // Apply the ending color overlay
        endingColorOverlay.style.background = endingStyle.overlay;
        endingColorOverlay.style.opacity = '1';

        // Set badge text color
        const badgeLabel = document.getElementById('ending-badge-label');
        const badgeTitle = document.getElementById('ending-badge-title');
        badgeLabel.className = `font-mono text-xs md:text-sm tracking-[0.5em] uppercase font-bold ${endingStyle.badgeColor}`;
        badgeTitle.className = `text-2xl md:text-4xl font-black tracking-widest text-center px-4 drop-shadow-[0_0_20px_currentColor] ending-badge-pulse ${endingStyle.badgeColor}`;
        badgeLabel.textContent = endingStyle.label;

        // Story text area: wide spacing, centered, expands downward
        storyContentBox.className = "w-full max-w-4xl mx-auto flex flex-col text-center items-center justify-center min-h-full pt-40 pb-16 px-6 md:px-12";

        // Text uses the ending theme color + wide line height
        textEl.className = `text-base md:text-xl leading-loose md:leading-[2.5] font-serif whitespace-pre-line tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,1)] ${theme.text} ending-fade-in`;

    } else {
        // Hide ending badge & color overlay
        endingBadge.classList.add('opacity-0', 'pointer-events-none');
        endingBadge.classList.remove('opacity-100');
        endingColorOverlay.style.opacity = '0';

        // --- Normal story bottom-gradient layout ---
        // Lower the via-black opacity so the upper portion of the scene image shows through
        contentWrapper.className = "absolute inset-0 w-full h-full z-30 flex flex-col justify-end transition-all duration-1000 pointer-events-none bg-gradient-to-t from-black/95 via-transparent to-transparent pt-48 pb-8 md:pb-12 px-6 md:px-16 overflow-hidden";

        // Show top status bar
        headerBar.classList.remove('opacity-0');
        const headerTitle = document.getElementById('header-title');
        headerTitle.className = `text-sm md:text-lg font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 from-gray-200 ${theme.text.replace('text-', 'to-')}`;

        // Dynamically update the right-side status icon and text based on theme
        const statusMap = {
            danger: { icon: 'alert-triangle', text: 'SIGNAL COMPROMISED', color: 'text-red-400' },
            hack: { icon: 'terminal', text: 'SYSTEM BREACH', color: 'text-green-400' },
        };
        const status = statusMap[themeName] || { icon: 'radio', text: 'SIGNAL SECURE', color: 'text-gray-400/70' };
        document.getElementById('header-node-info').innerHTML = `
            <i data-lucide="${status.icon}" class="w-4 h-4 md:w-5 md:h-5 ${status.color} animate-pulse"></i>
            <span class="tracking-widest ${status.color} transition-colors duration-500">${status.text}</span>
        `;

        // Story text: left-aligned
        storyContentBox.className = "w-full max-w-5xl mx-auto pointer-events-auto cursor-pointer flex flex-col text-left";

        titleEl.classList.remove('hidden');
        titleEl.className = `text-xl md:text-3xl font-bold mb-3 md:mb-4 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors duration-500 ${theme.text}`;
        textEl.className = `text-base md:text-xl leading-relaxed md:leading-[1.8] text-gray-100 font-serif whitespace-pre-line tracking-wide cursor drop-shadow-[0_2px_4px_rgba(0,0,0,1)]`;
    }

    return theme;
}

function renderNode() {
    const node = STORY_DATA[currentNodeId];
    if (!node) return;

    // Audio: notify the engine on node change (phase advance + SFX trigger)
    AudioEngine.onNodeChange(currentNodeId);

    // Determine whether this is a final ending node
    const isEnding = ["N59", "N_u4", "N60", "N60_shoot", "N61"].includes(currentNodeId);
    const currentTheme = applyTheme(node.theme || 'default', isEnding, node.theme || 'default');

    if (node.effect) { triggerEffect(node.effect); }

    document.getElementById('story-title').innerText = node.title;
    typeWriter(node.text, document.getElementById('story-text'));

    // Background image transition
    const sceneImageEl = document.getElementById('scene-image');
    sceneImageEl.style.opacity = 0;
    sceneImageEl.classList.remove('zoom-effect');

    setTimeout(() => {
        sceneImageEl.src = node.image ? node.image : DEFAULT_IMAGE;
        // Ending background stays visible for immersion
        sceneImageEl.style.opacity = isEnding ? 0.35 : 0.5;
        sceneImageEl.classList.add('zoom-effect');
        // If ending, populate the badge title
        if (isEnding) {
            document.getElementById('ending-badge-title').textContent = node.title;
        }
    }, 300);

    // Render choice buttons
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    // Determine container layout based on number of choices
    if (isEnding) {
        choicesContainer.className = "mt-12 mb-16 flex justify-center w-full opacity-0 translate-y-4 pointer-events-none transition-all duration-1000";
    } else if (node.choices && node.choices.length === 1) {
        // Single-choice "continue": centered layout
        choicesContainer.className = "mt-8 flex justify-center w-full opacity-0 translate-y-2 pointer-events-none transition-all duration-500";
    } else {
        // Multi-choice "branch": column layout with a visual divider at the top
        choicesContainer.className = "mt-6 flex flex-col space-y-4 opacity-0 translate-y-2 pointer-events-none transition-all duration-500";
        // Insert the "CHOOSE YOUR PATH" divider indicator
        const indicator = document.createElement('div');
        indicator.className = "flex items-center gap-4 mb-2 mt-4 pointer-events-none";
        indicator.innerHTML = `
            <span class="flex-1 border-t border-solid border-gray-600/40"></span>
            <span class="text-xs md:text-sm font-bold font-mono tracking-[0.3em] uppercase text-cyan-500/80 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">choose your path</span>
            <span class="flex-1 border-t border-solid border-gray-600/40"></span>
        `;
        choicesContainer.appendChild(indicator);
    }

    if (node.choices && node.choices.length > 0) {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');

            if (isEnding) {
                // --- Ending-specific button: centered, icon-pill restart button ---
                const endingTheme = node.theme || 'default';
                const btnBorderClass = endingTheme === 'goodEnd' ? 'border-green-700/70 hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_25px_rgba(74,222,128,0.4)]' : endingTheme === 'badEnd' ? 'border-red-900/70 hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]' : endingTheme === 'normalEnd' ? 'border-yellow-800/70 hover:border-yellow-500 hover:text-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]' : 'border-gray-600 hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]';
                btn.className = `group relative px-10 py-3 md:px-12 md:py-4 rounded-full border transition-all duration-500 overflow-hidden flex items-center justify-center hover:bg-white/5 text-gray-400 ${btnBorderClass}`;
                btn.innerHTML = `
                    <i data-lucide="rotate-ccw" class="w-4 h-4 md:w-5 md:h-5 mr-3 md:mr-4 group-hover:-rotate-180 transition-transform duration-700"></i>
                    <span class="relative z-10 text-[0.9rem] md:text-sm font-mono font-bold tracking-[0.3em] uppercase">${choice.text}</span>
                `;

            } else if (node.choices.length === 1) {
                // --- Single-choice "continue" button: subtle frame, legible, non-intrusive ---
                btn.className = `group flex items-center justify-center gap-3 w-full max-w-md mx-auto py-3.5 px-6 rounded-md border border-gray-700/50 bg-white/[0.02] hover:bg-white/[0.08] hover:border-gray-500/60 transition-all duration-500 cursor-pointer shadow-sm`;
                btn.innerHTML = `
                    <span class="text-xs md:text-sm font-mono tracking-widest uppercase text-gray-400 group-hover:text-gray-100 transition-colors duration-300">${choice.text}</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:translate-x-1 group-hover:text-gray-200 transition-all duration-300"></i>
                `;

            } else {
                // --- Multi-choice "branch" button: full-width, high contrast, emphatic ---
                const btnClasses = `bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-100 ${currentTheme.hover}`;
                btn.className = `group relative w-full text-left px-5 py-3 md:px-6 md:py-4 rounded-lg border transition-all duration-300 overflow-hidden flex items-center justify-between shadow-lg hover:shadow-2xl ${btnClasses}`;
                btn.innerHTML = `
                    <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></span>
                    <span class="relative z-10 text-[1rem] md:text-lg font-medium tracking-wide pr-4">${choice.text}</span>
                    <span class="relative z-10 flex-shrink-0"><i data-lucide="play" class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all"></i></span>
                `;
            }

            btn.onclick = () => {
                if (isEnding) {
                    window.location.reload();
                } else {
                    // Button SFX: single-choice continue vs. multi-choice branch
                    AudioEngine.playSFX(node.choices.length === 1 ? 'continue' : 'choice');
                    currentNodeId = choice.next;
                    renderNode();
                }
            };

            choicesContainer.appendChild(btn);
        });
    }

    lucide.createIcons();
}