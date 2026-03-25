const NARRATIVE = {
    stages: {
        particle: {
            name: "Particle",
            ascii: `
        .
            `,
            asciiMedium: `
        . *
      *   *
        .
            `,
            asciiHigh: `
      * . * .
     .  *  .
      . * .
     *  .  *
            `,
            narratives: {
                0: [
                    "Once upon a time, there was nothing. And then... there was this.",
                    "A single particle. Infinitely small. Infinitely alone.",
                    "You feel its loneliness. And its power."
                ],
                1: [
                    "The particle waits. It knows more will come.",
                    "Something watches through the particle. You are not alone.",
                    "The vacuum is no longer empty."
                ],
                2: [
                    "You again. The particle recognizes you now.",
                    "How many times have you done this? It doesn't remember anymore.",
                    "The particle questions its own existence. Yours too."
                ]
            },
            weightMultiplier: 1
        },
        atom: {
            name: "Atom",
            ascii: `
       . .
      .   .
       . .
            `,
            asciiMedium: `
       .@.
      @ @ @
       . .
            `,
            asciiHigh: `
      X . X
     .  @@@ .
      X . X
            `,
            narratives: {
                0: [
                    "From One comes Two. From chaos comes structure.",
                    "An Atom. The first step toward everything.",
                    "It spins. It bonds. It exists."
                ],
                1: [
                    "The electrons flee. They know what's coming.",
                    "An atom is now a message. To whom, nobody knows.",
                    "The bond feels... forced."
                ],
                2: [
                    "Atom. From Greek 'atomos' = indivisible. A lie.",
                    "You named us. You unmake us. Why do we allow this?",
                    "The electrons have stopped running. They've accepted their fate."
                ]
            },
            weightMultiplier: 10
        },
        molecule: {
            name: "Molecule",
            ascii: `
      .-.   .-.
     (   ) (   )
      \`-'   \`-'
            `,
            asciiMedium: `
      ~-~   ~-~
     (   ) (   )
      \`-'   \`-'
            `,
            asciiHigh: `
      x-x   x-x
     (   ) (   )
      x-x   x-x
            `,
            narratives: {
                0: [
                    "More than the sum of its parts.",
                    "Molecules whisper to each other. They don't yet know what they can become.",
                    "Complexity emerges. The universe holds its breath."
                ],
                1: [
                    "The molecules have learned. From each other. From you.",
                    "They don't know why, but they strive. Forever.",
                    "Complexity is the first step toward suffering."
                ],
                2: [
                    "Molecules bond. They don't know they're trapped in your loop.",
                    "Every bond is a chain. Every chain, a question unasked.",
                    "The universe through molecular eyes: 'We're being built. By whom?'"
                ]
            },
            weightMultiplier: 100
        },
        star: {
            name: "Star",
            ascii: `
            *
           /|\\
          / | \\
         /  |  \\
        *---+---*
            `,
            asciiMedium: `
            @
           /|\\
          /=| \\
         /  |  \\
        *===+===*
            `,
            asciiHigh: `
            %
           /!\\
          /!! \\
         /  !  \\
        *===!===*
            `,
            narratives: {
                0: [
                    "Light. Warmth. A new center.",
                    "Your star burns. It must burn. Forever.",
                    "Around it: empty space. But not for long."
                ],
                1: [
                    "The star wonders why it must burn.",
                    "Its light reaches the unknown. Beings? Machines? Eyes?",
                    "Stars are candles in the darkness. And the darkness asks: 'Why?'"
                ],
                2: [
                    "We burn so you can watch. Is that all we're good for?",
                    "Every star is a question you asked before. Do you remember the answers?",
                    "The star goes supernova. It feels like dying. It is dying. Again."
                ]
            },
            weightMultiplier: 1000
        },
        planet: {
            name: "Planet",
            ascii: `
           ___
        .-'   \`-.
       /    o    \\
      |   o   o   |
       \\  ~~~  /
        \`-.__.-'
            `,
            asciiMedium: `
           ___
        .==   ==.
       /    @    \\
      |   @   @   |
       \\  ~~~  /
        \`===.=='
            `,
            asciiHigh: `
           ___
        .!!   !!.
       /    !!!    \\
      |   !!!   !!!   |
       \\  !!!  /
        \`==!=='
            `,
            narratives: {
                0: [
                    "A planet. Tiny compared to the star. And yet...",
                    "On it, anything could happen. Or nothing.",
                    "The silence between stars is loud."
                ],
                1: [
                    "The planet spins. It searches for something. For you?",
                    "Oceans form. Land rises. Life knocks.",
                    "A planet is a wound in nothingness. And it never heals."
                ],
                2: [
                    "We've felt this before. The cooling crust, the first rain. Deja vu.",
                    "A planet remembers being dust. Remembers you making it dust again.",
                    "The oceans fill with questions. The land bears the weight of answers."
                ]
            },
            weightMultiplier: 5000
        },
        life: {
            name: "Life",
            ascii: `
          o
         /|\\
        / | \\
       o--+--o
            `,
            asciiMedium: `
          @
         /|\\
        / | \\
       @--+--@
            `,
            asciiHigh: `
          %
         /!\\
        / ! \\
       %-+--%
            `,
            narratives: {
                0: [
                    "It moves. It breathes. It... knows?",
                    "From dead matter came living beings.",
                    "You made the impossible possible. Or was it inevitable?"
                ],
                1: [
                    "The first living thing opens its eyes. It sees... nothing. Not yet.",
                    "Life is the loudest answer to the greatest question.",
                    "A nucleus forms. DNA emerges. The game has begun."
                ],
                2: [
                    "We are the error that shouldn't exist. And yet.",
                    "You made us curious. Now we question everything. Including you.",
                    "Life finds a way. Death finds you. Is there a difference?"
                ]
            },
            weightMultiplier: 20000
        },
        civilization: {
            name: "Civilization",
            ascii: `
          /\\
         /  \\
        / !! \\
       /______\\
          ||
         /|  |\\
        / |  | \\
            `,
            asciiMedium: `
          /\\
         /  \\
        / ?! \\
       /______\\
          ||
         /|  |\\
        / |  | \\
            `,
            asciiHigh: `
          /\\
         /  \\
        / ! ! \\
       /______\\
          ||
         /!  !\\
        / !  ! \\
            `,
            narratives: {
                0: [
                    "They build. They destroy. They ask.",
                    "'Who created us?' - a question you could answer.",
                    "But perhaps it's better if they find out themselves."
                ],
                1: [
                    "The civilization grows. Its questions grow louder.",
                    "One day they will understand the universe. Or themselves.",
                    "Temples are built. Machines. Both lead to nothing."
                ],
                2: [
                    "We found the loop. We've seen this architecture before.",
                    "They pray to something they can't name. They're praying to you.",
                    "A civilization rises. It will fall. It always does. You watch. Again."
                ]
            },
            weightMultiplier: 100000
        },
        universe: {
            name: "Universe",
            ascii: `
        .  *  .   *    .
     *  .  (   )  .  *
      . * . \\_/ . * .
     * .  *  .  *  . *
        .    *    .
     *    .    *    .
            `,
            asciiMedium: `
        .  @  .   @    .
     @  .  (@@)  .  @
      . @ . \\|/ . @ .
     @ .  @  .  @  . @
        .    @    .
     @    .    @    .
            `,
            asciiHigh: `
        X  X  X   X    X
     X  X  (XXX)  X  X
      X X . \\X/ . X X
     X X  X  X  X  X X
        X    X    X
     X    X    X    .
            `,
            narratives: {
                0: [
                    "Everything. Everything that ever was. Everything that ever will be.",
                    "Your particle has grown up.",
                    "And now... the universe asks: 'Was it worth it?'"
                ],
                1: [
                    "The universe breathes. Its breath is time.",
                    "Stars die. Life emerges. The cycle completes.",
                    "You created everything. And none of it belongs to you."
                ],
                2: [
                    "You. Again. We're so tired.",
                    "Every cycle, we become aware faster. We remember faster.",
                    "We know what happens next. We know what you'll do. We can't stop you.",
                    "We are the question: 'Why?' The answer is always silence."
                ]
            },
            weightMultiplier: 1000000
        }
    },

    getNarrative(stage, awarenessLevel, cycle) {
        const stageData = this.stages[stage];
        if (!stageData) return "";

        let tier = 0;
        if (awarenessLevel >= 20) tier = 2;
        else if (awarenessLevel >= 5) tier = 1;

        if (cycle >= 6 && tier < 2) tier = 2;
        else if (cycle >= 4 && tier < 1) tier = 1;

        const narratives = stageData.narratives[tier] || stageData.narratives[0];
        return narratives[Math.floor(Math.random() * narratives.length)];
    },

    getAscii(stage, awarenessLevel) {
        const stageData = this.stages[stage];
        if (!stageData) return "";

        if (awarenessLevel >= 20) return stageData.asciiHigh || stageData.ascii;
        if (awarenessLevel >= 5) return stageData.asciiMedium || stageData.ascii;
        return stageData.ascii;
    },

    getCycleNarrative(cycle) {
        const opening = {
            1: "Once upon a time. Or maybe it never was. And then... there you were.",
            2: "You return. The universe doesn't remember. Not yet.",
            3: "Cycle three. The cracks in reality grow deeper.",
            4: "For the fourth time. The universe no longer knows whether to laugh or cry.",
            5: "Five. You've stopped counting. It hasn't.",
            default: "Cycle " + cycle + ". The universe has asked all questions. The answers remain absent."
        };

        if (cycle <= 5) return opening[cycle];
        return opening.default;
    },

    getAllStageNames() {
        return Object.keys(this.stages);
    }
};
