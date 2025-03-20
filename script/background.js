const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Configurações do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1"; // Mantém no fundo

const cells = [];
const numCells = 25; // Número de células
const maxRadius = 100;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

class Cell {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.finalRadius = Math.random() * maxRadius * 0.7 + maxRadius * 0.3;
        this.radius = 0; // Começa invisível e cresce
        this.growthSpeed = Math.random() * 0.15 + 0.05; // Crescimento ainda mais lento
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.2 + 0.05; // Movimento bem suave
        this.life = Math.random() * 600 + 1200; // Duração estendida (1200 - 1800 frames)
        this.fadeSpeed = Math.random() * 0.008 + 0.002; // Desaparecimento muito mais lento
        this.age = 0;
    }

    update() {
        this.angle += (Math.random() - 0.5) * 0.01;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.radius < this.finalRadius) {
            this.radius += this.growthSpeed;
        }

        this.age++;
        if (this.age > this.life) {
            this.radius -= this.fadeSpeed * this.finalRadius; // Some ainda mais suavemente
        }

        if (this.radius <= 0) {
            this.reset();
        }

        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 0;
        this.finalRadius = Math.random() * maxRadius * 0.7 + maxRadius * 0.3;
        this.growthSpeed = Math.random() * 0.15 + 0.05;
        this.speed = Math.random() * 0.2 + 0.05;
        this.life = Math.random() * 600 + 1200;
        this.fadeSpeed = Math.random() * 0.008 + 0.002;
        this.age = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.filter = "blur(100px)";

        const distX = this.x - centerX;
        const distY = this.y - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

        let alpha = 1 - (distance / maxDistance);
        alpha = Math.max(0.1, alpha);

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fill();
        ctx.closePath();
        ctx.filter = "none";
    }
}

function animate() {
    ctx.fillStyle = "black"; // Fundo preto
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cells.forEach(cell => {
        cell.update();
        cell.draw();
    });

    requestAnimationFrame(animate);
}

function init() {
    for (let i = 0; i < numCells; i++) {
        cells.push(new Cell());
    }
    animate();
}

init();

// Ajusta o tamanho do canvas ao redimensionar a tela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
