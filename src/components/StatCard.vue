<script setup lang="ts">
import { M3Icon } from '@clderystd/m3-ui'
import { useCountUp } from '@/composables/useCountUp'
import { icon as resolveIcon } from '@/icons/registry'

const props = defineProps<{
  value: number
  label: string
  icon: string
}>()

const { value: shown, el } = useCountUp(props.value)
</script>

<template>
  <div ref="el" class="stat">
    <span class="stat__value">{{ shown }}</span>
    <span class="stat__label">
      <M3Icon :icon="resolveIcon(icon)" :size="16" class="stat__icon" />
      {{ label }}
    </span>
  </div>
</template>

<style scoped>
.stat__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.stat__icon {
  color: var(--md-sys-color-primary);
}
</style>
