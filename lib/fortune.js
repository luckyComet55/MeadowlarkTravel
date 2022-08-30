const fortunes = [
    "Man, everything is going to be fine",
    "GO LIFT",
    "LIIIIIFT",
    "CARDIO",
    "After each fall there is a подъём"
]

export default function getFortune () {
    const id = Math.floor(Math.random() * fortunes.length);
    return fortunes[id];
}