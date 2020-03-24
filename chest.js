class Chest extends Cell {
    constructor(i, j, walls) {
        super(i, j, walls);
        this.type = 'chest';
        this.gold = floor(random(100));
        // TODO: Fix this
        this.item = 0; 
    }

    openChest() {
        player.inventory['gold'] += this.gold;
        window.alert('The chest contained ' + this.gold + ' gold!\nYou now have ' + player.inventory['gold'] + ' gold.');
        grid[this.index].type = 'cell';
    }
}
