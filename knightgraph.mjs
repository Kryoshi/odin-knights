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
    console.log('built');
    console.log(this.board[0][0]);
    console.log(this.board);
  }

  #makeSquare(rank, file) {
    if (!this.isValid(rank, file)) return null;

    if (this.board[rank][file]) return this.board[rank][file];

    const square = new ChessSquare(rank, file);
    this.board[rank][file] = square;

    for (let move of KNIGHTMOVES) {
      let neighbour = this.#makeSquare(rank + move.rank, file + move.file);
      if (neighbour) square.neighbours.push(neighbour);
    }

    return square;
  }

  printAdjacencyList() {
    for (let rank of this.board) {
      for (let square of rank) {
        const neighbourStrings = [];
        for (let neighbour of square.neighbours) {
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
