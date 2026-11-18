# Architecture — Force Portrait Lock

## Overview

Single-file userscript architecture with no build step. All logic contained in `force-portrait-lock.user.js` wrapped in an IIFE.

## Module Structure

```
force-portrait-lock.user.js
├── IIFE Wrapper
│   ├── Constants
│   │   ├── LOG = '[PortraitLock]'
│   │   ├── LOCK_COOLDOWN = 300
│   │   └── lastLockAttempt = 0
│   ├── Core Functions
│   │   ├── lockPortrait() — Main locking logic with fallback chain
│   │   ├── tryLegacyLock() — Legacy API attempts
│   │   ├── unlockOrientation() — Cleanup on fullscreen exit
│   │   ├── isFullscreen() — Cross-browser fullscreen detection
│   │   └── onFullscreenChange() — Event handler
│   ├── Event Registration
│   │   ├── fullscreenchange listeners (4 prefixes)
│   │   ├── requestFullscreen prototype patching (4 methods)
│   │   └── screen.orientation.change listener
│   └── Initialization
│       └── DOMContentLoaded / readyState check → initial lock attempt
```

## Data Flow

```
Page Load
    ↓
IIFE Executes (document-start)
    ↓
Register Event Listeners
    ↓
Patch Element.prototype.requestFullscreen
    ↓
Initial Lock Attempt (200ms delay)
    ↓
[User Interaction → Fullscreen Entry]
    ↓
fullscreenchange Event Fires
    ↓
onFullscreenChange() → isFullscreen() → true
    ↓
setTimeout(lockPortrait, 100ms) → lockPortrait()
    ↓
Try Standard API → Success? → Done
    ↓
Try Legacy APIs in Order → Success? → Done
    ↓
All Failed → Log Warning
    ↓
[Device Rotation During Fullscreen]
    ↓
screen.orientation.change Event
    ↓
isFullscreen() → true → lockPortrait()
    ↓
[User Exits Fullscreen]
    ↓
fullscreenchange Event Fires
    ↓
onFullscreenChange() → isFullscreen() → false
    ↓
unlockOrientation()
```

## Key Functions

### `lockPortrait()`
Main entry point for orientation locking.
- Enforces 300ms cooldown via `lastLockAttempt`
- Attempts standard `screen.orientation.lock('portrait')` first
- On rejection, calls `tryLegacyLock()`
- Logs success/failure with `[PortraitLock]` prefix

### `tryLegacyLock()`
Fallback chain for older APIs:
1. `screen.lockOrientation('portrait')`
2. `screen.mozLockOrientation('portrait')`
3. `screen.webkitLockOrientation('portrait')`
Returns on first success, logs warning if all fail.

### `unlockOrientation()`
Cleanup function called on fullscreen exit.
Attempts unlock in priority order:
1. `screen.orientation.unlock()`
2. `screen.unlockOrientation()`
3. `screen.mozUnlockOrientation()`
Silently ignores errors.

### `isFullscreen()`
Cross-browser fullscreen detection.
Checks: `document.fullscreenElement`, `mozFullScreenElement`, `webkitFullscreenElement`, `msFullscreenElement`

### `onFullscreenChange()`
Event handler for fullscreen transitions.
- On entry: schedules `lockPortrait()` at 100ms and 500ms
- On exit: calls `unlockOrientation()`

## Prototype Patching

Wraps `Element.prototype.requestFullscreen` and variants:
```javascript
const original = proto[method];
proto[method] = function (...args) {
    const result = original.apply(this, args);
    setTimeout(lockPortrait, 100);
    return result;
};
```
Ensures detection even if site doesn't trigger standard events.

## Orientation Change Monitoring

```javascript
screen.orientation.addEventListener('change', () => {
    if (isFullscreen()) lockPortrait();
});
```
Re-applies lock if user rotates device while in fullscreen.

## Initialization Timing

- `@run-at document-start`: Runs before DOM construction
- If `document.readyState` is `complete` or `interactive`: 200ms timeout
- Otherwise: waits for `DOMContentLoaded` then 200ms timeout
- Ensures `screen.orientation` API is available

## Error Handling Strategy

- All API calls wrapped in try/catch
- Promise rejections caught with `.catch()`
- Failures logged with `console.warn`, not `console.error`
- Script continues monitoring after any single failure
- No uncaught exceptions should reach global scope

## Performance Characteristics

- **Memory**: Minimal — only a few function references and event listeners
- **CPU**: Near-zero when not in fullscreen
- **Network**: None — no external requests
- **Startup**: <1ms IIFE execution + listener registration
- **Fullscreen transition**: ~2-3 API calls max with cooldown

## Browser API Compatibility Matrix

| API | Firefox for Android | Chrome Android | Safari iOS |
|-----|---------------------|----------------|------------|
| screen.orientation.lock | ✅ | ✅ | ✅ |
| screen.orientation.unlock | ✅ | ✅ | ✅ |
| screen.orientation.change | ✅ | ✅ | ✅ |
| screen.lockOrientation | ✅ (legacy) | ❌ | ❌ |
| screen.mozLockOrientation | ✅ | ❌ | ❌ |
| screen.webkitLockOrientation | ❌ | ✅ (legacy) | ✅ (legacy) |
| fullscreenchange | ✅ | ✅ | ✅ |
| mozfullscreenchange | ✅ | ❌ | ❌ |
| webkitfullscreenchange | ❌ | ✅ | ✅ |

> **Note:** This script targets Firefox for Android only. Other browsers/platforms listed for reference only.