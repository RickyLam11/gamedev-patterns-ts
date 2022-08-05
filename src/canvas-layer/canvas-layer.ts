import { Canvas, Vector2D } from '@/utils'
import { Settings } from '@/settings'

export class CanvasLayer {
  private static _background: Canvas
  private static _foreground: Canvas

  private constructor() {
    // make it unaccessible
  }

  // why no just private ?
  private static InitCanvas(style: Partial<CSSStyleDeclaration>): Canvas {
    const size = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset
    const canvas = new Canvas(new Vector2D(size, size))
    canvas.Awake()
    canvas.SetStyle(style)

    return canvas
  }

  // as it is a static function, no `new CanvasLayer()` is needed
  public static get Background(): Canvas {
    if (!this._background) {
      this._background = this.InitCanvas({ zIndex: '0' })
    }

    return this._background
  }

  public static get Foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.InitCanvas({ zIndex: '1' })
    }

    return this._foreground
  }
}
