# Known Issues — Force Portrait Lock

## Issue Template

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (KI-XXX) |
| **Title** | Brief summary |
| **Severity** | Critical / High / Medium / Low |
| **Status** | Open / Investigating / Workaround / Fixed / Won't Fix |
| **Platform** | Where observed |
| **Reproduction** | Steps to reproduce |
| **Impact** | User-facing impact |
| **Workaround** | Temporary mitigation |
| **Root Cause** | Technical explanation |
| **Fix Plan** | Proposed solution |

---

## KI-001: Cross-Origin Iframe Limitation

| Field | Value |
|-------|-------|
| **ID** | KI-001 |
| **Title** | Orientation lock fails in cross-origin iframes |
| **Severity** | Medium |
| **Status** | Open (Browser Limitation) |
| **Platform** | All (Firefox Desktop, Firefox Android) |
| **Reproduction** | 1. Open page with cross-origin video iframe (e.g., YouTube embed)<br>2. Click fullscreen on iframe player<br>3. Observe console: "هیچ روش قفل جهتی پشتیبانی نشد — احتمالاً در iframe محدود شده‌ایم" |
| **Impact** | Embedded videos on third-party sites won't portrait-lock |
| **Workaround** | User must open video on original site (youtube.com) |
| **Root Cause** | Browser security policy blocks `screen.orientation` API in cross-origin iframes. Same-origin policy prevents script access to parent frame's screen object. |
| **Fix Plan** | Won't Fix — Browser security boundary. Could explore `postMessage` coordination with parent frame if site cooperates, but not feasible for general case. |

---

## KI-002: Website Override After Lock

| Field | Value |
|-------|-------|
| **ID** | KI-002 |
| **Title** | Some websites re-apply landscape orientation after script locks portrait |
| **Severity** | Medium |
| **Status** | Investigating |
| **Platform** | Firefox Android (observed on some video sites) |
| **Reproduction** | 1. Enter fullscreen on video site<br>2. Script locks portrait<br>3. Site's own orientation logic switches to landscape |
| **Impact** | Portrait lock temporarily effective, then overridden |
| **Workaround** | None currently |
| **Root Cause** | Site may listen to orientation change and force landscape, or use CSS `@media (orientation: landscape)` with fullscreen-specific styles. Script's lock is not persistent against active site opposition. |
| **Fix Plan** | Consider `screen.orientation.addEventListener('change', ...)` re-lock already implemented. Could increase re-lock frequency or use `MutationObserver` on style changes. Needs testing to confirm if current re-lock handles this. |

---

## KI-003: Double Lock Attempt on Fullscreen Entry

| Field | Value |
|-------|-------|
| **ID** | KI-003 |
| **Title** | Two setTimeout calls (100ms + 500ms) may cause redundant lock attempts |
| **Severity** | Low |
| **Status** | Open (Accepted Trade-off) |
| **Platform** | All |
| **Reproduction** | 1. Enter fullscreen<br>2. Check console: two "قفل شد با..." logs may appear if first succeeds but cooldown expired |
| **Impact** | Minimal — extra API call, cooldown prevents storm |
| **Workaround** | Cooldown (300ms) filters second attempt if first succeeds quickly |
| **Root Cause** | Design choice: redundancy for reliability. 100ms catches early, 500ms catches late. Cooldown prevents actual duplicate if first succeeds. |
| **Fix Plan** | Could optimize with promise-based single attempt + retry on failure. Current behavior acceptable for v2.x. |

---

## KI-004: Prototype Patching Global Side Effect

| Field | Value |
|-------|-------|
| **ID** | KI-004 |
| **Title** | `Element.prototype.requestFullscreen` patching affects all scripts on page |
| **Severity** | Low |
| **Status** | Accepted |
| **Platform** | All |
| **Reproduction** | N/A — architectural characteristic |
| **Impact** | Other scripts calling `requestFullscreen` will trigger our lock (usually desired). Potential conflict if another script also patches same method. |
| **Workaround** | N/A |
| **Root Cause** | Prototype modification is global. Wrapped in try/catch. Uses `original.apply(this, args)` to preserve behavior. |
| **Fix Plan** | Accepted — standard userscript pattern. No cleanup needed (page unload resets). |

---

## KI-005: Initial Lock Attempt on Page Load

| Field | Value |
|-------|-------|
| **ID** | KI-005 |
| **Title** | Script attempts orientation lock on page load even without fullscreen |
| **Severity** | Low |
| **Status** | Open (Benign) |
| **Platform** | All |
| **Reproduction** | 1. Load any page with script installed<br>2. Console shows lock attempt (may fail if not in fullscreen) |
| **Impact** | Harmless — `screen.orientation.lock` rejects if not in fullscreen, caught by fallback chain |
| **Workaround** | N/A |
| **Root Cause** | Initialization code runs `setTimeout(lockPortrait, 200)` on `DOMContentLoaded` regardless of fullscreen state. |
| **Fix Plan** | Could guard with `if (isFullscreen())` before initial attempt. Low priority — current behavior logs warning but causes no harm. |

---

## KI-006: Cooldown Timer Not Persisted Across Page Loads

| Field | Value |
|-------|-------|
| **ID** | KI-006 |
| **Title** | Cooldown resets on page navigation/reload |
| **Severity** | Low |
| **Status** | Accepted |
| **Platform** | All |
| **Reproduction** | 1. Trigger fullscreen → lock<br>2. Navigate to new page quickly<br>3. New page load resets `lastLockAttempt = 0` |
| **Impact** | None — cooldown only prevents rapid calls within same page session |
| **Workaround** | N/A |
| **Root Cause** | Userscript re-injects on each page load, re-initializing variables. |
| **Fix Plan** | Accepted — per-page cooldown is correct behavior. Cross-page persistence not needed. |

---

## KI-007: No Support for `screen.orientation.angle` Based Logic

| Field | Value |
|-------|-------|
| **ID** | KI-007 |
| **Title** | Script doesn't read current orientation angle, only forces portrait |
| **Severity** | Low |
| **Status** | Accepted |
| **Platform** | All |
| **Reproduction** | N/A — feature not implemented |
| **Impact** | Cannot implement "lock to current orientation" mode |
| **Workaround** | N/A — script designed specifically for portrait lock |
| **Root Cause** | Requirements specify portrait-only lock for fullscreen video. |
| **Fix Plan** | Won't Fix — out of scope. Could be feature request for v3.0. |

---

## KI-008: Firefox Android Tampermonkey Installation Barrier

| Field | Value |
|-------|-------|
| **ID** | KI-008 |
| **Title** | Tampermonkey on Firefox Android requires sideloading or specific version |
| **Severity** | High (Distribution) |
| **Status** | Open (External Dependency) |
| **Platform** | Firefox Android |
| **Reproduction** | Try installing Tampermonkey from AMO on Firefox Android — may not be available |
| **Impact** | Primary target platform difficult to set up for end users |
| **Workaround** | Use Firefox Nightly/Preview with custom add-on collection, or sideload .xpi |
| **Root Cause** | Mozilla's add-on policies for Android Firefox |
| **Fix Plan** | Document installation steps in README. Consider alternative distribution (userstyles, native Android app) for future. |

---

## Resolution Tracking

| Issue | Resolved In Version | Resolution |
|-------|---------------------|------------|
| — | — | No issues resolved yet (initial import) |

---

## Reporting New Issues

When reporting a new issue:
1. Check if already listed above
2. Use the template format
3. Include: Firefox version, Tampermonkey version, device, site URL, console logs
4. Assign next available KI-XXX number