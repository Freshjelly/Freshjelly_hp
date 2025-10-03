import type { Particle } from '../types/game'
import {
  CANVAS_WIDTH,
  INVADER_SIZE,
  INVADER_ROWS,
  INVADER_COLS,
  INVADER_SPACING,
  BOSS_WIDTH,
  BOSS_HEIGHT,
  BOSS_BASE_HP,
  BOSS_HP_PER_STAGE,
  PARTICLE_COUNT_INVADER,
  PARTICLE_COUNT_BOSS
} from './gameConstants'

/**
 * Calculate starting X position for invaders to center them
 */
export function calculateInvaderStartX(): number {
  return (CANVAS_WIDTH - (INVADER_COLS - 1) * INVADER_SPACING) / 2
}

/**
 * Initialize invader positions
 */
export function createInvaders() {
  const invaders = []
  const startX = calculateInvaderStartX()

  for (let row = 0; row < INVADER_ROWS; row++) {
    for (let col = 0; col < INVADER_COLS; col++) {
      invaders.push({
        x: startX + col * INVADER_SPACING,
        y: row * 100 + 100,
        alive: true
      })
    }
  }
  return invaders
}

/**
 * Initialize boss with scaled HP
 */
export function createBoss(stage: number) {
  const bossHp = BOSS_BASE_HP + (stage * BOSS_HP_PER_STAGE)
  return {
    x: CANVAS_WIDTH / 2 - BOSS_WIDTH / 2,
    y: 100,
    alive: true,
    hp: bossHp,
    maxHp: bossHp
  }
}

/**
 * Create explosion particles
 */
export function createExplosionParticles(
  x: number,
  y: number,
  count: number = PARTICLE_COUNT_INVADER
): Particle[] {
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count
    const speed = count === PARTICLE_COUNT_BOSS ? 3 : 2
    const speedVariation = count === PARTICLE_COUNT_BOSS ? 5 : 3
    const lifeBase = count === PARTICLE_COUNT_BOSS ? 40 : 30
    const lifeVariation = count === PARTICLE_COUNT_BOSS ? 30 : 20

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * (speed + Math.random() * speedVariation),
      vy: Math.sin(angle) * (speed + Math.random() * speedVariation),
      life: lifeBase + Math.random() * lifeVariation
    })
  }

  return particles
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Check if two rectangles collide
 */
export function checkCollision(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): boolean {
  return (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2
  )
}
