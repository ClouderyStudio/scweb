<script setup lang="ts">
import { ref } from 'vue'
import { M3Avatar, M3Card, M3IconButton, vReveal } from '@clderystd/m3-ui'
import { IconChevronLeft, IconChevronRight } from '@clderystd/m3-ui'
import { testimonials } from '@/data/site'

const track = ref<HTMLElement | null>(null)

function step(direction: -1 | 1): void {
  const el = track.value
  if (!el) return
  const card = el.firstElementChild as HTMLElement | null
  const distance = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
  el.scrollBy({ left: direction * distance, behavior: 'smooth' })
}
</script>

<template>
  <section id="testimonials" class="section section--container testimonials">
    <div class="section__inner">
      <header v-reveal class="section-head">
        <span class="eyebrow">玩家留言</span>
        <h2 class="t-headline">{{ testimonials.title }}</h2>
        <p class="section-head__lead">{{ testimonials.lead }}</p>
      </header>

      <div ref="track" class="testimonials__track" tabindex="0" aria-label="玩家留言，可左右滚动">
        <M3Card
          v-for="(item, i) in testimonials.items"
          :key="item.name"
          v-reveal="{ delay: 50 * ((i % 3) + 1) }"
          variant="elevated"
          class="quote-card"
        >
          <div class="quote">
            <p class="quote__text">「{{ item.text }}」</p>
            <div class="quote__who">
              <M3Avatar :src="item.avatar" :name="item.name" :alt="item.name" :size="44" ring />
              <span>
                <span class="quote__name">{{ item.name }}</span>
                <span class="quote__game">游戏名称：{{ item.gameName }}</span>
              </span>
            </div>
          </div>
        </M3Card>
      </div>

      <div class="testimonials__nav">
        <M3IconButton :icon="IconChevronLeft" label="上一条留言" variant="tonal" @click="step(-1)" />
        <M3IconButton :icon="IconChevronRight" label="下一条留言" variant="tonal" @click="step(1)" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-card {
  scroll-snap-align: start;
  height: 100%;
}

.quote__game {
  display: block;
}
</style>
