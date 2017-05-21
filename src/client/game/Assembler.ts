import EntityManager from "./Entity/EntityManager";
import {Mesh, Scene, Vector3} from "babylonjs";
import Model from "./Component/Model";
import Weapon from "./Component/Weapon";
import Entity from "./Entity/Entity";
import Bullet from "./Component/Bullet";

export default class Assembler {

  constructor(private entityManager: EntityManager, private scene: Scene) {
  }

  public createDrone(): Entity {
    const droneMesh = Mesh.CreateSphere('drone', 2, 3, this.scene);
    const weapon = Mesh.CreateBox('weapon', 1, this.scene);
    weapon.position.z = 1;
    weapon.parent = droneMesh;

    return this.entityManager.create([
      new Model({ mesh: droneMesh }),
      new Weapon()
    ]);
  }

  public createBullet(origin: Vector3, direction: Vector3): Entity {
    const bullet = Mesh.CreateSphere('bullet', 2, 2, this.scene);
    bullet.position = origin;

    return this.entityManager.create([
      new Model({mesh: bullet}),
      new Bullet({origin, direction})
    ]);
  }

}
