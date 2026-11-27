/**
 * 把 m3-ui 的组件源码同步进 vendor/。
 *
 * 为什么不直接 alias 到 ../src/m3-ui-main：
 *   Vite 在转换外部目录的 .vue 时会就近读取那个目录的 tsconfig.json，
 *   而组件库的 tsconfig 继承了 @vue/tsconfig（它的 devDependency，本机没装），
 *   构建会直接在这里失败。把源码复制进项目内，就近读到的就是本项目的 tsconfig。
 *
 * 同时这也让站点自身可独立分发：vendor/ 里的内容随项目一起走。
 *
 * 更新组件库：node scripts/sync-m3-ui.mjs
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = fileURLToPath(new URL('../../src/m3-ui-main', import.meta.url))
const target = fileURLToPath(new URL('../vendor/m3-ui', import.meta.url))

if (!existsSync(source)) {
  console.error('找不到 m3-ui 仓库：', source)
  process.exit(1)
}

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })

cpSync(`${source}/src`, `${target}/src`, { recursive: true })
cpSync(`${source}/LICENSE`, `${target}/LICENSE`)

const pkg = JSON.parse(readFileSync(`${source}/package.json`, 'utf8'))
writeFileSync(
  `${target}/package.json`,
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      license: pkg.license,
      description: pkg.description,
      type: 'module',
      main: './src/index.ts',
      types: './src/index.ts',
    },
    null,
    2,
  ) + '\n',
)

writeFileSync(
  `${target}/README.md`,
  `# ${pkg.name} ${pkg.version}（vendored）

本目录由 \`node scripts/sync-m3-ui.mjs\` 从 https://github.com/ClouderyStudio/m3-ui 复制，
**不要手改**：改动请在组件库仓库里做，然后重新同步。

许可证：${pkg.license}
`,
)

console.log(`已同步 ${pkg.name}@${pkg.version} → vendor/m3-ui`)
