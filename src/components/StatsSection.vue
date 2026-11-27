<script setup lang="ts">
import { vReveal } from '@clderystd/m3-ui'
import StatCard from './StatCard.vue'
import { stats } from '@/data/site'
</script>

<template>
  <section id="stats" class="section section--container stats-section">
    <div class="section__inner">
      <div class="grid grid--4">
        <StatCard
          v-for="(item, i) in stats.items"
          :key="item.label"
          v-reveal="{ delay: 60 * (i + 1) }"
          :value="item.value"
          :label="item.label"
          :icon="item.icon"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding-block: clamp(36px, 4vw, 56px);
}

</style>
