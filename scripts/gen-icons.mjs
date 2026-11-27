/**
 * 从 @iconify-json/material-symbols 里挑出站点用到的图标，生成 src/icons/index.ts。
 *
 * 为什么不在运行时依赖图标库：m3-ui 的 IconComponent 只要求「是个渲染 <svg> 的
 * Vue 组件」，图标库不绑定。站点只用到二十来个图标，把它们编译成内联 SVG，
 * 产物里就不必带几十万个图标的 JSON，也不用额外请求字体或 CDN。
 *
 * 用法：node scripts/gen-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const data = JSON.parse(
  readFileSync(require.resolve('@iconify-json/material-symbols/icons.json'), 'utf8'),
)

/** 站点用到的图标，键是导出名，值是 Material Symbols 里的图标名。 */
const ICONS = {
  IconMenu: 'menu',
  IconClose: 'close',
  IconLightMode: 'light-mode',
  IconDarkMode: 'dark-mode',
  IconArrowUp: 'arrow-upward',
  IconArrowForward: 'arrow-forward',
  IconOpenInNew: 'open-in-new',
  IconGroups: 'groups',
  IconPerson: 'person',
  IconVerified: 'verified',
  IconServer: 'dns',
  IconRocket: 'rocket-launch',
  IconLayers: 'layers',
  IconSettings: 'settings',
  IconSmartphone: 'smartphone',
  IconBusiness: 'business-center',
  IconEdit: 'edit',
  IconMovie: 'movie',
  IconPlay: 'play-arrow',
  IconDownload: 'download',
  IconThumbUp: 'thumb-up',
  IconSmile: 'sentiment-satisfied',
  IconChat: 'forum',
  IconMail: 'mail',
  IconLanguage: 'language',
  IconPhoto: 'photo-library',
  IconCampaign: 'campaign',
  IconFavorite: 'favorite',
  IconShield: 'shield-person',
  IconPayments: 'payments',
  IconGesture: 'gesture',
  IconTerrain: 'landscape',
  IconExpandMore: 'expand-more',
}

const missing = Object.entries(ICONS).filter(([, name]) => !data.icons[name] && !data.aliases?.[name])
if (missing.length) {
  console.error('图标不存在：', missing.map(([k, v]) => `${k}(${v})`).join(', '))
  process.exit(1)
}

const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '')

const entries = Object.entries(ICONS).map(([exportName, iconName]) => {
  const body = data.icons[iconName]?.body ?? data.icons[data.aliases[iconName].parent].body
  const width = data.icons[iconName]?.width ?? 24
  const height = data.icons[iconName]?.height ?? 24
  return `/** Material Symbols: ${iconName} */
export const ${exportName} = svg('${escape(body)}', '${exportName}', ${width}, ${height})`
})

const source = `/*
 * 站点图标集 —— 由 scripts/gen-icons.mjs 生成，请勿手改。
 *
 * 全部是 Material Symbols 的官方路径，编译成内联 SVG 函数式组件。
 * m3-ui 的组件接收任意渲染 <svg> 的 Vue 组件，所以这里不需要图标库运行时。
 */
import { h, type FunctionalComponent } from 'vue'

function svg(body: string, name: string, width: number, height: number): FunctionalComponent {
  const component: FunctionalComponent = () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: \`0 0 \${width} \${height}\`,
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': 'true',
        focusable: 'false',
        innerHTML: body,
      },
    )
  component.displayName = name
  return component
}

${entries.join('\n\n')}
`

const out = fileURLToPath(new URL('../src/icons/index.ts', import.meta.url))
writeFileSync(out, source)
console.log('已生成', out, '共', entries.length, '个图标')
