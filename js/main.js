// GOOGLE CANVAS 2D RENDERING METHODS

//rect = rectangle    arc = circle

const movementDisplay = document.querySelector('#movement')
const statusDisplay = document.querySelector('#status')
const canvas = document.querySelector('canvas')

// get the rendering context from the canvas
const ctx = canvas.getContext('2d')
// set the canvas's resolution to be the same as the window
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// // set context properties
// ctx.fillStyle = 'green'
// // invoke context methods to render things
// // ctx.fillRect(x, y, width, height) (in pixels*)
// // x/y is where it starts, and width/height is how far it is drawn
// ctx.fillRect(10, 10, 100, 100)
// // console.log(canvas.width, canvas.height)
// ctx.strokeStyle = 'blue'
// ctx.lineWidth = 20
// ctx.strokeRect(45, 100, 150, 200)
// ctx.strokeRect(300, 300, 50, 50)

// ctx.strokeStyle = 'purple'
// ctx.lineWidth = 5
// ctx.strokeRect(600, 300, 70, 90)

function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

// drawBox(10, 10, 100, 100, 'purple')

canvas.addEventListener('click', e => {
    console.log(e.offsetX, e.offsetY)
    drawBox(e.offsetX, e.offsetY, 50, 50, 'blue')
})

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// const myObject = {
//     // 'object literal'
//     key: 'i am literally defined'
// }

// const myCrawler = new Crawler(20, 20, 45, 45, 'green')
// console.log(myCrawler)
// myCrawler.render()

// define game objects
const hero = new Crawler(10, 10, 35, 35, 'hotpink')
const ogre = new Crawler(600, 200, 100, 150, 'green')
const bullets = []
const shrekBullets = []


// shrek is fighting back
setInterval(() => {
    shrekBullets.push(new Crawler(ogre.x, ogre.y, 10, 10, 'blue'))
}, 200)


// define movement handler function
function movementHandler(e) {
    console.log(e)
    const speed = 10 // how many pixels the hero moves
    switch (e.key) {
        case('w'):
            // move the hero up
            hero.y -= speed
            if (hero.y < 0) {
                hero.y = 0
            }
            break
        case('s'):
            // move the hero down
            hero.y += speed
            if (hero.y + hero.height > canvas.height) {
                hero.y = canvas.height - hero.height
            }
            break
        case('a'):
            // move the hero left
            hero.x -= speed
            if (hero.x < 0) {
                hero.x = 0
            }
            break
        case('d'):
            // move the hero right
            hero.x += speed
            if (hero.x + hero.width > canvas.width)
            hero.x = canvas.width - hero.width
            break
        case(' '):
            bullets.push(new Crawler(hero.x + hero.width, hero.y, 10, 10, 'black'))
            break
    }
}

document.addEventListener('keypress', movementHandler)

// define a collision detection algorithm
function detectHit() {
    // AABB -- axis aligned bounding box collision detection
    // check for intersections on each side, one by one!
    const ogreLeft = hero.x + hero.width >= ogre.x
    // console.log(ogreLeft)
    const ogreRight = hero.x <= ogre.x + ogre.width
    // console.log(ogreLeft, ogreRight)
    const ogreTop = hero.y + hero.height >= ogre.y
    const ogreBottom = hero.y <= ogre.y + ogre.height
    // console.log(ogreLeft, ogreRight, ogreTop, ogreBottom)
    if (ogreRight && ogreLeft && ogreTop && ogreBottom) {
        console.log(`The hero has collided with the ogre!`)
        // when a collision occurs, stop the game!
        // die shrek
        ogre.alive = false
        statusDisplay.innerText = `You killed Shrek! Who is the monster now? The Hero, or the Ogre?`
    }
}

// define gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60)

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // do the business logic of our game (check for collisions)
    detectHit()
    // render all of the game pieces
    hero.render()
    // only render the ogre when they are alive!
    if (ogre.alive){

        ogre.render()
    }
    // loop over all the bullets and render them
    for (let i = 0; i < bullets.length; i++) {
        // update the bullets
        bullets[i].x += 30
        // update the bullets
        bullets[i].render()
    }

    //loop over the ogre's bullets
    for (let i = 0; i < shrekBullets.length; i++) {
        shrekBullets[i].x -= 30
        // update the bullet
        shrekBullets[i].render()
    }
}   

