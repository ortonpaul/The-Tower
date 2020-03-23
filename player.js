function Player(i, j) {
    this.i = i;
    this.j = j;
    this.health = 100;
    this.attack = 10;
    this.defense = 10;
    this.speed = 10;
    this.inventory = {
        'weapon': null
    };
    
    this.show = function() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(255, 0, 0, 150);
        rect(x, y, w, w);
    };
    
    this.move = function(direction) {
        let location = grid[index(this.i, this.j)];
        switch(direction) {
            case 'up':
                if(location.walls[0]) {
                } else {
                    this.j--;
                }
                break;
            case 'right':
                if(location.walls[1]) {
                } else {
                    this.i++;
                }
                break;
            case 'down':
                if(location.walls[2]) {
                } else {
                    this.j++;
                }
                break;
            case 'left':
                if(location.walls[3]) {
                } else {
                    this.i--;
                }
                break;
        }
    };
    
    this.lookAround = function() {
        let location = grid[index(this.i, this.j)];
        if(!location.walls[0]) {
            grid[index(this.i, this.j - 1)].visible = true;
        }
        if(!location.walls[1]) {
            grid[index(this.i + 1, this.j)].visible = true;
        }
        if(!location.walls[2]) {
            grid[index(this.i, this.j + 1)].visible = true;
        }
        if(!location.walls[3]) {
            grid[index(this.i - 1, this.j)].visible = true;
        }
    };
    
    this.interact = function() {
        if(this.i == goalCol && this.j == goalRow) {
            grid.splice(0, grid.length);
            generateLevel();
            level++;
        }
    };
}