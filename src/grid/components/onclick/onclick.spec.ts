import { GridOnClickComponent } from './onclick'
import { mockGridFactory } from '@/grid'
import { Vector2D } from '@/utils'

describe('>>> Grid Click Component', () => {
  let comp: GridOnClickComponent

  beforeEach(() => {
    comp = new GridOnClickComponent()
    comp.Entity = mockGridFactory()
    comp.Entity.Awake()
  })

  it('should update node if user click with it\'s range', () => {
    const spy = jest.spyOn(comp.Entity, 'DeterminePathTo')

    comp.ClickOn(new Vector2D(100, 100))
    expect(spy).toBeCalledWith(comp.Entity.Nodes[0])
  })
})
