<script setup lang="ts">
import { M3Avatar, M3Card, vReveal } from '@clderystd/m3-ui'
import { team } from '@/data/site'

const staffBadges = new Set(['云术', '信念'])
</script>

<template>
  <section id="team" class="section">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">团队</span>
        <h2 class="t-headline">{{ team.title }}</h2>
        <p class="section-head__lead">{{ team.lead }}</p>
      </header>

      <div class="grid grid--team">
        <M3Card
          v-for="(member, i) in team.members"
          :key="member.name"
          v-reveal="{ delay: 40 * ((i % 4) + 1) }"
          variant="elevated"
          interactive
        >
          <div class="member">
            <M3Avatar
              :src="member.avatar"
              :name="member.name"
              :alt="member.name"
              :size="76"
              ring
            />
            <span class="member__name">{{ member.name }}</span>
            <span class="member__badge">
              <span v-if="staffBadges.has(member.name)" class="md-tag">核心</span>
            </span>
            <p class="member__role">{{ member.role }}</p>
          </div>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 手机上两列比一列省一半滚动：头像是 76px，两列在 360px 宽下也放得下 */
.grid--team {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 164px), 1fr));
}

/* M3Chip 只作标签用在这里会太抢眼，直接用 .md-tag 的弱化样式 */
.md-tag {
  background-color: var(--md-sys-color-secondary-container);
}

/* 不管有没有标签都占住这一行，卡片之间的名字/简介才能对齐 */
.member__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 26px;
}
</style>
