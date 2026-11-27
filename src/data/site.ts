/**
 * 站点内容。全部文案、链接、图片路径集中在这里，改内容不用动组件。
 *
 * 内容取自原站 index.html，逐条搬过来；原站里「#」这种占位链接改成明确的可选项，
 * 缺的（比如宣传片）保持为空，由组件决定显示空态而不是死链。
 */

export interface NavItem {
  id: string
  label: string
}

export interface FeatureItem {
  title: string
  text: string
  icon: string
}

export interface ServiceItem {
  title: string
  text: string
  icon: string
}

export interface Member {
  name: string
  role: string
  avatar?: string
  qq: string
}

export interface StatItem {
  value: number
  label: string
  icon: string
}

export interface SponsorList {
  title: string
  subtitle: string
  names: string[]
  featured?: boolean
}

export interface VoteItem {
  label: string
  count: number
  percent: number
}

export interface Work {
  src: string
  alt: string
}

export interface Testimonial {
  name: string
  gameName: string
  text: string
  avatar?: string
}

export interface Notice {
  title: string
  summary: string
  image?: string
  href?: string
  hrefLabel?: string
  entries?: { date: string; text: string }[]
}

export interface Partner {
  name: string
  logo: string
  note: string
}

export interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
}

/**
 * 图片走 Vite 资产管线：src/assets/img 下的 webp 会在构建时输出成
 * dist/assets/<name>-<hash>.webp，文件名带内容哈希。
 *
 * 为什么要这样：站点托管在 EdgeOne Pages，它给 /assets/* 的响应头是
 * `Cache-Control: public, max-age=31536000`，而 /img/* 是 `max-age=0, must-revalidate`
 * —— 放在 public/img 里的图片每次访问都要重新校验，30 个资源就是 30 次往返。
 * 挪进 assets 后回访命中一年缓存，一个请求都不发。
 */
const IMAGES = import.meta.glob('../assets/img/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function img(path: string): string {
  const url = IMAGES[`../assets/img/${path}.webp`]
  if (!url) throw new Error(`[site.ts] 找不到图片：${path}.webp`)
  return url
}

export const site = {
  name: '云术生存战争',
  fullName: '云术生存战争服务器',
  operator: '云术工作室',
  title: '云术生存战争服务器官网',
  description: '云术生存战争服务器官方网站：服务器介绍、特色玩法、管理组、玩家作品、官方公告与加入方式。',
  logoMark: img('logo-mark'),
  logoWide: img('logo-lockup'),
  heroImage: img('hero'),
  qqGroup: '706645329',
  qqGroupLink: 'https://qm.qq.com/q/krxlkaQHYe',
  ownerQQ: '2457483710',
  adminQQ: '953595252',
  email: 'admin@cldery.com',
  galleryUrl: 'https://a.cldery.com/xl/img/sc',
  docsUrl: 'https://doc.cldery.com/game/sc/',
  studioUrl: 'https://cldery.com',
  copyright: '© 2024 ClouderyStudio All Rights Reserved.',
  /** 宣传片地址；留空时宣传片区块显示「暂无」空态，不放假链接。 */
  promoVideo: '',
}

export const nav: NavItem[] = [
  { id: 'hero', label: '主页' },
  { id: 'feature', label: '服务器介绍' },
  { id: 'services', label: '特色' },
  { id: 'team', label: '管理组' },
  { id: 'sponsors', label: '感谢榜单' },
  { id: 'portfolio', label: '玩家作品' },
  { id: 'testimonials', label: '玩家留言' },
  { id: 'news', label: '官方公告' },
  { id: 'partners', label: '合作方' },
]

export const hero = {
  eyebrow: '由云术工作室运营',
  /** 标题按设计断成两行：中文没有词边界，交给浏览器断行会把「生存」劈开。 */
  titleLines: ['欢迎来到', '云术生存战争服务器'],
  text: '一个长期稳定运营的生存战争服：经济系统、领地保护、点对点传送，还有一群随时在线陪你开荒的玩家。',
  primary: { label: '了解服务器', href: '#services' },
  secondary: { label: '加入玩家群', href: site.qqGroupLink },
  imageCaption: '主城夜景 · 服务器实拍',
}

export const intro = {
  title: '赶快加入我们吧',
  lead: '我在云术等候您的到来',
  text: '赶快加入玩家群，进入服务器，开始您的冒险生存吧！',
  cta: { label: '加入玩家群', href: site.qqGroupLink },
  points: [
    {
      title: '高端的云服务器支持',
      text: 'E5-2667V2（3.6–4.0GHz）双核 vCPU 5G，防御 300G 单机 / 600G 集群。',
      icon: 'server',
    },
    { title: '高质量玩家陪伴', text: '玩家和谐友爱、共同进步。', icon: 'groups' },
    { title: '丰富精彩的世界', text: '一个丰富多彩的中心多样化主城。', icon: 'terrain' },
  ] satisfies FeatureItem[],
}

export const services = {
  title: '我们的特色',
  lead: `这是独属于我们的云术特色，赶快加入服务器吧！交流群 ${site.qqGroup}`,
  items: [
    {
      title: '特色经济系统',
      text: '为你提供一套完整的经济系统和交易体系，除了传统的玩家与官方商店的交易，我们还鼓励玩家互相交易。',
      icon: 'payments',
    },
    {
      title: '强大的管理体系',
      text: '服务器有着完善的服务器制度与优秀管理员信念的指导，给你一个和平安宁以及公平快乐的游戏环境。',
      icon: 'shield',
    },
    {
      title: '优越的服务器制度',
      text: '服务器采用社会主义并坚持社会主义核心价值观，明确以玩家为中心的发展思想，坚持全心全力为玩家奋斗的准则。',
      icon: 'settings',
    },
    {
      title: '稳定的服务器背景',
      text: '本服务器由云术工作室提供强力技术支持，从初开到现在已有丰富经验，深受玩家爱戴，有良好经济保障。',
      icon: 'layers',
    },
    {
      title: '高公益性',
      text: '服务器坚持公益的开放目的，不受利益性控制，坚持玩家之间和平交流、共同发展，走向美好光明的未来。',
      icon: 'favorite',
    },
    {
      title: '高配服务器支持',
      text: '本服务器采用 E5-2667V2（3.6–4.0GHz）双核 vCPU 5G，防御 300G 单机 / 600G 集群，为你的游玩提供极致体验。',
      icon: 'rocket',
    },
  ] satisfies ServiceItem[],
}

export const promo = {
  title: '服务器宣传片',
  text: '宣传片还在制作中，先去看看玩家们的作品吧。',
  image: img('hero'),
}

export const team = {
  title: '服务器管理组',
  lead: '感谢各个管理员的辛勤付出',
  members: [
    { name: '云术', role: '云术工作室室长，云术服务器服主', avatar: img('avatar/yushu'), qq: site.ownerQQ },
    { name: '信念', role: '云术工作室成员，云术服务器副服主', avatar: img('avatar/xinnian'), qq: site.adminQQ },
    { name: '薛宏辉', role: '技术测试员', qq: '1705593898' },
    { name: '睡神Julian', role: '特别资助人', avatar: img('avatar/shuishen'), qq: '3031952142' },
    { name: '枫璇夜の曲', role: '后台管理', avatar: img('avatar/fengxuanye'), qq: '2471258612' },
    { name: '火药当燃料', role: '社区列表管理', avatar: img('avatar/huoyao'), qq: '1258341177' },
    { name: 'Zero', role: '群聊代理', avatar: img('avatar/zero'), qq: '3014786442' },
    { name: '：）', role: '群聊管理', avatar: img('avatar/smiley'), qq: '2839964480' },
  ] satisfies Member[],
}

export const stats = {
  items: [
    { value: 200, label: '注册玩家数量', icon: 'groups' },
    { value: 10, label: '玩家好评数量', icon: 'smile' },
    { value: 200, label: '服务端下载量', icon: 'download' },
    { value: 100, label: '玩家点赞数量', icon: 'thumb' },
  ] satisfies StatItem[],
}

export const sponsors = {
  title: '感谢榜单',
  lead: '感谢以下个人和群体为本服务器做出的贡献',
  lists: [
    {
      title: '技术类',
      subtitle: '软件硬件方面',
      names: ['云术工作室', '生存战争中文社区', '34', '枫璇夜の曲', '无', '无'],
    },
    {
      title: '资金类',
      subtitle: '金钱方面',
      names: ['睡神Julian', '信念', '苟偶成', '安（114514Allen）', '玛卡巴子', '无'],
      featured: true,
    },
    {
      title: '游戏类',
      subtitle: '服务游戏方面',
      names: ['信念 — 出色管理', '薛宏辉 — bug 测试', '无', '无', '无', '无'],
    },
  ] satisfies SponsorList[],
}

export const satisfaction = {
  title: '服务器满意度统计',
  lead: '数据来自玩家回访，样本偏小，仅作参考。',
  image: img('satisfaction'),
  votes: [
    { label: '满意', count: 7, percent: 70 },
    { label: '还行', count: 2, percent: 20 },
    { label: '不满意', count: 1, percent: 10 },
  ] satisfies VoteItem[],
}

export const portfolio = {
  title: '玩家作品',
  lead: '玩家创造的优秀作品会放在此处展示，投稿作品直接联系服主或副服主即可。最后更新于 2024 年 6 月。',
  works: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: img(`portfolio/${n}`),
    alt: `玩家作品 ${n}`,
  })) satisfies Work[],
}

export const testimonials = {
  title: '玩家留言',
  lead: '他们的原话，一个字都没改。',
  items: [
    { name: '一梦十世纪', gameName: '一梦十世纪', text: '善', avatar: img('avatar/yimeng') },
    { name: '1XC0', gameName: '1XC0', text: '善', avatar: img('avatar/1xc0') },
    { name: '火药当燃料', gameName: '火药当燃料', text: '善', avatar: img('avatar/huoyao-msg') },
    { name: '薛宏辉', gameName: '薛宏辉', text: '善' },
    { name: 'LGX', gameName: 'LGX', text: '善', avatar: img('avatar/lgx') },
  ] satisfies Testimonial[],
}

export const news = {
  title: '官方公告',
  lead: '最新的服务器公告与活动通知都会发在这里，也请关注交流群获取一手信息。',
  notices: [
    {
      title: '服务器规则',
      summary:
        '服务器内禁止违规行为！如开挂、买卖外挂、卡服、破坏地形和他人建筑、辱骂他人、故意寻衅滋事、偷东西、造谣诋毁等。',
      image: img('notice/1'),
      href: site.docsUrl,
      hrefLabel: '了解详情',
    },
    {
      title: '指令帮助',
      summary:
        '在聊天框输入指令并发送，指令前必须加「/」：/help 查看所有指令，/spawn 快速回城，/money 查看经济指令，/ys 查看小功能指令，/home 查看设家指令。',
      image: img('notice/2'),
    },
    {
      title: '温馨提示',
      summary:
        '避免不必要的损失！没有领地石的玩家下线时把东西藏好或带在身上退出，自己管理不当导致丢失概不负责。主城门口的新手岛禁止放领地石，放领地石时请注意与其他玩家领地石的间距，防止因过近而不生效。',
      image: img('notice/3'),
    },
    {
      title: '事件',
      summary: '',
      entries: [
        { date: '2024.6.15', text: '服务器更换新存档，感谢 34 提供部分插件' },
        { date: '2024.6.21', text: '有人用活塞卡服，禁用活塞' },
        { date: '2024.11.30', text: '服务器修改经营策略，热烈迎接枫璇夜の曲到来' },
      ],
    },
    {
      title: '其他',
      summary:
        '信念牌点对点传送：还在因为和朋友离得太远而懒得走？点对点传送解君愁，把你直接送到朋友身边！每次传送费用 300 云术币，传送必须双方都同意，短时间内不可多吃传送。需要办理速速找信念！',
    },
  ] satisfies Notice[],
}

export const partners = {
  title: '合作方',
  lead: '合作方会在这里展示，需要合作的请联系服主。',
  items: [
    { name: '云术工作室', logo: img('logo-mark'), note: '服务器运营与技术支持' },
  ] satisfies Partner[],
}

export const contact = {
  title: '联系我们',
  lead: '赶快通过下面的方式加入我们吧，我们在云术等您的到来！',
  form: {
    title: '给服主留言',
    text: '留言会显示在玩家留言区（需接入后端），也可以在交流群里直接找管理。',
    submit: '提交留言',
    fields: {
      name: '您的游戏名称',
      email: '您的电子邮箱',
      subject: '留言标题',
      message: '留言内容',
    },
  },
  channels: [
    { icon: 'chat', label: '官方玩家 QQ 交流群', value: site.qqGroup, href: site.qqGroupLink },
    { icon: 'mail', label: '意见投稿邮箱', value: site.email, href: `mailto:${site.email}` },
    {
      icon: 'person',
      label: '服主 / 副服主 QQ',
      value: `${site.ownerQQ} / ${site.adminQQ}`,
    },
  ] satisfies ContactItem[],
}
