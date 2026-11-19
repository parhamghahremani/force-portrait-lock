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

## [Unreleased]

### Planned
- Manual testing in **Firefox for Android** (primary and only target)
- Potential cooldown tuning based on real-world testing
- Optional configuration via GM_config or script settings