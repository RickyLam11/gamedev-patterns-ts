import { Entity, Vector2D } from '@/utils'
import { NodeDrawComponent } from './components'

export class Node extends Entity {
  constructor(
    public readonly Start: Vector2D,
    public readonly End: Vector2D,
    public readonly Index: Vector2D
  ) {
    super()
  }

  public get Center(): Vector2D {
    return new Vector2D(
      this.Start.x + this.Size.x / 2,
      this.Start.y + this.Size.y / 2,
    )
  }

  public Awake(): void {
    this.AddComponent(new NodeDrawComponent())

    // awake all components by calling parent
    super.Awake()
  }

  public get Size(): Vector2D {
    return new Vector2D(
      this.End.x - this.Start.x,
      this.End.y - this.Start.y
    )
  }
}
