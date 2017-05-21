import ISystem from "./ISystem";
import Bullet from "../Component/Bullet";
import Model from "../Component/Model";
import Entity from "../Entity/Entity";

export default class BulletSystem implements ISystem {

  composition: Set<string> = new Set([
    Bullet.name,
    Model.name
  ]);

  update(entities: Array<Entity>) {
    entities.forEach(entity => {
      const bullet = entity.getComponent<Bullet>(Bullet.name);
      const model = entity.getComponent<Model>(Model.name);

      model.mesh.position.addInPlace(bullet.direction);
    });
  }

}
