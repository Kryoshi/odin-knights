export { ChessSquare };
export { KnightGraph };

const BOARDSIZE = 8;
const KNIGHTMOVES = [
  { rank: 1, file: 2 },
  { rank: 1, file: -2 },
  { rank: -1, file: 2 },
  { rank: -1, file: -2 },
  { rank: 2, file: 1 },
  { rank: 2, file: -1 },
  { rank: -2, file: 1 },
  { rank: -2, file: -1 },
];

class KnightGraph {
  board;

  constructor() {
    this.board = [];

    for (let rank = 0; rank < BOARDSIZE; ++rank) {
      this.board.push([]);
    }

    this.board[0][0] = this.#makeSquare(0, 0);
    console.log(this.board[0][0]);
    console.log(this.board);
  }

  #makeSquare(rank, file) {
    if (!this.isValid(rank, file)) return null;

    if (this.board[rank][file]) return this.board[rank][file];

    const square = new ChessSquare(rank, file);
    this.board[rank][file] = square;

    for (const move of KNIGHTMOVES) {
      let neighbour = this.#makeSquare(rank + move.rank, file + move.file);
      if (neighbour) square.neighbours.push(neighbour);
    }

    return square;
  }

  move(start, end) {
    if (!this.isValid(start[0], start[1])) return [];
    if (!this.isValid(end[0], end[1])) return [];

    start = this.board[start[0]][start[1]];
    end = this.board[end[0]][end[1]];

    const visited = [];
    for (let rank = 0; rank < BOARDSIZE; ++rank) {
      visited.push([]);
    }
    const path = this.#getPath(start, end, visited);
    return path;
  }

  #getPath(start, end, visited, path = []) {
    visited[start.rank][start.file] = true;

    if (start.rank === end.rank && start.file === end.file) {
      path.push(start);
      return path;
    }

    path.push(start);

    let shortestPath = null;
    let length = Infinity;
    for (const neighbour of start.neighbours) {
      if (!visited[neighbour.rank][neighbour.file]) {
        const pathCopy = [...path];
        const visitedCopy = [];
        for (let rank = 0; rank < BOARDSIZE; ++rank) {
          visitedCopy.push([...visited[rank]]);
        }

        const p = this.#getPath(neighbour, end, visitedCopy, pathCopy);
        if (p && p.length < length) {
          shortestPath = p;
          length = p.length;
        }
      }
    }
    return shortestPath;
  }

  printPath(start, end) {
    const path = this.move(start, end);
    const pathStrings = [];

    for (const square of path) {
      pathStrings.push(`[${square.rank}, ${square.file}]`);
    }
    console.log(pathStrings);
  }

  printAdjacencyList() {
    for (const rank of this.board) {
      for (const square of rank) {
        const neighbourStrings = [];
        for (const neighbour of square.neighbours) {
          neighbourStrings.push(`[${neighbour.rank}, ${neighbour.file}]`);
        }
        console.log(
          `[${square.rank}, ${square.file}] : ${neighbourStrings}`
        );
      }
    }
  }

  isValid(rank, file) {
    if (
      rank === undefined ||
      file === undefined ||
      rank === null ||
      file === null ||
      typeof rank !== 'number' ||
      typeof file !== 'number' ||
      rank < 0 ||
      file < 0 ||
      rank > BOARDSIZE - 1 ||
      file > BOARDSIZE - 1
    ) {
      //console.log(`Invalid Square: [${rank}, ${file}]`);
      return false;
    }
    return true;
  }
}

class ChessSquare {
  rank; //row
  file; //column
  neighbours = [];

  constructor(rank, file) {
    this.rank = rank;
    this.file = file;
  }
}
