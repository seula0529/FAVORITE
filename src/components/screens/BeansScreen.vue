<template>
  <section class="section_common section_beans" :class="screenClass">
    <ScreenHeader
      :can-back="canBack"
      label="9 Types"
      :progress="{ current: activeIndex + 1, total: beans.length }"
      @back="$emit('back')"
    />

    <div class="cont_screen cont_beans">
      <Swiper
        class="swiper_beans"
        :slides-per-view="1"
        :space-between="12"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="bean in beans" :key="bean.id">
          <article
            class="card_bean"
            :class="`card_bean_ink_${bean.ink}`"
            :style="{
              backgroundImage: `linear-gradient(140deg, ${bean.gradient[0]} 0%, ${bean.gradient[1]} 100%)`,
            }"
          >
            <!-- 상단: 유형 번호 + 서브타이틀 -->
            <p class="label_bean_type txt_label">Type {{ bean.typeNo }}. {{ bean.subtitle }}</p>

            <!-- 중앙: 캐릭터 -->
            <div class="visual_bean">
              <BeanCharacter
                :image="bean.image"
                :alt="bean.nameKo"
                :light="bean.ink === 'light'"
              />
            </div>

            <!-- 하단: 이름 -->
            <p class="tit_bean tit_txt">
              <span class="txt_bean_emoji" aria-hidden="true">{{ bean.emoji }}</span>
              {{ bean.nameKo }}
              <span class="txt_bean_name_en">{{ bean.nameEn }}</span>
            </p>

            <!-- 최하단: Pill Badge 3개 -->
            <div class="group_bean_tags">
              <PillBadge v-for="tag in bean.tags" :key="tag" :ink="bean.ink">
                {{ tag }}
              </PillBadge>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <p class="desc_beans">{{ CURATION_DESC }}</p>
    </div>

    <footer class="footer_screen footer_beans">
      <AppButton class="btn_beans_cta" variant="primary" block @click="$emit('next')">
        예약 문자 작성하기
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import PillBadge from '@/components/common/PillBadge.vue'
import BeanCharacter from '@/components/common/BeanCharacter.vue'
import { BEANS as beans } from '@/data/beans.js'

// 원두 성향과 무관하게 9종 카드 공통으로 노출되는 큐레이션 서비스 설명
const CURATION_DESC =
  '원두 시향과 스몰토크를 통해 나만의 원두를 찾고,\n맞춤 드립백을 제공하는 큐레이션 체험'

const props = defineProps({
  screenClass: { type: String, default: '' },
  active: { type: Boolean, default: false },
  canBack: { type: Boolean, default: true },
})

defineEmits(['next', 'back'])

let swiper = null
const activeIndex = ref(0)

function syncState() {
  if (!swiper) return
  activeIndex.value = swiper.activeIndex
}

const onSwiper = (instance) => {
  swiper = instance
  syncState()
}
const onSlideChange = () => syncState()

watch(
  () => props.active,
  (isActive) => {
    if (!isActive) return
    swiper?.update()
    syncState()
  },
)
</script>

<style scoped lang="scss">
.cont_beans {
  padding: 6px 0;
  justify-content: center;
}

.swiper_beans {
  width: 100%;
  flex: 1;
  min-height: 0;
}

.desc_beans {
  flex-shrink: 0;
  white-space: pre-line;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
  color: $espresso;
  margin-top: 15px;
}

:deep(.swiper-slide) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 3:4 비율. 폭 기준으로 잡고, 세로가 부족하면 shrink 로 줄어든다.
.card_bean {
  position: relative;
  flex: 0 1 auto;
  min-height: 0;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: $r-md;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 25px 15px;
}

// 그라데이션은 유형마다 밝기가 크게 다르다.
// 글자가 놓이는 위/아래에만 옅은 스크림을 깔아 대비를 확보한다.
.card_bean::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.card_bean > * {
  position: relative;
  z-index: 1;
}

.card_bean_ink_dark {
  color: $roasted-black;

  &::before {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.34) 0%,
      rgba(255, 255, 255, 0) 24%,
      rgba(255, 255, 255, 0) 62%,
      rgba(255, 255, 255, 0.46) 100%
    );
  }
}

.card_bean_ink_light {
  color: $milk-foam;

  &::before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.26) 0%,
      rgba(0, 0, 0, 0) 24%,
      rgba(0, 0, 0, 0) 62%,
      rgba(0, 0, 0, 0.34) 100%
    );
  }
}

.label_bean_type {
  flex-shrink: 0;
  font-size: 16px;
  opacity: 0.82;

  @include small-device {
    font-size: 14px;
  }
}

.visual_bean {
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 10px 0;
}

.tit_bean {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  font-size: 22px;
  line-height: 1.2;
  @include small-device {
    font-size: 20px;
  }
}

.txt_bean_emoji {
  font-size: 0.86em;
  margin-right: 2px;
}

.txt_bean_name_en {
  display: block;
  font-family: $font-title;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.72;
}

.group_bean_tags {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap:8px;
  margin-top: 10px;
}

.btn_beans_cta {
  flex: 1;
  min-width: 0;
}
</style>
