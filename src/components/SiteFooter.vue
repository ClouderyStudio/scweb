<script setup lang="ts">
import { M3Icon, vReveal } from '@clderystd/m3-ui'
import { IconOpenInNew } from '@/icons'
import { nav, site } from '@/data/site'
</script>

<template>
  <footer class="footer">
    <div class="section__inner">
      <div class="footer__grid">
        <div v-reveal class="footer__brand">
          <img class="footer__logo" :src="site.logoWide" :alt="site.operator" width="320" height="120" />
          <p class="footer__desc">
            {{ site.fullName }}由{{ site.operator }}运营。<br />
            一个长期开放、公益性质的生存战争服务器。
          </p>
        </div>

        <div v-reveal="{ delay: 60 }">
          <p class="footer__title">站内导航</p>
          <ul class="footer__links">
            <li v-for="item in nav.slice(1, 6)" :key="item.id">
              <a :href="'#' + item.id">{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <div v-reveal="{ delay: 120 }">
          <p class="footer__title">加入我们</p>
          <ul class="footer__links">
            <li>
              <a :href="site.qqGroupLink" target="_blank" rel="noopener">
                玩家 QQ 群 {{ site.qqGroup }}
              </a>
            </li>
            <li><a :href="`mailto:${site.email}`">{{ site.email }}</a></li>
            <li>
              <a :href="site.docsUrl" target="_blank" rel="noopener" class="footer__ext">
                服务器规则与文档
                <M3Icon :icon="IconOpenInNew" :size="14" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <span>{{ site.copyright }}</span>
        <span>
          本站由
          <a :href="site.studioUrl" target="_blank" rel="noopener">{{ site.operator }}</a>
          使用 Material Design 3 组件库
          <a href="https://github.com/ClouderyStudio/m3-ui" target="_blank" rel="noopener">m3-ui</a>
          重构
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer__desc {
  font-size: var(--md-sys-typescale-body-medium-size);
  line-height: 1.7;
  opacity: 0.78;
}

.footer__ext {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
