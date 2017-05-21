import IComponent from "./IComponent";

class Weapon implements IComponent {

  public isFiring: boolean = false;
  public canFire: boolean = true;

  constructor(properties?: {}) {
  }

}

export default Weapon;
