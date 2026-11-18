# Project Status — Force Portrait Lock

**Project**: `force-portrait-lock`  
**Canonical Name**: `force-portrait-lock`  
**Current Version**: `2.0.0` (imported)  
**Workspace Path**: `D:\Desktop\project\scripts\force-portrait-lock`  
**Last Updated**: 2026-11-19

---

## Current State

- ✅ Project folder created with canonical structure
- ✅ Original script preserved in `backups/imported-original/`
- ✅ Working copy at `force-portrait-lock.user.js`
- ✅ Documentation created (README.md, CHANGELOG.md, CLAUDE.md, this file)
- ✅ docs/ structure created
- ✅ .gitignore created
- ✅ Local Git repository initialized
- ✅ Private GitHub repository created: `parhamghahremani/force-portrait-lock`
- ✅ Backup structure established
- ⏳ Manual testing in Firefox Desktop — **PENDING**
- ⏳ Manual testing in Firefox Android — **PENDING**
- ⏳ GitHub synchronization — **PENDING** (awaits manual test approval)

---

## Completed Features (v2.0.0)

- Multi-method orientation locking (standard + 3 legacy fallbacks)
- Fullscreen change detection via prefixed events
- Prototype patching for `requestFullscreen` interception
- Screen orientation change monitoring for re-lock
- 300ms cooldown between lock attempts
- Graceful unlock on fullscreen exit
- Comprehensive logging with `[PortraitLock]` prefix
- `@grant none`, `@run-at document-start`, `@match *://*/*`

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
6. Push `v2.0.0` tag and commit to `origin/main`

---

## Git Status

- **Local repo**: Initialized, no commits yet
- **Remote**: `origin` → `https://github.com/parhamghahremani/force-portrait-lock` (Private)
- **Branch**: `main` (to be created on first commit)
- **Uncommitted files**: All project files (initial commit pending)

---

## Backup Manifest (Latest)

| Backup Type | Path | SHA-256 | Date |
|-------------|------|---------|------|
| Imported Original | `backups/imported-original/force-portrait-lock-2.0-original.user.js` | `9ad844076c74d0cb6b68c87a3e7f911090251a53746044d2f81bed47af9d000c` | 2026-11-19 |