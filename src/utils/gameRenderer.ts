import type { Invader, Boss, Bullet, Particle } from '../types/game'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  INVADER_SIZE,
  BOSS_WIDTH,
  BOSS_HEIGHT,
  BULLET_SIZE
} from './gameConstants'

/**
 * Draw the player spaceship
 */
export function drawPlayer(ctx: CanvasRenderingContext2D, playerX: number): void {
  ctx.fillStyle = '#00ff9f'
  ctx.shadowColor = '#00ff9f'
  ctx.shadowBlur = 20

  // Body
  ctx.beginPath()
  ctx.moveTo(playerX + PLAYER_WIDTH / 2, CANVAS_HEIGHT - 80)
  ctx.lineTo(playerX, CANVAS_HEIGHT - 40)
  ctx.lineTo(playerX + PLAYER_WIDTH, CANVAS_HEIGHT - 40)
  ctx.closePath()
  ctx.fill()

  // Wings
  ctx.fillRect(playerX - 10, CANVAS_HEIGHT - 50, 10, 20)
  ctx.fillRect(playerX + PLAYER_WIDTH, CANVAS_HEIGHT - 50, 10, 20)
  ctx.shadowBlur = 0
}

/**
 * Draw an invader
 */
export function drawInvader(ctx: CanvasRenderingContext2D, invader: Invader): void {
  if (!invader.alive) return

  if (invader.dying) {
    // Explosion animation
    const scale = 1 + (20 - (invader.dyingTime || 0)) / 10
    const alpha = (invader.dyingTime || 0) / 20
    ctx.globalAlpha = alpha
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 30

    const centerX = invader.x + INVADER_SIZE / 2
    const centerY = invader.y + INVADER_SIZE / 2
    const size = (INVADER_SIZE - 20) * scale

    ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size)
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0
  } else {
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 15

    // Alien body
    ctx.fillRect(invader.x + 10, invader.y + 10, INVADER_SIZE - 20, INVADER_SIZE - 20)

    // Alien eyes
    ctx.fillStyle = '#00ff9f'
    ctx.fillRect(invader.x + 15, invader.y + 18, 8, 8)
    ctx.fillRect(invader.x + INVADER_SIZE - 23, invader.y + 18, 8, 8)

    // Alien antennae
    ctx.fillStyle = '#ff0080'
    ctx.fillRect(invader.x + 12, invader.y, 4, 10)
    ctx.fillRect(invader.x + INVADER_SIZE - 16, invader.y, 4, 10)

    // Antenna tips
    ctx.beginPath()
    ctx.arc(invader.x + 14, invader.y, 4, 0, Math.PI * 2)
    ctx.arc(invader.x + INVADER_SIZE - 14, invader.y, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.shadowBlur = 0
  }
}

/**
 * Draw the boss
 */
export function drawBoss(ctx: CanvasRenderingContext2D, boss: Boss): void {
  if (!boss.alive) return

  if (boss.dying) {
    // Boss explosion
    const scale = 1 + (30 - (boss.dyingTime || 0)) / 15
    const alpha = (boss.dyingTime || 0) / 30
    ctx.globalAlpha = alpha
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 50

    const centerX = boss.x + BOSS_WIDTH / 2
    const centerY = boss.y + BOSS_HEIGHT / 2

    ctx.fillRect(
      centerX - (BOSS_WIDTH * scale) / 2,
      centerY - (BOSS_HEIGHT * scale) / 2,
      BOSS_WIDTH * scale,
      BOSS_HEIGHT * scale
    )
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0
  } else {
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 25

    // Boss body
    ctx.fillRect(boss.x + 20, boss.y + 20, BOSS_WIDTH - 40, BOSS_HEIGHT - 40)

    // Boss eyes
    ctx.fillStyle = '#00ff9f'
    ctx.fillRect(boss.x + 50, boss.y + 50, 30, 30)
    ctx.fillRect(boss.x + BOSS_WIDTH - 80, boss.y + 50, 30, 30)

    // Boss horns
    ctx.fillStyle = '#ff0080'
    ctx.beginPath()
    ctx.moveTo(boss.x + 40, boss.y + 20)
    ctx.lineTo(boss.x + 20, boss.y - 30)
    ctx.lineTo(boss.x + 60, boss.y + 20)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(boss.x + BOSS_WIDTH - 40, boss.y + 20)
    ctx.lineTo(boss.x + BOSS_WIDTH - 20, boss.y - 30)
    ctx.lineTo(boss.x + BOSS_WIDTH - 60, boss.y + 20)
    ctx.fill()

    ctx.shadowBlur = 0

    // HP bar
    drawBossHealthBar(ctx, boss)
  }
}

/**
 * Draw boss health bar
 */
function drawBossHealthBar(ctx: CanvasRenderingContext2D, boss: Boss): void {
  const hpBarWidth = BOSS_WIDTH - 40
  const hpBarHeight = 10
  const hpBarX = boss.x + 20
  const hpBarY = boss.y - 20

  // Background
  ctx.fillStyle = '#333'
  ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight)

  // HP
  const hpPercent = boss.hp / boss.maxHp
  ctx.fillStyle = hpPercent > 0.5 ? '#00ff9f' : hpPercent > 0.2 ? '#ffff00' : '#ff0000'
  ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercent, hpBarHeight)

  // Border
  ctx.strokeStyle = '#00ff9f'
  ctx.lineWidth = 2
  ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight)
}

/**
 * Draw bullets
 */
export function drawBullets(
  ctx: CanvasRenderingContext2D,
  bullets: Bullet[],
  color: string
): void {
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 10

  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x - BULLET_SIZE / 2, bullet.y, BULLET_SIZE, BULLET_SIZE * 4)
  })

  ctx.shadowBlur = 0
}

/**
 * Draw particles
 */
export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
  ctx.fillStyle = '#ff0080'
  ctx.shadowColor = '#ff0080'
  ctx.shadowBlur = 10

  particles.forEach(particle => {
    ctx.globalAlpha = particle.life / 50
    ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4)
  })

  ctx.globalAlpha = 1
  ctx.shadowBlur = 0
}
