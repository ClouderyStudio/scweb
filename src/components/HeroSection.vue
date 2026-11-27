<script setup lang="ts">
import { M3Button, M3Chip, vReveal } from '@clderystd/m3-ui'
import { IconArrowForward, IconOpenInNew } from '@/icons'
import { hero, site } from '@/data/site'
</script>

<template>
  <section id="hero" class="hero">
    <div class="section__inner">
      <div class="hero__grid">
        <div class="hero__copy">
          <span v-reveal class="eyebrow">{{ hero.eyebrow }}</span>
          <h1 v-reveal="{ delay: 60 }" class="t-display hero__title">
            <span v-for="line in hero.titleLines" :key="line">{{ line }}</span>
          </h1>
          <p v-reveal="{ delay: 120 }" class="hero__text">{{ hero.text }}</p>

          <div v-reveal="{ delay: 180 }" class="hero__actions">
            <M3Button :href="hero.primary.href" :trailing-icon="IconArrowForward" size="lg">
              {{ hero.primary.label }}
            </M3Button>
            <M3Button
              :href="hero.secondary.href"
              target="_blank"
              rel="noopener"
              variant="tonal"
              size="lg"
              :trailing-icon="IconOpenInNew"
            >
              {{ hero.secondary.label }}
            </M3Button>
          </div>

          <div v-reveal="{ delay: 240 }" class="hero__chips">
            <M3Chip label="长期稳定运营" variant="assist" />
            <M3Chip label="纯公益开放" variant="assist" />
            <M3Chip label="E5 双核 5G" variant="assist" />
          </div>
        </div>

        <figure v-reveal="{ delay: 120, blur: true }" class="hero__figure">
          <img
            :src="site.heroImage"
            :alt="`${site.fullName}主城夜景截图`"
            width="1600"
            height="900"
            fetchpriority="high"
          />
          <div class="media-veil" aria-hidden="true" />
          <figcaption class="media-caption">{{ hero.imageCaption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
