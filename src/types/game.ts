export interface Position {
  x: number
  y: number
}

export interface Invader extends Position {
  alive: boolean
  dying?: boolean
  dyingTime?: number
}

export interface Boss extends Position {
  alive: boolean
  hp: number
  maxHp: number
  dying?: boolean
  dyingTime?: number
}

export interface Bullet extends Position {
  direction: 'up' | 'down'
}

export interface Particle extends Position {
  vx: number
  vy: number
  life: number
}

export interface GameState {
  playerX: number
  bullets: Bullet[]
  invaders: Invader[]
  boss: Boss | null
  enemyBullets: Bullet[]
  particles: Particle[]
  score: number
  lives: number
  gameOver: boolean
  isPlaying: boolean
  stage: number
  stageClear: boolean
}
