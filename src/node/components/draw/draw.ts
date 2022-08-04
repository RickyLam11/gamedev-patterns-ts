import { CanvasLayer } from '@/canvas-layer'
import { IComponent } from '@/utils'
import { Node } from '@/node'
import { Settings } from '@/settings'

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw()
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.End)
  }

  private Draw(): void {
    // Canvas is created in (CanvasLayer.Background)
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      Settings.grid.color
    )
  }
}
