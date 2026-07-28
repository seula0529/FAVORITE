<template>
  <section class="section_common section_cover" :class="screenClass">
    <ScreenHeader :can-back="false" />

    <div class="cont_screen cont_cover">
      <div class="area_cover_top">
        <p class="label_cover_eyebrow">{{ COVER.eyebrow }}</p>
        <h1 class="tit_cover tit_txt">
          <span>{{ COVER.titleTop }}</span>
          <em>{{ COVER.titleBottom }}</em>
        </h1>
      </div>

      <div class="visual_cover">
        <BeanCharacter :image="COVER.image" alt="원두 캐릭터" />
      </div>

      <div class="area_cover_bottom">
        <p class="desc_cover">{{ COVER.subtitle }}</p>
        <p class="txt_cover_caption">{{ COVER.caption }}</p>
      </div>
    </div>

    <footer class="footer_screen footer_cover">
      <AppButton class="btn_cover_main" variant="primary" @click="$emit('start')">
        {{ COVER.primaryCta }}
      </AppButton>
      <AppButton class="btn_cover_sub" variant="ghost" @click="$emit('reserve')">
        {{ COVER.secondaryCta }}
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import BeanCharacter from '@/components/common/BeanCharacter.vue'
import { COVER } from '@/data/cover.js'

defineProps({ screenClass: { type: String, default: '' } })
defineEmits(['start', 'reserve'])
</script>

<style scoped lang="scss">
.cont_cover {
  align-items: center;
  text-align: center;
  padding: 5px 0 20px;
}

.area_cover_top {
  flex-shrink: 0;
}

.label_cover_eyebrow {
  font-family: $font-title;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  color: $caramel;
  margin-bottom: 12px;
}

.tit_cover {
  font-size: 42px;
  line-height: 0.9;
  color: $espresso;

  span {
    display: block;
    font-weight: 500;
    letter-spacing: 0.02em;
    opacity: 0.55;
    font-size: 30px;
  }
  em {
    display: block;
    font-style: normal;
    font-weight: 700;
  }
}

// 포스터 비주얼 — 남는 공간을 전부 차지하되 넘치지 않는다
.visual_cover {
  flex: 1;
  min-height: 0;
  width: 90%;
  opacity: 0.85;
  padding: 10px 0;
}

.area_cover_bottom {
  flex-shrink: 0;
}

.desc_cover {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.62;
  color: $espresso-soft;

  @include small-device {
    font-size: 14px;
  }
}

.txt_cover_caption {
  margin-top: 8px;
  font-family: $font-title;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: $caramel;
}

.footer_cover {
  gap: 8px;
}
.btn_cover_main {
  flex: 1.15;
  min-width: 0;
}
.btn_cover_sub {
  flex: 1;
  min-width: 0;
}
</style>
