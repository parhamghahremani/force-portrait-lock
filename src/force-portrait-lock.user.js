// ==UserScript==
// @name         Force Portrait Lock (Fullscreen)
// @namespace    https://github.com/parhamghahremani/force-portrait-lock
// @version      2.0.4
// @description  Locks the screen to portrait while a video is fullscreen, whatever the size of the video. Made for Firefox on Android.
// @author       parhamghahremani
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMTIiIHkxPSI4IiB4Mj0iMTE2IiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxNzJCNEQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwRjIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjeWFuIiB4MT0iMjUiIHkxPSIyMyIgeDI9IjEwNCIgeTI9IjEwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjdGNUZGIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1OEJGRiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIzLjIiIHJlc3VsdD0iYmx1ciIvPgogICAgICA8ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHJ4PSIyOSIgZmlsbD0idXJsKCNiZykiLz4KICA8cmVjdCB4PSI0Ljc1IiB5PSI0Ljc1IiB3aWR0aD0iMTE4LjUiIGhlaWdodD0iMTE4LjUiIHJ4PSIyOC4yNSIgc3Ryb2tlPSIjOENCOEU4IiBzdHJva2Utb3BhY2l0eT0iLjE4IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjeWFuKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSI+CiAgICA8cGF0aCBkPSJNNDcgMjdIMzRhNyA3IDAgMCAwLTcgN3YxMyIvPgogICAgPHBhdGggZD0iTTgxIDI3aDEzYTcgNyAwIDAgMSA3IDd2MTMiLz4KICAgIDxwYXRoIGQ9Ik0xMDEgODF2MTNhNyA3IDAgMCAxLTcgN0g4MSIvPgogICAgPHBhdGggZD0iTTQ3IDEwMUgzNGE3IDcgMCAwIDEtNy03VjgxIi8+CiAgPC9nPgogIDxyZWN0IHg9IjQzIiB5PSI0MyIgd2lkdGg9IjQyIiBoZWlZdHQ9IjQyIiByeD0iOSIgZmlsbD0iIzBEMUIzMSIgc3Ryb2tlPSIjRDRGQkZGIiBzdHJva2Utb3BhY2l0eT0iLjkiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHBhdGggZD0iTTU1IDY0aDE4TTY0IDU1djE4IiBzdHJva2U9InVybCgjY3lhbikiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iMy41IiBmaWxsPSIjRThGRkZGIi8+Cjwvc3ZnPg==
// ==/UserScript==

(function () {
    'use strict';

    // Run only once per window, even if the userscript manager injects the script twice.
    if (window.__forcePortraitLockInstalled) return;
    try {
        Object.defineProperty(window, '__forcePortraitLockInstalled', { value: true });
    } catch (_) {
        window.__forcePortraitLockInstalled = true;
    }

    // ============ SETTINGS ============

    const DEBUG = false;                 // true: print a timeline of everything that happens to the console
    const ORIENTATION = 'portrait';      // 'portrait' (not 'portrait-primary') allows both upright directions
    const RETRY_DELAYS = [300, 900];     // ms after entering fullscreen: Firefox may set its own orientation a moment later
    const STALE_MS = 600;                // a lock request still pending after this long is treated as lost and replaced
    const ENFORCE_MS = 250;              // while a video is fullscreen the orientation is verified this often
    const MAX_FAILS = 3;                 // after this many failed lock attempts in a row the checks stop (unsupported device)

    const LOG = '[PortraitLock]';
    const T0 = Date.now();
    const debug = (...args) => { if (DEBUG) console.log(LOG, '+' + (Date.now() - T0) + 'ms', ...args); };

    // ============ ORIGINAL APIs (captured before anything is patched) ============

    let so = null;
    try { so = screen.orientation || null; } catch (_) { /* ignore */ }

    const origLock = so && typeof so.lock === 'function' ? so.lock : null;
    const origUnlock = so && typeof so.unlock === 'function' ? so.unlock : null;

    const LEGACY_LOCKS = ['lockOrientation', 'mozLockOrientation', 'webkitLockOrientation'];
    const LEGACY_UNLOCKS = ['unlockOrientation', 'mozUnlockOrientation', 'webkitUnlockOrientation'];
    const origLegacy = {};
    LEGACY_LOCKS.concat(LEGACY_UNLOCKS).forEach(name => {
        try { if (typeof screen[name] === 'function') origLegacy[name] = screen[name]; } catch (_) { /* ignore */ }
    });

    // ============ STATE ============

    let inflight = null;     // the lock request that is currently pending (shared by callers while it is fresh)
    let inflightAt = 0;      // when it was started
    let active = false;      // we asked for a lock and have not released it yet
    let timers = [];         // pending retry timers
    let enforcer = null;     // interval that verifies the orientation during video fullscreen
    let failStreak = 0;      // lock attempts that failed in a row

    // ============ FULLSCREEN DETECTION ============

    function currentFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            null;
    }

    function containsVideo(el) {
        try {
            if (el.querySelector('video')) return true;
            const shadow = el.shadowRoot;
            return !!(shadow && shadow.querySelector('video'));
        } catch (_) {
            return false;
        }
    }

    /**
     * True only while a VIDEO is fullscreen: the <video> itself, an <iframe> (embedded player),
     * or a container (custom player) that holds a <video>. A whole-page fullscreen
     * (games, slides, web apps) is left alone.
     */
    function isVideoFullscreen() {
        const el = currentFullscreenElement();
        if (!el || el === document.documentElement || el === document.body) return false;
        if (el instanceof HTMLVideoElement || el instanceof HTMLIFrameElement) return true;
        return containsVideo(el);
    }

    function describeOrientation() {
        try { return so ? so.type + '/' + so.angle : 'n/a'; } catch (_) { return 'n/a'; }
    }

    function isLandscapeNow() {
        try { return String(so.type || '').indexOf('landscape') === 0; } catch (_) { return false; }
    }

    // ============ LOCKING ============

    function isAbort(err) {
        return !!err && err.name === 'AbortError';
    }

    /** Fallback for old browsers that only have the legacy (synchronous, boolean) API. */
    function legacyLock(previousError) {
        for (const name of LEGACY_LOCKS) {
            const fn = origLegacy[name];
            if (!fn) continue;
            try {
                if (fn.call(screen, ORIENTATION)) return Promise.resolve();
            } catch (_) { /* try the next one */ }
        }
        return Promise.reject(previousError);
    }

    function rawLock() {
        if (!origLock) return legacyLock(new Error('Screen Orientation API not available'));
        let attempt;
        try {
            attempt = Promise.resolve(origLock.call(so, ORIENTATION));
        } catch (err) {
            attempt = Promise.reject(err);
        }
        // An AbortError only means a newer lock() replaced this one: it is not a failure.
        return attempt.catch(err => {
            if (isAbort(err)) throw err;
            return legacyLock(err);
        });
    }

    function unlockNow() {
        try {
            if (origUnlock) {
                origUnlock.call(so);
                return;
            }
        } catch (_) { /* fall through to legacy */ }
        for (const name of LEGACY_UNLOCKS) {
            const fn = origLegacy[name];
            if (!fn) continue;
            try { fn.call(screen); } catch (_) { /* ignore */ }
        }
    }

    /**
     * Lock to portrait. Never rejects.
     *
     * A request that is still fresh is shared by every caller (no overlapping lock() calls).
     * A request that stays pending longer than STALE_MS is NOT waited for any more: the browser only
     * settles the promise after the screen has really rotated, so when something else (Firefox's own
     * media code) writes the orientation at the same moment, it can stay pending forever.
     * A new lock() call replaces (aborts) the old pending one, so the old one is simply dropped.
     *
     * @param {string} [reason] only used for the DEBUG timeline
     * @returns {Promise<boolean>} true when the lock was applied
     */
    function lockPortrait(reason) {
        const now = Date.now();
        if (inflight) {
            if (now - inflightAt < STALE_MS) {
                debug('lock already pending (' + (now - inflightAt) + 'ms), reusing it <-', reason || '?');
                return inflight;
            }
            debug('previous lock still pending after ' + (now - inflightAt) + 'ms -> replacing it');
        }

        active = true;
        inflightAt = now;
        debug('lock(' + ORIENTATION + ') <-', reason || '?', '| now:', describeOrientation());

        const mine = inflight = rawLock()
            .then(
                () => { failStreak = 0; return true; },
                err => {
                    if (!isAbort(err)) failStreak++;
                    debug('lock ' + (isAbort(err) ? 'aborted' : 'failed (' + (err && err.name) + ')'));
                    return false;
                }
            )
            .then(ok => {
                if (inflight === mine) inflight = null;
                if (ok) debug('lock resolved after ' + (Date.now() - now) + 'ms | now:', describeOrientation());
                // Fullscreen ended while the request was pending: do not leave a lock behind.
                if (!isVideoFullscreen()) {
                    active = false;
                    unlockNow();
                }
                return ok;
            });
        return mine;
    }

    function clearTimers() {
        timers.forEach(id => clearTimeout(id));
        timers = [];
        if (enforcer) {
            clearInterval(enforcer);
            enforcer = null;
        }
    }

    function release() {
        clearTimers();
        failStreak = 0;
        if (!active) return;
        active = false;
        debug('released | now:', describeOrientation());
        unlockNow();
        // The unlock supersedes any lock request that is still pending: forget it, so that entering
        // fullscreen again right away issues a new lock() instead of waiting for a dead request.
        inflight = null;
    }

    /** Runs every ENFORCE_MS during a video fullscreen: whatever changed the orientation, put it back. */
    function enforce() {
        if (!isVideoFullscreen()) { sync(); return; }
        if (failStreak >= MAX_FAILS) {
            debug('locking keeps failing on this device -> stopped checking');
            if (enforcer) { clearInterval(enforcer); enforcer = null; }
            return;
        }
        if (isLandscapeNow()) lockPortrait('check: screen is ' + describeOrientation());
    }

    /**
     * Bring the lock in line with the current fullscreen state.
     * On entering a video fullscreen the lock is applied at once and again after a short delay,
     * because Firefox Android may apply its own (video size based) orientation a moment later.
     */
    function sync() {
        clearTimers();
        failStreak = 0;
        if (isVideoFullscreen()) {
            lockPortrait('fullscreen');
            enforcer = setInterval(enforce, ENFORCE_MS);
            RETRY_DELAYS.forEach(ms => {
                timers.push(setTimeout(() => { if (isVideoFullscreen()) lockPortrait('retry ' + ms + 'ms'); }, ms));
            });
        } else {
            release();
        }
    }

    // ============ PATCHING THE PAGE'S OWN ORIENTATION CALLS ============

    /** Replace a method where it really lives (prototype or instance); each patch is isolated. */
    function patchMethod(target, name, makeWrapper) {
        try {
            let holder = target;
            while (holder && !Object.prototype.hasOwnProperty.call(holder, name)) {
                holder = Object.getPrototypeOf(holder);
            }
            if (!holder) return;
            const desc = Object.getOwnPropertyDescriptor(holder, name);
            if (!desc || typeof desc.value !== 'function') return;
            Object.defineProperty(holder, name, Object.assign({}, desc, { value: makeWrapper(desc.value) }));
        } catch (err) {
            debug('patching', name, 'failed:', err);
        }
    }

    if (so) {
        // While a video is fullscreen the page cannot pick another orientation: whatever it asks for
        // (landscape, any, natural, ...) becomes portrait and the page is told it worked.
        // Outside video fullscreen the original method runs untouched.
        patchMethod(so, 'lock', orig => function lock() {
            if (isVideoFullscreen()) {
                return lockPortrait('page called lock(' + arguments[0] + ')').then(() => undefined);
            }
            return orig.apply(this, arguments);
        });

        patchMethod(so, 'unlock', orig => function unlock() {
            if (isVideoFullscreen()) {
                debug('ignored unlock() from the page during video fullscreen');
                return undefined;
            }
            return orig.apply(this, arguments);
        });
    }

    LEGACY_LOCKS.forEach(name => {
        if (!origLegacy[name]) return;
        patchMethod(screen, name, orig => function () {
            if (isVideoFullscreen()) {
                lockPortrait('page called ' + name + '()');
                return true;
            }
            return orig.apply(this, arguments);
        });
    });

    LEGACY_UNLOCKS.forEach(name => {
        if (!origLegacy[name]) return;
        patchMethod(screen, name, orig => function () {
            if (isVideoFullscreen()) return undefined;
            return orig.apply(this, arguments);
        });
    });

    // ============ EVENTS ============

    // These listeners live as long as the page does. They are NOT removed on pagehide:
    // a page restored from the back/forward cache keeps its JavaScript state.
    function onFullscreenChange(event) {
        const el = currentFullscreenElement();
        debug(event.type + ': ' + (el ? '<' + el.tagName.toLowerCase() + '>' : 'none') +
            ' | video fullscreen: ' + isVideoFullscreen() + ' | ' + describeOrientation());
        sync();
    }
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach(type => {
        document.addEventListener(type, onFullscreenChange, true);
    });

    // The real video size is known after loadedmetadata / resize: lock again in case the browser rotated.
    function onMediaEvent(event) {
        if (active && event.target instanceof HTMLVideoElement && isVideoFullscreen()) {
            lockPortrait('video ' + event.type);
        }
    }
    document.addEventListener('loadedmetadata', onMediaEvent, true);
    document.addEventListener('resize', onMediaEvent, true);

    // The screen ended up in landscape although we locked: lock again (no cooldown).
    function onOrientationChange() {
        debug('orientation change ->', describeOrientation());
        if (isVideoFullscreen() && isLandscapeNow()) lockPortrait('screen turned landscape');
    }
    try {
        if (so && typeof so.addEventListener === 'function') so.addEventListener('change', onOrientationChange);
    } catch (_) { /* ignore */ }

    // DEBUG only: playback events are what makes Firefox rewrite the orientation, so they are part of the timeline.
    if (DEBUG) {
        ['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ended'].forEach(type => {
            document.addEventListener(type, event => {
                if (event.target instanceof HTMLVideoElement && isVideoFullscreen()) {
                    debug('video ' + type + ' | ' + describeOrientation());
                }
            }, true);
        });
    }

    window.addEventListener('pagehide', release);
    window.addEventListener('pageshow', event => { if (event.persisted) sync(); });

    debug('script loaded (v2.0.4) | orientation API:', !!so, '| lock():', !!origLock);
})();