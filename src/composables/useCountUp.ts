import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 数字滚动。统计区块滚进视口时从 0 数到目标值。
 *
 * 用 requestAnimationFrame 而不是 CSS：数字是文本，只能逐帧改；
 * 缓动收尾放慢（ease-out cubic），才不像在「冲」。
 * 系统开了「减弱动态效果」就直接给结果——数字滚动对这部分用户只是干扰。
 */
export function useCountUp(target: number, duration = 1400) {
  const value = ref(0)
  const el = ref<HTMLElement | null>(null)
  let frame = 0
  let observer: IntersectionObserver | null = null

  const reduceMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function run(): void {
    if (reduceMotion()) {
      value.value = target
      return
    }
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      value.value = Math.round((1 - (1 - progress) ** 3) * target)
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined' || !el.value) {
      value.value = target
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        run()
        observer?.disconnect()
        observer = null
      },
      { threshold: 0.4 },
    )
    observer.observe(el.value)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    observer?.disconnect()
  })

  return { value, el }
}
