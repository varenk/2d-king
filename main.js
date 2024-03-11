const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

const gameTileSizePx = 64;

canvas.width = gameTileSizePx * 16;
canvas.height = gameTileSizePx * 9;

console.log(canvasContext);

canvasContext.fillStyle = '#fff';
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
