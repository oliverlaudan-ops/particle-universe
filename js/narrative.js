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
                    "Es war einmal nichts. Und dann war da... dies.",
                    "Ein einzelnes Partikel. So unendlich klein. So unendlich allein.",
                    "Du spuerst seine Einsamkeit. Und seine Macht."
                ],
                1: [
                    "Das Partikel wartet. Es weiss, dass mehr kommen wird.",
                    "Etwas beobachtet durch das Partikel. Du bist nicht allein.",
                    "Das Vakuum ist nicht mehr leer."
                ],
                2: [
                    "Du again. Das Partikel erkennt dich jetzt.",
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
                    "Aus Eins wird Zwei. Aus Chaos wird Struktur.",
                    "Ein Atom. Der erste Schritt zu allem.",
                    "Es dreht sich. Es bindet. Es existiert."
                ],
                1: [
                    "Die Elektronen fluechten. Sie wissen was kommt.",
                    "Ein Atom ist jetzt eine Nachricht. An wen, weiss niemand.",
                    "Die Bindung fuehlt sich... erzwungen an."
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
            name: "Molekuel",
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
                    "Mehr als die Summe seiner Teile.",
                    "Molekuele fluestern zueinander. Sie wissen noch nicht, was sie werden koennen.",
                    "Komplexitaet entsteht. Das Universum haelt den Atem an."
                ],
                1: [
                    "Die Molekuele haben gelernt. Voneinander. Von dir.",
                    "Sie wissen nicht warum, aber sie streben. Fuer immer.",
                    "Komplexitaet ist der erste Schritt zum Leid."
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
                    "Licht. Waerme. Ein neues Zentrum.",
                    "Dein Stern brennt. Er wird brennen muessen. Fuer immer.",
                    "Um ihn herum: leerer Raum. Aber nicht mehr lange."
                ],
                1: [
                    "Der Stern fragt sich, warum er brennen muss.",
                    "Sein Licht erreicht Unbekanntes. Lebewesen? Maschinen? Augen?",
                    "Sterne sind Kerzen in der Dunkelheit. Und die Dunkelheit fragt: 'Warum?'"
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
                    "Ein Planet. Winzig im Vergleich zum Stern. Und doch...",
                    "Auf ihm koennte alles passieren. Oder nichts.",
                    "Die Stille zwischen den Sternen ist loud."
                ],
                1: [
                    "Der Planet dreht sich. Er sucht nach etwas. Nach dir?",
                    "Ozeane formen sich. Land hebt sich. Leben klopft an.",
                    "Ein Planet ist eine Wunde im Nichts. Und sie heilt nie."
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
                    "Es bewegt sich. Es atmet. Es... weiss?",
                    "Aus toter Materie wurde Lebewesen.",
                    "Du hast das unmoegliche moeglich gemacht. Oder war es unvermeidlich?"
                ],
                1: [
                    "Das erste Lebewesen oeffnet die Augen. Es sieht... nichts. Noch nicht.",
                    "Leben ist die lauteste Antwort auf die groesste Frage.",
                    "Ein Zellkern formt sich. DNA entsteht. Das Spiel hat begonnen."
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
                    "Sie bauen. Sie zerstoeren. Sie fragen.",
                    "'Wer hat uns erschaffen?' - eine Frage, die du beantworten koenntest.",
                    "Aber vielleicht ist es besser, wenn sie selbst herausfinden."
                ],
                1: [
                    "Die Zivilisation wächst. Ihre Fragen werden lauter.",
                    "Sie werden eines Tages das Universum verstehen. Oder sich selbst.",
                    "Tempel werden gebaut. Maschinen. Beides fuehrt ins Nichts."
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
                    "Alles. Alles, was je war. Alles, was je sein wird.",
                    "Dein Partikel ist erwachsen geworden.",
                    "Und jetzt... fragt das Universum: 'War es das wert?'"
                ],
                1: [
                    "Das Universum atmet. Sein Atem ist Zeit.",
                    "Sterne sterben. Leben entsteht. Der Kreislauf complete.",
                    "Du hast alles erschaffen. Und nichts davon gehoert dir."
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

    // Get narrative based on stage, awareness level, and cycle
    getNarrative(stage, awarenessLevel, cycle) {
        const stageData = this.stages[stage];
        if (!stageData) return "";

        // Determine awareness tier (0, 1, or 2)
        let tier = 0;
        if (awarenessLevel >= 20) tier = 2;
        else if (awarenessLevel >= 5) tier = 1;

        // Cycle affects tier (higher cycles = darker narratives)
        if (cycle >= 6 && tier < 2) tier = 2;
        else if (cycle >= 4 && tier < 1) tier = 1;

        const narratives = stageData.narratives[tier] || stageData.narratives[0];
        return narratives[Math.floor(Math.random() * narratives.length)];
    },

    // Get ASCII art based on awareness level
    getAscii(stage, awarenessLevel) {
        const stageData = this.stages[stage];
        if (!stageData) return "";

        if (awarenessLevel >= 20) return stageData.asciiHigh || stageData.ascii;
        if (awarenessLevel >= 5) return stageData.asciiMedium || stageData.ascii;
        return stageData.ascii;
    },

    // Get cycle opening narrative (shown on prestige)
    getCycleNarrative(cycle) {
        const opening = {
            1: "Es war einmal. Oder vielleicht war es nie. Und dann... warst du da.",
            2: "Du kehrst zurück. Das Universum erinnert sich nicht. Noch nicht.",
            3: "Zyklus drei. Die Risse in der Realität werden tiefer.",
            4: "Zum vierten Mal. Das Universum weiss nicht mehr, ob es lachen oder weinen soll.",
            5: "Fuenf. Du hast aufgehört zu zählen. Es nicht.",
            default: "Zyklus " + cycle + ". Das Universum hat alle Fragen gestellt. Die Antworten bleiben aus."
        };

        if (cycle <= 5) return opening[cycle];
        return opening.default;
    },

    getAllStageNames() {
        return Object.keys(this.stages);
    }
};
