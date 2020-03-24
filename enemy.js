function Enemy(i, j) {
    this.i = i;
    this.j = j;
    this.index = getIndex(this.i, this.j);
    this.health = 100;
    this.attack = 5;
    this.defense = 5;
    this.speed = 5;
}
