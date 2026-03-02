document.addEventListener('DOMContentLoaded', () => {
    const typingName = document.getElementById('typing-name');
    const sparkle = document.getElementById('sparkle');
    const revealBtn = document.getElementById('revealBtn');
    const secretMessage = document.getElementById('secretMessage');
    const cheerLine = document.querySelector('.cheer-line');
    const magicContainer = document.getElementById('magic-container');
    const fallingContainer = document.getElementById('falling-flowers-container');
    const splashContainer = document.getElementById('splash-container');
    const magicRevealContainer = document.querySelector('.magic-reveal-container');
    const card = document.getElementById('mainCard');
    const fallingFlowers = [];

    // --- 1. 3D Hover Tilt Effect (Desktop Only) ---
    if (window.innerWidth > 480) {
        document.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => card.style.transition = 'transform 0.1s ease-out', 500);
        });
    }

    // --- 2. Sequence ---
    function startMagicSequence() {
        magicRevealContainer.classList.add('reveal-active');
        
        setTimeout(() => {
            document.querySelector('.title-wrapper').classList.add('reveal-name-active');
            
            setTimeout(() => {
                sparkle.innerHTML = ' ✨💖';
                sparkle.animate([
                    { opacity: 0, transform: 'scale(0) rotate(-45deg)' }, 
                    { opacity: 1, transform: 'scale(1.3) rotate(15deg)', offset: 0.6 }, 
                    { opacity: 1, transform: 'scale(1) rotate(0deg)' }
                ], { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
                
                sparkle.animate([
                    { transform: 'translateY(0px) scale(1)' },
                    { transform: 'translateY(-8px) scale(1.1)' }
                ], { duration: 1500, iterations: Infinity, direction: 'alternate', delay: 1000, easing: 'ease-in-out' });
                
            }, 900); 
        }, 1200); 
    }
    
    setTimeout(startMagicSequence, 500);

    // --- 3. Interactive Falling Flowers ---
    const bgFlowers = ['🌸', '🌺', '💮', '🏵️', '🍃', '✨', '💖', '🎨']; 

    function createFallingFlower() {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.innerText = bgFlowers[Math.floor(Math.random() * bgFlowers.length)];
        
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 20 + 15; 
        const duration = Math.random() * 5 + 6; 
        const swayDuration = Math.random() * 2 + 2; 

        flower.style.left = `${startX}px`;
        flower.style.fontSize = `${size}px`;
        flower.style.animationDuration = `${duration}s, ${swayDuration}s`;
        
        fallingContainer.appendChild(flower);
        fallingFlowers.push(flower);

        setTimeout(() => {
            flower.remove();
            fallingFlowers.shift();
        }, duration * 1000);
    }

    for(let i=0; i<30; i++) setTimeout(createFallingFlower, Math.random() * 4000);
    setInterval(createFallingFlower, 300);

    window.addEventListener('mousemove', (e) => {
        fallingFlowers.forEach(p => {
            const rect = p.getBoundingClientRect();
            const dx = (rect.left + rect.width / 2) - e.clientX;
            const dy = (rect.top + rect.height / 2) - e.clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) { 
                const angle = Math.atan2(dy, dx);
                const push = (120 - dist) * 0.5;
                p.style.transform = `translate(${Math.cos(angle)*push}px, ${Math.sin(angle)*push}px)`; 
            } else {
                p.style.transform = ''; 
            }
        });
    });

    // --- 4. Click Anywhere for Color Splash ---
    const festiveColors = ['#d81b60', '#ffb300', '#00bcd4', '#ab47bc', '#ff9800', '#ff9a9e', '#00e5ff'];
    
    window.addEventListener('click', (e) => {
        // Prevent splashing if they click the button itself
        if(e.target.closest('#revealBtn')) return; 

        const splash = document.createElement('div');
        splash.className = 'color-splash';
        splash.style.left = `${e.clientX}px`;
        splash.style.top = `${e.clientY}px`;
        splash.style.width = `${Math.random() * 60 + 40}px`;
        splash.style.height = splash.style.width;
        splash.style.backgroundColor = festiveColors[Math.floor(Math.random() * festiveColors.length)];
        
        splashContainer.appendChild(splash);
        setTimeout(() => splash.remove(), 1000);
    });

    // --- 5. Beautiful Button Reveal ---
    function triggerHoliMagic() {
        if(revealBtn.style.pointerEvents === 'none') return; // Stop double-clicking
        
        revealBtn.style.pointerEvents = 'none';
        
        revealBtn.animate([
            { transform: 'scale(1) translateY(0px)', opacity: 1 },
            { transform: 'scale(0.5) translateY(15px)', opacity: 0 }
        ], { duration: 400, fill: 'forwards', easing: 'ease-in' });
        
        setTimeout(() => {
            revealBtn.style.display = 'none';
            secretMessage.setAttribute('aria-hidden', 'false');
            secretMessage.classList.add('show');
            setTimeout(() => cheerLine.classList.add('reveal'), 700);
        }, 400);

        const rect = revealBtn.getBoundingClientRect();
        createAdvancedHoliExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // Attach click event directly
    revealBtn.onclick = triggerHoliMagic;

    // --- 6. Advanced Physics-Based Holi Explosion ---
    function createAdvancedHoliExplosion(cx, cy) {
        const cuteEmojis = ['💖', '✨', '🌸', '🎨', '🌹', '💐', '💗', '💓', '💘'];
        const particleCount = window.innerWidth < 600 ? 60 : 100;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'twirl-particle';
            p.style.left = `${cx}px`;
            p.style.top = `${cy}px`;
            
            let isEmoji = Math.random() > 0.4;
            if (isEmoji) {
                p.innerHTML = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
                p.style.fontSize = `${Math.random() * 25 + 15}px`;
            } else {
                const size = Math.random() * 15 + 10;
                p.style.width = `${size}px`;
                p.style.height = `${size}px`;
                p.style.backgroundColor = festiveColors[Math.floor(Math.random() * festiveColors.length)];
                p.style.borderRadius = Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%';
                p.style.opacity = Math.random() * 0.8 + 0.2;
            }

            magicContainer.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 10; 
            const gravity = 0.4;
            const friction = 0.96;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity - 5; 
            let x = 0;
            let y = 0;
            let rotation = 0;
            let rotSpeed = (Math.random() - 0.5) * 20;
            let opacity = 1;

            function animateParticle() {
                vy += gravity; 
                vx *= friction; 
                vy *= friction;
                
                x += vx;
                y += vy;
                rotation += rotSpeed;
                opacity -= 0.015; 

                p.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                p.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    p.remove();
                }
            }
            
            requestAnimationFrame(animateParticle);
        }
    }

    // --- 7. Cursor Magic Trail ---
    const cuteTrailers = ['🌸', '💖', '✨']; 
    let lastMove = 0;
    
    function createSparkle(clientX, clientY) {
        if (Date.now() - lastMove < 60) return; 
        lastMove = Date.now();
        
        const dust = document.createElement('div');
        dust.className = 'twirl-particle';
        dust.innerHTML = cuteTrailers[Math.floor(Math.random() * cuteTrailers.length)];
        dust.style.fontSize = `${Math.random() * 14 + 10}px`;
        dust.style.left = `${clientX}px`;
        dust.style.top = `${clientY}px`;
        dust.style.pointerEvents = 'none';
        
        magicContainer.appendChild(dust);

        dust.animate([
            { transform: `translate(-50%, -50%) scale(0) rotate(0deg)`, opacity: 0 },
            { transform: `translate(-50%, -50%) scale(1.2) rotate(${Math.random() * 90}deg)`, opacity: 0.8, offset: 0.2 },
            { transform: `translate(-50%, calc(-50% + 40px)) scale(0) rotate(${Math.random() * 180}deg)`, opacity: 0 }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => dust.remove();
    }

    window.addEventListener('mousemove', (e) => createSparkle(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
});