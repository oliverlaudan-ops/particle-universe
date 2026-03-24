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
            passiveRate: document.getElementById('passive-rate'),
            particles: document.getElementById('particles'),
            btnCreate: document.getElementById('btn-create'),
            btnMerge: document.getElementById('btn-merge'),
            btnAscend: document.getElementById('btn-ascend'),
            btnPrestige: document.getElementById('btn-prestige'),
            upgradeList: document.getElementById('upgrade-list'),
            timeDisplay: document.getElementById('time-display'),
            cycleDisplay: document.getElementById('cycle'),
            memoryDisplay: document.getElementById('memory'),
            awarenessDisplay: document.getElementById('awareness')
        };

        this.init();
    }

    init() {
        // Try to load saved game
        const loaded = this.universe.load();
        
        // Initial render
        this.render();
        
        // Show initial narrative based on cycle
        const narrative = this.universe.cycle > 1 
            ? NARRATIVE.getCycleNarrative(this.universe.cycle)
            : NARRATIVE.getNarrative(this.universe.stage, this.universe.awareness, this.universe.cycle);
        Renderer.showNarrative(narrative);
        Renderer.render(this.universe.stage, this.universe.awareness);

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

        // Apply cycle-based styling
        this.applyCycleStyling();
    }

    bindEvents() {
        this.elements.btnCreate.addEventListener('click', () => this.actionCreate());
        this.elements.btnMerge.addEventListener('click', () => this.actionMerge());
        this.elements.btnAscend.addEventListener('click', () => this.actionAscend());
        this.elements.btnPrestige.addEventListener('click', () => this.actionPrestige());
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
            case 'p':
                if (this.universe.canPrestige) {
                    this.actionPrestige();
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
                    this.applyCycleStyling();
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
                Renderer.showNarrative(NARRATIVE.getNarrative(
                    this.universe.stage, 
                    this.universe.awareness, 
                    this.universe.cycle
                ));
            }
        }
    }

    actionMerge() {
        if (this.universe.mergeParticles()) {
            Renderer.pulseEffect();
            this.render();
            
            if (Math.random() < 0.15) {
                Renderer.showNarrative(NARRATIVE.getNarrative(
                    this.universe.stage, 
                    this.universe.awareness, 
                    this.universe.cycle
                ));
            }
        }
    }

    actionAscend() {
        if (this.universe.ascend()) {
            Renderer.ascendEffect();
            
            setTimeout(() => {
                Renderer.showNarrative(NARRATIVE.getNarrative(
                    this.universe.stage, 
                    this.universe.awareness, 
                    this.universe.cycle
                ));
                Renderer.render(this.universe.stage, this.universe.awareness);
            }, 600);
            
            this.render();
            this.applyCycleStyling();
        }
    }

    actionPrestige() {
        if (!this.universe.canPrestige) return;
        
        const gain = this.universe.prestige();
        
        // Show dramatic prestige effect
        Renderer.glitchEffect(1000);
        
        setTimeout(() => {
            Renderer.showNarrative(NARRATIVE.getCycleNarrative(this.universe.cycle));
            Renderer.render(this.universe.stage, this.universe.awareness);
        }, 1000);
        
        this.render();
        this.applyCycleStyling();
        
        // Show memory gained
        this.elements.timeDisplay.textContent = `+${gain} Kosmische Erinnerung gewonnen.`;
    }

    applyCycleStyling() {
        const cycle = this.universe.cycle;
        document.body.classList.remove('cycle-low', 'cycle-mid', 'cycle-high');
        
        if (cycle >= 5) {
            document.body.classList.add('cycle-high');
        } else if (cycle >= 3) {
            document.body.classList.add('cycle-mid');
        } else {
            document.body.classList.add('cycle-low');
        }
    }

    render() {
        // Update stats
        this.elements.stage.textContent = this.universe.stageData.name;
        this.elements.weight.textContent = Math.floor(this.universe.existentialWeight).toLocaleString();
        
        const passiveRate = this.universe.getPassiveIncome();
        this.elements.passiveRate.textContent = `${passiveRate.toLocaleString()}/s`;
        
        this.elements.particles.textContent = Math.floor(this.universe.particles).toLocaleString();

        // Update prestige stats
        this.elements.cycleDisplay.textContent = `Zyklus ${this.universe.cycle}`;
        this.elements.memoryDisplay.textContent = `${this.universe.cosmicMemory.toFixed(1)}x`;
        this.elements.awarenessDisplay.textContent = this.universe.awareness;

        // Update button states
        const createCost = this.universe.getParticleCost();
        const mergeCost = this.universe.getMergeCost();

        this.elements.btnCreate.disabled = !this.universe.canAfford(createCost);
        this.elements.btnCreate.textContent = `Erschaffen (${Math.floor(createCost).toLocaleString()})`;

        this.elements.btnMerge.disabled = !this.universe.canAfford(mergeCost);
        this.elements.btnMerge.textContent = `Vereinigen (${Math.floor(mergeCost).toLocaleString()})`;

        this.elements.btnAscend.disabled = !this.universe.canAscend;
        if (this.universe.isMaxStage) {
            this.elements.btnAscend.style.display = 'none';
        } else {
            this.elements.btnAscend.style.display = '';
            const nextStage = STAGES[this.universe.stageIndex + 1];
            const ascendCost = this.universe.getAscensionCost(nextStage);
            this.elements.btnAscend.textContent = `Transzendieren (${ascendCost.toLocaleString()})`;
        }

        // Prestige button
        if (this.universe.canPrestige) {
            this.elements.btnPrestige.style.display = '';
            this.elements.btnPrestige.disabled = false;
            const prestigeGain = this.universe.getPrestigeGain();
            this.elements.btnPrestige.textContent = `Zyklus beenden (+${prestigeGain} Erinnerung)`;
        } else {
            this.elements.btnPrestige.style.display = 'none';
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
                <div class="upgrade-cost">${isMaxed ? 'MAX' : `Kosten: ${Math.floor(cost).toLocaleString()}`}</div>
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
            // Apply passive income
            const income = this.universe.getPassiveIncome();
            if (income > 0) {
                this.universe.particles += income;
                this.universe.existentialWeight += income * 0.1;
            }
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
