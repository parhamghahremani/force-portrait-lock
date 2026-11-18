# Configuration & Permissions — Force Portrait Lock

## Userscript Metadata

```javascript
// ==UserScript==
// @name         Force Portrait Lock (Fullscreen)
// @name:fa      قفل عمودی صفحه در تمام‌صفحه
// @namespace    https://github.com/portrait-lock
// @version      2.0.0
// @description  Forces screen orientation to portrait when entering fullscreen. Multi-method fallback for maximum compatibility on Firefox Android.
// @description:fa  صفحه را هنگام ورود به حالت تمام‌صفحه روی حالت عمودی قفل می‌کند.
// @author       You
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// ==/UserScript==
```

## Metadata Field Analysis

| Field | Value | Rationale |
|-------|-------|-----------|
| `@name` | Force Portrait Lock (Fullscreen) | Descriptive, identifies purpose |
| `@name:fa` | قفل عمودی صفحه در تمام‌صفحه | Persian localization for Iranian users |
| `@namespace` | https://github.com/portrait-lock | Unique identifier, not a real URL |
| `@version` | 2.0.0 | Matches CHANGELOG, Git tags |
| `@description` | English description | Required for Tampermonkey gallery |
| `@description:fa` | Persian description | Localization |
| `@author` | You | Placeholder, update on publish |
| `@match` | `*://*/*` | All origins, all paths — needed for universal fullscreen detection |
| `@run-at` | `document-start` | Early interception before page scripts |
| `@grant` | `none` | No GM_* APIs used, minimal permission surface |
| `@noframes` | `false` | Allow in iframes (may not work cross-origin) |

## Permission Surface

### Granted Permissions: **None** (`@grant none`)

The script uses only standard Web APIs:
- `screen.orientation.lock/unlock`
- `screen.lockOrientation/mozLockOrientation/webkitLockOrientation`
- `document.fullscreenElement` and prefixed variants
- `document.addEventListener` for fullscreen events
- `Element.prototype.requestFullscreen` patching
- `console.log/warn` for debugging

### No `@require`, `@resource`, `@connect`

- No external libraries
- No fetched resources
- No cross-origin requests

### `@match` Implications

`*://*/*` matches:
- All schemes (http, https, file, etc.)
- All domains
- All paths

This is necessary because fullscreen can be triggered on any website. No `@exclude` patterns are used.

## Tampermonkey Settings Compatibility

| Setting | Compatibility |
|---------|---------------|
| "Run in background pages" | Not applicable (no background logic) |
| "Run in incognito" | ✅ Works |
| "Run in frames" | ✅ Works (but cross-origin iframes limited by browser) |
| "Injection mode" | Any (script uses no DOM at document-start) |

## Firefox Android Specifics

- `@run-at document-start` supported
- `screen.orientation.lock` supported (Firefox 59+)
- `screen.mozLockOrientation` supported (legacy)
- Fullscreen API supported with `moz` prefix
- Tampermonkey on Firefox Android: limited to certain versions, sideload may be needed

## Version Synchronization

Keep these in sync:
- `@version` in userscript metadata
- `CHANGELOG.md` version header
- Git tag (`v2.0.0`)
- `PROJECT_STATUS.md` current version
- GitHub Release tag (if created)

## Update/Download URLs (Not Currently Configured)

```javascript
// @updateURL    https://github.com/parhamghahremani/force-portrait-lock/raw/main/force-portrait-lock.user.js
// @downloadURL  https://github.com/parhamghahremani/force-portrait-lock/raw/main/force-portrait-lock.user.js
```

Add when GitHub repository is set up and user approves public distribution endpoint. Currently Private repo only.