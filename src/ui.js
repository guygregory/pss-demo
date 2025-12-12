export function createUI() {
  const cells = Array.from(document.querySelectorAll("[data-cell]"));
  const statusEl = document.querySelector("[data-status]");
  const scoreXEl = document.querySelector("[data-score-x]");
  const scoreOEl = document.querySelector("[data-score-o]");
  const scoreDrawEl = document.querySelector("[data-score-draw]");
  const snowToggle = document.querySelector("[data-snow]");

  function setSnow(enabled) {
    document.body.classList.toggle("snow", enabled);
    if (snowToggle) snowToggle.checked = enabled;
  }

  function render(state) {
    const { board, winningLine, winner, isDraw, current, scores, opponent } = state;

    board.forEach((mark, idx) => {
      const cell = cells[idx];
      if (!cell) return;
      cell.textContent = mark ? mark : "";
      cell.classList.toggle("is-x", mark === "🎅");
      cell.classList.toggle("is-o", mark === "🎄");
      cell.classList.toggle("is-win", winningLine.includes(idx));
      const status = mark ? `${mark} placed` : "empty";
      cell.setAttribute("aria-label", `Cell ${idx + 1} ${status}`);
    });

    if (statusEl) {
      if (winner) {
        statusEl.textContent = `Player ${winner} wins!`;
        statusEl.style.color = "#34d399";
      } else if (isDraw) {
        statusEl.textContent = "Snowy stalemate. Play again!";
        statusEl.style.color = "#22d3ee";
      } else {
        const versus = opponent === "ai" ? "vs Elf helper" : "vs friend";
        statusEl.textContent = `Player ${current}'s turn (${versus})`;
        statusEl.style.color = "var(--accent-2)";
      }
    }

    if (scoreXEl) scoreXEl.textContent = scores["🎅"];
    if (scoreOEl) scoreOEl.textContent = scores["🎄"];
    if (scoreDrawEl) scoreDrawEl.textContent = scores.draws;
  }

  return { render, setSnow, cells };
}
