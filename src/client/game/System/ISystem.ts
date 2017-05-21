import Entity from "../Entity/Entity";

interface ISystem {
  update(entities: Array<Entity>);
  composition: Set<string>;
}

export default ISystem;
