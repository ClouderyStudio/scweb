<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { M3Button, M3IconButton, M3List, M3ListItem, M3Sheet, M3TopAppBar } from '@clderystd/m3-ui'
import { IconDarkMode, IconLightMode, IconMenu, IconArrowForward } from '@/icons'
import { useTheme } from '@/composables/useTheme'
import { nav, site } from '@/data/site'

defineProps<{ active: string }>()

const { isDark, toggle } = useTheme()

const scrolled = ref(false)
const navOpen = ref(false)

function onScroll(): void {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const themeLabel = computed(() => (isDark.value ? '切换到浅色模式' : '切换到深色模式'))

function go(id: string): void {
  navOpen.value = false
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // 让键盘用户从目标区块继续，而不是还停在顶栏
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
</script>

<template>
  <M3TopAppBar :scrolled="scrolled" sticky>
    <template #leading>
      <a class="app-bar__brand" :href="'#' + nav[0]!.id" @click.prevent="go(nav[0]!.id)">
        <img class="app-bar__mark" :src="site.logoMark" :alt="site.operator" width="96" height="36" />
        <span class="app-bar__names">
          <span class="app-bar__name">{{ site.name }}</span>
          <span class="app-bar__sub">服务器官网</span>
        </span>
      </a>
    </template>

    <nav class="app-bar__nav" aria-label="站内导航">
      <button
        v-for="item in nav"
        :key="item.id"
        type="button"
        class="app-bar__link"
        :class="{ 'is-active': active === item.id }"
        :aria-current="active === item.id ? 'true' : undefined"
        @click="go(item.id)"
      >
        {{ item.label }}
      </button>
    </nav>

    <template #actions>
      <M3IconButton
        :icon="isDark ? IconLightMode : IconDarkMode"
        :label="themeLabel"
        variant="standard"
        @click="toggle"
      />
      <M3Button
        class="app-bar__cta"
        :href="site.qqGroupLink"
        target="_blank"
        rel="noopener"
        size="sm"
        variant="filled"
        :trailing-icon="IconArrowForward"
      >
        加入玩家群
      </M3Button>
      <M3IconButton
        class="app-bar__menu"
        :icon="IconMenu"
        label="打开导航菜单"
        variant="standard"
        @click="navOpen = true"
      />
    </template>
  </M3TopAppBar>

  <M3Sheet v-model="navOpen" title="站内导航" side="end" size="300px">
    <M3List>
      <M3ListItem
        v-for="item in nav"
        :key="item.id"
        :headline="item.label"
        clickable
        :selected="active === item.id"
        @click="go(item.id)"
      />
    </M3List>
    <template #footer>
      <M3Button :href="site.qqGroupLink" target="_blank" rel="noopener" block :icon="IconArrowForward">
        加入玩家群
      </M3Button>
    </template>
  </M3Sheet>
</template>

<style scoped>
.app-bar__menu {
  display: inline-flex;
}

.app-bar__cta {
  display: none;
}

@media (min-width: 1080px) {
  .app-bar__menu {
    display: none;
  }
}

@media (min-width: 1320px) {
  .app-bar__cta {
    display: inline-flex;
  }
}
</style>
