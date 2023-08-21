import GUI from 'lil-gui';
import { Circle } from "./Circle"

// const gui = new GUI();

// Variables
const noOfBranches = 20
const rainbowCircles = 7
const noOfCirlces = noOfBranches * rainbowCircles
let rainbowRadiusScale = 0.8

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

resizeCanvas()

const circles = []

const circleParameters = {
    radius: 4,
    color: 'blue',
    circlesRadius: 16
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const angleDivision = 2 * Math.PI / noOfBranches
const circleRadius = 10
const velocity = 0.04
let circlesCount = 0
let distance = 0

resetAnimation()
function resetAnimation() {
    circlesCount = 0
    distance = 0
    circles.length = 0

    for (let i = 0; i < noOfCirlces; i++) {
        if (i % noOfBranches == 0) {
            circlesCount++
            distance = (circleParameters.circlesRadius * circlesCount)
            console.log('distance', distance);
        }
        let colorIndex = i % totalColors
        let branchNo = i % noOfBranches
        let branchAngle = angleDivision * branchNo
        let rainbowRadius = (circlesCount * circleRadius)

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
                velocity,
                distance
            )
        )
    }
    console.log(circles)

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

let circleRadiusChange;

let last = 0;
let speed = 2; // Frequency which the circle velocity changed +/-
let valueSing = 1
animate()
function animate(timeStamp) {
    requestAnimationFrame(animate)
    //Clear Canvas with fading effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let timeInSecond = timeStamp / 1000;

    if (timeInSecond - last >= speed) {
        last = timeInSecond;
        valueSing = - valueSing
        console.log(valueSing)
    }


    // Update the circles
    circles.forEach((circle, index) => {
        let circleCount = (index / noOfBranches)
        let distance = circleParameters.circlesRadius * (circle.distanceVelocity / circleParameters.circlesRadius);
        let distanceFactor = valueSing * distance * 0.01
        circle.rainbowRadius -= distanceFactor
        // console.log(circle.rainbowRadius)
        // circleRadiusChange -= distance
        // if(circle.rainbowRadius < 16) {
        //     circleRadiusChange = - circleRadiusChange
        // }
        // circle.rainbowRadius -= circleRadiusChange 
        // console.log(circle.distanceVelocity)

        circle.update()
    })
}

function resizeCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    ctx.scale(devicePixelRatio, devicePixelRatio)
}

function currentTimeInSeconds() {
    return Date.now() * 0.001;
}