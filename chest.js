class Chest extends Cell {
    constructor(i, j, walls) {
        super(i, j, walls);
        this.type = 'chest';
        this.gold = floor(random(100));
        // TODO: Fix this
        this.item = 0; 
    }

    open() {
        player.gold += this.gold;
        window.alert('The chest contained ' + this.gold + ' gold!\nYou now have ' + player.gold + ' gold.');
        grid[this.index].type = 'cell';
    }
}
