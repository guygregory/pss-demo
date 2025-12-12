export function bindInput(game, ui) {
  const { cells } = ui;
  const newGameBtn = document.querySelector("[data-new-game]");
  const opponentSelect = document.querySelector("[data-opponent]");
  const snowToggle = document.querySelector("[data-snow]");
  const resetScoresBtn = document.querySelector("[data-reset-scores]");

  cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => game.makeMove(idx));
  });

  if (newGameBtn) {
    newGameBtn.addEventListener("click", () => game.resetRound());
  }

  if (opponentSelect) {
    opponentSelect.addEventListener("change", (event) => {
      const value = event.target.value;
      game.setOpponent(value);
    });
  }

  if (snowToggle) {
    snowToggle.addEventListener("change", (event) => {
      ui.setSnow(event.target.checked);
    });
  }

  if (resetScoresBtn) {
    resetScoresBtn.addEventListener("click", () => game.resetScores());
  }
}
