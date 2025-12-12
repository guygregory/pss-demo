export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function emptySlots(board) {
  return board.reduce((slots, val, idx) => {
    if (val === null) slots.push(idx);
    return slots;
  }, []);
}

export function pickRandom(list) {
  if (!list.length) return null;
  const i = Math.floor(Math.random() * list.length);
  return list[i];
}

// Lightweight AI: try to win, block, take center, corners, then any open cell.
export function chooseAiMove(board, aiMark = "🎄", humanMark = "🎅") {
  // 1) Win if possible
  for (const line of winningLines) {
    const [a, b, c] = line;
    const marks = [board[a], board[b], board[c]];
    if (marks.filter((m) => m === aiMark).length === 2 && marks.includes(null)) {
      return line[marks.indexOf(null)];
    }
  }

  // 2) Block opponent win
  for (const line of winningLines) {
    const [a, b, c] = line;
    const marks = [board[a], board[b], board[c]];
    if (marks.filter((m) => m === humanMark).length === 2 && marks.includes(null)) {
      return line[marks.indexOf(null)];
    }
  }

  // 3) Take center
  if (board[4] === null) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8].filter((idx) => board[idx] === null);
  if (corners.length) return pickRandom(corners);

  // 5) Any remaining slot
  const open = emptySlots(board);
  return pickRandom(open);
}
