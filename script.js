const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let gameActive = true;
let player = { x: 180, y: 450, size: 30 };
let enemies = [];

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
    if (e.key === "ArrowRight" && player.x < canvas.width - player.size) player.x += 20;
});

function update() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#3498db";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    if (Math.random() < 0.02) enemies.push({ x: Math.random() * 370, y: 0, size: 30 });

    for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i];
        e.y += 3;
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(e.x, e.y, e.size, e.size);
        if (player.x < e.x + 30 && player.x + 30 > e.x && player.y < e.y + 30 && player.y + 30 > e.y) {
            gameActive = false;
            alert("遊戲結束！分數：" + score);
            location.reload();
        }
        if (e.y > 500) { enemies.splice(i, 1); score++; document.getElementById("score").innerText = "分數: " + score; }
    }
    requestAnimationFrame(update);
}
update();
