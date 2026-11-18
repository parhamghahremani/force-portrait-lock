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
- ✅ docs/ structure created (10 files)
- ✅ .gitignore created
- ✅ Local Git repository initialized with initial commit
- ✅ Private GitHub repository created: `parhamghahremani/force-portrait-lock`
- ✅ Initial commit pushed to GitHub (master branch)
- ✅ Version tag `v2.0.0` pushed to GitHub
- ✅ Version tag `v2.0.1` pushed to GitHub
- ✅ Backup structure established with manifest and checksums
- ✅ Pre-change backup created for v2.0.1
- ✅ **Versions folder created** at `versions/` with permanent archival (v2.0.0.user.js, v2.0.1.user.js)
- ✅ **PowerShell backup scripts created** (`create-backup.ps1`, `create-zip-backup.ps1`)
- ✅ **Full snapshots created** (tar.gz + ZIP)
- ✅ **Release archives created** (tar.gz + ZIP)
- ✅ **Git bundles created** (v2.0.1 + timestamped)
- ✅ **All checksums verified** (SHA-256)
- ⏳ Manual testing in **Firefox for Android** — **PENDING**
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

1. **Manual testing** in **Firefox for Android** with Tampermonkey
2. Record test results in `docs/MANUAL_TEST_PLAN.md`
3. If tests pass: create stable snapshot, ZIP release, Git bundle
4. **User approval** for GitHub synchronization

---

## Git Status

- **Local repo**: Commit `a13ef2c` (latest) — pushed to origin
- **Remote**: `origin` → `https://github.com/parhamghahremani/force-portrait-lock` (Private)
- **Branch**: `master` (pushed to origin)
- **Tags**: `v2.0.0`, `v2.0.1` (both pushed to origin)
- **Uncommitted files**: None (clean working tree)

---

## Backup Manifest (Latest)

| Backup Type | Path | SHA-256 | Date |
|-------------|------|---------|------|
| Imported Original | `backups/imported-original/force-portrait-lock-2.0-original.user.js` | `9ad844076c74d0cb6b68c87a3e7f911090251a53746044d2f81bed47af9d000c` | 2026-11-19 |
| Checksum File | `backups/checksums/force-portrait-lock-2.0-original.user.js.sha256` | — | 2026-11-19 |
| Pre-Change (v2.0.1) | `backups/pre-change/force-portrait-lock-pre-20261119-013910.tar.gz` | `f912fc5b67419405fc5b11d128f14f48c3e9cf579a2e53070d4e31d4fa07d13b` | 2026-11-19 |
| Full Snapshot (tar.gz) | `backups/full-snapshots/force-portrait-lock-full-20261119-014030.tar.gz` | `5571a679a90230d934fc1c1532157082c8b12032443fa87856d118390ec648ae` | 2026-11-19 |
| Full Snapshot (ZIP) | `backups/full-snapshots/force-portrait-lock-full-snapshot-2026-11-19_02-25-48.zip` | `fec4037ccb0599df318678142cbb1cce1bc079d5148993631ce5d34fd285ac87` | 2026-11-19 |
| Release (tar.gz) | `backups/releases/force-portrait-lock-v2.0.1.tar.gz` | `f47d505d60622494177dc10185d2ec422bbbb663059d59c3ee77c1da775fac38` | 2026-11-19 |
| Release (ZIP) | `backups/releases/force-portrait-lock-v2.0.1-2026-11-19_02-26-03.zip` | `592bfde1b818776f17650e482544e5f5d9b6d1448e548baf71af1f7550218db7` | 2026-11-19 |
| Git Bundle (v2.0.1) | `backups/git-bundles/force-portrait-lock-v2.0.1.bundle` | `3a93034fea78eb8a1bf3fe8a513e33cb3b86873d224c0cba7c8fcfbbe474b1a1` | 2026-11-19 |
| Git Bundle (timestamped) | `backups/git-bundles/force-portrait-lock-git-bundle-2026-11-19_02-25-48.bundle` | `553b4b37a99ec4de2a82283611ec7d86278ea7d3cfac0f827192bb51f2bde2ed` | 2026-11-19 |

---

## Backup Scripts

| Script | Purpose |
|--------|---------|
| `create-backup.ps1` | Creates full snapshot ZIP + git bundle, updates manifest |
| `create-zip-backup.ps1` | Creates release ZIP (source + docs), updates manifest |