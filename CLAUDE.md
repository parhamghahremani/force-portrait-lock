# Project Instructions — Force Portrait Lock

**Project**: `force-portrait-lock`  
**Workspace**: `D:\Desktop\project\scripts\force-portrait-lock`  
**GitHub Repo**: `parhamghahremani/force-portrait-lock` (Private)  
**Main Script**: `force-portrait-lock.user.js` (root)  
**Version**: 2.0.1 (English rewrite + icon)

---

## Source Entry Point

- **Primary**: `force-portrait-lock.user.js` — standalone userscript, no build step
- **Backup**: `backups/imported-original/force-portrait-lock-2.0-original.user.js` — immutable original

---

## Constraints & Rules

1. **Single file architecture** — No build tooling needed. Edit `force-portrait-lock.user.js` directly.
2. **No external dependencies** — Uses only native browser APIs.
3. **@grant none** — Must remain compatible with `@grant none` execution model.
4. **@run-at document-start** — Script runs before DOM construction.
5. **Cross-browser prefixes** — Maintain all vendor prefixes for fullscreen/orientation APIs.
6. **Target platform: Firefox for Android ONLY** — Not for Desktop Firefox. Test on real Firefox Android with Tampermonkey.
7. **No automated tests** — Manual testing only per workspace policy.

---

## Key Implementation Details

### Orientation Locking Priority
1. `screen.orientation.lock('portrait')` — Standard API
2. `screen.lockOrientation('portrait')` — Legacy standard
3. `screen.mozLockOrientation('portrait')` — Firefox legacy
4. `screen.webkitLockOrientation('portrait')` — WebKit legacy

### Fullscreen Detection
- Events: `fullscreenchange`, `mozfullscreenchange`, `webkitfullscreenchange`, `MSFullscreenChange`
- Prototype patching: `Element.prototype.requestFullscreen` and variants
- Cooldown: 300ms between lock attempts (`LOCK_COOLDOWN`)

### Cleanup
- Unlock orientation on fullscreen exit via `screen.orientation.unlock()` or legacy equivalents
- All event listeners use `{capture: true}` for early interception

---

## Documentation Links

- `docs/SPECIFICATION.md` — Requirements, behavior, acceptance criteria
- `docs/ARCHITECTURE.md` — Module structure, data flow, lifecycle
- `docs/DEVELOPMENT_GUIDE.md` — Editing, backup, release process
- `docs/CONFIGURATION_AND_PERMISSIONS.md` — Metadata, grants, connects
- `docs/COMPATIBILITY.md` — Verified browsers, platform differences
- `docs/MANUAL_TEST_PLAN.md` — Reproducible test steps
- `docs/DEVELOPMENT_LOG.md` — Milestones and diagnosed problems
- `docs/DECISIONS.md` — Important technical decisions
- `docs/KNOWN_ISSUES.md` — Confirmed defects and workarounds
- `docs/REFERENCES.md` — Official documentation sources

---

## Backup & Version Workflow

1. Before changes: Create pre-change snapshot in `backups/pre-change/`
2. After stable milestone: Create full snapshot in `backups/full-snapshots/`, release ZIP in `backups/releases/`, Git bundle in `backups/git-bundles/`
3. Record all checksums in `backups/checksums/` and `backups/BACKUP_MANIFEST.md`
4. Never auto-delete backups
5. GitHub sync only after manual test + explicit approval

---

## Git & GitHub

- Local repo: `D:\Desktop\project\scripts\force-portrait-lock\.git`
- Remote: `origin` → `https://github.com/parhamghahremani/force-portrait-lock` (Private)
- Branch: `main`
- Tags: `v2.0.0`, `v2.0.1`, etc. (match `@version` in userscript)
- Commit messages: English, conventional format

---

## Manual Test Checklist (Firefox for Android + Tampermonkey)

1. Install script in Tampermonkey on Firefox for Android
2. Open a page with video player (YouTube, Vimeo, etc.)
3. Enter fullscreen — verify portrait lock engages
4. Rotate device to landscape — verify re-lock to portrait
5. Exit fullscreen — verify orientation unlocks
6. Check console for `[PortraitLock]` logs (use remote debugging or Firefox Android dev tools)

> **Note:** Desktop Firefox testing is NOT required. This script targets Firefox for Android only.