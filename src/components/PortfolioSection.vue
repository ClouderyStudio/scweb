<script setup lang="ts">
import { computed, ref } from 'vue'
import { M3Button, M3Dialog, M3Icon, vReveal } from '@clderystd/m3-ui'
import { IconOpenInNew, IconPhoto } from '@/icons'
import { portfolio, site } from '@/data/site'

const activeIndex = ref(-1)
const open = computed({
  get: () => activeIndex.value >= 0,
  set: (value: boolean) => {
    if (!value) activeIndex.value = -1
  },
})

const active = computed(() => (activeIndex.value >= 0 ? portfolio.works[activeIndex.value] : undefined))
</script>

<template>
  <section id="portfolio" class="section section--low">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">社区创作</span>
        <h2 class="t-headline">{{ portfolio.title }}</h2>
        <p class="section-head__lead">{{ portfolio.lead }}</p>
        <M3Button
          :href="site.galleryUrl"
          target="_blank"
          rel="noopener"
          variant="outlined"
          :icon="IconPhoto"
          :trailing-icon="IconOpenInNew"
        >
          点我查看全部作品
        </M3Button>
      </header>

      <div class="grid grid--works">
        <button
          v-for="(work, i) in portfolio.works"
          :key="work.src"
          v-reveal="{ delay: 50 * ((i % 3) + 1) }"
          type="button"
          class="work"
          :aria-label="`放大查看${work.alt}`"
          @click="activeIndex = i"
        >
          <img :src="work.src" :alt="work.alt" width="1000" height="562" loading="lazy" />
          <span class="work__tag">
            <M3Icon :icon="IconPhoto" :size="16" />
            {{ work.alt }}
          </span>
        </button>
      </div>
    </div>
  </section>

  <M3Dialog v-model="open" :title="active?.alt">
    <div v-if="active" class="lightbox">
      <img :src="active.src" :alt="active.alt" />
      <M3Button
        :href="site.galleryUrl"
        target="_blank"
        rel="noopener"
        variant="text"
        :trailing-icon="IconOpenInNew"
      >
        在作品库里看全部
      </M3Button>
    </div>
  </M3Dialog>
</template>

<style scoped>
.work {
  display: block;
  width: 100%;
  text-align: left;
  color: inherit;
  font: inherit;
}
</style>
