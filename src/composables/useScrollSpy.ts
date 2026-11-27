import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 滚动定位当前区块，用来高亮导航。
 *
 * 用「哪个区块的顶部越过了视口中线」判断，而不是 IntersectionObserver 的阈值：
 * 区块高度差得很多（首屏很高、合作方只有一行），按比例阈值会在长区块上卡住不动。
 */
export function useScrollSpy(ids: string[]) {
  const active = ref(ids[0] ?? '')
  let ticking = false

  function measure(): void {
    ticking = false
    const line = window.innerHeight * 0.35
    let current = ids[0] ?? ''
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= line) current = id
    }
    // 滚到底了就把最后一个区块点亮，否则最后一节永远选不中
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = ids[ids.length - 1] ?? current
    }
    active.value = current
  }

  function onScroll(): void {
    if (ticking) return
    ticking = true
    requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { active }
}
