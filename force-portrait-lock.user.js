// ==UserScript==
// @name         Force Portrait Lock (Fullscreen)
// @namespace    https://github.com/parhamghahremani/force-portrait-lock
// @version      2.0.2
// @description  Forces screen orientation to portrait when entering fullscreen. Aggressive patching + CSS fallback for maximum reliability on Firefox Android.
// @author       parhamghahremani
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMTIiIHkxPSI4IiB4Mj0iMTE2IiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxNzJCNEQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwRjIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjeWFuIiB4MT0iMjUiIHkxPSIyMyIgeDI9IjEwNCIgeTI9IjEwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjdGNUZGIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1OEJGRiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIzLjIiIHJlc3VsdD0iYmx1ciIvPgogICAgICA8ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHJ4PSIyOSIgZmlsbD0idXJsKCNiZykiLz4KICA8cmVjdCB4PSI0Ljc1IiB5PSI0Ljc1IiB3aWR0aD0iMTE4LjUiIGhlaWdodD0iMTE4LjUiIHJ4PSIyOC4yNSIgc3Ryb2tlPSIjOENCOEU4IiBzdHJva2Utb3BhY2l0eT0iLjE4IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjeWFuKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSI+CiAgICA8cGF0aCBkPSJNNDcgMjdIMzRhNyA3IDAgMCAwLTcgN3YxMyIvPgogICAgPHBhdGggZD0iTTgxIDI3aDEzYTcgNyAwIDAgMSA3IDd2MTMiLz4KICAgIDxwYXRoIGQ9Ik0xMDEgODF2MTNhNyA3IDAgMCAxLTcgN0g4MSIvPgogICAgPHBhdGggZD0iTTQ3IDEwMUgzNGE3IDcgMCAwIDEtNy03VjgxIi8+CiAgPC9nPgogIDxyZWN0IHg9IjQzIiB5PSI0MyIgd2lkdGg9IjQyIiBoZWlnaHQ9IjQyIiByeD0iOSIgZmlsbD0iIzBEMUIzMSIgc3Ryb2tlPSIjRDRGQkZGIiBzdHJva2Utb3BhY2l0eT0iLjkiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHBhdGggZD0iTTU1IDY0aDE4TTY0IDU1djE4IiBzdHJva2U9InVybCgjY3lhbikiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iMy41IiBmaWxsPSIjRThGRkZGIi8+Cjwvc3ZnPg==
// @downloadURL  https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v2.0.2.user.js
// @updateURL    https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v2.0.2.user.js
// ==/UserScript==

(function () {
    'use strict';

    const LOG = '[PortraitLock]';
    let lastLockCompleted = 0;          // timestamp when last lock attempt FINISHED (not started)
    const LOCK_COOLDOWN = 300;          // ms between completed attempts
    let orientationChangeHandler = null; // reference for cleanup

    /**
     * Check if any element is currently in fullscreen
     */
    function isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }

    /**
     * Aggressive patch: Block landscape lock attempts and unlock during fullscreen
     * Runs once at document-start before any page scripts
     */
    function patchOrientationAPIs() {
        try {
            // Patch standard Screen Orientation API
            if (screen.orientation) {
                const origLock = screen.orientation.lock.bind(screen.orientation);
                const origUnlock = screen.orientation.unlock.bind(screen.orientation);

                screen.orientation.lock = function (orientation) {
                    // Block any landscape lock attempt
                    if (orientation && /landscape/i.test(orientation)) {
                        console.warn(LOG, 'Blocked landscape lock attempt:', orientation);
                        return Promise.reject(new Error('Blocked by PortraitLock: landscape not allowed'));
                    }
                    return origLock(orientation);
                };

                screen.orientation.unlock = function () {
                    // Block unlock while in fullscreen
                    if (isFullscreen()) {
                        console.warn(LOG, 'Blocked unlock during fullscreen');
                        return Promise.resolve(); // silently ignore
                    }
                    return origUnlock();
                };
            }

            // Patch legacy APIs
            const legacyLocks = ['lockOrientation', 'mozLockOrientation', 'webkitLockOrientation'];
            const legacyUnlocks = ['unlockOrientation', 'mozUnlockOrientation', 'webkitUnlockOrientation'];

            legacyLocks.forEach(method => {
                if (screen[method]) {
                    const orig = screen[method].bind(screen);
                    screen[method] = function (orientation) {
                        if (orientation && /landscape/i.test(orientation)) {
                            console.warn(LOG, 'Blocked legacy landscape lock:', method, orientation);
                            return false;
                        }
                        return orig(orientation);
                    };
                }
            });

            legacyUnlocks.forEach(method => {
                if (screen[method]) {
                    const orig = screen[method].bind(screen);
                    screen[method] = function () {
                        if (isFullscreen()) {
                            console.warn(LOG, 'Blocked legacy unlock during fullscreen:', method);
                            return;
                        }
                        return orig();
                    };
                }
            });

        } catch (e) {
            console.warn(LOG, 'Orientation API patching failed:', e);
        }
    }

    /**
     * Inject CSS to visually rotate landscape content in fullscreen
     * Fallback for cases where API lock fails or is overridden
     */
    function injectAntiLandscapeCSS() {
        try {
            const style = document.createElement('style');
            style.id = 'portraitlock-anti-landscape';
            style.textContent = `
                @media (orientation: landscape) {
                    :root:fullscreen,
                    :root:fullscreen * {
                        transform: rotate(-90deg) !important;
                        transform-origin: center center !important;
                        width: 100vh !important;
                        height: 100vw !important;
                        max-width: 100vh !important;
                        max-height: 100vw !important;
                    }
                    /* Fix video elements specifically */
                    :root:fullscreen video {
                        object-fit: contain !important;
                    }
                }
            `;
            // Insert at document start for earliest effect
            (document.head || document.documentElement).appendChild(style);
        } catch (e) {
            console.warn(LOG, 'CSS injection failed:', e);
        }
    }

    /**
     * Remove anti-landscape CSS
     */
    function removeAntiLandscapeCSS() {
        const style = document.getElementById('portraitlock-anti-landscape');
        if (style) style.remove();
    }

    /**
     * Core lock attempt with fallback chain
     * Returns Promise that resolves on success, rejects on total failure
     */
    function tryLockWithFallback() {
        // Method 1: Standard Screen Orientation API
        if (screen.orientation && typeof screen.orientation.lock === 'function') {
            return screen.orientation.lock('portrait')
                .then(() => {
                                        console.log(LOG, 'Locked via screen.orientation.lock');
                })
                .catch(err => {
                    console.warn(LOG, 'Method 1 failed:', err.message);
                    return tryLegacyLock();
                });
        }

        return tryLegacyLock();
    }

    /**
     * Method 2: Legacy APIs (older Firefox and some mobile versions)
     */
    function tryLegacyLock() {
        // screen.lockOrientation (deprecated standard)
        if (screen.lockOrientation) {
            const result = screen.lockOrientation('portrait');
            if (result) {
                                console.log(LOG, 'Locked via screen.lockOrientation');
                return Promise.resolve();
            }
        }

        // screen.mozLockOrientation (Firefox legacy)
        if (screen.mozLockOrientation) {
            const result = screen.mozLockOrientation('portrait');
            if (result) {
                                console.log(LOG, 'Locked via mozLockOrientation');
                return Promise.resolve();
            }
        }

        // screen.webkitLockOrientation (WebKit legacy)
        if (screen.webkitLockOrientation) {
            const result = screen.webkitLockOrientation('portrait');
            if (result) {
                                console.log(LOG, 'Locked via webkitLockOrientation');
                return Promise.resolve();
            }
        }

        console.warn(LOG, 'All orientation lock methods failed');
        return Promise.reject(new Error('No orientation lock method supported'));
    }

    /**
     * Main lock function with cooldown based on COMPLETION time
     * Fixed B-01: cooldown now tracks when attempt finished, not started
     * Fixed B-02: tryLegacyLock is now part of the same promise chain, respects cooldown
     */
    function lockPortrait() {
        const now = Date.now();
        if (now - lastLockCompleted < LOCK_COOLDOWN) {
            console.debug(LOG, 'Cooldown active, skipping');
            return Promise.reject(new Error('Cooldown'));
        }

        return tryLockWithFallback()
            .catch(err => {
                // If legacy also failed, log but don't throw further
                if (err.message !== 'Cooldown') {
                    console.warn(LOG, 'Lock failed completely:', err.message);
                }
                throw err;
            })
            .finally(() => {
                // Update cooldown timestamp when attempt FINISHES (success or failure)
                lastLockCompleted = Date.now();
            });
    }

    /**
     * Unlock orientation - also resets cooldown for immediate re-lock on next fullscreen
     * Fixed B-04: reset cooldown on unlock
     */
    function unlockOrientation() {
                try {
            if (screen.orientation && typeof screen.orientation.unlock === 'function') {
                screen.orientation.unlock();
            } else if (screen.unlockOrientation) {
                screen.unlockOrientation();
            } else if (screen.mozUnlockOrientation) {
                screen.mozUnlockOrientation();
            }
        } catch (e) { /* ignore */ }

        // Fixed B-04: Reset cooldown so next fullscreen entry locks immediately
        lastLockCompleted = 0;
        removeAntiLandscapeCSS();
    }

    /**
     * Handle fullscreen change events
     * Fixed B-03: Only attempt lock if actually entering fullscreen
     */
    function onFullscreenChange() {
        if (isFullscreen()) {
            // Entering fullscreen: inject CSS and attempt lock with promise-based retry
            injectAntiLandscapeCSS();

            // Single attempt with retry on failure (replaces double setTimeout)
            lockPortrait()
                .catch(() => {
                    // Retry once after short delay if first attempt failed
                    return new Promise(r => setTimeout(r, 300)).then(() => lockPortrait());
                })
                .catch(err => {
                    if (err.message !== 'Cooldown') {
                        console.warn(LOG, 'Fullscreen lock retry failed:', err.message);
                    }
                });
        } else {
            // Exiting fullscreen
            unlockOrientation();
        }
    }

    /**
     * Handle screen orientation change (device rotation)
     * Re-lock if we're in fullscreen and orientation became landscape
     */
    function onOrientationChange() {
        if (isFullscreen()) {
            const type = screen.orientation?.type || '';
            if (type.startsWith('landscape')) {
                console.log(LOG, 'Orientation changed to landscape during fullscreen, re-locking');
                lockPortrait().catch(() => { /* ignore */ });
            }
        }
    }

    /**
     * Intercept requestFullscreen at prototype level
     * Catches programmatic fullscreen requests
     */
    function patchRequestFullscreen() {
        try {
            const proto = Element.prototype;
            const methods = [
                'requestFullscreen',
                'mozRequestFullScreen',
                'webkitRequestFullscreen',
                'msRequestFullscreen'
            ];

            methods.forEach(method => {
                if (proto[method]) {
                    const original = proto[method];
                    proto[method] = function (...args) {
                        const result = original.apply(this, args);
                        // Schedule lock attempt after browser processes fullscreen
                        setTimeout(() => {
                            if (isFullscreen()) lockPortrait().catch(() => { /* ignore */ });
                        }, 100);
                        return result;
                    };
                }
            });
        } catch (e) {
            console.warn(LOG, 'requestFullscreen interception failed:', e);
        }
    }

    /**
     * Cleanup all listeners and patches
     * Fixed B-05: Proper cleanup on page unload
     */
    function cleanup() {
        // Remove fullscreen event listeners
        const events = [
            'fullscreenchange',
            'mozfullscreenchange',
            'webkitfullscreenchange',
            'MSFullscreenChange'
        ];
        events.forEach(evt => {
            document.removeEventListener(evt, onFullscreenChange, true);
        });

        // Remove orientation change listener
        if (orientationChangeHandler && screen.orientation?.removeEventListener) {
            screen.orientation.removeEventListener('change', orientationChangeHandler);
        }

        // Remove injected CSS
        removeAntiLandscapeCSS();
    }

    // ============ INITIALIZATION ============

    // 1. Patch orientation APIs early (before page scripts run)
    patchOrientationAPIs();

    // 2. Patch requestFullscreen
    patchRequestFullscreen();

    // 3. Register fullscreen event listeners
    const events = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'MSFullscreenChange'
    ];
    events.forEach(evt => document.addEventListener(evt, onFullscreenChange, true));

    // 4. Register orientation change listener (with reference for cleanup)
    try {
        if (screen.orientation && screen.orientation.addEventListener) {
            orientationChangeHandler = onOrientationChange;
            screen.orientation.addEventListener('change', orientationChangeHandler);
        }
    } catch (e) { /* ignore */ }

    // 5. Cleanup on page hide/unload
    window.addEventListener('pagehide', cleanup, { once: true });
    window.addEventListener('unload', cleanup, { once: true });

    // 6. Initial attempt ONLY if already in fullscreen (Fixed B-03)
    // Fixed B-03: Guard with isFullscreen() check
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        if (isFullscreen()) {
            setTimeout(() => lockPortrait().catch(() => { /* ignore */ }), 200);
        }
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            if (isFullscreen()) {
                setTimeout(() => lockPortrait().catch(() => { /* ignore */ }), 200);
            }
        });
    }

    console.log(LOG, 'Script loaded successfully (Aggressive v2.0.2).');
})();