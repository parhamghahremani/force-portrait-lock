# Manual Test Plan — Force Portrait Lock

## Test Environment Setup

### Firefox for Android (Primary & Only Target)
1. Install Firefox for Android (latest stable)
2. Install Tampermonkey (may require sideloading .xpi or using specific version — not available on AMO)
3. Install `force-portrait-lock.user.js` via Tampermonkey

> **Note:** This script is designed exclusively for Firefox for Android. Desktop Firefox testing is not required or supported.

## Test Cases

### TC-01: Basic Page Load
**Steps:**
1. Open any website (e.g., https://example.com)
2. Open browser console (Firefox Android: Settings → Developer tools → Console, or use remote debugging)
3. Verify `[PortraitLock] Script loaded successfully.` appears

**Expected:** Log message present, no errors

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-02: Video Fullscreen → Portrait Lock
**Steps:**
1. Open video page (YouTube, Vimeo, or local HTML5 video)
2. Play video
3. Click fullscreen button
4. Observe orientation (should lock to portrait)
5. Check console for `[PortraitLock] Locked via ...`

**Expected:** Portrait orientation locked, success log appears

| Platform | Result | Date | Tester | Log Output |
|----------|--------|------|--------|------------|
| Firefox for Android | ⏳ | — | — | — |

---

### TC-03: Device Rotation During Fullscreen → Re-lock
**Steps:**
1. Enter fullscreen on video (TC-02)
2. Rotate device to landscape
3. Observe: script should detect and re-lock to portrait
4. Check console for re-lock attempt

**Expected:** Orientation returns to portrait, log shows re-lock

| Platform | Result | Date | Tester | Log Output |
|----------|--------|------|--------|------------|
| Firefox for Android | ⏳ | — | — | — |

---

### TC-04: Exit Fullscreen → Unlock
**Steps:**
1. Enter fullscreen (TC-02)
2. Exit fullscreen (tap exit button, or gesture)
3. Observe: orientation unlocks, device free to rotate
4. Check console for errors (none expected)

**Expected:** Orientation unlocked, no errors

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-05: Multiple Fullscreen Cycles
**Steps:**
1. Enter fullscreen → exit → enter → exit (repeat 3x)
2. Verify lock/unlock works each cycle
3. Check console for repeated logs

**Expected:** Consistent behavior across cycles

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-06: Iframe Video Fullscreen
**Steps:**
1. Open page with embedded video in iframe (e.g., YouTube embed)
2. Click play → fullscreen from iframe
3. Observe if portrait lock engages
4. Check console

**Expected:** May not work due to cross-origin iframe restrictions (browser limitation)

| Platform | Result | Date | Tester | Notes |
|----------|--------|------|--------|-------|
| Firefox for Android | ⏳ | — | — | — |

---

### TC-07: Cooldown Behavior
**Steps:**
1. Rapidly toggle fullscreen (enter/exit/enter quickly)
2. Verify no excessive lock attempts (300ms cooldown)
3. Check console for cooldown skip (no log for skipped attempts)

**Expected:** No errors, cooldown respected

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-08: No Orientation API Available (Legacy Fallback)
**Steps:**
1. Test on older Firefox Android or environment without `screen.orientation`
2. Verify legacy fallback works (`mozLockOrientation`)
3. Check console for fallback log

**Expected:** Legacy API used, portrait locked

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-09: Console Error-Free Operation
**Steps:**
1. Run all above tests
2. Filter console for errors/warnings
3. Verify only `[PortraitLock]` info/warn logs, no uncaught exceptions

**Expected:** Zero uncaught errors

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

### TC-10: Page Navigation Persistence
**Steps:**
1. Enter fullscreen on page A
2. Navigate to page B (while in fullscreen if possible, or exit → navigate → enter)
3. Verify script still active and functional

**Expected:** Script persists across navigation (Tampermonkey behavior)

| Platform | Result | Date | Tester |
|----------|--------|------|--------|
| Firefox for Android | ⏳ | — | — |

---

## Test Results Summary

| Test Case | Firefox for Android | Overall |
|-----------|---------------------|---------|
| TC-01: Page Load | ⏳ | ⏳ |
| TC-02: Fullscreen Lock | ⏳ | ⏳ |
| TC-03: Rotation Re-lock | ⏳ | ⏳ |
| TC-04: Exit Unlock | ⏳ | ⏳ |
| TC-05: Multiple Cycles | ⏳ | ⏳ |
| TC-06: Iframe | ⏳ | ⏳ |
| TC-07: Cooldown | ⏳ | ⏳ |
| TC-08: Legacy Fallback | ⏳ | ⏳ |
| TC-09: Error-Free | ⏳ | ⏳ |
| TC-10: Navigation | ⏳ | ⏳ |

**Legend:** ✅ Pass | ❌ Fail | ⏳ Pending | ⚠️ Known Limitation

---

## Sign-Off

- [ ] All Android tests passed
- [ ] Known limitations documented
- [ ] User approval for release

**Tester:** _______________  
**Date:** _______________  
**Version Tested:** _______________