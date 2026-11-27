<script setup lang="ts">
import { M3Button, M3Icon, vReveal } from '@clderystd/m3-ui'
import { IconOpenInNew } from '@/icons'
import { icon as resolveIcon } from '@/icons/registry'
import { intro } from '@/data/site'
</script>

<template>
  <section id="feature" class="section section--primary">
    <div class="section__inner">
      <div class="split">
        <div v-reveal class="intro__copy">
          <span class="eyebrow">服务器介绍</span>
          <h2 class="t-headline intro__title">{{ intro.title }}</h2>
          <p class="intro__lead">{{ intro.lead }}</p>
          <p class="intro__text">{{ intro.text }}</p>
          <M3Button
            :href="intro.cta.href"
            target="_blank"
            rel="noopener"
            variant="elevated"
            size="lg"
            :trailing-icon="IconOpenInNew"
          >
            {{ intro.cta.label }}
          </M3Button>
        </div>

        <ul class="intro__points">
          <li
            v-for="(point, i) in intro.points"
            :key="point.title"
            v-reveal="{ delay: 80 * (i + 1) }"
            class="point"
          >
            <span class="icon-badge icon-badge--on-primary">
              <M3Icon :icon="resolveIcon(point.icon)" :size="26" />
            </span>
            <span>
              <span class="point__title">{{ point.title }}</span>
              <span class="point__text">{{ point.text }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.intro__title {
  max-width: 20ch;
}

.intro__lead {
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: 1.6;
  font-weight: 500;
  color: color-mix(in srgb, var(--md-sys-color-on-primary) 88%, transparent);
  max-width: 24ch;
  margin-top: -6px;
}

.intro__text {
  max-width: 44ch;
  font-size: var(--md-sys-typescale-body-large-size);
  line-height: 1.72;
  color: color-mix(in srgb, var(--md-sys-color-on-primary) 86%, transparent);
}

.intro__points {
  display: flex;
  flex-direction: column;
  gap: 22px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 三条要点竖排，中间用细线隔开，比三张卡片更轻 */
.intro__points li + li {
  padding-top: 22px;
  border-top: 1px solid color-mix(in srgb, var(--md-sys-color-on-primary) 18%, transparent);
}

.point__title,
.point__text {
  display: block;
}

.point__title {
  color: var(--md-sys-color-on-primary);
}
</style>
