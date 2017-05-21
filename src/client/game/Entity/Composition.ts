import Entity from "./Entity";

export default class Composition {

  private entities: Map<number, Entity> = new Map();

  constructor(private composition: Set<string>) {
  }

  public inspect(entity: Entity): void {
    if (this.isMatch(entity)) {
      if (!this.entities.has(entity.id)) {
        this.entities.set(entity.id, entity);
      }
    } else {
      if (this.entities.has(entity.id)) {
        this.entities.delete(entity.id);
      }
    }
  }

  public getEntities(): Array<Entity> {
    return Array.from(this.entities.values());
  }

  private isMatch(entity: Entity): boolean {
    for (let name of this.composition) {
      if (!entity.hasComponent(name)) return false;
    }

    return true;
  }

}
