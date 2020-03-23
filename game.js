let w = 50;
let rows, cols;
let grid = [];
let stack = [];
let current;
let player, playerRow, playerCol;
let goal, goalRow, goalCol;
let level;

function setup() {
    createCanvas(500, 500);
    rows = floor(width / w);
    cols = floor(height / w);
    
    level = 1;
    
    generateLevel();
}

function keyPressed() {
    if(keyCode === UP_ARROW) {
        player.move('up')
    }
    if(keyCode === RIGHT_ARROW) {
        player.move('right')
    }
    if(keyCode === DOWN_ARROW) {
        player.move('down')
    }
    if(keyCode === LEFT_ARROW) {
        player.move('left')
    }
    if(keyCode === ENTER) {
        player.interact();
    }
    if(keyCode === ESCAPE) {
        displayMenu();
    }
    player.lookAround();
}

function draw() {
  background(0);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
    
    player.show();
    player.lookAround();

    fill(255);
    text('Level: ' + level, 10, 20);
    text('HP: ' + player.health + '/100', 10, 30);
}

function generateLevel() {
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
              let cell = new Cell(i, j);
              grid.push(cell);
        }
    }
    
    current = grid[0];
    current.visited = true;
    stack.push(current);

    playerCol = floor(random(0, cols));
    playerRow = floor(random(0, rows));
    player = new Player(playerCol, playerRow);
    
    goalCol = floor(random(0, cols));
    goalRow = floor(random(0, rows));
    while(playerCol == goalCol && playerRow == goalRow) {
        goalCol = floor(random(0, cols));
        goalRow = floor(random(0, rows));
    }
    grid[goalCol + goalRow * cols].isGoal = true;
    
    while(current != null) {
        current.visited = true;
        //current.highlight();
          
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
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return 0;
  }
  return j * cols + i;
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

function displayMenu() {
    menu = document.getElementById("menu");
    
    if(menu.style.display == 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}