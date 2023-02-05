import { GridOnClickComponent } from './onclick'
import { mockGridFactory } from '@/grid'
import { Vector2D } from '@/utils'
import { Settings } from '@/settings'

describe('>>> Grid Click Component', () => {
  let comp: GridOnClickComponent

  beforeEach(() => {
    comp = new GridOnClickComponent()
    comp.Entity = mockGridFactory()
    comp.Entity.Awake()
  })

  it('should update node if user click with it\'s range', () => {
    const spy = jest.spyOn(comp.Entity, 'DeterminePathTo')
    const centerOfNode = new Vector2D(Settings.grid.nodeSize / 2, Settings.grid.nodeSize / 2)

    comp.ClickOn(centerOfNode)
    expect(spy).toBeCalledWith(comp.Entity.Nodes[0])
  })
})
