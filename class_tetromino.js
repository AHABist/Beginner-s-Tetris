import { tetrominos } from "./constants.js"

const Tetromino = class {
    constructor(ctx) {
        this.ctx = ctx
        this.shape = null
        this.positionX = 2
        this.positionY = -4
        
    }
    getShape() {
        this.shape = tetrominos[randomNrBetween1and4()]
    }
            
}





function randomNrBetween1and4 () {
    let randomNr = Math.trunc(Math.random() * 5)
    return randomNr 
}

export {Tetromino}