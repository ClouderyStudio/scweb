/**
 * 内容数据里用字符串写图标（'server'、'groups'…），这里一次性映射成组件。
 *
 * 好处是 data/site.ts 保持纯数据，换图标只改这张表；
 * m3-ui 的组件接收 IconComponent（任何渲染 <svg> 的 Vue 组件），所以直接传就行。
 */
import type { IconComponent } from '@clderystd/m3-ui'
import {
  IconBusiness,
  IconCampaign,
  IconChat,
  IconDownload,
  IconEdit,
  IconFavorite,
  IconGroups,
  IconLanguage,
  IconLayers,
  IconMail,
  IconMovie,
  IconPayments,
  IconPerson,
  IconPhoto,
  IconRocket,
  IconServer,
  IconSettings,
  IconShield,
  IconSmartphone,
  IconSmile,
  IconTerrain,
  IconThumbUp,
  IconVerified,
} from './index'

const registry: Record<string, IconComponent> = {
  server: IconServer,
  groups: IconGroups,
  terrain: IconTerrain,
  payments: IconPayments,
  shield: IconShield,
  settings: IconSettings,
  layers: IconLayers,
  favorite: IconFavorite,
  rocket: IconRocket,
  smile: IconSmile,
  download: IconDownload,
  thumb: IconThumbUp,
  chat: IconChat,
  mail: IconMail,
  person: IconPerson,
  movie: IconMovie,
  photo: IconPhoto,
  campaign: IconCampaign,
  business: IconBusiness,
  edit: IconEdit,
  language: IconLanguage,
  smartphone: IconSmartphone,
  verified: IconVerified,
}

/** 找不到就返回一个中性图标，避免整页因为一个笔误渲染成空白。 */
export function icon(name: string): IconComponent {
  return registry[name] ?? IconVerified
}
