# 云术生存战争官网 · m3-ui 重写版

原站（`scweb`）是 Bootstrap 4 + jQuery + 一堆轮播/灯箱插件拼起来的静态页：`index.html` 一个文件一千行，
样式靠 `main.css` 里几万字符的压缩 CSS，交互靠 owl.carousel、mixitup、magnific-popup 等 8 个插件。

这个版本用 **Vue 3 + [@clderystd/m3-ui](https://github.com/ClouderyStudio/m3-ui)** 重写：
内容一字不改地搬过来，界面换成 Material Design 3 的组件与令牌，交互全部由组件库自己实现，
运行时不依赖 jQuery / Bootstrap / 任何插件。

## 跑起来

```bash
pnpm install
pnpm dev        # http://127.0.0.1:5190
pnpm build      # 产物在 dist/
pnpm preview    # 预览构建产物 http://127.0.0.1:4173
pnpm test       # 构建产物的冒烟测试（jsdom，17 项）
pnpm shots      # 各区块截图到 /tmp/shots（需要 playwright chromium）
```

## 目录

```
src/
  App.vue                 页面骨架，按区块拼装
  data/site.ts            所有文案、链接、图片路径（改内容只动这里）
  components/
    SiteAppBar.vue        顶栏：导航 + 深色模式 + 移动端抽屉
    HeroSection.vue       首屏
    IntroSection.vue      服务器介绍（主色色块）
    ServicesSection.vue   我们的特色 6 条
    PromoSection.vue      宣传片（没有片源时给空态，不放死链）
    TeamSection.vue       管理组 8 人
    StatsSection.vue      玩家统计（滚入视口时数字滚动）
    SponsorsSection.vue   感谢榜单 3 列
    SatisfactionSection.vue  满意度进度条
    PortfolioSection.vue  玩家作品 + 灯箱
    TestimonialsSection.vue  玩家留言横向滑动
    NewsSection.vue       官方公告
    PartnersSection.vue   合作方
    ContactSection.vue    留言表单 + 联系渠道
    SiteFooter.vue        页脚
    BackToTop.vue         回到顶部 FAB
  theme/tokens.css        配色令牌（生成，勿手改）
  theme/site.css          布局与排版
  icons/index.ts          图标（生成，勿手改）
  assets/img/*.webp       图片（由 prepare-assets.py 生成，走 Vite 资产管线）
scripts/
  gen-theme.mjs           从种子色生成 MD3 配色
  gen-icons.mjs           从 Material Symbols 里抽站点要用的图标
  prepare-assets.py       压缩图片（转 WebP）、抓 QQ 头像
  sync-m3-ui.mjs          同步组件库源码到 vendor/
  smoke.mjs               冒烟测试
vendor/m3-ui/             组件库源码副本（生成，勿手改）
public/favicon.png        站点图标（唯一留在 public 的图片）
```

## 关键决定

**配色由品牌色生成。** `scripts/gen-theme.mjs` 把墨青 `#0f766e` 当种子，
按 MD3 的「色调 → 角色」规则生成明暗两套 `--md-sys-color-*`：主色取 tone 45，
其余角色按 40/90/10 等标准档位取，逐档做 sRGB 色域裁剪。
tone-90 的容器色在青色相里天然偏荧光，所以生成时会把 `*-container` 往底色上混 42%
（主容器 50%），出的是淡彩而不是荧光色块。改品牌色只需：

```bash
node scripts/gen-theme.mjs '#0a84ff'
```

大面积色块没有直接铺 `primary`，而是用 `site.css` 里的 `--site-ink`（墨青 `#08302e`）
配 `--site-on-ink`，白字对比度 12.6:1；区块内的文字/徽记仍然读 `--md-sys-color-on-primary`，
所以组件不用改一行。

**结构令牌全部来自组件库。** 圆角、字阶、海拔、动效用的是 `--md-sys-*`，
所以暗色模式不需要第二套样式表；`theme/site.css` 里没有一处写死的颜色（少量图片上的白色蒙层除外）。

**图标编译进产物。** 组件库的 `IconComponent` 只要求「是个渲染 `<svg>` 的 Vue 组件」。
站点只用到 33 个 Material Symbols 图标，`gen-icons.mjs` 把它们抽成内联 SVG，
产物里不带几十万个图标的 JSON，也不发额外请求。

**图片本地化并压缩。** 原站图片走 `oss.cldery.com` 外链，且是 1920×1080 的原图（单张 1MB）。
这里按实际显示宽度重编码，11MB → 0.6MB；QQ 头像也抓到本地，避免首屏被第三方域名拖住。

**Logo 是设计稿里抠出来的。** 拿到的是带粉色渐变底的 400×400 PNG，脚本按「与背景差异 + 粉色判据」
把底去掉，留下带白描边的透明 WebP：页脚用完整字标 `logo-lockup.webp`（658×246），
顶栏和 favicon 用同一套笔画的「云」字方块 `logo-mark.webp`（字标缩到 40px 会糊成一团）。
换 logo 时重跑一次抠图脚本即可，不要直接把带底的图丢进 `public/`。

**图片放 `src/assets` 而不是 `public`，是为了拿长缓存。** 站点托管在 EdgeOne Pages，
它给 `/assets/*` 的响应头是 `Cache-Control: public, max-age=31536000`，给 `/img/*` 的却是
`max-age=0, must-revalidate`。图片放进 `public/img` 时，每次访问都要为 20 多张图各发一次
条件请求，回访等于重下一次；交给 Vite 资产管线（`src/assets/img` + `import.meta.glob`）
后文件名带内容哈希、落到 `/assets/`，回访命中一年缓存，图片请求归零。
新增图片：丢进 `src/assets/img/`，在 `site.ts` 里用 `img('xxx')` 引用即可。

**表单说真话。** 原站的留言表单没有后端，点提交什么都不会发生。新版仍然不接后端，
但会明确告诉用户「还没接入，请到交流群找管理」，而不是假装成功。

**m3-ui 以源码形式放在 `vendor/`。** 组件库只发布了 `dist`，手机环境里重新 build 很慢；
放进项目内既能直接编译 `.vue`，也能避免 Vite 就近读到组件库自己的 `tsconfig.json`
（它继承了没装的 `@vue/tsconfig`，会让构建直接失败）。更新组件库：

```bash
node scripts/sync-m3-ui.mjs
```

## 原站 → 新版对照

| 原站 | 新版 |
| --- | --- |
| Bootstrap navbar + slicknav | `M3TopAppBar` + `M3Sheet` 抽屉 |
| `.btn btn-common` | `M3Button`（filled / tonal / elevated / outlined） |
| 卡片 + hover 阴影 | `M3Card`（elevated / filled / outlined，自带按压反馈） |
| owl.carousel | CSS scroll-snap + `M3IconButton` 翻页 |
| magnific-popup 灯箱 | `M3Dialog` |
| jquery.counterup | `requestAnimationFrame` 数字滚动（尊重 `prefers-reduced-motion`） |
| wow.js 入场动画 | 组件库的 `v-reveal` 指令 |
| form-validator | 组件内校验 + `M3TextField` 错误态 + `M3SnackbarHost` 提示 |
| 回到顶部 jquery 脚本 | `M3Fab` + 滚动监听 |
| 无暗色模式 | 跟随系统，可手动切换并记忆（墨青在深色下自动提亮） |
| 图片外链 + 1MB 原图 | 本地化 + WebP（1.07MB → 0.58MB）+ 内容哈希长缓存 |

## 已知取舍

- **宣传片**：原站视频链接（百度静态 mp4）早已失效，`site.promoVideo` 留空，
  区块显示「暂无」空态并提供去玩家作品的入口。拿到片源后填进去即可播放。
- **留言表单**：没有后端，提交只会给提示。要真能用，在 `ContactSection.vue` 的 `submit()` 里换成真实请求。
- **满意度数据**：原站 70%/20%/10% 的进度条宽度写的是 20%/30%/40%，对不上；
  新版按百分比渲染，数量与百分比保持一致。
- **管理组头像**：其中一位的 QQ 头像返回的是纯白图，改为首字母兜底（`M3Avatar` 自带）。
- **背景音乐播放器**：原站用 `xf-MusicPlayer`，脚本从 `oss.cldery.com` 加载，该域名现在打不开，
  新版没有接入。需要的话在 `App.vue` 里挂一个 `<audio>` 组件即可。
- **页脚社交图标**：原模板的 facebook / twitter / instagram / linkedin 全是 `#` 占位，
  新版换成 QQ 群、邮箱、服务器文档三个真实入口。
- **外部链接**：玩家作品库（`a.cldery.com`）和服务器文档（`doc.cldery.com`）仍指向原地址。

## 许可证

组件库 m3-ui 为 AGPL-3.0（`vendor/m3-ui/LICENSE`）。站点内容版权归云术工作室所有。
