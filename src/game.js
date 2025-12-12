import { winningLines, chooseAiMove } from "./utils.js";

export class TicTacToe {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.scores = { "🎅": 0, "🎄": 0, draws: 0 };
    this.opponent = "human";
    this.aiMark = "🎄";
    this.resetRound(false);
  }

  getState() {
    return {
      board: [...this.board],
      current: this.current,
      winner: this.winner,
      isDraw: this.isDraw,
      winningLine: [...this.winningLine],
      scores: { ...this.scores },
      opponent: this.opponent,
      aiMark: this.aiMark,
    };
  }

  resetRound(triggerUpdate = true) {
    this.board = Array(9).fill(null);
    this.current = "🎅";
    this.winner = null;
    this.isDraw = false;
    this.winningLine = [];
    this.turns = 0;
    if (triggerUpdate) this.onUpdate?.(this.getState());
  }

  resetScores() {
    this.scores = { "🎅": 0, "🎄": 0, draws: 0 };
    this.resetRound();
  }

  setOpponent(opponent) {
    this.opponent = opponent;
    this.resetRound();
  }

  makeMove(index) {
    if (this.isLocked(index)) return false;
    const placed = this.placeMark(index);
    if (!placed) return false;

    if (this.shouldAiMove()) {
      setTimeout(() => {
        if (!this.shouldAiMove()) return;
        const aiIndex = chooseAiMove(this.board, this.aiMark, this.humanMark());
        if (aiIndex !== null) this.placeMark(aiIndex);
      }, 320);
    }
    return true;
  }

  placeMark(index) {
    if (this.isLocked(index)) return false;
    this.board[index] = this.current;
    this.turns += 1;

    const winLine = this.detectWin();
    if (winLine) {
      this.winner = this.current;
      this.winningLine = winLine;
      this.scores[this.current] += 1;
    } else if (this.turns === 9) {
      this.isDraw = true;
      this.scores.draws += 1;
    } else {
      this.current = this.current === "🎅" ? "🎄" : "🎅";
    }

    this.onUpdate?.(this.getState());
    return true;
  }

  detectWin() {
    for (const line of winningLines) {
      const [a, b, c] = line;
      const cell = this.board[a];
      if (cell && cell === this.board[b] && cell === this.board[c]) {
        return line;
      }
    }
    return null;
  }

  shouldAiMove() {
    return this.opponent === "ai" && !this.winner && !this.isDraw && this.current === this.aiMark;
  }

  humanMark() {
    return this.aiMark === "🎅" ? "🎄" : "🎅";
  }

  isLocked(index) {
    if (this.winner || this.isDraw) return true;
    return this.board[index] !== null;
  }
}
