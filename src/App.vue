<script setup lang="ts">
import { M3SnackbarHost } from '@clderystd/m3-ui'
import SiteAppBar from './components/SiteAppBar.vue'
import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PromoSection from './components/PromoSection.vue'
import TeamSection from './components/TeamSection.vue'
import StatsSection from './components/StatsSection.vue'
import SponsorsSection from './components/SponsorsSection.vue'
import SatisfactionSection from './components/SatisfactionSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import NewsSection from './components/NewsSection.vue'
import PartnersSection from './components/PartnersSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
import { useScrollSpy } from './composables/useScrollSpy'
import { nav } from './data/site'

const { active } = useScrollSpy(nav.map((item) => item.id))
</script>

<template>
  <div class="site">
    <a class="md-skip-link" href="#main">跳到主要内容</a>

    <SiteAppBar :active="active" />

    <main id="main" class="site-main">
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <PromoSection />
      <TeamSection />
      <StatsSection />
      <SponsorsSection />
      <SatisfactionSection />
      <PortfolioSection />
      <TestimonialsSection />
      <NewsSection />
      <PartnersSection />
      <ContactSection />
    </main>

    <SiteFooter />

    <BackToTop />
    <M3SnackbarHost />
  </div>
</template>
