<script setup lang="ts">
import { M3Card, M3Icon, vReveal } from '@clderystd/m3-ui'
import { IconFavorite } from '@/icons'
import { sponsors } from '@/data/site'

const isEmpty = (name: string) => name === '无'
</script>

<template>
  <section id="sponsors" class="section section--low">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">致谢</span>
        <h2 class="t-headline">{{ sponsors.title }}</h2>
        <p class="section-head__lead">{{ sponsors.lead }}</p>
      </header>

      <div class="grid grid--3">
        <M3Card
          v-for="(list, i) in sponsors.lists"
          :key="list.title"
          v-reveal="{ delay: 70 * (i + 1) }"
          :variant="list.featured ? 'filled' : 'elevated'"
          :class="['sponsor', { 'sponsor--featured': list.featured }]"
        >
          <div class="sponsor__head">
            <span class="sponsor__title">{{ list.title }}</span>
            <M3Icon v-if="list.featured" :icon="IconFavorite" :size="20" />
          </div>
          <span class="sponsor__subtitle">{{ list.subtitle }}</span>

          <ul class="sponsor__list">
            <li
              v-for="(name, index) in list.names"
              :key="name + index"
              class="sponsor__row"
              :class="{ 'is-empty': isEmpty(name) }"
            >
              <span class="sponsor__index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ name }}</span>
            </li>
          </ul>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sponsor {
  height: 100%;
}

.sponsor__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sponsor--featured {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
</style>
