import { Color } from '@/utils'

export const Settings = Object.freeze({
  debugMode: true,
  grid: {
    dimension: 6,
    nodeSize: 100,
    nodeOffset: 10,
    color: {
      regular: new Color(245, 245, 245, 1),
      inLocomotionRange: new Color(176, 190, 197, 1),
      onPath: new Color(51, 255, 153, 1),
    }
  },
  ships: {
    fleetSize: 2,
    radius: 40,
    color: {
      a: new Color(187, 222, 251, 1),
      b: new Color(255, 236, 179, 1),
    },
    locomotion: {
      range: 5,
      duration: 300
    }
  }
})
