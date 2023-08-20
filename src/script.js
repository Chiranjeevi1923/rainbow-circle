// import * as dat from 'lil-gui'
import * as THREE from 'three'
import { Circle } from "./Circle"

// Variables
const noOfBranches = 20 // VIBGYOR Colors
const rainbowCircles = 4
const noOfCirlces = noOfBranches * rainbowCircles

// VIBGYOR color codes
const colors = [
    '#EE82EE',
    '#4B0082',
    '#0000FF',
    '#00FF00',
    '#FFFF00',
    '#FFA500',
    '#FF0000',
]
let totalColors = colors.length


const canvas = document.getElementById('canvasId')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true
ctx.webkitImageSmoothingEnabled = true

resizeCanvas()

const circles = []

const circleParameters = {
    radius: 4,
    color: 'blue'
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const angleDivision = 2 * Math.PI / noOfBranches
const circleRadius = 20
const velocity = 0.04
let circlesCount = 0
for (let i = 0; i < noOfCirlces; i++) {
    if(i % noOfBranches == 0) {
        circlesCount++
    }
    let colorIndex = i % totalColors
    console.log(colorIndex)
    let branchNo = i % noOfBranches
    let branchAngle = angleDivision * branchNo
    let rainbowRadius = circlesCount * circleRadius 
    circles.push(
        new Circle(
            ctx, 
            mouse,
            mouse.x,
            mouse.y,
            circleParameters.radius,
            colors[colorIndex],
            branchAngle,
            rainbowRadius,
            velocity
        )
    )
}



/**
 * Events
 */
window.addEventListener('resize', resizeCanvas)
window.addEventListener('mousemove', (_event) => {
    mouse.x = _event.clientX
    mouse.y = _event.clientY
})


/**
 * Functions
 */

const clock = new THREE.Clock()
animate()

function animate() {
    requestAnimationFrame(animate)
    //Clear Canvas with fading effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    // Elapsed time
    const elapsedTime = clock.getElapsedTime()

    // Update the circles
    circles.forEach((circle) => {
        circle.update(elapsedTime)
    })
}

function resizeCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    ctx.scale(devicePixelRatio, devicePixelRatio)
}