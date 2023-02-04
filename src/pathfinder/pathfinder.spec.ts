import { IGraph, IGraphNode, Vector2D } from '@/utils'
import { PathFinder } from './pathfinder'

describe('>>> Pathfinder', () => {
  // mock class
  class GraphNode implements IGraphNode {
    constructor(private readonly _position: Vector2D) { }

    public get Position(): Vector2D {
      return this._position
    }
  }

  class Graph implements IGraph {
    constructor(private readonly _edges: Record<string, GraphNode[] | null>) { }

    public GetCost(a: IGraphNode, b: IGraphNode): number {
      if (a.Position.x === 1 && a.Position.y === 1) {
        return 1
      }
      if (b.Position.x === 1 && b.Position.y === 1) {
        return 1
      }
      return 2
    }

    public GetNeighborsOf(node: IGraphNode): IGraphNode[] {
      // neighbors is defined by if an edge between 2 nodes exists
      const neighbors = this._edges[node.Position.AsString()]
      if (!neighbors) {
        throw new Error('No Neighbors')
      }
      return neighbors
    }
  }

  // define instance
  // first row
  const node00 = new GraphNode(new Vector2D(0, 0))
  const node01 = new GraphNode(new Vector2D(0, 1))
  const node02 = new GraphNode(new Vector2D(0, 2))
  // second row
  const node10 = new GraphNode(new Vector2D(1, 0))
  const node11 = new GraphNode(new Vector2D(1, 1))
  const node12 = new GraphNode(new Vector2D(1, 2))
  // third row
  const node20 = new GraphNode(new Vector2D(2, 0))
  const node21 = new GraphNode(new Vector2D(2, 1))
  const node22 = new GraphNode(new Vector2D(2, 2))

  const edges = {
    // in T,R,B,L order
    [node00.Position.AsString()]: [node01, node10],
    [node01.Position.AsString()]: [node02, node11, node00],
    [node02.Position.AsString()]: [node12, node01],

    [node10.Position.AsString()]: [node00, node11, node20],
    [node11.Position.AsString()]: [node01, node12, node21, node10],
    [node12.Position.AsString()]: [node02, node22, node11],

    [node20.Position.AsString()]: [node10, node21],
    [node21.Position.AsString()]: [node11, node22, node20],
    [node22.Position.AsString()]: [node12, node21],
  }

  const heuristic = (a: IGraphNode, b: IGraphNode): number => Math.abs(a.Position.x - b.Position.x) + Math.abs(a.Position.y - b.Position.y)
  const graph = new Graph(edges)
  const pathfinder = new PathFinder(graph, heuristic)

  it('should calculate path from point A to point B', () => {
    expect(pathfinder.CalculatePath(node00, node22)).toStrictEqual([
      node01, node11, node12, node22
    ])
    expect(pathfinder.CalculatePath(node01, node12)).toStrictEqual([
      node11, node12
    ])
    expect(pathfinder.CalculatePath(node20, node02)).toStrictEqual([
      node10, node11, node01, node02
    ])
    expect(pathfinder.CalculatePath(node12, node20)).toStrictEqual([
      node11, node21, node20
    ])
    expect(pathfinder.CalculatePath(node22, node11)).toStrictEqual([
      node12, node11
    ])
  })
})
