import {Engine} from "babylonjs";
import "../config/environment";
import "./style.css";
import Game from "./game/Game";

window.addEventListener('DOMContentLoaded', () => {

  const canvas = <HTMLCanvasElement>document.getElementById('game-canvas');
  const engine = new Engine(canvas);
  const game = new Game(engine);

  game.run();

});
