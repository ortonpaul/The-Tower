let w = 50;
let rows, cols;
let grid = [];
let player;
let level;

function setup() {
    createCanvas(500, 500);
    rows = floor(width / w);
    cols = floor(height / w);
    level = 1;
    player = new Player(floor(random(cols)), floor(random(rows)));
    generateLevel();
    player.lookAround();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        player.move('up')
    }
    if (keyCode === RIGHT_ARROW) {
        player.move('right')
    }
    if (keyCode === DOWN_ARROW) {
        player.move('down')
    }
    if (keyCode === LEFT_ARROW) {
        player.move('left')
    }
    if (keyCode === ENTER) {
        player.interact();
    }
    if (keyCode === ESCAPE) {
        // TODO: Implement this more.
        // toggleMenu();
    }
    player.lookAround();
}

function draw() {
    background(0);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    player.show();

    fill(255);
    text('Level: ' + level, 10, 20);
    text('HP: ' + player.health + '/100', 10, 30);
}

function generateLevel() {
    let stack = [];
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j, [true, true, true, true]);
            grid.push(cell);
        }
    }

    let current = grid[0];
    current.visited = true;
    stack.push(current);

    while (current != null) {
        current.visited = true;

        let neighbors = current.getNeighbors();
        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            let next = neighbors[r];

            next.visited = true;

            stack.push(current);

            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            current = null;
        }
    }

    grid[player.index].visible = true;
    grid[player.index].type = 'spawn';

    // Generate Goal
    let goal = grid[randomIndex()];
    while (goal.type != 'cell') {
        goal = grid[randomIndex()];
    }
    goal.type = 'goal';

    // Generate Chests
    for (let i = 0; i < 3; i++) {
        let chest = grid[randomIndex()];
        while (chest.type != 'cell') {
            chest = grid[randomIndex()];
        }
        grid[chest.index] = new Chest(chest.i, chest.j, chest.walls);
    }

    // Generate Enemies
    for (let i = 0; i < 3; i++) {
        let enemy = grid[randomIndex()];
        while (enemy.type != 'cell') {
            enemy = grid[randomIndex()];
        }
        grid[enemy.index] = new Enemy(enemy.i, enemy.j, enemy.walls);
    }
}

function generateShop() {
    window.alert('You\'ve reached a shop!');
}

function finalBoss() {
    
}

function gameOver() {
    alertUser('GAME OVER');
}

function getIndex(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return 0;
    }
    return j * cols + i;
}

function randomIndex() {
    return getIndex(floor(random(cols)), floor(random(rows)));
}

function removeWalls(current, next) {
    let dx = current.i - next.i;

    if (dx === 1) {
        // next is to the left
        current.walls[3] = false;
        next.walls[1] = false;
    } else if (dx === -1) {
        // next is to the right
        current.walls[1] = false;
        next.walls[3] = false;
    }

    let dy = current.j - next.j;
    if (dy === 1) {
        // next is below
        current.walls[0] = false;
        next.walls[2] = false;
    } else if (dy === -1) {
        // next is above
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

function alertUser(message) {
    // TODO: Make more attractive
    window.alert(message);
}

function toggleMenu() {
    menu = document.getElementById("menu");

    if (menu.style.display == 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}
