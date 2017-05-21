import EntityManager from "./EntityManager";

export default class Entity {
  constructor(readonly id: number, private em: EntityManager) {}

  addComponent<T>(component: T): T {
    return this.em.addComponent<T>(this.id, component);
  }

  removeComponent(type: string): boolean {
    return this.em.removeComponent(this.id, type);
  }

  getComponent<TComponent>(type: string): TComponent {
    return this.em.getComponent<TComponent>(this.id, type);
  }

  hasComponent(type: string): boolean {
    return this.em.hasComponent(this.id, type);
  }
}
