// Game Controller
class Game {
    constructor() {
        this.universe = new Universe();
        this.tickInterval = null;
        this.autoSaveInterval = null;
        this.tickRate = 1000; // 1 second
        this.autoSaveRate = 30000; // 30 seconds

        this.elements = {
            stage: document.getElementById('stage'),
            weight: document.getElementById('weight'),
            particles: document.getElementById('particles'),
            btnCreate: document.getElementById('btn-create'),
            btnMerge: document.getElementById('btn-merge'),
            btnAscend: document.getElementById('btn-ascend'),
            upgradeList: document.getElementById('upgrade-list'),
            timeDisplay: document.getElementById('time-display')
        };

        this.init();
    }

    init() {
        // Try to load saved game
        const loaded = this.universe.load();
        
        // Initial render
        this.render();
        
        // Show initial narrative
        Renderer.showNarrative(NARRATIVE.getRandomNarrative(this.universe.stage));
        Renderer.render(this.universe.stage);

        if (loaded) {
            this.elements.timeDisplay.textContent = 'Spielstand geladen.';
        }

        // Bind event listeners
        this.bindEvents();

        // Start game loops
        this.startTicks();
        this.startAutoSave();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    bindEvents() {
        this.elements.btnCreate.addEventListener('click', () => this.actionCreate());
        this.elements.btnMerge.addEventListener('click', () => this.actionMerge());
        this.elements.btnAscend.addEventListener('click', () => this.actionAscend());
    }

    handleKeyboard(e) {
        switch(e.key.toLowerCase()) {
            case 'c':
                this.actionCreate();
                break;
            case 'm':
                this.actionMerge();
                break;
            case 'a':
                if (!this.elements.btnAscend.disabled) {
                    this.actionAscend();
                }
                break;
            case 'r':
                if (e.ctrlKey || e.metaKey) {
                    // Don't prevent Ctrl+R (browser refresh)
                } else {
                    this.universe.reset();
                    this.render();
                    Renderer.showNarrative("Ein neues Universum entsteht...");
                    Renderer.render(this.universe.stage);
                }
                break;
        }
    }

    actionCreate() {
        if (this.universe.createParticle()) {
            Renderer.pulseEffect();
            this.render();
            
            // Random chance to show narrative update
            if (Math.random() < 0.1) {
                Renderer.showNarrative(NARRATIVE.getRandomNarrative(this.universe.stage));
            }
        }
    }

    actionMerge() {
        if (this.universe.mergeParticles()) {
            Renderer.pulseEffect();
            this.render();
            
            if (Math.random() < 0.15) {
                Renderer.showNarrative(NARRATIVE.getRandomNarrative(this.universe.stage));
            }
        }
    }

    actionAscend() {
        if (this.universe.ascend()) {
            Renderer.ascendEffect();
            
            setTimeout(() => {
                Renderer.showNarrative(NARRATIVE.getRandomNarrative(this.universe.stage));
                Renderer.render(this.universe.stage);
            }, 600);
            
            this.render();
        }
    }

    render() {
        // Update stats
        this.elements.stage.textContent = this.universe.stageData.name;
        this.elements.weight.textContent = this.universe.existentialWeight.toLocaleString();
        this.elements.particles.textContent = this.universe.particles.toLocaleString();

        // Update button states
        const createCost = this.universe.getParticleCost();
        const mergeCost = this.universe.getMergeCost();

        this.elements.btnCreate.disabled = !this.universe.canAfford(createCost);
        this.elements.btnCreate.textContent = `Erschaffen (${createCost})`;

        this.elements.btnMerge.disabled = !this.universe.canAfford(mergeCost);
        this.elements.btnMerge.textContent = `Vereinigen (${mergeCost})`;

        this.elements.btnAscend.disabled = !this.universe.canAscend;
        if (this.universe.isMaxStage) {
            this.elements.btnAscend.textContent = 'Maximum erreicht';
        } else {
            const nextStage = STAGES[this.universe.stageIndex + 1];
            const ascendCost = this.universe.getAscensionCost(nextStage);
            this.elements.btnAscend.textContent = `Transzendieren (${ascendCost})`;
        }

        // Render upgrades
        this.renderUpgrades();
    }

    renderUpgrades() {
        this.elements.upgradeList.innerHTML = '';

        UPGRADES.forEach(upgrade => {
            const stageIndex = STAGES.indexOf(upgrade.requiresStage);
            const isUnlocked = this.universe.stageIndex >= stageIndex;
            const level = this.universe.getUpgradeLevel(upgrade.id);
            const isMaxed = level >= upgrade.maxLevel;
            const canBuy = this.universe.canBuyUpgrade(upgrade.id);
            const cost = this.universe.getUpgradeCost(upgrade.id);

            const el = document.createElement('div');
            el.className = 'upgrade';
            if (!isUnlocked) el.classList.add('locked');
            if (isMaxed) el.classList.add('maxed');
            if (canBuy) el.classList.add('available');

            el.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.description}</div>
                <div class="upgrade-level">Stufe: ${level}/${upgrade.maxLevel}</div>
                <div class="upgrade-cost">${isMaxed ? 'MAX' : `Kosten: ${cost}`}</div>
            `;

            if (canBuy && !isMaxed) {
                el.addEventListener('click', () => {
                    if (this.universe.buyUpgrade(upgrade.id)) {
                        this.render();
                    }
                });
            }

            this.elements.upgradeList.appendChild(el);
        });
    }

    startTicks() {
        this.tickInterval = setInterval(() => {
            // Could add passive income here later
            // For now, it's all manual
            this.render();
        }, this.tickRate);
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.universe.save();
            this.elements.timeDisplay.textContent = `Gespeichert: ${new Date().toLocaleTimeString()}`;
        }, this.autoSaveRate);
    }

    save() {
        this.universe.save();
        this.elements.timeDisplay.textContent = 'Spielstand manuell gespeichert.';
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
