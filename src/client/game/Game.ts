import {Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3} from "babylonjs";
import RenderSystem from "./system/RenderSystem";
import InputSystem from "./system/InputSystem";
import EntityManager from "./Entity/EntityManager";
import Assembler from "./Assembler";
import ISystem from "./System/ISystem";
import Model from "./Component/Model";
import PlayerControlled from "./Component/PlayerControlled";
import WeaponSystem from "./System/WeaponSystem";
import BulletSystem from "./System/BulletSystem";

export default class Game {

  private scene: Scene;
  private assembler: Assembler;
  private entityManager: EntityManager;
  private systems: ISystem[];

  constructor(private engine: Engine) {
    this.entityManager = new EntityManager();
    this.scene = this.createScene(engine);
    this.assembler = new Assembler(this.entityManager, this.scene);
    this.systems = this.createSystems();

    this.createEntities(this.scene);
  }

  public run() {
    this.engine.runRenderLoop(() => {
      this.systems.forEach(system => {
        system.update(this.entityManager.getNodes(system.composition));
      })
    });
  }

  private createScene(engine: Engine): Scene {
    return new Scene(engine);
  }

  private createSystems(): ISystem[] {
    return [
      new InputSystem(),
      new WeaponSystem(this.assembler),
      new BulletSystem(),
      new RenderSystem(this.scene)
    ]
  }

  private createEntities(scene: Scene): void {
    const camera = new FreeCamera('player-camera', new Vector3(10, 30, -20), scene);
    camera.detachControl(<HTMLElement>this.engine.getRenderingCanvas());
    camera.setTarget(new Vector3(0, 0, 0,));

    new HemisphericLight("light1", new Vector3(0, 10, 0), scene);

    this.entityManager.create([
      new Model({ mesh: Mesh.CreateGround('ground1', 100, 100, 2, scene) })
    ]);

    const player = this.assembler.createDrone();
    player.addComponent(new PlayerControlled());

    const ai = this.assembler.createDrone();
    ai.getComponent<Model>(Model.name).mesh.position.z = 20;
  }

}
