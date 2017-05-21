import {Scene} from "babylonjs";
import ISystem from "./ISystem";

export default class RenderSystem implements ISystem {

  composition: Set<string> = null;

  constructor(private scene: Scene) {
  }

  update() {
    this.scene.render();
  }

}
