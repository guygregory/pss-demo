import { TicTacToe } from "./game.js";
import { createUI } from "./ui.js";
import { bindInput } from "./input.js";

function bootstrap() {
  const ui = createUI();
  const game = new TicTacToe((state) => ui.render(state));

  ui.setSnow(document.querySelector("[data-snow]")?.checked ?? true);
  ui.render(game.getState());
  bindInput(game, ui);
}

document.addEventListener("DOMContentLoaded", bootstrap);
