const STAGES = NARRATIVE.getAllStageNames();

const UPGRADES = [
    {
        id: 'quark_density',
        name: 'Quark Dichte',
        description: '+50% passives Einkommen pro Stufe',
        baseCost: 10,
        costMultiplier: 1.5,
        effect: { type: 'passive_boost', value: 0.5 },
        requiresStage: 'particle',
        maxLevel: 10
    },
    {
        id: 'electron_orbit',
        name: 'Elektronen Umlaufbahn',
        description: 'Stabilisiert Atombildung',
        baseCost: 100,
        costMultiplier: 2,
        effect: { type: 'merge_boost', value: 1 },
        requiresStage: 'atom',
        maxLevel: 5
    },
    {
        id: 'molecular_bond',
        name: 'Molekulare Bindung',
        description: 'Beschleunigt Molekülbildung',
        baseCost: 500,
        costMultiplier: 2,
        effect: { type: 'merge_boost', value: 2 },
        requiresStage: 'molecule',
        maxLevel: 5
    },
    {
        id: 'stellar_fusion',
        name: 'Stellare Fusion',
        description: 'Steigert Sternenenergie',
        baseCost: 2000,
        costMultiplier: 2.5,
        effect: { type: 'star_boost', value: 3 },
        requiresStage: 'star',
        maxLevel: 5
    },
    {
        id: 'tectonic_force',
        name: 'Tektonische Kraft',
        description: 'Formt Planetoberfläche',
        baseCost: 10000,
        costMultiplier: 3,
        effect: { type: 'planet_boost', value: 2 },
        requiresStage: 'planet',
        maxLevel: 3
    },
    {
        id: 'evolution_accelerator',
        name: 'Evolutionsbeschleuniger',
        description: 'Fördert Lebensentstehung',
        baseCost: 50000,
        costMultiplier: 4,
        effect: { type: 'life_boost', value: 2 },
        requiresStage: 'life',
        maxLevel: 3
    },
    {
        id: 'consciousness_matrix',
        name: 'Bewusstseins-Matrix',
        description: 'Entwickelt Intelligenz',
        baseCost: 250000,
        costMultiplier: 5,
        effect: { type: 'civ_boost', value: 2 },
        requiresStage: 'civilization',
        maxLevel: 3
    },
    {
        id: 'cosmic_expansion',
        name: 'Kosmische Expansion',
        description: 'Dehnt das Universum aus',
        baseCost: 1000000,
        costMultiplier: 6,
        effect: { type: 'universe_boost', value: 2 },
        requiresStage: 'universe',
        maxLevel: 3
    }
];

class Universe {
    constructor() {
        this.stageIndex = 0;
        this.particles = 1;
        this.existentialWeight = 0;
        this.totalWeightGenerated = 0;
        this.upgrades = {};
        this.lastSave = Date.now();

        // Initialize upgrade levels
        UPGRADES.forEach(u => {
            this.upgrades[u.id] = { level: 0 };
        });

        this.applyStage();
    }

    get stage() {
        return STAGES[this.stageIndex];
    }

    get stageData() {
        return NARRATIVE.stages[this.stage];
    }

    get isMaxStage() {
        return this.stageIndex >= STAGES.length - 1;
    }

    get canAscend() {
        if (this.isMaxStage) return false;
        const nextStage = STAGES[this.stageIndex + 1];
        return this.particles >= this.getAscensionCost(nextStage);
    }

    getAscensionCost(stage) {
        const baseCosts = {
            particle: 100,
            atom: 1000,
            molecule: 10000,
            star: 100000,
            planet: 1000000,
            life: 10000000,
            civilization: 100000000,
            universe: Infinity
        };
        return baseCosts[stage] || Infinity;
    }

    getParticleCost() {
        const baseCost = 1; // Start cheap, scales with particles owned
        return Math.floor(baseCost * Math.pow(1.05, this.particles));
    }

    getMergeCost() {
        const baseCost = 5;
        return Math.floor(baseCost * Math.pow(1.08, this.particles));
    }

    // Passive income per second based on stage
    getPassiveIncome() {
        const stageIncomes = {
            particle: 0.5,
            atom: 2,
            molecule: 8,
            star: 30,
            planet: 100,
            life: 400,
            civilization: 2000,
            universe: 10000
        };
        let base = stageIncomes[this.stage] || 1;
        
        // Boost from upgrades
        base *= (1 + this.getUpgradeLevel('quark_density') * 0.5);
        
        return base;
    }

    getUpgradeCost(upgradeId) {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (!upgrade) return Infinity;
        
        const level = this.upgrades[upgradeId].level;
        return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
    }

    canAfford(cost) {
        return this.particles >= cost;
    }

    canBuyUpgrade(upgradeId) {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (!upgrade) return false;
        if (this.upgrades[upgradeId].level >= upgrade.maxLevel) return false;
        if (this.stageIndex < STAGES.indexOf(upgrade.requiresStage)) return false;
        return this.canAfford(this.getUpgradeCost(upgradeId));
    }

    getUpgradeLevel(upgradeId) {
        return this.upgrades[upgradeId]?.level || 0;
    }

    applyStage() {
        this.existentialWeight = this.stageData.weightMultiplier;
    }

    // Actions
    createParticle() {
        const cost = this.getParticleCost();
        if (!this.canAfford(cost)) return false;

        this.particles -= cost;
        
        // Apply boost from upgrades
        let boost = 1;
        if (this.stage === 'particle') {
            boost = 1 + (this.getUpgradeLevel('quark_density') * 1);
        }
        
        this.particles += Math.floor(boost);
        this.totalWeightGenerated += 1;
        this.existentialWeight += 1;

        return true;
    }

    mergeParticles() {
        const cost = this.getMergeCost();
        if (!this.canAfford(cost)) return false;

        this.particles -= cost;
        
        // Apply boost from upgrades
        let boost = 1;
        if (this.stage === 'atom') {
            boost = 1 + (this.getUpgradeLevel('electron_orbit') * 0.5);
        } else if (this.stage === 'molecule') {
            boost = 1 + (this.getUpgradeLevel('molecular_bond') * 0.5);
        }

        const gained = Math.floor(2 * boost);
        this.particles += gained;
        this.totalWeightGenerated += gained;
        this.existentialWeight += gained;

        return true;
    }

    buyUpgrade(upgradeId) {
        if (!this.canBuyUpgrade(upgradeId)) return false;

        const cost = this.getUpgradeCost(upgradeId);
        this.particles -= cost;
        this.upgrades[upgradeId].level++;
        
        return true;
    }

    ascend() {
        if (!this.canAscend) return false;

        const nextStage = STAGES[this.stageIndex + 1];
        const cost = this.getAscensionCost(nextStage);
        
        this.particles -= cost;
        this.stageIndex++;
        this.applyStage();

        return true;
    }

    // Persistence
    save() {
        const data = {
            stageIndex: this.stageIndex,
            particles: this.particles,
            existentialWeight: this.existentialWeight,
            totalWeightGenerated: this.totalWeightGenerated,
            upgrades: this.upgrades,
            lastSave: Date.now()
        };
        localStorage.setItem('particleUniverse', JSON.stringify(data));
        this.lastSave = data.lastSave;
    }

    load() {
        const raw = localStorage.getItem('particleUniverse');
        if (!raw) return false;

        try {
            const data = JSON.parse(raw);
            this.stageIndex = data.stageIndex || 0;
            this.particles = data.particles || 1;
            this.existentialWeight = data.existentialWeight || 0;
            this.totalWeightGenerated = data.totalWeightGenerated || 0;
            this.upgrades = data.upgrades || {};
            this.lastSave = data.lastSave || Date.now();

            // Ensure all upgrades exist
            UPGRADES.forEach(u => {
                if (!this.upgrades[u.id]) {
                    this.upgrades[u.id] = { level: 0 };
                }
            });

            this.applyStage();
            return true;
        } catch (e) {
            console.error('Failed to load save:', e);
            return false;
        }
    }

    reset() {
        localStorage.removeItem('particleUniverse');
        this.stageIndex = 0;
        this.particles = 1;
        this.existentialWeight = 0;
        this.totalWeightGenerated = 0;
        UPGRADES.forEach(u => {
            this.upgrades[u.id] = { level: 0 };
        });
        this.applyStage();
    }
}
