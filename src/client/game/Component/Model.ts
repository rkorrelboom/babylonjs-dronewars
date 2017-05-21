import IComponent from "./IComponent";
import {Mesh} from "babylonjs";

class Model implements IComponent {

  mesh: Mesh;

  constructor(properties: { mesh: Mesh }) {
    this.mesh = properties.mesh
  }

}

export default Model;
