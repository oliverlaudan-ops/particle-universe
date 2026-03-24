const STAGES = NARRATIVE.getAllStageNames();

// Awareness gained per stage (Fibonacci-ish)
const AWARENESS_MAP = {
    particle: 0,
    atom: 1,
    molecule: 2,
    star: 3,
    planet: 5,
    life: 8,
    civilization: 13,
    universe: 21
};

const UPGRADES = [
    {
        id: 'quark_density',
        name: 'Quark Dichte',
        description: '+100% passives Einkommen',
        baseCost: 20,
        costMultiplier: 3,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'particle',
        maxLevel: 5
    },
    {
        id: 'strong_force',
        name: 'Starke Kraft',
        description: 'Erhöht Erschaffen-Ertrag',
        baseCost: 50,
        costMultiplier: 2.5,
        effect: { type: 'create_boost', value: 2 },
        requiresStage: 'particle',
        maxLevel: 3
    },
    {
        id: 'electron_orbit',
        name: 'Elektronen Umlaufbahn',
        description: '+100% passives Einkommen',
        baseCost: 200,
        costMultiplier: 3,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'atom',
        maxLevel: 5
    },
    {
        id: 'fusion_core',
        name: 'Fusionskern',
        description: 'Erhöht Vereinigen-Ertrag',
        baseCost: 400,
        costMultiplier: 3,
        effect: { type: 'merge_boost', value: 3 },
        requiresStage: 'atom',
        maxLevel: 3
    },
    {
        id: 'molecular_bond',
        name: 'Molekulare Bindung',
        description: '+100% passives Einkommen',
        baseCost: 2000,
        costMultiplier: 4,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'molecule',
        maxLevel: 5
    },
    {
        id: 'stellar_nucleus',
        name: 'Stellarer Kern',
        description: 'Erhöht Vereinigen-Ertrag',
        baseCost: 5000,
        costMultiplier: 4,
        effect: { type: 'merge_boost', value: 5 },
        requiresStage: 'molecule',
        maxLevel: 3
    },
    {
        id: 'stellar_fusion',
        name: 'Stellare Fusion',
        description: '+100% passives Einkommen',
        baseCost: 25000,
        costMultiplier: 5,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'star',
        maxLevel: 5
    },
    {
        id: 'planetary_core',
        name: 'Planetarer Kern',
        description: 'Erhöht Vereinigen-Ertrag',
        baseCost: 80000,
        costMultiplier: 5,
        effect: { type: 'merge_boost', value: 10 },
        requiresStage: 'star',
        maxLevel: 3
    },
    {
        id: 'tectonic_force',
        name: 'Tektonische Kraft',
        description: '+100% passives Einkommen',
        baseCost: 150000,
        costMultiplier: 6,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'planet',
        maxLevel: 5
    },
    {
        id: 'evolution_accelerator',
        name: 'Evolutionsbeschleuniger',
        description: 'Erhöht Vereinigen-Ertrag',
        baseCost: 500000,
        costMultiplier: 6,
        effect: { type: 'merge_boost', value: 20 },
        requiresStage: 'planet',
        maxLevel: 3
    },
    {
        id: 'consciousness_matrix',
        name: 'Bewusstseins-Matrix',
        description: '+100% passives Einkommen',
        baseCost: 2000000,
        costMultiplier: 8,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'life',
        maxLevel: 5
    },
    {
        id: 'civ_accelerator',
        name: 'Zivilisations-Beschleuniger',
        description: 'Erhöht Vereinigen-Ertrag',
        baseCost: 8000000,
        costMultiplier: 8,
        effect: { type: 'merge_boost', value: 50 },
        requiresStage: 'life',
        maxLevel: 3
    },
    {
        id: 'cosmic_expansion',
        name: 'Kosmische Expansion',
        description: '+100% passives Einkommen',
        baseCost: 50000000,
        costMultiplier: 10,
        effect: { type: 'passive_mult', value: 2 },
        requiresStage: 'civilization',
        maxLevel: 5
    },
    {
        id: 'big_crunch',
        name: 'Big Crunch',
        description: 'Erhöht Vereinigen-Ertrag massiv',
        baseCost: 200000000,
        costMultiplier: 10,
        effect: { type: 'merge_boost', value: 100 },
        requiresStage: 'civilization',
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

        // Prestige system
        this.cycle = 1;
        this.cosmicMemory = 0;
        this.awareness = 0;
        this.maxAwarenessThisCycle = 0;

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

    get canPrestige() {
        return this.isMaxStage;
    }

    getAwarenessLevel() {
        if (this.awareness >= 20) return 2;
        if (this.awareness >= 5) return 1;
        return 0;
    }

    getCosmicMultiplier() {
        return 1 + (this.cosmicMemory * 0.05);
    }

    getPrestigeGain() {
        if (!this.canPrestige) return 0;
        return Math.floor(Math.sqrt(this.totalWeightGenerated / 1000000));
    }

    ascend() {
        if (!this.canAscend) return false;

        const nextStage = STAGES[this.stageIndex + 1];
        const cost = this.getAscensionCost(nextStage);
        
        this.particles -= cost;
        this.stageIndex++;
        this.applyStage();
        
        // Gain awareness
        const awarenessGain = AWARENESS_MAP[this.stage] || 0;
        this.awareness += awarenessGain;
        this.maxAwarenessThisCycle = Math.max(this.maxAwarenessThisCycle, this.awareness);

        return true;
    }

    prestige() {
        if (!this.canPrestige) return false;

        const gain = this.getPrestigeGain();
        this.cosmicMemory += gain;
        this.cycle++;
        
        // Reset cycle progress
        this.stageIndex = 0;
        this.particles = 1;
        this.existentialWeight = 0;
        this.totalWeightGenerated = 0;
        this.awareness = 0;
        this.maxAwarenessThisCycle = 0;
        
        // Keep upgrades and cosmic memory
        UPGRADES.forEach(u => {
            this.upgrades[u.id] = { level: 0 };
        });
        
        this.applyStage();
        return gain;
    }

    getAscensionCost(stage) {
        const baseCosts = {
            particle: 50,
            atom: 300,
            molecule: 2000,
            star: 15000,
            planet: 150000,
            life: 2000000,
            civilization: 30000000,
            universe: Infinity
        };
        return baseCosts[stage] || Infinity;
    }

    getParticleCost() {
        const baseCost = 1;
        return Math.floor(baseCost * Math.pow(1.02, this.particles));
    }

    getMergeCost() {
        const baseCost = 3;
        return Math.floor(baseCost * Math.pow(1.04, this.particles));
    }

    // Passive income per second based on stage
    getPassiveIncome() {
        const stageIncomes = {
            particle: 2,
            atom: 10,
            molecule: 50,
            star: 200,
            planet: 1000,
            life: 8000,
            civilization: 80000,
            universe: 1000000
        };
        let base = stageIncomes[this.stage] || 2;
        
        // Multiplicative boost from passive upgrades
        base *= Math.pow(2, this.getUpgradeLevel('quark_density'));
        if (this.stage === 'atom') base *= Math.pow(2, this.getUpgradeLevel('electron_orbit'));
        if (this.stage === 'molecule') base *= Math.pow(2, this.getUpgradeLevel('molecular_bond'));
        if (this.stage === 'star') base *= Math.pow(2, this.getUpgradeLevel('stellar_fusion'));
        if (this.stage === 'planet') base *= Math.pow(2, this.getUpgradeLevel('tectonic_force'));
        if (this.stage === 'life') base *= Math.pow(2, this.getUpgradeLevel('consciousness_matrix'));
        if (this.stage === 'civilization') base *= Math.pow(2, this.getUpgradeLevel('cosmic_expansion'));
        
        // Apply cosmic memory multiplier
        base *= this.getCosmicMultiplier();
        
        return base;
    }

    // Bonus for manual create action
    getCreateBonus() {
        let bonus = 1;
        bonus *= (1 + this.getUpgradeLevel('strong_force') * 1);
        bonus *= this.getCosmicMultiplier();
        return bonus;
    }

    // Bonus for manual merge action
    getMergeBonus() {
        let bonus = 1;
        if (this.stage === 'atom') bonus *= (1 + this.getUpgradeLevel('fusion_core') * 2);
        if (this.stage === 'molecule') bonus *= (1 + this.getUpgradeLevel('stellar_nucleus') * 4);
        if (this.stage === 'star') bonus *= (1 + this.getUpgradeLevel('planetary_core') * 9);
        if (this.stage === 'planet') bonus *= (1 + this.getUpgradeLevel('evolution_accelerator') * 19);
        if (this.stage === 'life') bonus *= (1 + this.getUpgradeLevel('civ_accelerator') * 49);
        if (this.stage === 'civilization') bonus *= (1 + this.getUpgradeLevel('big_crunch') * 99);
        bonus *= this.getCosmicMultiplier();
        return bonus;
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
        return (this.upgrades[upgradeId] ? this.upgrades[upgradeId].level : 0) || 0;
    }

    applyStage() {
        this.existentialWeight = this.stageData.weightMultiplier;
    }

    // Actions
    createParticle() {
        const cost = this.getParticleCost();
        if (!this.canAfford(cost)) return false;

        this.particles -= cost;
        
        const gained = Math.floor(1 * this.getCreateBonus());
        this.particles += gained;
        this.totalWeightGenerated += gained;
        this.existentialWeight += gained;

        return true;
    }

    mergeParticles() {
        const cost = this.getMergeCost();
        if (!this.canAfford(cost)) return false;

        this.particles -= cost;
        
        const gained = Math.floor(3 * this.getMergeBonus());
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

    // Persistence
    save() {
        const data = {
            stageIndex: this.stageIndex,
            particles: this.particles,
            existentialWeight: this.existentialWeight,
            totalWeightGenerated: this.totalWeightGenerated,
            upgrades: this.upgrades,
            cycle: this.cycle,
            cosmicMemory: this.cosmicMemory,
            awareness: this.awareness,
            maxAwarenessThisCycle: this.maxAwarenessThisCycle,
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
            this.cycle = data.cycle || 1;
            this.cosmicMemory = data.cosmicMemory || 0;
            this.awareness = data.awareness || 0;
            this.maxAwarenessThisCycle = data.maxAwarenessThisCycle || 0;
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
        this.cycle = 1;
        this.cosmicMemory = 0;
        this.awareness = 0;
        this.maxAwarenessThisCycle = 0;
        UPGRADES.forEach(u => {
            this.upgrades[u.id] = { level: 0 };
        });
        this.applyStage();
    }
}
