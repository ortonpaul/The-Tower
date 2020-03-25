class Player {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.index = getIndex(this.i, this.j);
        this.health = 100;
        this.attack = 10;
        this.defense = 10;
        this.speed = 10;
        this.gold = 0;
        this.inventory = {
            'weapon': 'Common Sword',
            'item1': null,
            'item2': null,
            'item3': null,
            'item4': null,
            'item5': null,
        };
        
        this.armor = {
            'head': null,
            'chest': 'Leather Chestplate',
            'legs': 'Leather Pants',
            'feet': 'Leather Boots'
        };
    }
    
    show() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    }

    move(direction) {
        let location = grid[this.index];
        if(location.type == 'enemy') {
            alertUser('You can\'t run from an enemy!');
        } else {
            switch (direction) {
                case 'up':
                    if (!location.walls[0]) {
                        this.j--;
                    }
                    break;
                case 'right':
                    if (!location.walls[1]) {
                        this.i++;
                    }
                    break;
                case 'down':
                    if (!location.walls[2]) {
                        this.j++;
                    }
                    break;
                case 'left':
                    if (!location.walls[3]) {
                        this.i--;
                    }
                    break;
            }
            
            this.index = getIndex(this.i, this.j);
        } 
    }

    lookAround() {
        let location = grid[this.index];
        if (!location.walls[0]) {
            grid[getIndex(this.i, this.j - 1)].visible = true;
        }
        if (!location.walls[1]) {
            grid[getIndex(this.i + 1, this.j)].visible = true;
        }
        if (!location.walls[2]) {
            grid[getIndex(this.i, this.j + 1)].visible = true;
        }
        if (!location.walls[3]) {
            grid[getIndex(this.i - 1, this.j)].visible = true;
        }
    }

    interact() {
        let thisSpace = grid[this.index];

        switch (thisSpace.type) {
            case 'goal':
                level++;
                if(level % 10 == 0) {
                    // TODO: Implement this
                    generateShop(level);
                    
                    if(level == 100) {
                        // TODO: Implement this
                        finalBoss();
                        break;
                    }
                }
                
                grid.splice(0, grid.length);
                generateLevel();
                break;

            case 'chest':
                thisSpace.open();
                break;

            case 'enemy':
                thisSpace.battle();
                break;

            default:
                break;
        }
    }
    
    getAttack() {        
        return this.attack + items[this.inventory['weapon']][0];; 
    }
    
    getDefense() {
        return this.defense;
    }
}
