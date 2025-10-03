import { SEO } from '../components/SEO'
import { useEffect, useState, useCallback, useRef } from 'react'
import '../styles/game.css'

type Position = { x: number; y: number }
type Invader = Position & { alive: boolean; dying?: boolean; dyingTime?: number }
type Bullet = Position & { direction: 'up' | 'down' }
type Particle = Position & { vx: number; vy: number; life: number }
type Boss = Position & { alive: boolean; hp: number; maxHp: number; dying?: boolean; dyingTime?: number }

const CANVAS_WIDTH = 1600
const CANVAS_HEIGHT = 900
const PLAYER_WIDTH = 70
const PLAYER_HEIGHT = 50
const INVADER_SIZE = 60
const BOSS_WIDTH = 200
const BOSS_HEIGHT = 150
const BULLET_SIZE = 8
const PLAYER_SPEED = 15
const BULLET_SPEED = 12
const INVADER_SPEED = 0.5
const INVADER_DROP_DISTANCE = 30

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playerX, setPlayerX] = useState(CANVAS_WIDTH / 2)
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [invaders, setInvaders] = useState<Invader[]>([])
  const [boss, setBoss] = useState<Boss | null>(null)
  const [enemyBullets, setEnemyBullets] = useState<Bullet[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [invaderDirection, setInvaderDirection] = useState(1)
  const [stage, setStage] = useState(1)
  const [stageClear, setStageClear] = useState(false)
  const keysPressed = useRef<Set<string>>(new Set())
  const gameOverRef = useRef(false)

  const initInvaders = useCallback(() => {
    const newInvaders: Invader[] = []
    const rows = 3
    const cols = 6
    const spacing = 150
    const startX = (CANVAS_WIDTH - (cols - 1) * spacing) / 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newInvaders.push({
          x: startX + col * spacing,
          y: row * 100 + 100,
          alive: true
        })
      }
    }
    return newInvaders
  }, [])

  const initBoss = useCallback(() => {
    const bossHp = 50 + (stage * 20)
    return {
      x: CANVAS_WIDTH / 2 - BOSS_WIDTH / 2,
      y: 100,
      alive: true,
      hp: bossHp,
      maxHp: bossHp
    }
  }, [stage])

  const resetGame = useCallback(() => {
    gameOverRef.current = false
    setPlayerX(CANVAS_WIDTH / 2)
    setBullets([])
    setEnemyBullets([])
    setParticles([])
    setInvaders(initInvaders())
    setBoss(null)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setIsPlaying(true)
    setInvaderDirection(1)
    setStage(1)
    setStageClear(false)
  }, [initInvaders])

  const nextStage = useCallback(() => {
    setStageClear(false)
    const nextStageNum = stage + 1
    setStage(nextStageNum)
    setBullets([])
    setEnemyBullets([])
    setParticles([])

    // Every 5th stage is a boss stage
    if (nextStageNum % 5 === 0) {
      setInvaders([])
      setBoss(initBoss())
    } else {
      setInvaders(initInvaders())
      setBoss(null)
    }

    setInvaderDirection(1)
    setPlayerX(CANVAS_WIDTH / 2)
  }, [initInvaders, initBoss, stage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return
      keysPressed.current.add(e.key)

      if (e.key === ' ') {
        e.preventDefault()
        setBullets(prev => [...prev, { x: playerX + PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 100, direction: 'up' }])
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isPlaying, playerX])

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver || lives <= 0 || gameOverRef.current) return

    const gameLoop = setInterval(() => {
      // Double check game over state
      if (gameOverRef.current) return
      // Move player
      if (keysPressed.current.has('ArrowLeft')) {
        setPlayerX(prev => Math.max(0, prev - PLAYER_SPEED))
      }
      if (keysPressed.current.has('ArrowRight')) {
        setPlayerX(prev => Math.min(CANVAS_WIDTH - PLAYER_WIDTH, prev + PLAYER_SPEED))
      }

      // Move bullets
      setBullets(prev => prev.filter(b => b.y > 0).map(b => ({ ...b, y: b.y - BULLET_SPEED })))
      setEnemyBullets(prev => prev.filter(b => b.y < CANVAS_HEIGHT).map(b => ({ ...b, y: b.y + BULLET_SPEED })))

      // Update particles
      setParticles(prev => prev
        .filter(p => p.life > 0)
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2,
          life: p.life - 1
        }))
      )

      // Move invaders (smooth random movement with boundary check)
      setInvaders(prev => {
        return prev.map(inv => {
          if (inv.dying || !inv.alive) return inv

          // Smooth random movement (smaller increments)
          const randomMoveX = (Math.random() - 0.5) * 0.8 * stage
          const randomMoveY = (Math.random() - 0.5) * 0.5

          let newX = inv.x + randomMoveX
          let newY = inv.y + randomMoveY

          // Keep within bounds
          newX = Math.max(0, Math.min(CANVAS_WIDTH - INVADER_SIZE, newX))
          newY = Math.max(50, Math.min(CANVAS_HEIGHT - 300, newY))

          return { ...inv, x: newX, y: newY }
        })
      })

      // Update dying invaders
      setInvaders(prev => prev.map(inv => {
        if (inv.dying && inv.dyingTime !== undefined) {
          if (inv.dyingTime <= 0) {
            return { ...inv, alive: false, dying: false }
          }
          return { ...inv, dyingTime: inv.dyingTime - 1 }
        }
        return inv
      }))

      // Check bullet-invader collision
      setBullets(prevBullets => {
        const remainingBullets = [...prevBullets]
        setInvaders(prevInvaders => {
          const newInvaders = prevInvaders.map(inv => {
            if (!inv.alive || inv.dying) return inv
            const hitBulletIndex = remainingBullets.findIndex(b =>
              b.x >= inv.x && b.x <= inv.x + INVADER_SIZE &&
              b.y >= inv.y && b.y <= inv.y + INVADER_SIZE
            )
            if (hitBulletIndex !== -1) {
              remainingBullets.splice(hitBulletIndex, 1)
              setScore(prev => prev + 10 * stage)

              // Create explosion particles
              const newParticles: Particle[] = []
              for (let i = 0; i < 15; i++) {
                const angle = (Math.PI * 2 * i) / 15
                newParticles.push({
                  x: inv.x + INVADER_SIZE / 2,
                  y: inv.y + INVADER_SIZE / 2,
                  vx: Math.cos(angle) * (2 + Math.random() * 3),
                  vy: Math.sin(angle) * (2 + Math.random() * 3),
                  life: 30 + Math.random() * 20
                })
              }
              setParticles(prev => [...prev, ...newParticles])

              return { ...inv, dying: true, dyingTime: 20 }
            }
            return inv
          })
          return newInvaders
        })
        return remainingBullets
      })

      // Check enemy bullet-player collision
      setEnemyBullets(prevEnemyBullets => {
        const hit = prevEnemyBullets.some(b =>
          b.x >= playerX && b.x <= playerX + PLAYER_WIDTH &&
          b.y >= CANVAS_HEIGHT - 80 && b.y <= CANVAS_HEIGHT - 40
        )
        if (hit) {
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              gameOverRef.current = true
              setTimeout(() => setGameOver(true), 100)
            }
            return newLives
          })
          return prevEnemyBullets.filter(b =>
            !(b.x >= playerX && b.x <= playerX + PLAYER_WIDTH &&
              b.y >= CANVAS_HEIGHT - 80 && b.y <= CANVAS_HEIGHT - 40)
          )
        }
        return prevEnemyBullets
      })

      // Enemy shooting
      setInvaders(prev => {
        const aliveInvaders = prev.filter(inv => inv.alive && !inv.dying)
        if (aliveInvaders.length > 0 && Math.random() < 0.01 * stage) {
          const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)]
          setEnemyBullets(prevBullets => [...prevBullets, { x: shooter.x + INVADER_SIZE / 2, y: shooter.y + INVADER_SIZE, direction: 'down' }])
        }
        return prev
      })

      // Boss bullet collision
      if (boss && boss.alive && !boss.dying) {
        setBullets(prevBullets => {
          const hitBullet = prevBullets.find(b =>
            b.x >= boss.x && b.x <= boss.x + BOSS_WIDTH &&
            b.y >= boss.y && b.y <= boss.y + BOSS_HEIGHT
          )
          if (hitBullet) {
            setBoss(prevBoss => {
              if (!prevBoss) return null
              const newHp = prevBoss.hp - 1
              if (newHp <= 0) {
                setScore(prev => prev + 500 * stage)
                // Create big explosion
                const newParticles: Particle[] = []
                for (let i = 0; i < 50; i++) {
                  const angle = (Math.PI * 2 * i) / 50
                  newParticles.push({
                    x: prevBoss.x + BOSS_WIDTH / 2,
                    y: prevBoss.y + BOSS_HEIGHT / 2,
                    vx: Math.cos(angle) * (3 + Math.random() * 5),
                    vy: Math.sin(angle) * (3 + Math.random() * 5),
                    life: 40 + Math.random() * 30
                  })
                }
                setParticles(prev => [...prev, ...newParticles])
                return { ...prevBoss, dying: true, dyingTime: 30, hp: 0 }
              }
              return { ...prevBoss, hp: newHp }
            })
            return prevBullets.filter(b => b !== hitBullet)
          }
          return prevBullets
        })

        // Boss shooting
        if (Math.random() < 0.03 * stage) {
          setEnemyBullets(prev => [...prev,
            { x: boss.x + BOSS_WIDTH / 2 - 20, y: boss.y + BOSS_HEIGHT, direction: 'down' },
            { x: boss.x + BOSS_WIDTH / 2 + 20, y: boss.y + BOSS_HEIGHT, direction: 'down' }
          ])
        }

        // Boss movement
        setBoss(prev => {
          if (!prev || prev.dying) return prev
          const moveX = (Math.random() - 0.5) * 4
          let newX = prev.x + moveX
          newX = Math.max(0, Math.min(CANVAS_WIDTH - BOSS_WIDTH, newX))
          return { ...prev, x: newX }
        })
      }

      // Update dying boss
      if (boss && boss.dying && boss.dyingTime !== undefined) {
        setBoss(prev => {
          if (!prev) return null
          if (prev.dyingTime! <= 0) {
            setStageClear(true)
            setTimeout(() => nextStage(), 2000)
            return { ...prev, alive: false }
          }
          return { ...prev, dyingTime: prev.dyingTime! - 1 }
        })
      }

      // Check win (stage clear)
      if (!boss || !boss.alive) {
        setInvaders(prev => {
          if (prev.every(inv => !inv.alive) && !stageClear && prev.length > 0) {
            setStageClear(true)
            setTimeout(() => nextStage(), 2000)
          }
          return prev
        })
      }
    }, 1000 / 60)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, playerX, invaderDirection, stage, nextStage, stageClear, boss, lives])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Canvas rendering error:', error)
      }
      return
    }

    // Draw player spaceship
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

    // Draw alien invaders
    invaders.forEach(inv => {
      if (inv.alive) {
        if (inv.dying) {
          // Explosion animation
          const scale = 1 + (20 - (inv.dyingTime || 0)) / 10
          const alpha = (inv.dyingTime || 0) / 20
          ctx.globalAlpha = alpha
          ctx.fillStyle = '#ff0080'
          ctx.shadowColor = '#ff0080'
          ctx.shadowBlur = 30

          const centerX = inv.x + INVADER_SIZE / 2
          const centerY = inv.y + INVADER_SIZE / 2
          const size = (INVADER_SIZE - 20) * scale

          ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size)
          ctx.globalAlpha = 1
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = '#ff0080'
          ctx.shadowColor = '#ff0080'
          ctx.shadowBlur = 15

          // Alien body
          ctx.fillRect(inv.x + 10, inv.y + 10, INVADER_SIZE - 20, INVADER_SIZE - 20)

          // Alien eyes
          ctx.fillStyle = '#00ff9f'
          ctx.fillRect(inv.x + 15, inv.y + 18, 8, 8)
          ctx.fillRect(inv.x + INVADER_SIZE - 23, inv.y + 18, 8, 8)

          // Alien antennae
          ctx.fillStyle = '#ff0080'
          ctx.fillRect(inv.x + 12, inv.y, 4, 10)
          ctx.fillRect(inv.x + INVADER_SIZE - 16, inv.y, 4, 10)

          // Antenna tips
          ctx.beginPath()
          ctx.arc(inv.x + 14, inv.y, 4, 0, Math.PI * 2)
          ctx.arc(inv.x + INVADER_SIZE - 14, inv.y, 4, 0, Math.PI * 2)
          ctx.fill()

          ctx.shadowBlur = 0
        }
      }
    })

    // Draw boss
    if (boss && boss.alive) {
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

        ctx.fillRect(centerX - (BOSS_WIDTH * scale) / 2, centerY - (BOSS_HEIGHT * scale) / 2, BOSS_WIDTH * scale, BOSS_HEIGHT * scale)
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
    }

    // Draw particles
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 10
    particles.forEach(p => {
      ctx.globalAlpha = p.life / 50
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4)
    })
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0

    // Draw player bullets
    ctx.fillStyle = '#00e6ff'
    ctx.shadowColor = '#00e6ff'
    ctx.shadowBlur = 10
    bullets.forEach(b => {
      ctx.fillRect(b.x - BULLET_SIZE / 2, b.y, BULLET_SIZE, BULLET_SIZE * 4)
    })

    // Draw enemy bullets
    ctx.fillStyle = '#ff0080'
    ctx.shadowColor = '#ff0080'
    ctx.shadowBlur = 10
    enemyBullets.forEach(b => {
      ctx.fillRect(b.x - BULLET_SIZE / 2, b.y, BULLET_SIZE, BULLET_SIZE * 4)
    })
    ctx.shadowBlur = 0
  }, [playerX, invaders, bullets, enemyBullets, particles, boss])

  return (
    <>
      <SEO
        title="Space Invaders Game"
        description="サイバーパンク調のスペースインベーダーゲームで遊ぼう！"
      />
      <section className="section game-section">
        <div className="container">
          <div className="game-header">
            <h1>{'< SPACE_INVADERS />'}</h1>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div className="game-score">
                <span className="score-label">LIVES</span>
                <span className="score-value">{'❤️'.repeat(lives)}</span>
              </div>
              <div className="game-score">
                <span className="score-label">STAGE</span>
                <span className="score-value">{stage}{stage % 5 === 0 ? ' 👾' : ''}</span>
              </div>
              <div className="game-score">
                <span className="score-label">SCORE</span>
                <span className="score-value">{score}</span>
              </div>
            </div>
          </div>

          <div className="game-container">
            <div className="game-canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="game-canvas"
              />

              {/* Stage Clear Overlay */}
              {stageClear && (
                <div className="game-overlay">
                  <div className="game-over-content">
                    <h2>{stage % 5 === 0 ? 'BOSS DEFEATED!' : 'STAGE CLEAR!'}</h2>
                    <p className="final-score">Stage {stage} Complete</p>
                    <p className="final-score" style={{ fontSize: '1.2rem', marginTop: '8px' }}>
                      {(stage + 1) % 5 === 0 ? 'Boss Stage Next!' : 'Next Stage Starting...'}
                    </p>
                  </div>
                </div>
              )}

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="game-overlay">
                  <div className="game-over-content">
                    <h2>GAME OVER</h2>
                    <p className="final-score">Final Score: {score}</p>
                    <p className="final-score" style={{ fontSize: '1.2rem', marginTop: '8px' }}>
                      Reached Stage: {stage}
                    </p>
                    <button className="btn primary" onClick={resetGame}>
                      RESTART
                    </button>
                  </div>
                </div>
              )}

              {/* Start Screen */}
              {!isPlaying && !gameOver && (
                <div className="game-overlay">
                  <div className="game-start-content">
                    <h2>SPACE INVADERS</h2>
                    <p>矢印キーで左右移動、スペースで発射</p>
                    <button className="btn primary" onClick={resetGame}>
                      START GAME
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="game-controls">
              <div className="controls-info">
                <h3>How to Play</h3>
                <ul className="list">
                  <li>⬅️ 左矢印 - 左に移動</li>
                  <li>➡️ 右矢印 - 右に移動</li>
                  <li>␣ スペース - 弾を発射</li>
                </ul>
                <p className="muted" style={{ marginTop: '16px' }}>
                  インベーダーを全滅させよう！敵の弾に当たるか、インベーダーが下に到達するとゲームオーバー。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
