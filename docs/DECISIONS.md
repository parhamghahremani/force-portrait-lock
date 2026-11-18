# Technical Decisions — Force Portrait Lock

## DEC-001: Single-File Architecture (No Build Step)

**Date:** 2026-11-19  
**Status:** Accepted

### Context
The imported script is a single IIFE-wrapped file with no dependencies.

### Decision
Keep as single-file userscript. No bundler, transpiler, or build tooling.

### Rationale
- Simplicity: Direct editing, immediate testing
- Tampermonkey compatibility: Userscripts traditionally single-file
- No dependencies: Zero external libraries used
- Performance: No build overhead, minimal file size

### Consequences
- ES6+ features limited to browser support baseline
- No TypeScript, linting, or automated formatting in build
- Manual version management in metadata block

---

## DEC-002: Multi-Method Fallback Chain for Orientation Lock

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Browser support for Screen Orientation API varies; legacy APIs still needed for older Firefox/Android versions.

### Decision
Implement priority-based fallback chain:
1. `screen.orientation.lock('portrait')` — Standard
2. `screen.lockOrientation('portrait')` — Legacy standard
3. `screen.mozLockOrientation('portrait')` — Firefox legacy
4. `screen.webkitLockOrientation('portrait')` — WebKit legacy

### Rationale
- Maximizes compatibility across Firefox versions
- Standard API first for modern browsers
- Legacy fallbacks for older Firefox Android
- Graceful degradation with warning log

### Consequences
- More code paths to maintain
- Cooldown applies to entire chain
- Legacy APIs deprecated but still functional

---

## DEC-003: Prototype Patching for requestFullscreen

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Some sites trigger fullscreen programmatically without firing standard events reliably.

### Decision
Patch `Element.prototype.requestFullscreen` and vendor variants to intercept calls and trigger lock.

### Rationale
- Catches programmatic fullscreen requests
- Works even if site doesn't use event listeners
- Minimal overhead (single wrapper per method)

### Consequences
- Global side effect on `Element.prototype`
- Potential conflict with other scripts patching same methods
- No cleanup on script unload (not applicable in userscript context)
- Wrapped in try/catch for safety

---

## DEC-004: 300ms Cooldown Between Lock Attempts

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Rapid fullscreen transitions or orientation changes could spam orientation API calls.

### Decision
Enforce minimum 300ms between `lockPortrait()` executions using timestamp comparison.

### Rationale
- Prevents API rate limiting / promise rejection storms
- Reduces battery drain on mobile
- Simple implementation, no additional state

### Consequences
- May delay lock on rapid transitions
- 300ms chosen empirically — may need tuning
- Cooldown applies per-script-instance (not shared across tabs)

---

## DEC-005: Double setTimeout on Fullscreen Entry (100ms + 500ms)

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted (with note)

### Context
Browser may need time to complete its own rotation handling before script applies lock.

### Decision
Schedule two lock attempts: 100ms and 500ms after fullscreen entry.

### Rationale
- First attempt catches early opportunity
- Second attempt ensures lock if first missed timing
- Cooldown prevents actual duplicate API calls

### Consequences
- Slight redundancy (cooldown filters second call if first succeeds)
- Could be optimized with promise-based approach
- Low risk, simple implementation

---

## DEC-006: @grant none Execution Model

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Script uses only standard Web APIs, no GM_* functions.

### Decision
Declare `@grant none` for minimal permission surface.

### Rationale
- Security: No elevated privileges
- Compatibility: Works in all Tampermonkey injection modes
- Transparency: Users see no permission warnings

### Consequences
- Cannot use `GM_xmlhttpRequest`, `GM_setValue`, etc.
- Cannot use `@require` for external libraries
- Limited to same-origin policies

---

## DEC-007: @run-at document-start

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Need to intercept fullscreen as early as possible.

### Decision
Run at `document-start` before DOM construction.

### Rationale
- Prototype patching must happen before page scripts call `requestFullscreen`
- Event listeners registered before any fullscreen events fire
- Initial lock attempt scheduled appropriately

### Consequences
- `document.body` not available initially
- Must check `document.readyState` for initialization timing
- No DOM manipulation at startup (script doesn't need it)

---

## DEC-008: Persian Localization in Metadata

**Date:** 2026-11-19 (from imported script)  
**Status:** Accepted

### Context
Target audience includes Persian-speaking users (Iran).

### Decision
Include `@name:fa` and `@description:fa` in metadata.

### Rationale
- Tampermonkey displays localized name/description
- Improves discoverability for Persian users
- No runtime cost (metadata only)

### Consequences
- Metadata block slightly larger
- Must maintain both languages for updates

---

## DEC-009: Private GitHub Repository by Default

**Date:** 2026-11-19 (workspace policy)  
**Status:** Accepted

### Context
Workspace rules mandate Private repos unless explicitly approved public.

### Decision
Create `parhamghahremani/force-portrait-lock` as Private.

### Rationale
- Follows workspace security policy
- Can be made public later if desired
- Protects any future proprietary modifications

### Consequences
- No public Tampermonkey gallery listing
- Manual installation required (raw GitHub URL)
- Update checks won't work via `@updateURL` unless made public

---

## DEC-010: Backup Structure with Immutable Original

**Date:** 2026-11-19 (workspace policy)  
**Status:** Accepted

### Context
Workspace requires permanent local backups with immutable original import.

### Decision
Structure:
- `backups/imported-original/` — never modified, SHA-256 recorded
- `backups/pre-change/` — before each change batch
- `backups/full-snapshots/` — after stable milestones
- `backups/releases/` — release ZIPs
- `backups/git-bundles/` — Git history bundles
- `backups/checksums/` — SHA-256 files
- `backups/BACKUP_MANIFEST.md` — index

### Rationale
- Immutable original preserves exact received state
- Multiple backup types for different recovery scenarios
- Git bundles capture history, snapshots capture working tree
- Manifest enables verification and auditing

### Consequences
- Disk usage grows over time (never auto-pruned)
- Manual backup creation required at each milestone
- Checksums must be verified periodically