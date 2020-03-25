class Enemy extends Cell {
    constructor(i, j, walls) {
        super(i, j, walls);
        this.type = 'enemy';
        this.gold = floor(random(100));
        // TODO: Fix this
        this.item = 0; 
        this.health = 100;
        this.attack = 5;
        this.defense = 5;
        this.speed = 5;
    }

    battle() {
        let damage = floor(random(16));
        player.health -= damage;
        if(player.health > 0) {
            alertUser('You beat the enemy but took ' + damage + ' damage');
        } else {
            alertUser('The enemy killed you by doing ' + damage + ' damage.');
             gameOver();
        }
        this.type = 'cell';
    }
}
