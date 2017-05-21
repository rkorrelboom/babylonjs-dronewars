import IComponent from "./IComponent";
import {Vector3} from "babylonjs";

export default class Bullet implements IComponent {
  origin: Vector3;
  direction: Vector3;

  constructor(properties: {origin: Vector3, direction: Vector3}) {
    this.origin = properties.origin;
    this.direction = properties.direction;
  }
}
