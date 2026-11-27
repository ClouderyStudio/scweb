<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { vReveal } from '@clderystd/m3-ui'
import { satisfaction } from '@/data/site'

/** 进度条从 0 长到目标值：直接渲染最终宽度就没有「在统计」的感觉了。 */
const grown = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    grown.value = true
  })
})
</script>

<template>
  <section id="satisfaction" class="section">
    <div class="section__inner">
      <div class="split">
        <figure v-reveal="{ blur: true }" class="vote__figure">
          <img :src="satisfaction.image" alt="服务器主城俯视图" width="1200" height="675" loading="lazy" />
        </figure>

        <div v-reveal="{ delay: 100 }">
          <header class="section-head">
            <span class="eyebrow">满意度</span>
            <h2 class="t-headline">{{ satisfaction.title }}</h2>
            <p class="section-head__lead">{{ satisfaction.lead }}</p>
          </header>

          <div
            v-for="(vote, i) in satisfaction.votes"
            :key="vote.label"
            :class="['vote', i === 0 ? 'vote--good' : i === 1 ? 'vote--neutral' : 'vote--bad']"
            role="img"
            :aria-label="`${vote.label}：${vote.count} 人，占 ${vote.percent}%`"
          >
            <div class="vote__head">
              <span class="vote__label">{{ vote.label }}</span>
              <span class="vote__meta">{{ vote.count }} 人 · {{ vote.percent }}%</span>
            </div>
            <div class="vote__track">
              <div class="vote__bar" :style="{ width: grown ? vote.percent + '%' : '0%' }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
