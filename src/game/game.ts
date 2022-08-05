import { Entity } from '@/utils'
import { Fleet } from '@/fleet'
import { Grid } from '@/grid'
import { Team } from '@/team'

export class Game extends Entity {
  private _lastTimestamp = 0

  public _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  public Awake(): void {
    // awake all components by calling parent
    super.Awake()

    const grid = new Grid()
    this._entities.push(
      grid,
      new Fleet(Team.A, grid),
      new Fleet(Team.B, grid),
    )

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
