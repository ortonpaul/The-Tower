class Cell {
    constructor(i, j, walls) {
        this.i = i;
        this.j = j;
        this.index = getIndex(this.i, this.j);
        this.walls = walls;
        this.visited = false;
        this.visible = false;
        this.type = 'cell';
    }

    getNeighbors() {
        let neighbors = [];

        let top = grid[getIndex(this.i, this.j - 1)];
        let right = grid[getIndex(this.i + 1, this.j)];
        let bottom = grid[getIndex(this.i, this.j + 1)];
        let left = grid[getIndex(this.i - 1, this.j)];

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

    show() {
        if (this.visible) {
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
            switch (this.type) {
                case 'goal':
                    fill(0, 255, 0, 100);
                    break;

                case 'chest':
                    fill(255, 255, 0, 100);
                    break;

                case 'enemy':
                    fill(255, 0, 0, 100);
                    break;

                default:
                    fill(100);
                    break;
            }
            rect(x, y, w, w);
        }
    };
}
