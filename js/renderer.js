const Renderer = {
    container: document.getElementById('ascii-art'),
    narrativeEl: document.getElementById('narrative'),

    currentEffect: null,

    render(stage, progress = 0) {
        const stageData = NARRATIVE.stages[stage];
        if (!stageData) return;

        this.container.textContent = stageData.ascii;
    },

    showNarrative(text) {
        this.narrativeEl.style.opacity = '0';
        setTimeout(() => {
            this.narrativeEl.textContent = text;
            this.narrativeEl.style.opacity = '1';
        }, 200);
    },

    fadeNarrative() {
        this.narrativeEl.style.transition = 'opacity 0.5s ease';
        this.narrativeEl.style.opacity = '0.3';
    },

    glitchEffect(duration = 500) {
        const original = this.container.textContent;
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        const glitchChars = chars.split('');

        let iterations = 0;
        const maxIterations = duration / 50;

        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(interval);
                this.container.textContent = original;
                return;
            }

            let glitched = '';
            for (let i = 0; i < original.length; i++) {
                if (Math.random() < 0.1) {
                    glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitched += original[i];
                }
            }
            this.container.textContent = glitched;
            iterations++;
        }, 50);
    },

    pulseEffect() {
        this.container.style.animation = 'none';
        this.container.offsetHeight; // Trigger reflow
        this.container.style.animation = 'pulse 0.5s ease';
    },

    spawnEffect() {
        this.glitchEffect(300);
    },

    ascendEffect() {
        // Dramatic effect for stage transitions
        let scale = 1;
        const expand = setInterval(() => {
            scale += 0.05;
            this.container.style.transform = `scale(${scale})`;
            this.container.style.opacity = 1 - (scale - 1);
            if (scale >= 2) {
                clearInterval(expand);
                this.container.style.transform = 'scale(1)';
                this.container.style.opacity = '1';
            }
        }, 30);
    }
};

// Add CSS animation for pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
