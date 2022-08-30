const fortunes = [
    "Man, everything is going to be fine",
    "GO LIFT",
    "LIIIIIFT",
    "CARDIO",
    "After each fall there is a подъём"
]

exports.getFortune = () => {
    const id = Math.floor(Math.random() * fortunes.length);
    return fortunes[id];
}