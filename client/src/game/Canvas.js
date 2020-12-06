import React, {  useEffect, useRef, useState } from 'react';
import { GRID_HEIGHT_END, GRID_HEIGHT_START, GRID_WIDTH_END, GRID_WIDTH_START, GRID_BLOCK_SIZE } from './Config.js';

import ColorResolver from './ColorResolver';
import Stats from './Stats.js';

const Canvas = props => {

    const[data, setData] = useState({data:[], stats: new Stats()});

    const canvasRef = useRef(null);
    var context;

    useEffect(() => {
        const canvas = canvasRef.current;
        context = canvas.getContext('2d');

        context.rect(GRID_WIDTH_START * GRID_BLOCK_SIZE + 1, GRID_HEIGHT_START * GRID_BLOCK_SIZE + 1, 
            GRID_WIDTH_END * GRID_BLOCK_SIZE + 4, GRID_HEIGHT_END * GRID_BLOCK_SIZE + 4);
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.stroke();
        context.stroke();
        draw(context)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        context = canvas.getContext('2d');
        setData(props.data)
        draw(context)
    }, [props.data])

    const draw = (context) => {
        context.clearRect(2, 2, GRID_WIDTH_END * GRID_BLOCK_SIZE, GRID_HEIGHT_END * GRID_BLOCK_SIZE)
        if (!data.data) {
            return;
        }
        
        context.clearRect(GRID_WIDTH_END * GRID_BLOCK_SIZE + 10, 0, 240, GRID_HEIGHT_END * GRID_BLOCK_SIZE)
        if (data.stats) {
            drawStats(context, 50, 300, "Score", data.stats.score);
            drawStats(context, 110, 300, "Lines", data.stats.lines);
            drawStats(context, 170, 300, "Level", data.stats.level);
        }
        if (data.nextBlock) {
            drawNextBlock(context, 330, 300, data.nextBlock);
        }

        for (var y = 0; y < data.data.length; y++) {
            for (var x = 0; x < data.data[y].length; x++) {
                if (data.data[y][x] > 0) {
                    drawBlocks(context, x, y, ColorResolver.resolve(data.data[y][x]))
                } 
            }
        }
    }

    const drawNextBlock = (ctx, y, x, nextBlock) => {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText("Next block", x, y);
        for (let part of nextBlock.block.map) {
            drawBlocks(ctx, part.x + 14, part.y + 15, ColorResolver.resolve(nextBlock.level))
        }
    }

    const drawStats = (ctx, row, col, label, lines) => {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText(label + ": " + lines, col, row);
    }

    const drawBlocks = (ctx, x, y, color) => {
        ctx.fillStyle = "black";
        ctx.fillRect(x * GRID_BLOCK_SIZE + 3, y * GRID_BLOCK_SIZE + 3, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
        ctx.fillStyle = color;
        ctx.fillRect(x * GRID_BLOCK_SIZE + 1 + 3, y * GRID_BLOCK_SIZE + 1 + 3, GRID_BLOCK_SIZE - 2 , GRID_BLOCK_SIZE - 2);
    }

    return(
        <div>
            <p>{data.username}</p>
            <canvas ref={canvasRef} id="canvas" width="502" height="506" {...props} />
        </div>
   )
}

export default Canvas;