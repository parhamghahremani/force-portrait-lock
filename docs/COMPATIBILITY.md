# Compatibility — Force Portrait Lock

## Target Platform

**This script is designed exclusively for Firefox for Android.**

| Environment | Version | Status | Notes |
|-------------|---------|--------|-------|
| **Firefox for Android** | 133+ | ✅ **Primary & Only Target** | Requires Tampermonkey |
| Firefox Desktop (Windows/macOS/Linux) | Any | ❌ **Not Supported** | Orientation locking behavior differs |
| Other browsers (Chrome, Edge, Safari, etc.) | Any | ❌ **Not Supported** | Not tested, not intended |

## Platform Differences

### Why Not Firefox Desktop?

- Desktop Firefox does not typically rotate screen orientation
- Fullscreen API behavior differs significantly between desktop and mobile
- Orientation lock APIs (`screen.orientation.lock`, `mozLockOrientation`) are primarily mobile-focused
- The script's purpose (forcing portrait during video fullscreen) is a mobile-specific need

### Firefox for Android Specifics

| Aspect | Support |
|--------|---------|
| `screen.orientation.lock` | ✅ Full support |
| `screen.mozLockOrientation` | ✅ Legacy support |
| `fullscreenchange` event | ✅ Standard + `mozfullscreenchange` |
| `requestFullscreen` | ✅ Standard + `mozRequestFullScreen` |
| User gesture required | Yes |
| Iframe fullscreen | Limited |
| Orientation lock in iframe | Blocked cross-origin |

### API Availability by Firefox Version (Android)

| API | Firefox 59+ | Firefox 70+ | Firefox 90+ | Firefox 110+ |
|-----|-------------|-------------|-------------|--------------|
| `screen.orientation.lock` | ✅ | ✅ | ✅ | ✅ |
| `screen.orientation.unlock` | ✅ | ✅ | ✅ | ✅ |
| `screen.orientation.change` | ✅ | ✅ | ✅ | ✅ |
| `screen.mozLockOrientation` | ✅ | ✅ | ✅ (deprecated) | ⚠️ May warn |
| `screen.lockOrientation` | ✅ | ✅ | ✅ (deprecated) | ⚠️ May warn |
| `fullscreenchange` | ✅ | ✅ | ✅ | ✅ |
| `mozfullscreenchange` | ✅ | ✅ | ✅ | ✅ |

## Known Platform Constraints

### Firefox Android
- Tampermonkey installation requires sideloading or specific versions (not on AMO)
- Some Android versions may restrict orientation lock in browser
- Fullscreen API behavior may vary by device manufacturer

### Cross-Origin Iframes
- Browser security policy blocks `screen.orientation` in cross-origin iframes
- Script will log warning: "No orientation lock method supported — likely restricted in iframe."
- This is a browser limitation, not a script bug

### User Gesture Requirement
- Browsers require user interaction before allowing fullscreen
- Script cannot trigger fullscreen programmatically
- This is expected behavior

## Testing Matrix

| Test Case | Firefox for Android |
|-----------|---------------------|
| Video fullscreen → portrait lock | ⏳ Pending |
| Rotate device in fullscreen → re-lock | ⏳ Pending |
| Exit fullscreen → unlock | ⏳ Pending |
| Multiple fullscreen entries | ⏳ Pending |
| Iframe video fullscreen | ⏳ Pending |
| Page load logging | ⏳ Pending |
| Console error-free | ⏳ Pending |

## Reporting Compatibility Issues

When reporting issues, include:
1. Firefox for Android version (Settings → About)
2. Tampermonkey version
3. Device model (e.g., Pixel 8, Samsung Galaxy S24)
4. Website URL where issue occurs
5. Console logs with `[PortraitLock]` prefix
6. Steps to reproduce