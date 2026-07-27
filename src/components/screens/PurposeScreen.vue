<template>
  <section class="section_common section_purpose" :class="screenClass">
    <ScreenHeader :can-back="canBack" label="Why we made this" @back="$emit('back')" />

    <div class="cont_screen cont_purpose">
      <Swiper
        class="swiper_purpose"
        :modules="[Pagination]"
        :slides-per-view="1"
        :space-between="14"
        :pagination="{ clickable: true }"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="slide in slides" :key="slide.id">
          <article class="card_purpose">
            <!-- 1:1 비율 카드 영역 -->
            <div class="visual_purpose">
              <div class="visual_purpose_inner">
                <BeanCharacter :image="slide.image" :alt="slide.step" light />
              </div>
            </div>

            <div class="area_purpose_body">
              <h2 class="tit_purpose tit_txt">{{ slide.title }}</h2>
              <p class="desc_purpose">{{ slide.body }}</p>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>

    <footer class="footer_screen">
      <AppButton variant="primary" block @click="$emit('next')">
        원두 9종 보러가기
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import BeanCharacter from '@/components/common/BeanCharacter.vue'
import { PURPOSE_SLIDES as slides } from '@/data/purpose.js'

const props = defineProps({
  screenClass: { type: String, default: '' },
  active: { type: Boolean, default: false },
  canBack: { type: Boolean, default: true },
})

defineEmits(['next', 'back'])

let swiper = null
const onSwiper = (instance) => {
  swiper = instance
}

// 화면이 숨겨진 상태에서 마운트되므로, 활성화 시 레이아웃을 다시 재도록 한다
watch(
  () => props.active,
  (isActive) => {
    if (isActive) swiper?.update()
  },
)
</script>

<style scoped lang="scss">
.cont_purpose {
  padding-top: 4px;
}

.swiper_purpose {
  width: 100%;
  height: 100%;
}

.card_purpose {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // 페이지네이션 dots 영역 확보
  padding-bottom: 30px;
}

// 1:1 비율. 폭 기준으로 정사각형을 잡되,
// 세로가 부족한 기기에서는 shrink 로 줄어들 뿐 절대 넘치지 않는다.
.visual_purpose {
  position: relative;
  flex: 0 1 auto;
  min-height: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: $r-lg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual_purpose_inner {
  width: 100%;
  height: 100%;

  :deep(.img_char) {
    width: 100%;
  }
}

.area_purpose_body {
  flex-shrink: 0;
  width: 100%;
  text-align: left;
  padding: 14px 0 0;
}

.tit_purpose {
  white-space: pre-line;
  font-size: clamp(17px, 5vw, 20px);
  color: $espresso;
  margin-bottom: 8px;
}

.desc_purpose {
  white-space: pre-line;
  font-size: 13px;
  line-height: 1.6;
  color: $espresso-soft;

  @include small-device {
    font-size: 12px;
    line-height: 1.5;
  }
}

// ── Swiper 커스터마이징 ──
:deep(.swiper-pagination) {
  bottom: 0;
}
:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: $espresso;
  opacity: 0.22;
  transition:
    width 0.24s ease,
    opacity 0.24s ease;
}
:deep(.swiper-pagination-bullet-active) {
  width: 18px;
  border-radius: $r-pill;
  background: $caramel;
  opacity: 1;
}
</style>
