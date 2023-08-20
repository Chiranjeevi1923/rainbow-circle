export class Circle {
    // rainbowRadius = 1
    constructor(ctx, mouse, x, y, radius, color, branchAngle, rainbowRadius, velocity) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.mouse = mouse
        this.branchAngle = branchAngle
        this.rainbowRadius = rainbowRadius
        this.velocity = velocity
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }

    update = (time) => {

        this.branchAngle += this.velocity;
        this.x = this.mouse.x + Math.cos(this.branchAngle) * this.rainbowRadius
        this.y = this.mouse.y + Math.sin(this.branchAngle) * this.rainbowRadius


        // Redraw  the circle
        this.draw()
    }
}