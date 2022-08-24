import { CanvasLayer } from '@/canvas-layer'
import { Game, mockGameFactory } from '@/game'
import { Grid, mockGridFactory } from '@/grid'
import { OnClickComponent, Vector2D } from '@/utils'
import { GameInputComponent } from './input'

class FakeGridOnClickComponent extends OnClickComponent {
  public Entity: Grid
  public Awake(): void {
    // @todo
  }
  public Update(deltaTime: number): void {
    // @todo
  }
  public ClickOn(point: Vector2D): void {
    // @todo
  }
}

describe('>>> Game Inout Component', () => {
  let comp: GameInputComponent
  let grid: Grid
  let game: Game

  beforeEach(() => {
    grid = mockGridFactory()
    grid.AddComponent(new FakeGridOnClickComponent())

    game = mockGameFactory(grid)
    comp = new GameInputComponent()

    game.AddComponent(comp)
    game.Awake()
  })

  it('should handle click', () => {
    const point = new Vector2D(200, 200)
    // may be implentment getEntities ?
    const spy = jest.spyOn(grid.GetComponent(OnClickComponent), 'ClickOn')
    CanvasLayer.Background.CalcLocalPointFrom = jest.fn().mockReturnValueOnce(point)

    expect(spy).not.toBeCalled()

    document.body.dispatchEvent(new MouseEvent('click'))
    expect(spy).toBeCalled()
  })
})
