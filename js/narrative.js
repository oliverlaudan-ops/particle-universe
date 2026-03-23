const NARRATIVE = {
    stages: {
        particle: {
            name: "Partikel",
            ascii: `
        .
            `,
            narratives: [
                "Es war einmal nichts. Und dann war da... dies.",
                "Ein einzelnes Partikel. So unendlich klein. So unendlich allein.",
                "Du spürst seine Einsamkeit. Und seine Macht."
            ],
            weightMultiplier: 1
        },
        atom: {
            name: "Atom",
            ascii: `
       . .
      .   .
       . .
            `,
            narratives: [
                "Aus Eins wird Zwei. Aus Chaos wird Struktur.",
                "Ein Atom. Der erste Schritt zu allem.",
                "Es dreht sich. Es bindet. Es existiert."
            ],
            weightMultiplier: 10
        },
        molecule: {
            name: "Molekül",
            ascii: `
      .-.   .-.
     (   ) (   )
      \`-'   \`-'
            `,
            narratives: [
                "Mehr als die Summe seiner Teile.",
                "Moleküle flüstern zueinander. Sie wissen noch nicht, was sie werden können.",
                "Komplexität entsteht. Das Universum hält den Atem an."
            ],
            weightMultiplier: 100
        },
        star: {
            name: "Stern",
            ascii: `
            *
           /|\\
          / | \\
         /  |  \\
        *---+---*
            `,
            narratives: [
                "Licht. Wärme. Ein neues Zentrum.",
                "Dein Stern brennt. Er wird brennen müssen. Für immer.",
                "Um ihn herum: leerer Raum. Aber nicht mehr lange."
            ],
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
        \`-.___.-'
            `,
            narratives: [
                "Ein Planet. Winzig im Vergleich zum Stern. Und doch...",
                "Auf ihm könnte alles passieren. Oder nichts.",
                "Die Stille zwischen den Sternen ist loud."
            ],
            weightMultiplier: 5000
        },
        life: {
            name: "Leben",
            ascii: `
          o
         /|\\
        / | \\
       o--+--o
            `,
            narratives: [
                "Es bewegt sich. Es atmet. Es... weiß?",
                "Aus toter Materie wurde Lebewesen.",
                "Du hast das unmögliche möglich gemacht. Oder war es unvermeidlich?"
            ],
            weightMultiplier: 20000
        },
        civilization: {
            name: "Zivilisation",
            ascii: `
          /\\
         /  \\
        / !! \\
       /______\\
          ||
         /|  |\\
        / |  | \\
            `,
            narratives: [
                "Sie bauen. Sie zerstören. Sie fragen.",
                "\"Wer hat uns erschaffen?\" - eine Frage, die du beantworten könntest.",
                "Aber vielleicht ist es besser, wenn sie selbst herausfinden."
            ],
            weightMultiplier: 100000
        },
        universe: {
            name: "Universum",
            ascii: `
        .  *  .   *    .
     *  .  (   )  .  *
      . * . \\_/ . * .
     * .  *  .  *  . *
        .    *    .
     *    .    *    .
            `,
            narratives: [
                "Alles. Alles, was je war. Alles, was je sein wird.",
                "Dein Partikel ist erwachsen geworden.",
                "Und jetzt... fragt das Universum: \"War es das wert?\""
            ],
            weightMultiplier: 1000000
        }
    },

    getRandomNarrative(stage) {
        const narratives = this.stages[stage].narratives;
        return narratives[Math.floor(Math.random() * narratives.length)];
    },

    getAllStageNames() {
        return Object.keys(this.stages);
    }
};
