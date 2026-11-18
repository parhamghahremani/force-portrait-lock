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

## [2.0.1] - 2026-11-19

### Changed
- **Full English rewrite**: All code comments, console logs, and metadata now in English
- Removed Persian localization from metadata (`@name:fa`, `@description:fa`)
- Updated `@namespace` to point to GitHub repository
- Updated `@author` to `parhamghahremani`

### Added
- `@icon` metadata with embedded base64 SVG icon

### Infrastructure
- Pre-change backup created before modification
- Version bumped to 2.0.1

## [Unreleased]

### Planned
- Manual testing in Firefox Desktop and Firefox Android
- Potential cooldown tuning based on real-world testing
- Optional configuration via GM_config or script settings