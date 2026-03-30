// js/audio.js — Phase-based BGM + SFX Audio Engine v2

const AudioEngine = (() => {

    // ─── BGM Sources ───────────────────────────────────────────────────────
    const BGM = {
        1: 'audio/bgm/bgm_1_city.mp3',
        2: 'audio/bgm/bgm_2_hunt.wav',   // covers chase + conflict (phases 2-3)
        4: 'audio/bgm/bgm_4_reckoning.mp3',
        end_bad: 'audio/bgm/bgm_end_bad.mp3',
        end_normal: 'audio/bgm/bgm_end_normal.mp3',
        end_good: 'audio/bgm/bgm_end_good.mp3',
    };

    // ─── SFX Sources ───────────────────────────────────────────────────────
    const SFX = {
        gunshot: 'audio/sfx/sfx_gunshot.mp3',
        explosion: 'audio/sfx/sfx_explosion.mp3',
        alert: 'audio/sfx/sfx_alert.mp3',
        hack_beep: 'audio/sfx/sfx_hack_beep.mp3',
        choice: 'audio/sfx/sfx_choice.mp3',
        continue: 'audio/sfx/sfx_continue.mp3',
    };

    // ─── Phase Trigger Nodes ───────────────────────────────────────────────
    // Phase 2 now covers both "on the run" AND "conflict" stages (no separate phase 3)
    const PHASE_TRIGGERS = {
        2: new Set([
            'N7', 'N4_return', 'N13', 'N13_avenger', 'N13_vagrant',
            'N18', 'N18_solo', 'N22', 'N_w25', 'N_w20', 'N_w20_beaten', 'N_w20_taunt',
        ]),
        4: new Set(['N42', 'N43', 'N52', 'N53', 'N_u6']),
    };

    const END_TRIGGERS = {
        end_bad: new Set(['N6', 'N_u4']),
        end_normal: new Set(['N59', 'N60', 'N60_media', 'N60_ag', 'N60_heli', 'N60_shadow', 'N60_shoot']),
        end_good: new Set(['N61']),
    };

    // ─── Per-Node SFX ──────────────────────────────────────────────────────
    const NODE_SFX = {
        N6: 'gunshot',
        N134: 'gunshot',
        N149: 'gunshot',
        N_q12: 'explosion',
        N30: 'explosion',
        N8: 'alert',      // special: lower vol + fade-out
        N7: 'hack_beep',
        N_h10: 'hack_beep',
        N_h17: 'hack_beep',
    };

    // ─── Volume State ──────────────────────────────────────────────────────
    const BGM_BASE = 0.45;
    const RAIN_BASE = 0.20;
    const SFX_BASE = 0.70;
    let volLevel = 4;     // 1–5 bars, default 4
    let isMuted = false;
    let bgmAudio = null;
    let currentPhase = 1;
    let endingPhase = false;
    const sfxCache = {};

    // Pre-buffer Phase 1 BGM so it plays instantly on first click
    const preloadBGM1 = new Audio(BGM[1]);
    preloadBGM1.preload = 'auto';

    // ─── Helpers ───────────────────────────────────────────────────────────
    function masterMult() { return isMuted ? 0 : volLevel / 5; }

    function applyVolumes() {
        if (bgmAudio && !bgmAudio.paused) bgmAudio.volume = BGM_BASE * masterMult();
        const rain = document.getElementById('bgm-rain');
        if (rain) rain.volume = RAIN_BASE * masterMult();
    }

    function fadeOut(audio, ms = 1500, cb) {
        if (!audio || audio.paused) { cb && cb(); return; }
        const start = audio.volume;
        const ticks = Math.max(ms / 50, 1);
        const delta = start / ticks;
        const timer = setInterval(() => {
            if (audio.volume > delta) {
                audio.volume = Math.max(0, audio.volume - delta);
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(timer);
                cb && cb();
            }
        }, 50);
    }

    function fadeIn(audio, target, ms = 1500) {
        audio.volume = 0;
        audio.play().catch(() => { });
        const ticks = Math.max(ms / 50, 1);
        const delta = target / ticks;
        const timer = setInterval(() => {
            if (audio.volume + delta < target) {
                audio.volume += delta;
            } else {
                audio.volume = target;
                clearInterval(timer);
            }
        }, 50);
    }

    function switchBGM(key) {
        const src = BGM[key];
        if (!src) return;
        const next = new Audio(src);
        next.loop = true;
        fadeOut(bgmAudio, 1500, () => {
            bgmAudio = next;
            fadeIn(bgmAudio, BGM_BASE * masterMult(), 1500);
        });
    }

    // ─── SFX ───────────────────────────────────────────────────────────────
    function playSFX(key, volOverride) {
        const src = SFX[key];
        if (!src) return null;
        if (!sfxCache[key]) sfxCache[key] = new Audio(src);
        const clip = sfxCache[key].cloneNode();
        clip.volume = (volOverride !== undefined ? volOverride : SFX_BASE) * masterMult();
        clip.play().catch(() => { });
        return clip;
    }

    // Alert: lower volume (0.35) + auto fade-out after 1.2s
    function playAlertSFX() {
        const clip = playSFX('alert', 0.35);
        if (clip) setTimeout(() => fadeOut(clip, 1200), 1200);
    }

    // ─── Volume UI ─────────────────────────────────────────────────────────
    function updateVolumeUI() {
        const bars = document.querySelectorAll('.vol-bar');
        const btn = document.getElementById('vol-btn');
        bars.forEach(bar => {
            const active = !isMuted && parseInt(bar.dataset.level) <= volLevel;
            bar.style.backgroundColor = active
                ? 'rgba(34,211,238,0.80)'   // cyan-400
                : 'rgba(75,85,99,0.50)';     // gray-600
        });
        if (!btn) return;
        const icon = isMuted || volLevel === 0 ? 'volume-x'
            : volLevel <= 2 ? 'volume-1'
                : 'volume-2';
        btn.innerHTML = `<i data-lucide="${icon}" class="w-3.5 h-3.5 md:w-4 md:h-4"></i>`;
        btn.style.color = isMuted ? 'rgb(107,114,128)' : 'rgb(156,163,175)';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function initVolumeUI() {
        document.querySelectorAll('.vol-bar').forEach(bar => {
            bar.addEventListener('click', () => {
                volLevel = parseInt(bar.dataset.level);
                isMuted = false;
                applyVolumes();
                updateVolumeUI();
            });
        });
        const btn = document.getElementById('vol-btn');
        if (btn) btn.addEventListener('click', () => {
            isMuted = !isMuted;
            applyVolumes();
            updateVolumeUI();
        });
        updateVolumeUI();
    }

    // ─── Public API ────────────────────────────────────────────────────────

    /** Called on first user interaction (boot screen click) */
    function start() {
        playSFX('hack_beep', 0.45);               // boot click SFX

        bgmAudio = preloadBGM1;
        bgmAudio.loop = true;
        fadeIn(bgmAudio, BGM_BASE * masterMult(), 5000);  // 5s gentle fade-in
    }

    /** Called each time a new story node is rendered */
    function onNodeChange(nodeId) {
        if (NODE_SFX[nodeId]) {
            NODE_SFX[nodeId] === 'alert' ? playAlertSFX() : playSFX(NODE_SFX[nodeId]);
        }
        if (endingPhase) return;
        for (const [key, nodes] of Object.entries(END_TRIGGERS)) {
            if (nodes.has(nodeId)) { endingPhase = true; switchBGM(key); return; }
        }
        for (const phase of [4, 2]) {
            if (PHASE_TRIGGERS[phase].has(nodeId) && currentPhase < phase) {
                currentPhase = phase;
                switchBGM(phase);
                return;
            }
        }
    }

    // Init volume UI (DOM is ready since this script is at bottom of <body>)
    initVolumeUI();

    return { start, playSFX, onNodeChange };
})();
