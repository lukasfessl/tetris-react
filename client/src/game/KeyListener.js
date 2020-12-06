
class KeyListener {

    move;
    stop;

    constructor() {
        this.stop = false;
    }

    registrEventListeners() {
        document.addEventListener('keydown', this.logKeyDown);
        document.addEventListener('keyup', this.logKeyUp);
    }

    logKeyDown = (e) => {
        if (e.keyCode === 39 && !this.stop) {
            this.move = "right"
        }
        if (e.keyCode === 37 && !this.stop) {
            this.move = "left"
        }
        if (e.keyCode === 38 && !this.stop) {
            this.move = "up"
        }
        if (e.keyCode === 40 && !this.stop) {
            this.move = "down"
        }
    }
    
    logKeyUp = (e) => {
        if (e.keyCode === 40) {
            this.move = null;
            this.stop = false;
        }
    }

    getMove = () => {
        return this.move;
    }
}

export default KeyListener;