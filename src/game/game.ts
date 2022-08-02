import { Entity } from '@/utils'

export class Game extends Entity {
  private _lastTimestamp = 0

  public Entities: Entity[] = []

  /**
   * Awake
   */
  public Awake(): void {
    // awake all components by calling parent
    super.Awake()

    // awake child entity
    for (const entity of this.Entities) {
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
    for (const entity of this.Entities) {
      entity.Update(deltaTime)
    }

    // update _lastTimestamp
    this._lastTimestamp = Date.now()

    // invoke Update on next frame to induce an recursive loop
    window.requestAnimationFrame(() => this.Update())
  }
}
