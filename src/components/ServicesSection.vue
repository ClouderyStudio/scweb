<script setup lang="ts">
import { M3Card, M3Icon, vReveal } from '@clderystd/m3-ui'
import { icon as resolveIcon } from '@/icons/registry'
import { services } from '@/data/site'
</script>

<template>
  <section id="services" class="section section--low">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">服务器特色</span>
        <h2 class="t-headline">{{ services.title }}</h2>
        <p class="section-head__lead">{{ services.lead }}</p>
      </header>

      <div class="grid grid--3">
        <M3Card
          v-for="(item, i) in services.items"
          :key="item.title"
          v-reveal="{ delay: 60 * (i + 1) }"
          variant="elevated"
          interactive
          class="service"
        >
          <div class="card-body card-body--roomy">
            <span class="icon-badge">
              <M3Icon :icon="resolveIcon(item.icon)" :size="26" />
            </span>
            <h3 class="t-title service__title">{{ item.title }}</h3>
            <p class="card-text">{{ item.text }}</p>
          </div>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service {
  height: 100%;
}

.service__title {
  margin-top: 4px;
}
</style>
