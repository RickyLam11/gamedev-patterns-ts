import { mockFleetFactory } from '@/fleet'
import { Grid, mockGridFactory } from '@/grid'
import { Node } from '@/node'
import { Settings } from '@/settings'
import { mockShipFactory } from '@/ship'
import { Vector2D } from '@/utils'
import { GridOnClickComponent } from './components'

describe('>>> Grid', () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension
  let grid: Grid

  beforeEach(() => {
    grid = mockGridFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(GridOnClickComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(GridOnClickComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    grid.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    grid.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })

  it('should awake and update all children', () => {
    const spyNodeAwake = jest.spyOn(Node.prototype, 'Awake')
    const spyNodeUpdate = jest.spyOn(Node.prototype, 'Update')

    expect(spyNodeAwake).not.toBeCalled()
    expect(spyNodeUpdate).not.toBeCalled()

    grid.Awake()
    expect(spyNodeAwake).toBeCalledTimes(nodeCount)

    grid.Update(0)
    expect(spyNodeUpdate).toBeCalledTimes(nodeCount)
  })

  describe('>> Determine path-to', () => {
    let destination: Node
    beforeEach(() => {
      grid.Awake()
      destination = grid.Nodes[grid.Nodes.length - 1]
    })

    it('should NOT calculate path if there is no currently active ship', () => {
      grid.ActiveShip = null

      grid.DeterminePathTo(destination)

      expect(grid.Nodes.some(node => node.IsOnPath)).toBeFalsy()
    })
    it('should calculate path if there is currently active ship', () => {
      grid.ActiveShip = mockShipFactory(mockFleetFactory(), grid.Nodes[0])

      grid.DeterminePathTo(destination)

      const path = grid.Nodes.filter(node => node.IsOnPath)
      const dimension = Settings.grid.dimension
      for (let i = 0; i < dimension - 2; i++) {
        expect(path[i].Index).toStrictEqual(new Vector2D(i + 1, 0))
      }
      for (let i = dimension - 1; i < 2 * dimension - 2; i++) {
        expect(path[i].Index).toStrictEqual(new Vector2D(dimension - 1, i - dimension + 2))
      }
    })
  })
})
