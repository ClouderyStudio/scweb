<script setup lang="ts">
import { M3Button, M3Card, M3Chip, vReveal } from '@clderystd/m3-ui'
import { IconCampaign, IconOpenInNew } from '@/icons'
import { news } from '@/data/site'

const withImage = news.notices.filter((n) => n.image)
const textOnly = news.notices.filter((n) => !n.image)
</script>

<template>
  <section id="news" class="section">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">公告</span>
        <h2 class="t-headline">{{ news.title }}</h2>
        <p class="section-head__lead">{{ news.lead }}</p>
      </header>

      <div class="grid grid--3">
        <M3Card
          v-for="(notice, i) in withImage"
          :key="notice.title"
          v-reveal="{ delay: 60 * (i + 1) }"
          variant="elevated"
          class="notice"
        >
          <img
            class="notice__image"
            :src="notice.image"
            :alt="`${notice.title}配图`"
            width="900"
            height="506"
            loading="lazy"
          />
          <div class="notice__body">
            <h3 class="notice__title">{{ notice.title }}</h3>
            <p class="notice__text">{{ notice.summary }}</p>
            <M3Button
              v-if="notice.href"
              class="md-button--inline"
              :href="notice.href"
              target="_blank"
              rel="noopener"
              variant="tonal"
              size="sm"
              :trailing-icon="IconOpenInNew"
            >
              {{ notice.hrefLabel ?? '了解详情' }}
            </M3Button>
          </div>
        </M3Card>
      </div>

      <div class="grid grid--2 news-extra">
        <M3Card
          v-for="(notice, i) in textOnly"
          :key="notice.title"
          v-reveal="{ delay: 80 * (i + 1) }"
          variant="outlined"
          class="notice"
        >
          <div class="notice__body">
            <div class="notice__head">
              <M3Chip :label="notice.title" variant="assist" :icon="IconCampaign" />
            </div>
            <p v-if="notice.summary" class="notice__text">{{ notice.summary }}</p>
            <div v-if="notice.entries" class="notice__entries">
              <div v-for="entry in notice.entries" :key="entry.date" class="notice__entry">
                <span class="notice__date">{{ entry.date }}</span>
                <span>{{ entry.text }}</span>
              </div>
            </div>
          </div>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.notice {
  height: 100%;
  overflow: hidden;
}

.notice__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: clamp(18px, 2vw, 24px);
  flex: 1;
}

.notice__title {
  font-size: var(--md-sys-typescale-title-medium-size);
  font-weight: 650;
}

.news-extra {
  margin-top: var(--site-gap);
}
</style>
