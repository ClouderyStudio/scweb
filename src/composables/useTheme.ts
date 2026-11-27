import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

const STORAGE_KEY = 'scweb-theme'

const isDark = ref(false)

function apply(dark: boolean): void {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  // 地址栏配色跟着主题走；两套 theme-color 在 index.html 里写了媒体查询兜底
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) {
    meta.media = ''
    meta.content = dark ? '#131315' : '#3d60f4'
  }
}

function readStored(): boolean | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark') return true
    if (saved === 'light') return false
  } catch {
    /* 隐私模式下 localStorage 会抛错，忽略即可 */
  }
  return null
}

/**
 * 明暗主题切换。
 *
 * 首帧的主题由 index.html 里的内联脚本决定（避免闪白），这里只负责读取同一份状态、
 * 提供切换入口，并把选择写回 localStorage。
 */
export function useTheme() {
  let media: MediaQueryList | null = null

  const onSystemChange = (event: MediaQueryListEvent) => {
    // 只有用户没手动选过时才跟随系统
    if (readStored() === null) apply(event.matches)
  }

  onMounted(() => {
    const stored = readStored()
    apply(stored ?? document.documentElement.classList.contains('dark'))
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onSystemChange)
  })

  onBeforeUnmount(() => {
    media?.removeEventListener('change', onSystemChange)
  })

  function toggle(): void {
    const next = !isDark.value
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      /* 存不下就只在本次会话生效 */
    }
  }

  return { isDark: readonly(isDark), toggle }
}
