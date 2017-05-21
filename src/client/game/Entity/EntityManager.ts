import IComponent from "../Component/IComponent";
import Entity from "./Entity";
import Composition from "./Composition";

export default class EntityManager {
  private entities: Array<Entity> = [];
  private components: Map<string, Map<number, IComponent>> = new Map();
  private compositions: Map<Set<string>, Composition> = new Map();

  public create(components: Array<IComponent> = []): Entity {
    const entity = new Entity(this.entities.length, this);
    this.entities.push(entity);
    components.forEach(component => this.addComponent(entity.id, component));

    this.updateComposition(entity);
    return entity;
  }

  public addComponent<TComponent>(entityId: number, component: TComponent): TComponent {
    if (!this.components.has(component.constructor.name)) {
      this.components.set(component.constructor.name, new Map<number, IComponent>());
    }

    this.components.get(component.constructor.name).set(entityId, component);
    this.updateComposition(this.entities[entityId]);
    return component;
  }

  public removeComponent(entityId: number, type: string): boolean {
    const result = this.components.get(type).delete(entityId);
    this.updateComposition(this.entities[entityId]);
    return result;
  }

  public getComponent<TComponent>(entityId: number, type: string): TComponent {
    return <TComponent>this.components.get(type).get(entityId);
  }

  public hasComponent(entityId: number, type: string): boolean {
    return this.components.has(type) && this.components.get(type).has(entityId);
  }

  public getNodes(composition: Set<string>): Array<Entity> {
    if (composition === null) return [];

    if (!this.compositions.has(composition)) {
      this.createComposition(composition);
    }

    return this.compositions.get(composition).getEntities();
  }

  private updateComposition(entity: Entity) {
    this.compositions.forEach(composition => composition.inspect(entity));
  }

  private createComposition(composition: Set<string>) {
    const instance = new Composition(composition);
    this.entities.forEach(entity => instance.inspect(entity));
    this.compositions.set(composition, instance);
  }

}
