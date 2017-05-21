import Entity from "../Entity/Entity";
import ISystem from "./ISystem";
import PlayerControlled from "../Component/PlayerControlled";
import Model from "../Component/Model";
import Weapon from "../Component/Weapon";

export default class InputSystem implements ISystem {

  readonly composition: Set<string> = new Set([
    PlayerControlled.name,
    Model.name,
    Weapon.name
  ]);

  private keysUp = [87];
  private keysDown = [83];
  private keysLeft = [65];
  private keysRight = [68];
  private keysFire = [32];

  private input: Set<number> = new Set();

  private keys = [].concat(
    this.keysUp,
    this.keysDown,
    this.keysLeft,
    this.keysRight,
    this.keysFire
  );

  constructor() {
    document.addEventListener('keydown', event => this.handleKeyDown(event.keyCode), false);
    document.addEventListener('keyup', event => this.handleKeyUp(event.keyCode), false);
  }

  public update(entities: Entity[]) {
    const models = entities.map(entity => entity.getComponent<Model>(Model.name));

    this.input.forEach(keyCode => {
      if (this.keysUp.indexOf(keyCode) !== -1) {
        models.forEach(model => model.mesh.position.z += 0.1);
      } else if (this.keysDown.indexOf(keyCode) !== -1) {
        models.forEach(model => model.mesh.position.z -= 0.1);
      } else if (this.keysRight.indexOf(keyCode) !== -1) {
        models.forEach(model => model.mesh.rotation.y += 0.1);
      } else if (this.keysLeft.indexOf(keyCode) !== -1) {
        models.forEach(model => model.mesh.rotation.y -= 0.1);
      } else if (this.keysFire.indexOf(keyCode) !== -1) {
        entities.forEach(entity => {
          entity.getComponent<Weapon>(Weapon.name).isFiring = true
        });
      }
    });
  }

  private handleKeyDown(keyCode: number) {
    if (this.keys.indexOf(keyCode) === -1) return;
    this.input.add(keyCode);
    event.preventDefault();
  }

  private handleKeyUp(keyCode: number) {
    console.log(keyCode);
    if (this.keys.indexOf(keyCode) === -1) return;
    this.input.delete(keyCode);
    event.preventDefault();
  }

}
