/**
 * 给每个区块截图，用来核对排版（手机上没法开浏览器看效果）。
 *
 * 用法：node scripts/shoot.mjs [输出目录]
 * 前置：pnpm build && pnpm preview（默认 http://127.0.0.1:4173）
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const out = process.argv[2] ?? '/tmp/shots'
const base = process.env.SHOOT_URL ?? 'http://127.0.0.1:4173/'

mkdirSync(out, { recursive: true })

const sections = [
  ['hero', '#hero'],
  ['feature', '#feature'],
  ['services', '#services'],
  ['promo', '.promo-section'],
  ['team', '#team'],
  ['stats', '#stats'],
  ['sponsors', '#sponsors'],
  ['satisfaction', '#satisfaction'],
  ['portfolio', '#portfolio'],
  ['testimonials', '#testimonials'],
  ['news', '#news'],
  ['partners', '#partners'],
  ['contact', '#contact'],
  ['footer', '.footer'],
]

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] })

async function shoot({ name, width, height, dark = false, only = null }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: dark ? 'dark' : 'light',
    locale: 'zh-CN',
  })
  const page = await context.newPage()
  const problems = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') problems.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => problems.push('pageerror: ' + err.message))

  await page.goto(base, { waitUntil: 'networkidle' })
  // 触发所有 v-reveal：整页滚一遍
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 300))
  })

  for (const [label, selector] of sections) {
    if (only && !only.includes(label)) continue
    const el = page.locator(selector).first()
    if ((await el.count()) === 0) {
      problems.push(`找不到区块 ${selector}`)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    // 等 v-reveal 的入场动画走完，否则截到半透明的中间态
    await page.waitForTimeout(750)
    await el.screenshot({ path: `${out}/${name}-${label}.png` })
  }

  if (!only) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(200)
    await page.screenshot({ path: `${out}/${name}-viewport.png` })
  }

  console.log(`${name}: ${sections.length} 张 → ${out}`)
  if (problems.length) {
    console.log('  控制台问题：')
    for (const p of problems.slice(0, 10)) console.log('   ·', p)
  } else {
    console.log('  控制台干净')
  }
  await context.close()
}

await shoot({ name: 'desktop', width: 1440, height: 900 })
await shoot({ name: 'mobile', width: 390, height: 844, only: ['hero', 'feature', 'services', 'team', 'sponsors', 'contact'] })
await shoot({ name: 'dark', width: 1440, height: 900, dark: true, only: ['hero', 'services', 'contact'] })

await browser.close()
