function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.visible = false;
    this.isGoal = false;

  this.getNeighbors = function() {
    let neighbors = [];

    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top != null && !top.visited) {
      neighbors.push(top);
    }
    if (right != null && !right.visited) {
      neighbors.push(right);
    }
    if (bottom != null && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left != null && !left.visited) {
      neighbors.push(left);
    }

    return neighbors;
  };

  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(240);
    rect(x, y, w, w);
  };

  this.show = function() {
      if(this.visible) {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
          noStroke();
          fill(100);
          rect(x, y, w, w);
      
      
      if(this.isGoal) {
          noStroke();
          fill(0,255,0,100);
          rect(x, y, w, w);
          }
      }

//    if (this.visited) {
//      noStroke();
//      fill(50);
//      rect(x, y, w, w);
//    }
  };
}