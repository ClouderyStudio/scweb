<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { M3Fab } from '@clderystd/m3-ui'
import { IconArrowUp } from '@/icons'

const visible = ref(false)

function onScroll(): void {
  visible.value = window.scrollY > 600
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function toTop(): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition name="fab">
    <div v-if="visible" class="to-top">
      <M3Fab :icon="IconArrowUp" label="回到顶部" variant="primary" @click="toTop" />
    </div>
  </Transition>
</template>

<style scoped>
.fab-enter-active,
.fab-leave-active {
  transition:
    opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized-decelerate);
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
}
</style>
