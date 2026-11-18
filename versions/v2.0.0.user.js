// ==UserScript==
// @name         Force Portrait Lock (Fullscreen)
// @name:fa      قفل عمودی صفحه در تمام‌صفحه
// @namespace    https://github.com/portrait-lock
// @version      2.0
// @description  Forces screen orientation to portrait when entering fullscreen. Multi-method fallback for maximum compatibility on Firefox Android.
// @description:fa  صفحه را هنگام ورود به حالت تمام‌صفحه روی حالت عمودی قفل می‌کند.
// @author       You
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// ==/UserScript==

(function () {
    'use strict';

    const LOG = '[PortraitLock]';
    let lastLockAttempt = 0;
    const LOCK_COOLDOWN = 300; // ms بین تلاش‌ها

    /**
     * تلاش برای قفل کردن جهت صفحه روی حالت Portrait
     */
    function lockPortrait() {
        const now = Date.now();
        if (now - lastLockAttempt < LOCK_COOLDOWN) return;
        lastLockAttempt = now;

        // روش ۱: Screen Orientation API استاندارد
        try {
            if (screen.orientation && typeof screen.orientation.lock === 'function') {
                screen.orientation.lock('portrait')
                    .then(() => console.log(LOG, 'قفل شد با screen.orientation.lock'))
                    .catch(err => {
                        console.warn(LOG, 'روش ۱ شکست خورد:', err.message);
                        tryLegacyLock();
                    });
                return;
            }
        } catch (e) {
            console.warn(LOG, 'خطا در روش ۱:', e);
        }

        tryLegacyLock();
    }

    /**
     * روش ۲: API قدیمی (Firefox قدیمی‌تر و برخی نسخه‌های موبایل)
     */
    function tryLegacyLock() {
        try {
            if (screen.lockOrientation) {
                screen.lockOrientation('portrait');
                console.log(LOG, 'قفل شد با screen.lockOrientation');
                return;
            }
            if (screen.mozLockOrientation) {
                screen.mozLockOrientation('portrait');
                console.log(LOG, 'قفل شد با mozLockOrientation');
                return;
            }
            if (screen.webkitLockOrientation) {
                screen.webkitLockOrientation('portrait');
                console.log(LOG, 'قفل شد با webkitLockOrientation');
                return;
            }
        } catch (e) {
            console.warn(LOG, 'روش ۲ شکست خورد:', e);
        }
        console.warn(LOG, 'هیچ روش قفل جهتی پشتیبانی نشد — احتمالاً در iframe محدود شده‌ایم.');
    }

    /**
     * آزاد کردن قفل جهت (اختیاری، هنگام خروج از تمام‌صفحه)
     */
    function unlockOrientation() {
        try {
            if (screen.orientation && typeof screen.orientation.unlock === 'function') {
                screen.orientation.unlock();
            } else if (screen.unlockOrientation) {
                screen.unlockOrientation();
            } else if (screen.mozUnlockOrientation) {
                screen.mozUnlockOrientation();
            }
        } catch (e) { /* نادیده بگیر */ }
    }

    /**
     * بررسی اینکه آیا عنصر تمام‌صفحه در حال حاضر فعال است
     */
    function isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }

    /**
     * واکنش به تغییر وضعیت تمام‌صفحه
     */
    function onFullscreenChange() {
        if (isFullscreen()) {
            // کمی تأخیر تا مرورگر فرصت چرخش خودکار را داشته باشد، بعد ما قفل می‌کنیم
            setTimeout(lockPortrait, 100);
            setTimeout(lockPortrait, 500); // تلاش دوم برای اطمینان
        } else {
            unlockOrientation();
        }
    }

    // رویدادهای تمام‌صفحه در مرورگرهای مختلف
    const events = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'MSFullscreenChange'
    ];
    events.forEach(evt => document.addEventListener(evt, onFullscreenChange, true));

    /**
     * رهگیری متد requestFullscreen در سطح prototype
     * این کار باعث می‌شود حتی اگر سایت از addEventListener استفاده نکند، ما متوجه شویم
     */
    try {
        const proto = Element.prototype;
        const methods = [
            'requestFullscreen',
            'mozRequestFullScreen',
            'webkitRequestFullscreen',
            'msRequestFullscreen'
        ];
        methods.forEach(method => {
            if (proto[method]) {
                const original = proto[method];
                proto[method] = function (...args) {
                    const result = original.apply(this, args);
                    setTimeout(lockPortrait, 100);
                    return result;
                };
            }
        });
    } catch (e) {
        console.warn(LOG, 'رهگیری requestFullscreen ممکن نشد:', e);
    }

    /**
     * رهگیری تغییر جهت خود صفحه (اگر کاربر گوشی را چرخاند)
     */
    try {
        if (screen.orientation && screen.orientation.addEventListener) {
            screen.orientation.addEventListener('change', () => {
                if (isFullscreen()) lockPortrait();
            });
        }
    } catch (e) { /* نادیده بگیر */ }

    /**
     * تلاش اولیه در بارگذاری صفحه
     */
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(lockPortrait, 200);
    } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(lockPortrait, 200));
    }

    console.log(LOG, 'اسکریپت با موفقیت بارگذاری شد.');
})();