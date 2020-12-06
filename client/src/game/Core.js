import React, { useEffect, useState } from 'react';
import Client from './Client';
import { GRID } from './Config.js';
import KeyListener from './KeyListener';
import CollisionDetector from './CollisionDetector';
import LineCleaner from './LineCleaner';
import BlockGenerator from './BlockGenerator';
import Canvas from './Canvas';
import Stats from './Stats';

const Core = props => {

    // Player data
    var grid = GRID;
    const[gridState, setGridState] = useState(GRID);
    var block;
    var stats;
    // All oponent players data
    const[players, setPlayers] = useState({});
    var playersCollection = [];
    // Client to connect WS
    var client;
    // Variable for game loop
    var oldTimeStamp = 0;
    var currentStep = 0;
    var maxStep = 50;
    // Key listeners when key is pressed
    var keyListener;

    useEffect(() => {
        client = new Client();
        client.createConnection();

        keyListener = new KeyListener();
        keyListener.registrEventListeners();

        block = BlockGenerator.randomBlock(1);
        block.print(grid); 
        stats = stats = new Stats();

        window.requestAnimationFrame(loop);
    }, [])

    const loop = (currentTime) => {
        let secondsPassed = (currentTime - oldTimeStamp) / 1000;
        // let fps = Math.round(1 / secondsPassed);

        networking();
        update(secondsPassed);
        
        oldTimeStamp = currentTime;
        // let animationID = window.requestAnimationFrame(loop);
        window.requestAnimationFrame(loop); 
    }

    function update(delta) {
        setGridState({ username: props.username, data: grid, stats: stats, nextBlock: BlockGenerator.nextBlock })
        if (keyListener.move != null) {
            block.print(grid, 0); 

            if (keyListener.move === "left") {
                block.moveLeft()
                if (CollisionDetector.detectLeftBorder(block) || CollisionDetector.detectBlocks(grid, block)) {
                    block.moveRight()
                }
            }

            if (keyListener.move === "right") {
                block.moveRight()
                if (CollisionDetector.detectRightBorder(block) || CollisionDetector.detectBlocks(grid, block)) {
                    block.moveLeft()
                }
            }

            if (keyListener.move === "up") {
                block.rotateForward()
                while(CollisionDetector.detectLeftBorder(block)) {
                    block.moveRight()
                }
                while (CollisionDetector.detectRightBorder(block)) {
                    block.moveLeft()
                }
                if (CollisionDetector.detectBlocks(grid, block)) {
                    block.rotateBack()
                }
            }

            if (keyListener.move === "down") {
                block.moveDown();
                if (CollisionDetector.detectBottomBorder(block) || CollisionDetector.detectBlocks(grid, block)) {
                    block.moveUp();
                    block.print(grid); 
                    block = BlockGenerator.randomBlock(stats.level); 
                    keyListener.stop = true;
                } else {
                    stats.addScore(1);
                }
            }

            let lines = LineCleaner.updateRows(grid)
            stats.addLines(lines);
            stats.addScore(lines * lines * 1000)
            block.print(grid); 

            keyListener.move = null;
        }

        currentStep += 25 * stats.getLevel() * delta;
        if (currentStep <= maxStep) {
            return; 
        }

        block.print(grid, 0); 
        
        block.moveDown();
        if (CollisionDetector.detectBottomBorder(block) || CollisionDetector.detectBlocks(grid, block) ) { 
            block.moveUp();
            block.print(grid); 
            block = BlockGenerator.randomBlock(stats.level);   
            let lines = LineCleaner.updateRows(grid)
            stats.addLines(lines);
            stats.addScore(lines * lines * 1000)
        } 
        block.print(grid);

        currentStep = 0;
    }

    // TODO
    function networking() {
        client.sendMessage({ username: props.username, data: grid, stats: stats, nextBlock: BlockGenerator.nextBlock });
        client.client.onmessage = (message) => {
            let dataAll = JSON.parse(message.data).utf8Data;
            let data = JSON.parse(dataAll);
            if (data.username !== props.username) {
                playersCollection[data.username] = data;
                setPlayers({...playersCollection});
            }
        }
    }


    
    return(
        <div className="content">
            <div>
                <Canvas data={gridState} />
            </div>
            <div>
                {Object.keys(players).map((id) => {     
                    return <Canvas data={players[id]} />
                })}
            </div>
        </div>
    )
}

export default Core;