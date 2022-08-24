import { Game } from '@/game'
import { Fleet } from '@/fleet'
import { Grid } from '@/grid'
import { Team } from '@/team'

const grid = new Grid()
new Game(
  grid,
  new Fleet(Team.A, grid),
  new Fleet(Team.B, grid),
).Awake()
