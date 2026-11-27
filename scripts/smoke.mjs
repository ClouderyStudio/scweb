/**
 * 冒烟测试：在 jsdom 里把**构建产物**跑一遍。
 *
 * 手机上没法开真浏览器截图，这个脚本至少能保证：模块能加载、组件能挂载、
 * 每个区块都渲染出来、控制台没有 Vue 的警告或运行时报错。
 *
 * 用法：npx vite build && node scripts/smoke.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { JSDOM } from 'jsdom'

const distDir = new URL('../dist/', import.meta.url)
const html = readFileSync(new URL('index.html', distDir), 'utf8')
const scriptSrc = html.match(/src="\.\/(assets\/index-[^"]+\.js)"/)?.[1]

if (!scriptSrc) {
  console.error('没在 dist/index.html 里找到入口脚本，先构建一次')
  process.exit(1)
}

const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})

const { window } = dom
const problems = []
const stub = () => {}

// 浏览器 API 的替身：jsdom 没有 IntersectionObserver / matchMedia 这些
class IO {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    // 立刻当成「进入视口」，让 v-reveal、数字滚动这类逻辑也跑一遍
    this.cb([{ isIntersecting: true, target: el }], this)
  }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IO
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: stub,
  removeEventListener: stub,
  addListener: stub,
  removeListener: stub,
  dispatchEvent: () => false,
})
window.scrollTo = stub
window.HTMLElement.prototype.scrollIntoView = stub
window.Element.prototype.scrollBy = stub

// Node 24 的 globalThis.navigator 是只读 getter，逐个用 defineProperty 覆盖
for (const key of [
  'window',
  'document',
  'navigator',
  'location',
  'history',
  'HTMLElement',
  'Element',
  'Node',
  'SVGElement',
  'CustomEvent',
  'Event',
  'MutationObserver',
  'HTMLAnchorElement',
  'HTMLInputElement',
  'HTMLTextAreaElement',
  'DocumentFragment',
  'getComputedStyle',
  'IntersectionObserver',
  'ResizeObserver',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'matchMedia',
  'scrollTo',
]) {
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? window : window[key],
    configurable: true,
    writable: true,
  })
}

const originalWarn = console.warn
const originalError = console.error
console.warn = (...args) => {
  problems.push('warn: ' + args.join(' '))
  originalWarn(...args)
}
console.error = (...args) => {
  problems.push('error: ' + args.join(' '))
  originalError(...args)
}

window.addEventListener('error', (event) => problems.push('window error: ' + event.message))

try {
  await import(new URL(scriptSrc, distDir).href)
} catch (error) {
  console.error('入口模块加载失败：', error.message)
  if (error.stack) console.error(error.stack.split('\n').slice(0, 4).join('\n'))
  process.exit(1)
}
// 等两帧，让 onMounted 里的 rAF 跑完
await new Promise((resolve) => setTimeout(resolve, 120))

const app = window.document.getElementById('app')
const text = app?.textContent ?? ''

const checks = [
  ['根组件已挂载', Boolean(app?.querySelector('.site'))],
  ['顶栏', Boolean(app?.querySelector('.md-top-bar'))],
  ['首屏标题', text.includes('欢迎来到云术生存战争服务器')],
  ['服务器介绍', text.includes('高端的云服务器支持')],
  ['特色 6 条', app?.querySelectorAll('.service').length === 6],
  ['管理组 8 人', app?.querySelectorAll('.member').length === 8],
  ['统计 4 项', app?.querySelectorAll('.stat').length === 4],
  ['感谢榜单 3 列', app?.querySelectorAll('.sponsor').length === 3],
  ['满意度 3 条', app?.querySelectorAll('.vote').length === 3],
  ['玩家作品 6 张', app?.querySelectorAll('.work').length === 6],
  ['玩家留言 5 条', app?.querySelectorAll('.quote-card').length === 5],
  ['公告 5 篇', app?.querySelectorAll('.notice').length === 5],
  ['合作方', Boolean(app?.querySelector('.partner'))],
  ['联系表单', Boolean(app?.querySelector('#contact-message'))],
  ['页脚', Boolean(app?.querySelector('.footer'))],
  ['图片都有 alt', [...(app?.querySelectorAll('img') ?? [])].every((img) => img.hasAttribute('alt'))],
  ['没有空链接', [...(app?.querySelectorAll('a') ?? [])].every((a) => (a.getAttribute('href') ?? '') !== '#')],
]

let failed = 0
for (const [label, ok] of checks) {
  if (!ok) failed += 1
  console.log(`${ok ? '✓' : '✗'} ${label}`)
}

const relevant = problems.filter((p) => !p.includes('[jsdom]'))
if (relevant.length) {
  console.log('\n控制台问题：')
  for (const p of relevant.slice(0, 12)) console.log('  ·', p)
}

console.log(`\n${checks.length - failed}/${checks.length} 项通过，${relevant.length} 条控制台问题`)
process.exit(failed || relevant.length ? 1 : 0)
