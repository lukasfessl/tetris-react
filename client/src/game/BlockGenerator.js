import { RIGHT_L, LINE, TRIANGLE, RIGHT_R, ES_R, ES_L, CUBE } from './BlockList';
import Block from './Block';

class BlockGenerator {

    nextBlock;

    static randomBlock(level) {
        if (!this.nextBlock) {
            this.nextBlock = this.createBlock(level);
        }
        let currentBlock =  this.nextBlock;
        this.nextBlock = this.createBlock(level);
        
        return currentBlock;
    }

    static createBlock(level) {
        let blockIndex = Math.floor((Math.random() * 7)  + 1 );
        // let blockIndex = 1;
        return new Block(this.getBlock(blockIndex), level);
    }

    static getBlock(index) {
        switch(index) {
            case 1: 
                return LINE;
            case 2: 
                return TRIANGLE;
            case 3: 
                return RIGHT_L;
            case 4: 
                return RIGHT_R;
            case 5: 
                return ES_L;
            case 6: 
                return ES_R;
            case 7: 
                return CUBE;
            default:
                return CUBE;
        }
    }
   
}

export default BlockGenerator;