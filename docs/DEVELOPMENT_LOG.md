# Development Log — Force Portrait Lock

## 2026-11-19 — Initial Import & Project Setup

**Milestone:** Project initialized from imported userscript v2.0

### Actions
- Created project folder `force-portrait-lock` with canonical structure
- Preserved original script in `backups/imported-original/force-portrait-lock-2.0-original.user.js` (SHA-256: `9ad844076c74d0cb6b68c87a3e7f911090251a53746044d2f81bed47af9d000c`)
- Created working copy at `force-portrait-lock.user.js`
- Generated all project documentation:
  - README.md
  - CHANGELOG.md
  - CLAUDE.md
  - PROJECT_STATUS.md
  - docs/SPECIFICATION.md
  - docs/ARCHITECTURE.md
  - docs/DEVELOPMENT_GUIDE.md
  - docs/CONFIGURATION_AND_PERMISSIONS.md
  - docs/COMPATIBILITY.md
  - docs/MANUAL_TEST_PLAN.md
  - This file (DEVELOPMENT_LOG.md)
  - docs/DECISIONS.md
  - docs/KNOWN_ISSUES.md
  - docs/REFERENCES.md
- Created `.gitignore` with standard exclusions
- Initialized local Git repository
- Created Private GitHub repository: `parhamghahremani/force-portrait-lock`
- Established backup directory structure

### Source Script Analysis

Imported script (`Force Portrait Lock (Fullscreen)-2.0.user.js.txt`) features:
- Multi-method orientation locking (standard + 3 legacy fallbacks)
- Fullscreen detection via 4 prefixed events
- Prototype patching for `requestFullscreen` interception
- Screen orientation change monitoring
- 300ms cooldown between lock attempts
- Graceful unlock on fullscreen exit
- `@grant none`, `@run-at document-start`, `@match *://*/*`
- Persian localization in metadata (`@name:fa`, `@description:fa`)

### Technical Observations

1. **Cooldown mechanism**: Uses simple timestamp comparison — effective but could be enhanced with promise-based deduplication
2. **Double setTimeout on fullscreen entry**: 100ms and 500ms — provides redundancy but may cause double-lock attempts (cooldown prevents actual duplicate API calls)
3. **Prototype patching**: Modifies `Element.prototype` — affects all elements globally, potential for conflicts with other scripts
4. **Event listener capture phase**: Uses `{capture: true}` — good for early interception
5. **No cleanup of prototype patches**: Patches persist for page lifetime — acceptable for userscript context
6. **Initial lock attempt**: Runs on page load even without fullscreen — may be unnecessary but harmless

### Next Steps
- [ ] Manual testing in Firefox Desktop
- [ ] Manual testing in Firefox Android
- [ ] Record test results in MANUAL_TEST_PLAN.md
- [ ] Create stable snapshots and release artifacts
- [ ] User approval for stable release

---

## 2026-11-19 — GitHub Synchronization Complete

**Milestone:** Initial import pushed to GitHub

### Actions
- Initial commit created: `fa55f2f` ("chore: initial import of Force Portrait Lock v2.0.0")
- Pushed to `origin/master` (Private repo: parhamghahremani/force-portrait-lock)
- Created and pushed version tag `v2.0.0`
- Updated PROJECT_STATUS.md with current Git state
- Created BACKUP_MANIFEST.md with import record and checksum
- Created SHA-256 checksum file in backups/checksums/

### Technical Details
- Used token-based authentication for git push (gh CLI credential helper issue in this environment)
- Repository already existed on GitHub (created earlier), pushed to existing remote
- All 16 project files committed and pushed

---

## 2026-11-19 — v2.0.1 Release: Full English Rewrite + Icon

**Milestone:** Release v2.0.1 — Full English rewrite with icon

### Actions
- Rewrote all code comments, console logs, and metadata to English
- Removed Persian localization from metadata (`@name:fa`, `@description:fa`)
- Updated `@namespace` to GitHub repository URL
- Updated `@author` to `parhamghahremani`
- Added `@icon` with embedded base64 SVG
- Bumped version to 2.0.1
- Updated CHANGELOG.md and PROJECT_STATUS.md
- Created pre-change backup, full snapshot, release archive, Git bundle
- Verified all backups with SHA-256 checksums
- Committed changes (`59c430a`) and pushed to GitHub with tag `v2.0.1`

### Technical Details
- **Language policy compliance**: All technical artifacts now fully English per workspace rules
- **Icon**: Embedded base64 SVG (no external dependency)
- **Metadata cleanup**: Removed `@name:fa` and `@description:fa` — Persian only in user communication, not code
- **Namespace**: Changed from placeholder to actual GitHub repo URL
- **Author**: Updated to GitHub username
- **Backup strategy**: Pre-change snapshot before modification, full snapshot + release + Git bundle after

### Testing
- Static verification: syntax check, metadata validation, diff review
- Manual testing in Firefox Desktop/Android — **PENDING** (awaits user)

---

## Template for Future Entries

### YYYY-MM-DD — Brief Description

**Milestone:** [Feature/Bugfix/Refactor/Release]

#### Actions
- [ ] Action items

#### Technical Details
- Key implementation decisions
- Issues encountered
- Performance notes

#### Testing
- Test results
- Platform-specific observations