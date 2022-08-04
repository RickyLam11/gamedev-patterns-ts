import { Entity } from '@/utils'
import { Grid } from '@/grid'

export class Game extends Entity {
  private _lastTimestamp = 0

  public _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  /**
   * Awake
   */
  public Awake(): void {
    // awake all components by calling parent
    super.Awake()

    this._entities.push(new Grid())

    // awake child entity
    for (const entity of this._entities) {
      entity.Awake()
    }

    // make sure Update start after all other entity are awaken
    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now()

      // start update (game) loop
      this.Update()
    })
  }

  /**
   * Update
   */
  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 100

    // update all components by calling parent
    super.Update(deltaTime)

    // update child entity
    for (const entity of this._entities) {
      entity.Update(deltaTime)
    }

    // update _lastTimestamp
    this._lastTimestamp = Date.now()

    // invoke Update on next frame to induce an recursive loop
    window.requestAnimationFrame(() => this.Update())
  }
}
