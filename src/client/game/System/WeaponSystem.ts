import ISystem from "./ISystem";
import Entity from "../Entity/Entity";
import Weapon from "../Component/Weapon";
import Assembler from "../Assembler";
import Model from "../Component/Model";

export default class WeaponSystem implements ISystem {

  composition: Set<string> = new Set([
    Weapon.name,
    Model.name
  ]);

  constructor(private assembler: Assembler) {

  }

  update(entities: Array<Entity>) {
    entities.forEach(entity => {
      const weapon = entity.getComponent<Weapon>(Weapon.name);
      const model = entity.getComponent<Model>(Model.name);

      if (weapon.isFiring && weapon.canFire) {
        const position = model.mesh.position.clone();
        const direction = model.mesh.rotation.clone();



        this.assembler.createBullet(position, direction);

        weapon.canFire = false;
        setTimeout(() => weapon.canFire = true, 1000);
      }
    });
  }

}
