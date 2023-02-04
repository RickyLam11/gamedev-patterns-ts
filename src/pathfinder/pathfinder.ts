import { IGraph, IGraphNode, PriorityQueue } from '@/utils'

export class PathFinder {
  constructor(
    private readonly _graph: IGraph,
    private readonly _heuristic: (a: IGraphNode, b: IGraphNode) => number
  ) { }

  public CalculatePath(from: IGraphNode, to: IGraphNode): IGraphNode[] {
    const path: IGraphNode[] = []

    let current: IGraphNode | null = to
    const cameFrom = this.GetCameFrom(from, to)

    while (current && current !== from) {
      path.push(current)
      current = cameFrom[current.Position.AsString()]
    }

    path.reverse()

    return path
  }


  /**
   * Return dict of node stating which 'neighbor' should they go to reach the start node
   * @param start grow the frontier from this node
   * @param goal for early exit
   * @returns dict pointing toward to start node
   */
  private GetCameFrom(start: IGraphNode, goal: IGraphNode): Record<string, IGraphNode | null> {
    // Use record type as Dict
    const cameFrom: Record<string, IGraphNode | null> = {
      [start.Position.AsString()]: null
    }

    const costSoFar: Record<string, number> = {
      [start.Position.AsString()]: 0
    }

    const frontier = new PriorityQueue<IGraphNode>()

    frontier.Enqueue(start, 0)

    while (!frontier.IsEmpty) {
      const current = frontier.Dequeue()

      if (current === goal) {
        break
      }

      for (const next of this._graph.GetNeighborsOf(current)) {
        const newCost = costSoFar[current.Position.AsString()] + this._graph.GetCost(current, next)
        const nextPositionString = next.Position.AsString()

        if (typeof cameFrom[nextPositionString] === 'undefined' || newCost < costSoFar[nextPositionString]) {
          // create / update costSoFar
          costSoFar[nextPositionString] = newCost

          const priority = newCost + this._heuristic(goal, next)
          frontier.Enqueue(next, priority)
          cameFrom[nextPositionString] = current
        }
      }
    }

    return cameFrom
  }
}
