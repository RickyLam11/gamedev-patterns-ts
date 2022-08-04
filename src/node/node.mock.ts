import { Node } from './node'
import { Vector2D } from '@/utils'

// it is just a function
export const mockNodeFactory = (
  start = new Vector2D(0, 0),
  end = new Vector2D(1, 1),
  index = new Vector2D(0, 0)
): Node => new Node(start, end, index)


