// Function that will parse arrays of collision blocks imported from Tile into
// 2d arrays to represent a row of game tiles
function parse2D(array) {
    const rows = [];
    const tilesInSingleRow = 16;
    for (let i = 0; i < array.length; i+= tilesInSingleRow) {
        rows.push(array.slice(i, i + tilesInSingleRow));
    }

    return rows;
}

function createCollisionBlocksFrom2DArray(array2D, collisionBlockClass, gameTileSize = 64, collisionBlockSymbol = 292) {
    const collisionBlocks = [];

    array2D.forEach((row, y) => {
        row.forEach((blockSymbol, x) => {
            if (blockSymbol === collisionBlockSymbol) {
                collisionBlocks.push(new collisionBlockClass({
                    position: { x: x * gameTileSize, y: y * gameTileSize }
                }));
            }
        })
    })

    return collisionBlocks;
}
