# Project Status — Force Portrait Lock

**Project**: `force-portrait-lock`  
**Canonical Name**: `force-portrait-lock`  
**Current Version**: `2.0.1` (English rewrite + icon)  
**Workspace Path**: `D:\Desktop\project\scripts\force-portrait-lock`  
**Last Updated**: 2026-11-19

---

## Current State

- ✅ Project folder created with canonical structure
- ✅ Original script preserved in `backups/imported-original/`
- ✅ Working copy at `force-portrait-lock.user.js` (v2.0.1 - fully English)
- ✅ Documentation created (README.md, CHANGELOG.md, CLAUDE.md, this file)
- ✅ docs/ structure created
- ✅ .gitignore created
- ✅ Local Git repository initialized with initial commit
- ✅ Private GitHub repository created: `parhamghahremani/force-portrait-lock`
- ✅ Initial commit pushed to GitHub (master branch)
- ✅ Version tag `v2.0.0` pushed to GitHub
- ✅ Backup structure established with manifest and checksums
- ✅ Pre-change backup created for v2.0.1
- ⏳ Manual testing in Firefox Desktop — **PENDING**
- ⏳ Manual testing in Firefox Android — **PENDING**
- ⏳ User approval for stable release v2.0.1 — **PENDING**

---

## Completed Features (v2.0.1)

- Multi-method orientation locking (standard + 3 legacy fallbacks)
- Fullscreen change detection via prefixed events
- Prototype patching for `requestFullscreen` interception
- Screen orientation change monitoring for re-lock
- 300ms cooldown between lock attempts
- Graceful unlock on fullscreen exit
- Comprehensive logging with `[PortraitLock]` prefix (English)
- `@grant none`, `@run-at document-start`, `@match *://*/*`
- `@icon` with embedded base64 SVG
- Fully English codebase (metadata, comments, logs)
- Updated `@namespace` and `@author`

---

## Known Limitations (Unverified)

| Limitation | Impact | Status |
|------------|--------|--------|
| Cross-origin iframe restriction | May not work in embedded players | Documented, untested |
| Website override of orientation | Sites may re-apply landscape after lock | Documented, untested |
| Firefox Android version variance | Behavior may differ across versions | Primary target, needs testing |
| User interaction required for fullscreen | Browser policy, not script limitation | Expected |

---

## Next Steps

1. **Manual testing** in Firefox Desktop with Tampermonkey
2. **Manual testing** in Firefox Android with Tampermonkey
3. Record test results in `docs/MANUAL_TEST_PLAN.md`
4. If tests pass: create stable snapshot, ZIP release, Git bundle
5. **User approval** for GitHub synchronization
6. Commit v2.0.1 changes and push `v2.0.1` tag to `origin/master`

---

## Git Status

- **Local repo**: Initialized with initial commit (`fa55f2f`), v2.0.1 changes uncommitted
- **Remote**: `origin` → `https://github.com/parhamghahremani/force-portrait-lock` (Private)
- **Branch**: `master` (pushed to origin)
- **Tags**: `v2.0.0` (pushed to origin)
- **Uncommitted files**: `force-portrait-lock.user.js`, `CHANGELOG.md`, `PROJECT_STATUS.md`

---

## Backup Manifest (Latest)

| Backup Type | Path | SHA-256 | Date |
|-------------|------|---------|------|
| Imported Original | `backups/imported-original/force-portrait-lock-2.0-original.user.js` | `9ad844076c74d0cb6b68c87a3e7f911090251a53746044d2f81bed47af9d000c` | 2026-11-19 |
| Checksum File | `backups/checksums/force-portrait-lock-2.0-original.user.js.sha256` | — | 2026-11-19 |