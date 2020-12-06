
class Block {

    x = 4;
    y = 1;

    constructor(blockType, level) {
        // this.level = blockType.index + 1
        this.blockMap = blockType.data;
        this.level = (level % 8) + blockType.index;
        // rotation index
        this.currentIndex = Math.floor((Math.random() * blockType.data.length));
        this.block = this.blockMap[this.currentIndex];
    }

    moveDown(y = 1) {
        this.y = this.y + y;
    }

    moveUp(y = 1) {
        this.y = this.y -y;
    }

    moveRight(x = 1) {
        this.x = this.x + x;
    }

    moveLeft(x = 1) {
        this.x = this.x - x;
    }

    rotateForward() {
        this.currentIndex = this.currentIndex + 1 >= this.blockMap.length ? 0 : this.currentIndex + 1;
        this.block = this.blockMap[this.currentIndex]
    }

    rotateBack() {
        this.currentIndex = this.currentIndex - 1 < 0 ? this.blockMap.length -1 : this.currentIndex - 1;
        this.block = this.blockMap[this.currentIndex]
    }

    print(grid, value) {
        for (const part of this.block.map) {
            grid[part.y + this.y][part.x + this.x] = value !== undefined ? value : this.level;
        }
    }
}

export default Block;