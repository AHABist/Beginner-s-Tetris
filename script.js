'use strict'

import { tetrominos } from "./constants.js"
import { Tetromino } from "./class_tetromino.js"
import { turnTetromino } from "./constants.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const boardWidth = 10;
const boardHeight = 20;

const blockSize = 20;
canvas.width = boardWidth * blockSize;
canvas.height = boardHeight * blockSize;

//gamespeed in miliseconds
let gameSpeed = 500
let acceleration = 10

let tetromino = new Tetromino
tetromino.getShape()

let crash = false
let lastTime = 0;
let thisTime = 0;

let frames = 0

let wouldCollideLeft = false
let wouldCollideRight = false



function fillGrid(width, height) {
    let grid = []
    for (let rows = 0; rows < height; rows++) {
        grid[rows] = [];
        for (let columns = 0; columns < width; columns++) {
            grid[rows].push(0)
        }
    }
    return grid
}



let grid = fillGrid(canvas.width / blockSize, canvas.height / blockSize);


function drawGrid() {
    grid.forEach((row, rowIndex) => {
        row.forEach((el, columnIndex) => {
            if (el === 0) {
                ctx.fillStyle = "red"
                ctx.fillRect((columnIndex * blockSize), (rowIndex * blockSize), blockSize, blockSize)
            }
            if (el === 1) {
                ctx.fillStyle = "blue"
                ctx.fillRect((columnIndex * blockSize), (rowIndex * blockSize), blockSize, blockSize)
            }

        })
    })
}

function drawTetromino(tetromino) {

    tetromino.shape.forEach((row, rowIndex) => {
        row.forEach((el, columnIndex) => {
            if (el === 1) {
                ctx.fillStyle = "yellow"
                ctx.fillRect((columnIndex + tetromino.positionX) * blockSize, (rowIndex + tetromino.positionY) * blockSize, blockSize, blockSize)
            }
        })
    })
}


drawGrid()
drawTetromino(tetromino)

function updateGame() {
    if (lastTime === 0) {
        lastTime = Math.floor(Date.now() / gameSpeed)
    }
    thisTime = Math.floor(Date.now() / gameSpeed)
    if ((thisTime - lastTime) !== 0) {
        console.log(wouldCollideLeft, wouldCollideRight)
        lastTime = thisTime
        tetromino.positionY++
        checkCollisionWalls(tetromino)
        checkForBottom(tetromino)
        checkForCompletetedRows();
        drawGrid()
        if (crash === true) {
            reset()
        }
        drawTetromino(tetromino)
        // frames++
        // if (frames === 10) {
        //     gameSpeed -= 50;
        //     frames = 0;
        // }
    }
    requestAnimationFrame(updateGame)
}

// updateGame();


function checkCollisionWalls(tetromino) {
    tetromino.shape.forEach((row, rowIndex, tetrominoArray) => {
        row.forEach((el, columnIndex) => {
            if (el === 1 && (tetromino.positionX + columnIndex - 1) < 0) {
                wouldCollideLeft = true
            }
            if (el === 1 && (tetromino.positionX + columnIndex + 1) > ((canvas.width / blockSize) - 1)) {
                wouldCollideRight = true
            }
        })
    })
}

function integrateTetrominoIntoGrid(tetromino, el) {
    tetromino.shape.forEach((row, rowIndex) => {
        row.forEach((el, columnIndex) => {
            if (el === 1) {
                grid[tetromino.positionY + rowIndex][tetromino.positionX + columnIndex] = 1
            }
        })
    })

}


function checkForBottom(tetromino) {
    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            //but only check if tetromino is fully visible
            if (tetromino.positionY > -3) {
                // check if board is filled to the top
                console.log("check 👍👍👍👍👍👍👍👍👍")
                
                if (grid[0][column] === 1) {
                    console.log("you lost 😢😢😢😢😢😢😢😢😢😢😢😢")
                }
                console.log(tetromino.positionX)
                if (
                    //check for collision with bottom
                    (tetromino.shape[row][column] === 1) && ((tetromino.positionY + row) > ((canvas.height / blockSize) - 2)) ||
                    //check for collision with taken tetromino
                    (tetromino.shape[row][column] === 1) && ((grid[tetromino.positionY + row + 1][tetromino.positionX + column] === 1))
                ) {
                    integrateTetrominoIntoGrid(tetromino)
                    crash = true
                    wouldCollideLeft = false
                    wouldCollideRight = false
                    return
                }
            }
        }
    }
}

function checkForCompletetedRows() {
    for (let row = grid.length - 1; row >= 0; row--) {
        let completetdLines = 0
        for (let column = 0; column <= grid[row].length; column++) {
            if (completetdLines === 10) {
                let rowToDelete = row
                deleteRow(rowToDelete)
                break
            }
            if (grid[row][column] === 0) {

                break
            } else {
                completetdLines++
            }

        }
    }
}

function deleteRow(rowToDelete) {
    console.log("😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜😜")
    for (let row = rowToDelete; row > 0; row--) {
        for (let column = 0; column < boardWidth; column++) {
            grid[row][column] = grid[row - 1][column]
        }
    }
}

addEventListener("keydown", e => {
    if (e.key === "ArrowRight" && !wouldCollideRight) {
        tetromino.positionX++
        wouldCollideLeft = false
    }
    if (e.key === "ArrowLeft" && !wouldCollideLeft) {
        tetromino.positionX--
        wouldCollideRight = false
    }
    if (e.key === "ArrowDown") tetromino.positionY++


    if (e.key === "ArrowUp") {
        tetromino.shape = turnTetromino(tetromino.shape)
    }
    checkCollisionWalls(tetromino)
    checkForBottom(tetromino)
    checkForCompletetedRows();
    drawGrid()
    if (crash === true) {
        reset()
    }
    drawTetromino(tetromino)
})


function reset() {
    tetromino = new Tetromino
    tetromino.getShape()
    crash = false
}

