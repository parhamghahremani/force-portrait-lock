# Compatibility — Force Portrait Lock

## Verified Environments

| Environment | Version | Status | Test Date | Notes |
|-------------|---------|--------|-----------|-------|
| Firefox Desktop (Windows 11) | 133+ | ⏳ Pending | — | Primary desktop target |
| Firefox Desktop (macOS) | 133+ | ⏳ Pending | — | Untested |
| Firefox Desktop (Linux) | 133+ | ⏳ Pending | — | Untested |
| Firefox for Android | 133+ | ⏳ Pending | — | **Primary target** |
| Tampermonkey (Firefox) | 5.3+ | ⏳ Pending | — | Required |

## Platform Differences

### Firefox Desktop vs Firefox Android

| Aspect | Desktop | Android |
|--------|---------|---------|
| `screen.orientation.lock` | ✅ Full support | ✅ Full support |
| `screen.mozLockOrientation` | ✅ Legacy support | ✅ Legacy support |
| `fullscreenchange` event | ✅ Standard | ✅ Standard + `mozfullscreenchange` |
| `requestFullscreen` | ✅ Standard | ✅ Standard + `mozRequestFullScreen` |
| User gesture required | Yes | Yes |
| Iframe fullscreen | Limited | Limited |
| Orientation lock in iframe | Blocked cross-origin | Blocked cross-origin |

### API Availability by Firefox Version

| API | Firefox 59+ | Firefox 70+ | Firefox 90+ | Firefox 110+ |
|-----|-------------|-------------|-------------|--------------|
| `screen.orientation.lock` | ✅ | ✅ | ✅ | ✅ |
| `screen.orientation.unlock` | ✅ | ✅ | ✅ | ✅ |
| `screen.orientation.change` | ✅ | ✅ | ✅ | ✅ |
| `screen.mozLockOrientation` | ✅ | ✅ | ✅ (deprecated) | ⚠️ May warn |
| `screen.lockOrientation` | ✅ | ✅ | ✅ (deprecated) | ⚠️ May warn |
| `fullscreenchange` | ✅ | ✅ | ✅ | ✅ |
| `mozfullscreenchange` | ✅ | ✅ | ✅ | ✅ |

## Untested / Unverified

| Environment | Reason |
|-------------|--------|
| Chrome/Edge with Tampermonkey | Not target platform |
| Safari with userscript manager | Not target platform |
| Firefox iOS | No extension support |
| Samsung Internet | Not tested |
| Older Firefox (<59) | Legacy API fallback untested |

## Known Platform Constraints

### Firefox Android
- Tampermonkey installation requires sideloading or specific versions
- Some Android versions may restrict orientation lock in browser
- Fullscreen API behavior may vary by device manufacturer

### Cross-Origin Iframes
- Browser security policy blocks `screen.orientation` in cross-origin iframes
- Script will log warning: "هیچ روش قفل جهتی پشتیبانی نشد — احتمالاً در iframe محدود شده‌ایم"
- This is a browser limitation, not a script bug

### User Gesture Requirement
- Browsers require user interaction before allowing fullscreen
- Script cannot trigger fullscreen programmatically
- This is expected behavior

## Testing Matrix

| Test Case | Desktop Firefox | Android Firefox |
|-----------|-----------------|-----------------|
| Video fullscreen → portrait lock | ⏳ | ⏳ |
| Rotate device in fullscreen → re-lock | ⏳ | ⏳ |
| Exit fullscreen → unlock | ⏳ | ⏳ |
| Multiple fullscreen entries | ⏳ | ⏳ |
| Iframe video fullscreen | ⏳ | ⏳ |
| Page load logging | ⏳ | ⏳ |
| Console error-free | ⏳ | ⏳ |

## Reporting Compatibility Issues

When reporting issues, include:
1. Firefox version (Desktop: `about:support`, Android: Settings → About)
2. Tampermonkey version
3. Device model (for Android)
4. Website URL where issue occurs
5. Console logs with `[PortraitLock]` prefix
6. Steps to reproduce