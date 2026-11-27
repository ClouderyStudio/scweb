<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { M3Button, M3Card, M3Icon, M3TextField, useSnackbar, vReveal } from '@clderystd/m3-ui'
import { IconArrowForward } from '@/icons'
import { icon as resolveIcon } from '@/icons/registry'
import { contact } from '@/data/site'

const snackbar = useSnackbar()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const touched = ref(false)
const submitting = ref(false)

const errors = computed(() => ({
  name: form.name.trim() ? '' : '请填写您的游戏名称',
  subject: form.subject.trim() ? '' : '请填写留言标题',
  message: form.message.trim() ? '' : '请填写留言内容',
  email:
    form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())
      ? '邮箱格式看起来不对'
      : '',
}))

const hasError = computed(() => Object.values(errors.value).some(Boolean))

/**
 * 原站这里是一个空表单，提交按钮没有后端。
 * 与其假装提交成功，不如说清楚「还没接后端」，并把用户引到确实能联系上的渠道。
 */
function submit(): void {
  touched.value = true
  if (hasError.value) {
    snackbar.warning('请先把标红的几项填好', '还不能提交')
    return
  }
  submitting.value = true
  window.setTimeout(() => {
    submitting.value = false
    snackbar.show('这个表单还没接入后端，留言不会真正送达。请到 QQ 交流群直接找管理。', {
      tone: 'error',
      title: '暂时发不出去',
      timeout: 8000,
    })
  }, 500)
}
</script>

<template>
  <section id="contact" class="section">
    <div class="section__inner">
      <header v-reveal class="section-head section-head--center">
        <span class="eyebrow">加入我们</span>
        <h2 class="t-headline">{{ contact.title }}</h2>
        <p class="section-head__lead">{{ contact.lead }}</p>
      </header>

      <div class="split contact__split">
        <M3Card v-reveal variant="elevated">
          <form class="contact__form" novalidate @submit.prevent="submit">
            <div>
              <h3 class="t-title">{{ contact.form.title }}</h3>
              <p class="card-text contact__hint">{{ contact.form.text }}</p>
            </div>

            <div class="contact__row">
              <M3TextField
                v-model="form.name"
                :label="contact.form.fields.name"
                name="name"
                required
                :error="touched ? errors.name : ''"
                autocomplete="nickname"
              />
              <M3TextField
                v-model="form.email"
                :label="contact.form.fields.email"
                name="email"
                type="email"
                inputmode="email"
                autocomplete="email"
                :error="touched ? errors.email : ''"
                hint="选填，方便回信"
              />
            </div>

            <M3TextField
              v-model="form.subject"
              :label="contact.form.fields.subject"
              name="subject"
              required
              :error="touched ? errors.subject : ''"
            />

            <div class="contact__textarea">
              <label class="contact__label" for="contact-message">{{ contact.form.fields.message }}</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                class="textarea"
                rows="5"
                placeholder="想说的话，或者你想提出的建议"
                :aria-invalid="touched && Boolean(errors.message)"
              />
              <span v-if="touched && errors.message" class="contact__error">{{ errors.message }}</span>
            </div>

            <M3Button
              class="md-button--inline"
              type="submit"
              :loading="submitting"
              :trailing-icon="IconArrowForward"
              size="lg"
            >
              {{ contact.form.submit }}
            </M3Button>
          </form>
        </M3Card>

        <div v-reveal="{ delay: 100 }" class="contact__channels">
          <a
            v-for="channel in contact.channels"
            :key="channel.label"
            class="channel"
            :href="channel.href ?? undefined"
            :target="channel.href?.startsWith('http') ? '_blank' : undefined"
            :rel="channel.href?.startsWith('http') ? 'noopener' : undefined"
          >
            <span class="icon-badge icon-badge--sm">
              <M3Icon :icon="resolveIcon(channel.icon)" :size="20" />
            </span>
            <span>
              <span class="channel__label">{{ channel.label }}</span>
              <span class="channel__value">{{ channel.value }}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__split {
  align-items: start;
}

.contact__hint {
  margin-top: 6px;
}

.contact__error {
  font-size: var(--md-sys-typescale-body-small-size);
  color: var(--md-sys-color-error);
}
</style>
