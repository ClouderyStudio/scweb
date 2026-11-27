<script setup lang="ts">
import { M3Card, M3Icon, vReveal } from '@clderystd/m3-ui'
import { icon as resolveIcon } from '@/icons/registry'
import { partners, site } from '@/data/site'
</script>

<template>
  <section id="partners" class="section section--low">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">合作</span>
        <h2 class="t-headline">{{ partners.title }}</h2>
        <p class="section-head__lead">{{ partners.lead }}</p>
      </header>

      <div class="grid grid--2">
        <M3Card
          v-for="(partner, i) in partners.items"
          :key="partner.name"
          v-reveal="{ delay: 80 * (i + 1) }"
          variant="elevated"
          interactive
          :href="site.studioUrl"
          target="_blank"
          rel="noopener"
        >
          <div class="partner">
            <img :src="partner.logo" :alt="`${partner.name}标志`" width="64" height="64" loading="lazy" />
            <span>
              <span class="t-title">{{ partner.name }}</span>
              <span class="partner__note">{{ partner.note }}</span>
            </span>
            <M3Icon :icon="resolveIcon('language')" :size="20" class="partner__go" />
          </div>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner__note {
  display: block;
  margin-top: 2px;
  font-size: var(--md-sys-typescale-body-small-size);
  color: var(--md-sys-color-on-surface-variant);
}

.partner__go {
  margin-left: auto;
  color: var(--md-sys-color-on-surface-variant);
}
</style>
