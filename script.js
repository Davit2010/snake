
let blockSize = 25
if (document.body.clientWidth <= '375') {
    blockSize = 18.5

}
else if (document.body.clientWidth <= '425') {
    blockSize = 21

}

let newGame = document.querySelector('.game-over')
let newGameBtn = document.querySelector('.new-game')

let count = document.querySelector('.count')
let setCount = 0

let rows = 20
let cols = 20
let board
let context
let code

let snakeX = blockSize * 5
let snakeY = blockSize * 5

let foodX
let foodY

let gameOver = false

let speedX = 0
let speedY = 0

let snakeBody = []

window.onload = function () {
    board = document.querySelector('canvas')
    board.width = cols * blockSize
    board.height = rows * blockSize
    context = board.getContext('2d')

    placeFood()
    setInterval(() => {
        update()
    }, 1000 / 10);
    document.addEventListener('keyup', changePlace)
}

function update() {
    if (gameOver) {
        newGame.style.cssText = 'display:flex;'
        return
    }
    if (snakeX < -blockSize || snakeX > cols * blockSize || snakeY < -blockSize || snakeY > rows * blockSize) {
        gameOver = true
        
        
    }
    snakeBody.forEach(el => {
        if (snakeX == el[0] && snakeY == el[1]) {
            gameOver = true
            
        }
    });


    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
        setCount++
        count.innerHTML = `count: ${setCount}`

        
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
        
    }
    if (snakeBody.length == 1) {
        for (let i = snakeBody.length ; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1]
        }
            
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    

    

    context.fillStyle = 'lime'
    context.fillRect(snakeX, snakeY, blockSize, blockSize)


    snakeBody.forEach(el => {
        context.fillRect(el[0], el[1], blockSize, blockSize)
    });

    snakeX += speedX
    snakeY += speedY

    
}

function changePlace(e) {

    if (e.code == 'ArrowUp' && code != 'ArrowDown' || e.code == 'KeyW' && code != 'ArrowDown') {
        code = 'ArrowUp'
        speedX = 0
        speedY = -1 * blockSize
    }
    else if (e.code == 'ArrowDown' && code != 'ArrowUp' || e.code == 'KeyS' && code != 'ArrowUp')  {
        speedX = 0
        speedY = 1 * blockSize
        code = 'ArrowDown'
    }
    else if (e.code == 'ArrowLeft' && code != 'ArrowRight' || e.code == 'KeyA' && code != 'ArrowRight') {
        speedX = -1 * blockSize
        speedY = 0
        code = 'ArrowLeft'

    }
    else if (e.code == 'ArrowRight' && code != 'ArrowLeft' || e.code == 'KeyD' &&  code != 'ArrowLeft' ) {
        speedX = 1 * blockSize
        speedY = 0
        code = 'ArrowRight'

    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * cols) * blockSize
}
newGameBtn.addEventListener('click',()=>{
    window.location.reload()
})








