
const LINES_TO_NEXT_LEVEL = 4;

class Stats {

    score = 0;
    level = 1;
    lines = 0;

    addScore(score) {
        this.score += score;
    }

    addLines(lines) {
        this.lines += lines;
        this.level = Math.floor(this.lines / LINES_TO_NEXT_LEVEL) + 1;
    }

    getScore() {
        return this.score;
    }

    getLines() {
        return this.lines;
    }

    getLevel() {
        return this.level;
    }
}

export default Stats;