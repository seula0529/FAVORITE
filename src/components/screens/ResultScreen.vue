<template>
  <section class="section_common section_result" :class="screenClass">
    <ScreenHeader :can-back="canBack" :label="RESULT_COPY.eyebrow" @back="$emit('back')" />

    <div class="cont_screen cont_result">
      <!-- confetti 전용 캔버스 — 컨테이너 안에 absolute (fixed 미사용) -->
      <canvas ref="canvasEl" class="canvas_confetti" aria-hidden="true" />

      <p class="label_result_headline">{{ RESULT_COPY.headline }}</p>

      <!-- 뽑기 당첨 연출: CSS 3D Flip. 클릭/터치로 뒤집는다 -->
      <div
        class="area_flip_scene"
        role="button"
        tabindex="0"
        :aria-pressed="flipped"
        :aria-label="flipped ? '결과 카드' : RESULT_COPY.cardBackHint"
        @click="toggleFlip"
        @keydown.enter.prevent="toggleFlip"
        @keydown.space.prevent="toggleFlip"
      >
        <div class="card_flip" :class="{ flipped: flipped }">
          <!-- 카드 앞면(뒤집기 전 바로 보이는 면) — 원두 9종과 무관한 결과 카드 이미지 -->
          <div class="face_flip face_flip_a">
            <img class="img_flip_face" :src="resolveSrc(resultCard.frontImage)" alt="" />
          </div>

          <!-- 카드 뒷면(클릭/터치로 뒤집으면 보이는 면) -->
          <div class="face_flip face_flip_b">
            <img class="img_flip_face" :src="resolveSrc(resultCard.backImage)" alt="" />
          </div>
        </div>
      </div>

      <p class="desc_result">{{ bean.pursuit || RESULT_COPY.descriptionFallback }}</p>
    </div>

    <footer class="footer_screen">
      <AppButton variant="primary" block @click="$emit('next')">
        {{ RESULT_COPY.nextCta }}
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import confetti from 'canvas-confetti'
import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import { RESULT_COPY } from '@/data/result.js'
import { pickResultCard } from '@/data/resultCards.js'

const props = defineProps({
  screenClass: { type: String, default: '' },
  active: { type: Boolean, default: false },
  bean: { type: Object, required: true },
  canBack: { type: Boolean, default: true },
})

defineEmits(['next', 'back'])

// data/*.js 는 public/ 기준 루트 절대경로로 들어있어, 서브 경로 배포 시 깨지지 않도록 base 를 붙인다.
const resolveSrc = (src) => {
  if (!src.startsWith('/')) return src
  return import.meta.env.BASE_URL.replace(/\/$/, '') + src
}

const canvasEl = ref(null)
const flipped = ref(false)
const confettiFired = ref(false)
// 원두 성향(9종)과 무관하게, 화면에 들어올 때마다 결과 카드 4종 중 하나를 새로 뽑는다
const resultCard = ref(pickResultCard())
let timers = []
let fire = null

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

function launchConfetti() {
  if (prefersReducedMotion() || !canvasEl.value) return

  if (!fire) {
    fire = confetti.create(canvasEl.value, { resize: true, useWorker: true })
  }

  const colors = ['#C88A58', '#3D2820', '#FAF7F2']
  fire({ particleCount: 70, spread: 62, origin: { x: 0.5, y: 0.62 }, colors, scalar: 0.9 })
  timers.push(
    setTimeout(
      () =>
        fire({
          particleCount: 45,
          spread: 96,
          origin: { x: 0.5, y: 0.58 },
          colors,
          scalar: 0.75,
        }),
      180,
    ),
  )
}

// 클릭/터치로 카드를 뒤집는다. 최초로 결과가 보이는 순간에만 컨페티가 터진다.
function toggleFlip() {
  flipped.value = !flipped.value
  if (flipped.value && !confettiFired.value) {
    confettiFired.value = true
    timers.push(setTimeout(launchConfetti, 850))
  }
}

// 화면을 벗어나면 다음 진입 시 다시 앞면부터 보이도록 리셋
watch(
  () => props.active,
  (isActive) => {
    clearTimers()
    flipped.value = false
    if (isActive) {
      resultCard.value = pickResultCard()
    } else {
      confettiFired.value = false
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearTimers()
  fire?.reset?.()
})
</script>

<style scoped lang="scss">
.cont_result {
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 4px 0;
}

.canvas_confetti {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.label_result_headline {
  flex-shrink: 0;
  font-family: $font-title;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: $espresso-soft;
  margin-bottom: 12px;
}

// ── 3D Flip ──
.area_flip_scene {
  flex: 0 1 auto;
  min-height: 0;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 3 / 4;
  perspective: 1200px;
  cursor: pointer;
  outline-offset: 6px;
}

.card_flip {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.28, 0.72, 0.24, 1);
}
.card_flip.flipped {
  transform: rotateY(180deg);
}

// 앞/뒤 모두 텍스트 없이 이미지만 보여준다
.face_flip {
  position: absolute;
  inset: 0;
  border-radius: $r-lg;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 12px 28px rgba(33, 24, 21, 0.18);
}

.face_flip_b {
  transform: rotateY(180deg);
}

.img_flip_face {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.desc_result {
  flex-shrink: 0;
  white-space: pre-line;
  font-size: 12.5px;
  line-height: 1.6;
  color: $espresso-soft;
  margin-top: 14px;

  @include small-device {
    font-size: 11.5px;
    margin-top: 10px;
  }
}
</style>
