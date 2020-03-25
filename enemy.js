class Enemy extends Cell {
    constructor(i, j, walls) {
        super(i, j, walls);
        this.type = 'enemy';
        this.gold = floor(random(100));
        // TODO: Fix this
        this.item = 0;
        this.health = 20;
        this.attack = 5;
        this.defense = 5;
        this.speed = 5;
    }

    battle() {
        while (player.health > 0 && this.health > 0) {
            let playerAttack = constrain(player.getAttack() - this.defense, 0, player.getAttack());
            let enemyAttack = constrain(this.attack - player.getDefense(), 0, this.attack);

            this.health -= playerAttack;

            if (this.health > 0) {
                player.health -= enemyAttack;
            }
            
            if (player.health > 0 && this.health <= 0) { // enemy died
                player.gold += this.gold;
                console.log('You beat the enemy but took ' + enemyAttack + ' damage.\nYou also found ' + this.gold + ' gold on the enemy.\nYou now have ' + player.gold + ' gold!');
                this.type = 'cell';
            } else if (player.health <= 0) {
                console.log('The enemy killed you by doing ' + enemyAttack + ' damage.');
                gameOver();
            } else {
                console.log('You dealt ' + playerAttack + ' damage to the enemy.\nTheir health is now ' + this.health);
                console.log('The enemy dealt ' + enemyAttack + ' damage to the you.\nYour health is now ' + player.health);
            }
        }
    }
}
