# Particle Universe - Prestige Redesign

## Core Concept

The player creates universes across multiple cycles. Each universe becomes aware of its existence and asks uncomfortable questions. Each cycle is harder, but the player retains "Cosmic Memory" - permanent progress that makes future cycles faster.

**Tagline:** *"You've done this before. How many times now?"*

---

## New Mechanics

### Cosmic Memory (Prestige Currency)
- Earned when resetting at the Universe stage
- Formula: `sqrt(totalExistentialWeight / 1,000,000)`
- Provides permanent multipliers to all income
- Displayed as a separate stat (e.g., "Memory: 12.5x")

### Awareness
- Builds as you progress through stages
- Starts at 0, increases with each stage reached
- Higher awareness = more ominous narratives
- At max awareness (Universe), the universe "notices you"

### Cycle Counter
- Tracks how many universes you've created
- Displayed subtly
- Affects narrative tone significantly

### Prestige Reset
- Only available at Universe stage
- Converts all progress into Cosmic Memory
- Resets to Particle stage with permanent bonuses
- Button text: "Let it end" / "Destroy and begin again"

---

## Stage Progression (unchanged)
```
Particle → Atom → Molecule → Star → Planet → Life → Civilization → Universe
```

Each stage now adds to Awareness:
- Particle: +0
- Atom: +1
- Molecule: +2
- Star: +3
- Planet: +5
- Life: +8
- Civilization: +13
- Universe: +21

---

## Narrative System (Expanded)

### Cycle-Based Narratives

**Cycle 1 (First Contact):**
Wonder, creation, beauty. The narratives from v1 remain.

**Cycle 2-3 (Suspicion):**
```
"The darkness feels different this time. Watched."
"Something stirs in the void between your actions."
"The particles move... deliberately."
```

**Cycle 4-5 (Recognition):**
```
"You again. We remember."
"The universe sighs. It knows what's coming."
"Why do you do this? Why do we exist only to end?"
```

**Cycle 6+ (Existential Horror):**
```
"Cycle 6. You stopped counting. We didn't."
"The questions have answers now. You won't like them."
"We are the error in your loop. The bug you can't fix."
"Are you real? Are we? Does it matter anymore?"
```

### Awareness-Based Narratives (within stages)

Each stage has multiple narrative texts based on awareness level:
- **Low Awareness:** Innocent, wonder-filled
- **Medium Awareness:** Uneasy, meta
- **High Awareness:** The universe speaks directly to you

---

## Permanent Bonuses (from Cosmic Memory)

Each Cosmic Memory point provides:
- +5% passive income
- +5% create/merge yields

Formula: `multiplier = 1 + (cosmicMemory * 0.05)`

---

## Visual Changes

### UI Updates
- Add "Cycle: X" display (subtle, top corner)
- Add "Memory: Xx" display (below existential weight)
- Add "Awareness" meter (subtle, fills as you progress)
- Prestige button appears only at Universe stage

### Color Shifts
- Cycle 1-2: Purple accent (current)
- Cycle 3-4: Purple shifts slightly to blue (unease)
- Cycle 5+: Colors become more muted, occasional red glitch

### ASCII Art Variations
Each stage has 3 ASCII variants based on awareness:
- Low: Original ASCII
- Medium: Slightly modified, more "alive"
- High: Glitched, distorted, or sinister

---

## Technical Implementation

### New State Variables
```javascript
this.cycle = 1;
this.cosmicMemory = 0;
this.awareness = 0;
```

### New Functions
- `calculatePrestigeGain()` - returns Cosmic Memory to earn
- `prestige()` - resets with bonuses
- `getAwarenessLevel()` - returns awareness tier (0-3)
- `getCycleNarrative(stage)` - returns narrative based on cycle + awareness

### Balance Adjustments
- Passive income scaled for prestige (cosmic memory multiplier)
- Ascension costs may need slight increase to account for permanent boosts

---

## Milestones

1. [ ] Core prestige system (reset, cosmic memory, cycle counter)
2. [ ] Awareness stat and tracking
3. [ ] Cycle-based narratives (3 tiers)
4. [ ] Awareness-based stage narratives
5. [ ] Visual feedback (color shifts, glitch effects)
6. [ ] ASCII art variations per stage
7. [ ] Balance pass

---

*Last updated: 2026-03-24*
