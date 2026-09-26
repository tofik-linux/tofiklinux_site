(function () {
    'use strict';

    const body = document.body;
    const sw = document.getElementById('themeSwitch');

    // Восстановление темы из localStorage
    let currentTheme = 'dark';
    try {
        const saved = localStorage.getItem('tofik-theme');
        if (saved) currentTheme = saved;
    } catch (e) {}
    body.setAttribute('data-theme', currentTheme);

    function setTheme(theme) {
        if (theme === currentTheme) return;
        currentTheme = theme;
        body.setAttribute('data-theme', theme);
        try { localStorage.setItem('tofik-theme', theme); } catch (e) {}
    }

    // Клик по переключателю
    sw.addEventListener('click', (e) => {
        if (e.target.classList.contains('sun')) { setTheme('light'); return; }
        if (e.target.classList.contains('moon')) { setTheme('dark'); return; }
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Свайп мышью
    let isDown = false;
    let startX = 0;
    let moved = false;

    sw.addEventListener('mousedown', (e) => {
        isDown = true;
        moved = false;
        startX = e.clientX;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 5) moved = true;
        if (delta > 20) setTheme('light');
        else if (delta < -20) setTheme('dark');
    });

    document.addEventListener('mouseup', () => { isDown = false; });

    // Свайп пальцем
    sw.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        moved = false;
    }, { passive: true });

    sw.addEventListener('touchmove', (e) => {
        const delta = e.touches[0].clientX - startX;
        if (Math.abs(delta) > 5) moved = true;
        if (delta > 20) setTheme('light');
        else if (delta < -20) setTheme('dark');
    }, { passive: true });

    sw.addEventListener('touchend', () => {
        if (!moved) setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
})();