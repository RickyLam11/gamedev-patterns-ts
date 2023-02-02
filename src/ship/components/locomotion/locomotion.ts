import { IComponent, Vector2D } from '@/utils'
import { Node } from '@/node'
import { Ship } from '@/ship'

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship

  private _node: Node

  public get Node(): Node {
    return this._node
  }

  public set Node(v: Node) {
    this._node = v
  }

  public get Position(): Vector2D {
    return this.Node.Center
  }

  constructor(node: Node) {
    this.Node = node
  }

  public Awake(): void {
    this._node.Ship = this.Entity
  }

  public Update(deltaTime: number): void {
    // todo
  }
}
