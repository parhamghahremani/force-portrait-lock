# Force Portrait Lock (Fullscreen)

A Tampermonkey userscript that forces screen orientation to portrait when entering fullscreen mode, with multi-method fallback for maximum compatibility on Firefox Android.

## Purpose

When a video or element enters fullscreen on mobile Firefox, the browser may allow or trigger landscape orientation. This script detects fullscreen changes and forces the screen orientation back to portrait using multiple API fallbacks.

## Features

- **Multi-method orientation locking**: Uses standard Screen Orientation API first, falls back to legacy vendor-prefixed APIs (`lockOrientation`, `mozLockOrientation`, `webkitLockOrientation`)
- **Fullscreen detection**: Listens to `fullscreenchange` events across all browser prefixes
- **Prototype patching**: Intercepts `requestFullscreen` calls to catch programmatic fullscreen requests
- **Orientation change monitoring**: Re-locks portrait if the user rotates the device while in fullscreen
- **Cooldown mechanism**: Prevents excessive lock attempts (300ms cooldown)
- **Graceful cleanup**: Unlocks orientation when exiting fullscreen
- **No permissions required**: Runs with `@grant none`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Firefox (Desktop or Android)
2. Click [here](https://github.com/parhamghahremani/force-portrait-lock/raw/main/force-portrait-lock.user.js) to install the userscript
3. Confirm installation in Tampermonkey

## Usage

The script runs automatically on all pages (`@match *://*/*`). When any element enters fullscreen, the script will:

1. Wait briefly for browser's automatic rotation handling
2. Force orientation to portrait using the best available API
3. Re-apply lock if device orientation changes while in fullscreen
4. Unlock orientation when exiting fullscreen

## Configuration

No configuration required. The script works out of the box.

To customize cooldown timing, edit the `LOCK_COOLDOWN` constant in the script (default: 300ms).

## Compatibility

| Platform | Status |
|----------|--------|
| Firefox Desktop (Windows/macOS/Linux) | ✅ Tested |
| Firefox for Android | ✅ Primary target |
| Other browsers with Tampermonkey | ⚠️ Untested |

Requires Tampermonkey with `@run-at document-start` support.

## How It Works

1. **Event listeners**: Attaches to all prefixed `fullscreenchange` events
2. **Prototype patching**: Wraps `Element.prototype.requestFullscreen` and variants
3. **Orientation locking priority**:
   - Standard: `screen.orientation.lock('portrait')`
   - Legacy: `screen.lockOrientation('portrait')`
   - Firefox legacy: `screen.mozLockOrientation('portrait')`
   - WebKit legacy: `screen.webkitLockOrientation('portrait')`
4. **Orientation change listener**: Re-locks on `screen.orientation.change` if in fullscreen

## Known Limitations

- May not work in cross-origin iframes due to browser security policies
- Some websites may override orientation lock after script applies it
- Firefox Android behavior may vary by version
- Requires user interaction to enter fullscreen (browser policy)

## License

MIT License

## Author

parhamghahremani