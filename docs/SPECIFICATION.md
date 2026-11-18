# Specification — Force Portrait Lock

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Detect when any element enters fullscreen mode | Critical |
| FR-02 | Force screen orientation to portrait when fullscreen is active | Critical |
| FR-03 | Re-apply portrait lock if device orientation changes during fullscreen | High |
| FR-04 | Unlock orientation when exiting fullscreen | Critical |
| FR-05 | Work on all websites (`@match *://*/*`) | Critical |
| FR-06 | Run at document-start for early interception | High |

### Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-01 | Compatible with Firefox Desktop (Windows/macOS/Linux) | High |
| NFR-02 | Compatible with Firefox for Android (primary target) | Critical |
| NFR-03 | No required permissions (`@grant none`) | High |
| NFR-04 | No external dependencies | High |
| NFR-05 | Minimal performance overhead | Medium |
| NFR-06 | Graceful degradation when APIs unavailable | High |

---

## Behavior Specification

### Fullscreen Detection

The script MUST detect fullscreen entry via:
1. **Event listeners** on `document` for:
   - `fullscreenchange` (standard)
   - `mozfullscreenchange` (Firefox)
   - `webkitfullscreenchange` (WebKit/Blink)
   - `MSFullscreenChange` (IE/Edge legacy)
2. **Prototype patching** of `Element.prototype.requestFullscreen` and vendor variants to intercept programmatic calls

### Orientation Locking

On fullscreen entry, the script MUST attempt orientation lock in this priority order:

1. **Standard API**: `screen.orientation.lock('portrait')`
   - Returns Promise, handle success/error
   - On error, fall back to next method

2. **Legacy Standard**: `screen.lockOrientation('portrait')`
   - Synchronous, returns boolean

3. **Firefox Legacy**: `screen.mozLockOrientation('portrait')`
   - Synchronous, returns boolean

4. **WebKit Legacy**: `screen.webkitLockOrientation('portrait')`
   - Synchronous, returns boolean

If all methods fail, log warning and continue monitoring.

### Re-lock on Orientation Change

If `screen.orientation` API is available, listen for `change` event.
When fired AND fullscreen is active, re-attempt portrait lock.

### Cooldown Mechanism

Enforce minimum 300ms between lock attempts to prevent:
- Excessive API calls
- Promise rejection storms
- Battery drain

### Cleanup on Fullscreen Exit

When fullscreen ends, call unlock in priority order:
1. `screen.orientation.unlock()`
2. `screen.unlockOrientation()`
3. `screen.mozUnlockOrientation()`

---

## Acceptance Criteria

| Scenario | Expected Result |
|----------|-----------------|
| User enters fullscreen on video page | Portrait lock engages within 500ms |
| User rotates device to landscape in fullscreen | Script re-locks to portrait |
| User exits fullscreen | Orientation unlocks, device free to rotate |
| Page loads with script installed | No errors in console, `[PortraitLock]` log appears |
| Screen Orientation API unavailable | Falls back to legacy APIs gracefully |
| All orientation APIs unavailable | Logs warning, continues monitoring |
| Cross-origin iframe enters fullscreen | Script may not detect (browser limitation) |

---

## Constraints

- **Single file**: No build step, no modules, no bundling
- **No external resources**: No `@require`, `@resource`, `@connect`
- **No storage**: No `GM_setValue`, `GM_getValue`, `localStorage`
- **Tampermonkey only**: Not tested with other userscript managers
- **Firefox focus**: Primary testing on Firefox Desktop + Firefox Android