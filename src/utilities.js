export function drawHand(hands, ctx) {
    if (!hands || hands.length === 0) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    hands.forEach((prediction, handIndex) => {
        const landmarks = prediction.landmarks;
        const color = handIndex === 0 ? "#FF0000" : "#00FFFF";  // First hand = red, Second hand = cyan

        for (let i = 0; i < landmarks.length; i++) {
            const [x, y] = landmarks[i];

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
    });
}
