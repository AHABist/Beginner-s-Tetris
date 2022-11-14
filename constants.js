



const tetrominos = [
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [
        [0,0,0,0],
        [0,0,1,0],
        [0,1,1,1],
        [0,0,0,0],
    ],
    [
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0],
    ],

]



const turnTetromino = function (tetromino) {
    return tetromino.map((row, rowIndex, tetrominoArray) => {
        return row.map((el, columnIndex, rowArray) => {
            return el = tetrominoArray[columnIndex][(row.length -1) - rowIndex]
            
        })
    })
}

// const checkCollisionWalls = function (tetromino) {
//     console.log(tetromino.shape)
//  tetromino.shape.forEach((row, rowIndex, tetrominoArray) => {
//     row.forEach((el, columnIndex) => {
//         // if(
//         //     (columnIndex +
//         // )
//         console.log(tetromino.positionX)
//     })
//  })
// }



export {tetrominos}
export {turnTetromino}
// export {checkCollisionWalls}