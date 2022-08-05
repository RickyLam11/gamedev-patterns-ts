import { Entity } from '@/utils'
import { Settings } from '@/settings'
import { Ship } from '@/ship'
import { Team } from '@/team'
import { Grid } from '@/grid'

export class Fleet extends Entity {
  private _ship: Ship[] = []

  constructor(
    public readonly Team: Team,
    private readonly _grid: Grid
  ) {
    super()
  }

  public Awake(): void {
    super.Awake()

    this.PrepareShips()
  }

  public Update(deltaTime: number): void {
    super.Update(deltaTime)

    this._ship.map(ship => ship.Update(deltaTime))
  }

  private PrepareShips(): void {
    const dimension = Settings.grid.dimension
    const fleetSize = Settings.ships.fleetSize
    const nodes = this._grid.Nodes

    for (let i = 0; i < fleetSize; i++) {
      const node = this.Team === Team.A ? nodes[i * dimension] : nodes[nodes.length - 1 - i * dimension]
      const ship = new Ship(this, node)
      this._ship.push(ship)

      ship.Awake()
    }
  }
}
