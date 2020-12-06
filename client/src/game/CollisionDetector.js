import { GRID_HEIGHT, GRID_WIDTH } from './Config';

class CollisionDetector {

    static detectLeftBorder(block) {
        for (const part of block.block.map) {
            if (part.x + block.x < 0) {
                return true;
            }
        }
        return false;
    }

    static detectRightBorder(block) {
        for (const part of block.block.map) {
            if ( part.x + block.x > GRID_WIDTH - 1) {
                return true;
            }
        }
        return false;
    }

    static detectBottomBorder(block) {
        for (const part of block.block.map) {
            if ( part.y + block.y > GRID_HEIGHT - 1) {
                return true;
            }
        }
        return false;
    }

    static detectBlocks = (grid, block) => {
        for (const part of block.block.map) {
            if (grid[part.y + block.y][part.x + block.x] !== 0) {
                return true;
            }
        }
        return false;
    }

}

export default CollisionDetector;