/**
 * 由品牌种子色生成一套 Material Design 3 配色令牌。
 *
 * m3-ui 只带结构令牌，颜色必须由站点注入（--md-sys-color-*）。
 * 这里用 OKLCh 生成和 MD3 同一套「色调 → 角色」映射：
 *
 *   primary  = P40   on-primary  = P100
 *   container= P90   on-container= P10
 *
 * 每个角色的色相不变，只改明度（tone），色度按 sRGB 色域裁剪，
 * 所以整套色板是同一个色相的深浅关系，明暗两套主题的对比度才是稳定的。
 *
 * 用法：node scripts/gen-theme.mjs [种子色]
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SEED = process.argv[2] ?? '#0f766e'

/* ---------- sRGB <-> OKLab ---------- */

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const linearToSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055)

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255)
}

function rgbToHex([r, g, b]) {
  const to255 = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255)
  return '#' + [r, g, b].map((v) => to255(v).toString(16).padStart(2, '0')).join('')
}

function linearToOklab([r, g, b]) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ]
}

function oklabToLinear([L, a, b]) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const oklchToLinear = (L, C, h) =>
  oklabToLinear([L, C * Math.cos((h * Math.PI) / 180), C * Math.sin((h * Math.PI) / 180)])

const inGamut = (rgb) => rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4)

function oklchToHex(L, C, h) {
  // 色域裁剪：保持明度与色相，二分降低色度直到落进 sRGB
  let lo = 0
  let hi = C
  let rgb = oklchToLinear(L, C, h)
  if (!inGamut(rgb)) {
    for (let i = 0; i < 24; i += 1) {
      const mid = (lo + hi) / 2
      if (inGamut(oklchToLinear(L, mid, h))) {
        lo = mid
        rgb = oklchToLinear(L, mid, h)
      } else {
        hi = mid
      }
    }
    rgb = oklchToLinear(L, lo, h)
  }
  return rgbToHex(rgb.map((v) => linearToSrgb(Math.min(1, Math.max(0, v)))))
}

/* ---------- tone → OKLab L ---------- */

/** MD3 的 tone 是 CIELAB 明度：tone 50 ≈ 18% 反射率，OKLab 的 L ≈ Y^(1/3)。 */
function toneToL(tone) {
  const y = ((tone + 16) / 116) ** 3 > 0.008856 ? ((tone + 16) / 116) ** 3 : tone / 903.3
  return Math.cbrt(y)
}

/* ---------- 色板 ---------- */

const seed = hexToRgb(SEED).map(srgbToLinear)
const [sL, sA, sB] = linearToOklab(seed)
const seedHue = (Math.atan2(sB, sA) * 180) / Math.PI
const seedChroma = Math.hypot(sA, sB)

/** 主色板：色相取自种子色，色度按 MD3 的克制程度收一点，避免大面积刺眼。 */
const PRIMARY = {
  hue: seedHue,
  // 主色板保留种子色的全部色度，逐级由色域裁剪收窄，品牌色才不会被「调淡」
  chroma: seedChroma,
}
const SECONDARY = { hue: seedHue, chroma: Math.min(seedChroma * 0.42, 0.075) }
const TERTIARY = { hue: (seedHue + 60) % 360, chroma: Math.min(seedChroma * 0.62, 0.115) }
const NEUTRAL = { hue: seedHue, chroma: 0.004 }
const NEUTRAL_VARIANT = { hue: seedHue, chroma: 0.013 }
const ERROR = { hue: 25, chroma: 0.185 }

/** 两个颜色线性混合：用来把高饱和的 tone-90 容器往底色上拉一点。 */
const mixHex = (a, b, t) => {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return rgbToHex(A.map((v, i) => v * (1 - t) + B[i] * t))
}

const tone = (palette, t) => oklchToHex(toneToL(t), palette.chroma, palette.hue)

const P = (t) => tone(PRIMARY, t)
const S = (t) => tone(SECONDARY, t)
const T = (t) => tone(TERTIARY, t)
const N = (t) => tone(NEUTRAL, t)
const NV = (t) => tone(NEUTRAL_VARIANT, t)
const E = (t) => tone(ERROR, t)

/** tone-90 的容器色在青色系里会偏荧光，这里统一往底色调和，保证是「淡彩」而不是「荧光」。 */
const soften = (color, darkBase, dark, amount = 0.42) => mixHex(color, dark ? darkBase : N(98), dark ? amount * 0.75 : amount)

function roles(mode) {
  const dark = mode === 'dark'
  return {
    /* 主色取 tone 45 而不是 MD3 默认的 40：种子色 #3d60f4 本身就在这一档，
       压到 40 会和品牌色差出一整级，看着像另一家。 */
    primary: dark ? P(80) : P(45),
    'on-primary': dark ? P(20) : P(100),
    'primary-container': soften(dark ? P(30) : P(90), N(6), dark, 0.5),
    'on-primary-container': dark ? P(90) : P(10),
    'primary-fixed': P(90),
    'primary-fixed-dim': P(80),
    'on-primary-fixed': P(10),
    'on-primary-fixed-variant': P(30),

    secondary: dark ? S(80) : S(40),
    'on-secondary': dark ? S(20) : S(100),
    'secondary-container': soften(dark ? S(30) : S(90), N(6), dark, 0.42),
    'on-secondary-container': dark ? S(90) : S(10),
    'secondary-fixed': S(90),
    'secondary-fixed-dim': S(80),
    'on-secondary-fixed': S(10),
    'on-secondary-fixed-variant': S(30),

    tertiary: dark ? T(80) : T(40),
    'on-tertiary': dark ? T(20) : T(100),
    'tertiary-container': soften(dark ? T(30) : T(90), N(6), dark, 0.42),
    'on-tertiary-container': dark ? T(90) : T(10),
    'tertiary-fixed': T(90),
    'tertiary-fixed-dim': T(80),
    'on-tertiary-fixed': T(10),
    'on-tertiary-fixed-variant': T(30),

    error: dark ? E(80) : E(40),
    'on-error': dark ? E(20) : E(100),
    'error-container': dark ? E(30) : E(90),
    'on-error-container': dark ? E(90) : E(10),

    background: dark ? N(6) : N(99),
    'on-background': dark ? N(90) : N(10),
    surface: dark ? N(6) : N(98),
    'on-surface': dark ? N(90) : N(10),
    'surface-variant': dark ? NV(30) : NV(90),
    'on-surface-variant': dark ? NV(80) : NV(30),
    'surface-dim': dark ? N(6) : N(87),
    'surface-bright': dark ? N(24) : N(98),
    'surface-container-lowest': dark ? N(4) : N(100),
    'surface-container-low': dark ? N(10) : N(96),
    'surface-container': dark ? N(12) : N(94),
    'surface-container-high': dark ? N(17) : N(92),
    'surface-container-highest': dark ? N(22) : N(90),

    'inverse-surface': dark ? N(90) : N(20),
    'inverse-on-surface': dark ? N(20) : N(95),
    'inverse-primary': dark ? P(40) : P(80),

    outline: dark ? NV(60) : NV(50),
    'outline-variant': dark ? NV(30) : NV(80),
    shadow: '#000000',
    scrim: '#000000',
    'surface-tint': dark ? P(80) : P(40),
  }
}

function block(selector, mode) {
  const entries = Object.entries(roles(mode))
    .map(([name, value]) => `  --md-sys-color-${name}: ${value};`)
    .join('\n')
  return `${selector} {\n  color-scheme: ${mode};\n${entries}\n}\n`
}

const css = `/*
 * 云术生存战争官网配色 —— Material Design 3 令牌。
 *
 * 由 scripts/gen-theme.mjs 从品牌种子色 ${SEED.toUpperCase()} 生成，请勿手改。
 * 结构令牌（形状 / 字阶 / 海拔 / 动效）由 @clderystd/m3-ui 提供，这里只注入颜色。
 *
 * 重新生成：node scripts/gen-theme.mjs '#3d60f4'
 */

${block(':root', 'light')}
${block('.dark', 'dark')}
`

const out = fileURLToPath(new URL('../src/theme/tokens.css', import.meta.url))
writeFileSync(out, css)
console.log('已生成', out)
console.log('seed', SEED, 'hue', seedHue.toFixed(1), 'chroma', seedChroma.toFixed(3))
console.log('primary(40)', P(40), 'primary-container(90)', P(90), 'surface(98)', N(98))
