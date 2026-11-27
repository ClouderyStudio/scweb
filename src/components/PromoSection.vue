<script setup lang="ts">
import { ref } from 'vue'
import { M3Button, M3Dialog, M3Icon, vReveal } from '@clderystd/m3-ui'
import { IconPhoto, IconPlay } from '@/icons'
import { promo, site } from '@/data/site'

const open = ref(false)

function jumpToWorks(): void {
  open.value = false
  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="section promo-section">
    <div class="section__inner">
      <div v-reveal="{ blur: true }" class="promo">
        <img class="promo__image" :src="promo.image" alt="" aria-hidden="true" />
        <div class="promo__scrim" aria-hidden="true" />
        <div class="promo__inner">
          <button type="button" class="promo__play" aria-label="播放服务器宣传片" @click="open = true">
            <M3Icon :icon="IconPlay" :size="30" />
          </button>
          <h2 class="promo__title">{{ promo.title }}</h2>
          <p class="promo__text">{{ promo.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <M3Dialog v-model="open" title="服务器宣传片">
    <div v-if="site.promoVideo" class="promo-video">
      <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -->
      <video :src="site.promoVideo" controls autoplay playsinline />
    </div>
    <div v-else class="promo-empty">
      <p>宣传片还没做好，暂时没有可以播放的内容。先去看看玩家们的作品吧。</p>
      <div class="promo-empty__actions">
        <M3Button :icon="IconPhoto" variant="tonal" @click="jumpToWorks">查看玩家作品</M3Button>
        <M3Button :href="site.qqGroupLink" target="_blank" rel="noopener">加入玩家群</M3Button>
      </div>
    </div>
  </M3Dialog>
</template>

<style scoped>
.promo-video video {
  width: 100%;
  border-radius: var(--md-sys-shape-corner-medium);
  background: #000;
}

.promo-empty {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: var(--md-sys-typescale-body-medium-size);
  line-height: 1.7;
  color: var(--md-sys-color-on-surface-variant);
}

.promo-empty__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.promo-section {
  background-color: var(--md-sys-color-surface);
}
</style>
