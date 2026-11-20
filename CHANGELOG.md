# Changelog

All notable changes to this project will be documented in this format.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-11-19

### Added
- Initial import of "Force Portrait Lock (Fullscreen)" userscript v2.0
- Multi-method orientation locking (standard + legacy APIs)
- Fullscreen change event listeners with all browser prefixes
- Prototype patching for `requestFullscreen` interception
- Screen orientation change monitoring for re-locking
- Cooldown mechanism (300ms) to prevent excessive lock attempts
- Graceful unlock on fullscreen exit
- Comprehensive logging with `[PortraitLock]` prefix

### Documentation
- Created README.md with installation, usage, and technical details
- Created CLAUDE.md with project-specific instructions
- Created PROJECT_STATUS.md with current state tracking
- Created docs/ structure with SPECIFICATION.md, ARCHITECTURE.md, etc.

### Infrastructure
- Initialized local Git repository
- Created Private GitHub repository at parhamghahremani/force-portrait-lock
- Set up backup structure (imported-original, pre-change, full-snapshots, releases, git-bundles, checksums)
- Created .gitignore excluding node_modules, backups/, dist/, etc.
- Created BACKUP_MANIFEST.md with import record
- **Pushed initial commit (fa55f2f) and v2.0.0 tag to GitHub**

### Clarified
- **Target platform: Firefox for Android only** — not for Desktop Firefox

## [2.0.1] - 2026-11-19

### Changed
- **Full English rewrite**: All code comments, console logs, and metadata now in English
- Removed Persian localization from metadata (`@name:fa`, `@description:fa`)
- Updated `@namespace` to point to GitHub repository
- Updated `@author` to `parhamghahremani`
- **Clarified target platform: Firefox for Android only** in README.md and documentation

### Added
- `@icon` metadata with embedded base64 SVG icon
- `versions/` folder for permanent version archival
- Archived v2.0.0 and v2.0.1 in `versions/v2.0.0/` and `versions/v2.0.1/`

### Infrastructure
- Pre-change backup created before modification
- Version bumped to 2.0.1

## [2.0.2] - 2026-11-19

### Changed
- **Aggressive mode implementation** — Maximum reliability for Firefox Android
- **Bug Fix B-01**: Cooldown now tracks completion time (not start time)
- **Bug Fix B-02**: Legacy lock (`tryLegacyLock`) now in same promise chain, respects cooldown
- **Bug Fix B-03**: Removed meaningless initial lock on page load — only attempts if already in fullscreen
- **Bug Fix B-04**: Unlock resets cooldown (`lastLockCompleted = 0`) for immediate re-lock on next fullscreen
- **Bug Fix B-05**: Added proper cleanup handlers (`pagehide`/`unload` with `once: true`)

### Added
- **Aggressive API Patching**: Blocks landscape lock attempts at API level (standard + legacy)
- **Unlock Blocking During Fullscreen**: Prevents any unlock call while fullscreen is active
- **CSS Fallback Injection**: Visual rotation for landscape content in fullscreen (`@media (orientation: landscape)` with `:fullscreen` selector)
- **Promise-Based Retry**: Replaced double `setTimeout` with single retry chain (300ms delay)
- **Video Element CSS Fix**: `object-fit: contain` for fullscreen videos
- `versions/v2.0.2.user.js` — Permanent archival in flat naming format

### Removed
- Unused `isLocked` variable (ESLint clean)

### Infrastructure
- Build system (build.js, package.json, eslint.config.mjs, .prettierrc) with npm scripts
- PowerShell backup scripts (`create-backup.ps1`, `create-zip-backup.ps1`)
- .claude/launch.json for dev server config
- ESLint clean pass (no warnings)
- Version bumped to 2.0.2
- Tags v2.0.0, v2.0.1, v2.0.2 pushed to GitHub

## [2.0.3] - 2026-11-19

### Changed
- **Complete rewrite with video-only fullscreen detection** — Only locks orientation for video fullscreen (`<video>`, `<iframe>`, or container with video), not whole-page fullscreen
- **Removed CSS fallback** — `:root:fullscreen` transform approach removed (didn't work for video, broke layout in Chromium)
- **Removed `requestFullscreen` prototype patching** — Relies only on `fullscreenchange` events
- **Removed cooldown mechanism** — Replaced with `inflight` promise deduplication and fixed retry delays (300ms, 900ms)
- **Patch methods on prototype** — Uses `patchMethod` helper to patch where methods actually live (prototype or instance)
- **Update URLs point to `dist/`** — Auto-update now works with stable `dist/force-portrait-lock.user.js`
- **Removed `@noframes false`** — Default behavior (run in all frames) restored
- **Debug mode** — `DEBUG = false` by default, enable for verbose logging

### Added
- **Video-specific fullscreen detection** — `isVideoFullscreen()` checks for `<video>`, `<iframe>`, or container with video (including Shadow DOM)
- **Retry delays** — `RETRY_DELAYS = [300, 900]` for Firefox Android's own orientation locking
- **Media event listeners** — `loadedmetadata` and `resize` on video elements trigger re-lock
- **Guard against double injection** — `window.__forcePortraitLockInstalled` prevents duplicate execution
- **`pageshow` handling** — Restores lock after bfcache restoration (`event.persisted`)
- `versions/v2.0.3.user.js` — Permanent archival in flat naming format

### Fixed (from review report)
- **Item 1**: CSS fallback completely removed
- **Item 2**: Each patch isolated with try/catch via `patchMethod`
- **Item 3**: `inflight` promise prevents concurrent locks; `AbortError` handled correctly
- **Item 4**: No listener cleanup on `pagehide` — `bfcache` compatible
- **Item 5**: Patches only active during video fullscreen (not whole page)
- **Item 6**: All page-requested orientations (`landscape`, `any`, `natural`, ...) become `portrait` during video fullscreen
- **Item 7**: Update URL fixed to point to stable `dist/` file
- **Item 8**: `@noframes` removed
- **Item 9**: Proactive retries at fixed delays (not just on failure)
- **Item 10**: No cooldown on `orientationchange` — immediate re-lock
- **Item 11**: `requestFullscreen` patch removed entirely

### Removed
- CSS injection (`injectAntiLandscapeCSS`, `removeAntiLandscapeCSS`)
- `requestFullscreen` prototype patching
- Cooldown mechanism (`lastLockCompleted`, `LOCK_COOLDOWN`)
- `unload` event listener
- Meaningless initial fullscreen check at document-start

### Infrastructure
- ESLint globals updated for `HTMLVideoElement`, `HTMLIFrameElement`
- Version bumped to 2.0.3

## [2.0.4] - 2026-11-20

### Changed
- **Fixed stale lock bug** — A lock request pending longer than `STALE_MS = 600ms` is replaced instead of waited for forever (prevents permanent stuck state when Firefox's own code rewrites orientation)
- **Periodic orientation enforcement** — `ENFORCE_MS = 250ms` interval verifies orientation during video fullscreen and re-locks if landscape (works even without `orientationchange` event)
- **Forgot inflight lock on release** — `release()` now clears `inflight` so immediate re-entry to fullscreen issues a fresh lock
- **Fail streak limit** — `MAX_FAILS = 3` consecutive real failures stops periodic checks (unsupported device)
- **Enhanced DEBUG timeline** — `DEBUG = true` logs fullscreen changes, video playback events, orientation changes, lock attempts with timing and reason

### Added
- `STALE_MS = 600` — Threshold after which a pending lock is considered stale
- `ENFORCE_MS = 250` — Interval for proactive orientation verification
- `MAX_FAILS = 3` — Maximum consecutive real failures before giving up
- `failStreak` counter — Tracks consecutive failed lock attempts
- `enforcer` interval — Periodic orientation check during video fullscreen
- `describeOrientation()` / `isLandscapeNow()` helpers for DEBUG and enforcement
- `T0` timestamp + `+Xms` prefix in DEBUG logs for precise timeline
- DEBUG-only listeners for video playback events (`play`, `pause`, `playing`, `waiting`, `seeking`, `seeked`, `ended`)
- `versions/v2.0.4.user.js` — Permanent archival in flat naming format

### Fixed (from 2.0.3 issues)
- **Core bug**: Lock promise could stay pending forever when Firefox rewrites orientation while waiting for rotation — new lock now aborts stale one
- **Re-entry bug**: `release()` didn't clear `inflight` — immediate re-entry reused dead lock
- **No enforcement**: No periodic check — now runs every 250ms during video fullscreen
- **No failure limit**: Could loop forever on unsupported device — now stops after 3 real failures

### Infrastructure
- ESLint globals updated for `setInterval`, `clearInterval`
- Version bumped to 2.0.4
- Package.json version updated

## [Unreleased]

### Planned
- Manual testing in **Firefox for Android** (primary and only target)
- Potential retry delay tuning based on real-world testing
- Optional configuration via GM_config or script settings