// ==UserScript==
// @name         Force Portrait Lock (Fullscreen)
// @namespace    https://github.com/parhamghahremani/force-portrait-lock
// @version      2.0.1
// @description  Forces screen orientation to portrait when entering fullscreen. Multi-method fallback for maximum compatibility on Firefox Android.
// @author       parhamghahremani
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMTIiIHkxPSI4IiB4Mj0iMTE2IiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxNzJCNEQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwRjIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjeWFuIiB4MT0iMjUiIHkxPSIyMyIgeDI9IjEwNCIgeTI9IjEwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNjdGNUZGIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1OEJGRiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIzLjIiIHJlc3VsdD0iYmx1ciIvPgogICAgICA8ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHJ4PSIyOSIgZmlsbD0idXJsKCNiZykiLz4KICA8cmVjdCB4PSI0Ljc1IiB5PSI0Ljc1IiB3aWR0aD0iMTE4LjUiIGhlaWdodD0iMTE4LjUiIHJ4PSIyOC4yNSIgc3Ryb2tlPSIjOENCOEU4IiBzdHJva2Utb3BhY2l0eT0iLjE4IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjeWFuKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSI+CiAgICA8cGF0aCBkPSJNNDcgMjdIMzRhNyA3IDAgMCAwLTcgN3YxMyIvPgogICAgPHBhdGggZD0iTTgxIDI3aDEzYTcgNyAwIDAgMSA3IDd2MTMiLz4KICAgIDxwYXRoIGQ9Ik0xMDEgODF2MTNhNyA3IDAgMCAxLTcgN0g4MSIvPgogICAgPHBhdGggZD0iTTQ3IDEwMUgzNGE3IDcgMCAwIDEtNy03VjgxIi8+CiAgPC9nPgogIDxyZWN0IHg9IjQzIiB5PSI0MyIgd2lkdGg9IjQyIiBoZWlnaHQ9IjQyIiByeD0iOSIgZmlsbD0iIzBEMUIzMSIgc3Ryb2tlPSIjRDRGQkZGIiBzdHJva2Utb3BhY2l0eT0iLjkiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHBhdGggZD0iTTU1IDY0aDE4TTY0IDU1djE4IiBzdHJva2U9InVybCgjY3lhbikiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iMy41IiBmaWxsPSIjRThGRkZGIi8+Cjwvc3ZnPg==
// @downloadURL  https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v2.0.1.user.js
// @updateURL    https://github.com/parhamghahremani/userscripts/raw/main/force-portrait-lock/versions/v2.0.1.user.js
// ==/UserScript==

(function () {
    'use strict';

    const LOG = '[PortraitLock]';
    let lastLockAttempt = 0;
    const LOCK_COOLDOWN = 300; // ms between attempts

    /**
     * Attempt to lock screen orientation to portrait
     */
    function lockPortrait() {
        const now = Date.now();
        if (now - lastLockAttempt < LOCK_COOLDOWN) return;
        lastLockAttempt = now;

        // Method 1: Standard Screen Orientation API
        try {
            if (screen.orientation && typeof screen.orientation.lock === 'function') {
                screen.orientation.lock('portrait')
                    .then(() => console.log(LOG, 'Locked via screen.orientation.lock'))
                    .catch(err => {
                        console.warn(LOG, 'Method 1 failed:', err.message);
                        tryLegacyLock();
                    });
                return;
            }
        } catch (e) {
            console.warn(LOG, 'Error in method 1:', e);
        }

        tryLegacyLock();
    }

    /**
     * Method 2: Legacy APIs (older Firefox and some mobile versions)
     */
    function tryLegacyLock() {
        try {
            if (screen.lockOrientation) {
                screen.lockOrientation('portrait');
                console.log(LOG, 'Locked via screen.lockOrientation');
                return;
            }
            if (screen.mozLockOrientation) {
                screen.mozLockOrientation('portrait');
                console.log(LOG, 'Locked via mozLockOrientation');
                return;
            }
            if (screen.webkitLockOrientation) {
                screen.webkitLockOrientation('portrait');
                console.log(LOG, 'Locked via webkitLockOrientation');
                return;
            }
        } catch (e) {
            console.warn(LOG, 'Method 2 failed:', e);
        }
        console.warn(LOG, 'No orientation lock method supported — likely restricted in iframe.');
    }

    /**
     * Unlock orientation (optional, on fullscreen exit)
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
    }

    /**
     * Check if fullscreen element is currently active
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
     * React to fullscreen state changes
     */
    function onFullscreenChange() {
        if (isFullscreen()) {
            // Brief delay to allow browser's automatic rotation handling, then we lock
            setTimeout(lockPortrait, 100);
            setTimeout(lockPortrait, 500); // Second attempt for reliability
        } else {
            unlockOrientation();
        }
    }

    // Fullscreen events across browsers
    const events = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'MSFullscreenChange'
    ];
    events.forEach(evt => document.addEventListener(evt, onFullscreenChange, true));

    /**
     * Intercept requestFullscreen at prototype level
     * This catches programmatic fullscreen requests even if site doesn't use event listeners
     */
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
                    setTimeout(lockPortrait, 100);
                    return result;
                };
            }
        });
    } catch (e) {
        console.warn(LOG, 'requestFullscreen interception failed:', e);
    }

    /**
     * Track screen orientation changes (if user rotates device)
     */
    try {
        if (screen.orientation && screen.orientation.addEventListener) {
            screen.orientation.addEventListener('change', () => {
                if (isFullscreen()) lockPortrait();
            });
        }
    } catch (e) { /* ignore */ }

    /**
     * Initial attempt on page load
     */
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(lockPortrait, 200);
    } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(lockPortrait, 200));
    }

    console.log(LOG, 'Script loaded successfully.');
})();