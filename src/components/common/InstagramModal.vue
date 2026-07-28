<template>
  <!--
    인스타그램 이미지 미리보기 레이어 팝업.
    .wrap_app 기준 absolute 로 전체 화면을 덮는다(position: fixed 미사용 규칙 유지).
    뒷배경은 불투명 검정색 딤드, 우상단에 닫기 버튼.
  -->
  <div
    v-if="open"
    class="modal_insta"
    role="dialog"
    aria-modal="true"
    aria-label="인스타그램 이미지"
    @keydown.esc="$emit('close')"
    @click="$emit('close')"
  >
    <button
      class="btn_insta_close"
      type="button"
      aria-label="닫기"
      @click.stop="$emit('close')"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="#fff"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>

    <div class="cont_insta_slide">
      <button
        type="button"
        class="btn_insta_nav btn_insta_prev"
        :disabled="isBeginning"
        aria-label="이전 이미지"
        @click.stop="prev"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <Swiper
        class="swiper_insta"
        :slides-per-view="1"
        :space-between="0"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="img in images" :key="img.id">
          <div class="wrap_insta_img">
            <img
              class="img_insta"
              :src="resolveSrc(img.src)"
              :alt="img.alt"
              @click.stop
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        type="button"
        class="btn_insta_nav btn_insta_next"
        :disabled="isEnd"
        aria-label="다음 이미지"
        @click.stop="next"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const props = defineProps({
  open: { type: Boolean, default: false },
  images: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])

// data/*.js 는 public/ 기준 루트 절대경로로 들어있어, 서브 경로 배포 시 깨지지 않도록 base 를 붙인다.
const resolveSrc = (src) => {
  if (!src.startsWith('/')) return src
  return import.meta.env.BASE_URL.replace(/\/$/, '') + src
}

let swiper = null
const isBeginning = ref(true)
const isEnd = ref(false)

function syncState() {
  if (!swiper) return
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

const onSwiper = (instance) => {
  swiper = instance
  syncState()
}
const onSlideChange = () => syncState()

const prev = () => swiper?.slidePrev()
const next = () => swiper?.slideNext()

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

// 열릴 때마다 첫 슬라이드로 리셋되도록(재마운트) v-if 를 사용 중 — swiper 인스턴스도 함께 정리.
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      window.addEventListener('keydown', onKeydown)
    } else {
      window.removeEventListener('keydown', onKeydown)
      swiper = null
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.modal_insta {
  position: absolute;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  // 불투명 검정색 딤드
  background: rgba(0,0,0, 0.8);
}

.btn_insta_close {
  position: absolute;
  top: max(#{$gutter-y}, env(safe-area-inset-top));
  right: $gutter-x;
  z-index: 1;
  flex-shrink: 0;
  width: $tap-min;
  height: $tap-min;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: $milk-foam;
  background: transparent;
  transition:
    background 0.2s ease,
    transform 0.12s ease;
}
.btn_insta_close:active {
  transform: scale(0.93);
}

.cont_insta_slide {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 $gutter-x;
}

.swiper_insta {
  flex: 1;
  min-width: 0;
  height: 100%;
}

:deep(.swiper-slide) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrap_insta_img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_insta {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: $r-sm;
}

.btn_insta_nav {
  flex-shrink: 0;
  width: $tap-min;
  height: $tap-min;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(250, 247, 242, 0.32);
  color: $milk-foam;
  transition:
    opacity 0.2s ease,
    background 0.2s ease,
    transform 0.12s ease;

  &:disabled {
    opacity: 0.24;
  }
  &:active:not(:disabled) {
    background: rgba(250, 247, 242, 0.16);
    transform: scale(0.94);
  }
}
</style>
