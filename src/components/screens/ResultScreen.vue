<template>
  <section class="section_common section_result" :class="screenClass">
    <ScreenHeader :can-back="canBack" :label="RESULT_COPY.eyebrow" @back="$emit('back')" />

    <div class="cont_screen cont_result">
      <!-- confetti 전용 캔버스 — 컨테이너 안에 absolute (fixed 미사용) -->
      <canvas ref="canvasEl" class="canvas_confetti" aria-hidden="true" />

      <p class="label_result_headline">{{ RESULT_COPY.headline }}</p>

      <!-- 뽑기 당첨 연출: CSS 3D Flip -->
      <div class="area_flip_scene">
        <div class="card_flip" :class="{ flipped: flipped }">
          <!-- 뒷면(처음 보이는 면) -->
          <div class="face_flip face_flip_back">
            <span class="tit_flip_back">{{ RESULT_COPY.cardBackLabel }}</span>
            <span class="desc_flip_back_hint">{{ RESULT_COPY.cardBackHint }}</span>
          </div>

          <!-- 앞면(결과) -->
          <div
            class="face_flip face_flip_front"
            :class="`face_flip_ink_${bean.ink}`"
            :style="{
              backgroundImage: `linear-gradient(140deg, ${bean.gradient[0]} 0%, ${bean.gradient[1]} 100%)`,
            }"
          >
            <p class="label_flip_front_type txt_label">Type {{ bean.typeNo }}. {{ bean.subtitle }}</p>
            <div class="visual_flip_front">
              <BeanCharacter
                :image="bean.image"
                :alt="bean.nameKo"
                :light="bean.ink === 'light'"
              />
            </div>
            <p class="tit_flip_front tit_txt">
              <span class="txt_flip_front_emoji" aria-hidden="true">{{ bean.emoji }}</span>
              {{ bean.nameKo }}
              <span class="txt_flip_front_name_en">{{ bean.nameEn }}</span>
            </p>
            <div class="group_flip_front_tags">
              <PillBadge v-for="tag in bean.tags" :key="tag" :ink="bean.ink">
                {{ tag }}
              </PillBadge>
            </div>
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
import PillBadge from '@/components/common/PillBadge.vue'
import BeanCharacter from '@/components/common/BeanCharacter.vue'
import { RESULT_COPY } from '@/data/result.js'

const props = defineProps({
  screenClass: { type: String, default: '' },
  active: { type: Boolean, default: false },
  bean: { type: Object, required: true },
  canBack: { type: Boolean, default: true },
})

defineEmits(['next', 'back'])

const canvasEl = ref(null)
const flipped = ref(false)
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

  const colors = [props.bean.gradient[0], props.bean.gradient[1], '#C88A58', '#FAF7F2']
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

// 화면에 진입할 때마다 카드가 처음부터 뒤집힌다
watch(
  () => props.active,
  (isActive) => {
    clearTimers()
    if (!isActive) {
      flipped.value = false
      return
    }

    if (prefersReducedMotion()) {
      flipped.value = true
      return
    }

    timers.push(setTimeout(() => (flipped.value = true), 420))
    timers.push(setTimeout(launchConfetti, 1000))
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

.face_flip {
  position: absolute;
  inset: 0;
  border-radius: $r-lg;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 12px 28px rgba(33, 24, 21, 0.18);
}

.face_flip_back {
  justify-content: center;
  gap: 10px;
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(250, 247, 242, 0.06) 0 10px,
      transparent 10px 20px
    ),
    linear-gradient(140deg, $espresso 0%, $roasted-black 100%);
  color: $milk-foam;
}
.tit_flip_back {
  font-family: $font-title;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: $caramel;
}
.desc_flip_back_hint {
  font-size: 11px;
  letter-spacing: 0.06em;
  opacity: 0.5;
}

.face_flip_front {
  transform: rotateY(180deg);
  justify-content: space-between;
  padding: 16px 14px;
}

// 원두 카드와 동일한 스크림 — 밝은 그라데이션에서도 글자 대비를 확보한다
.face_flip_front::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.face_flip_front > * {
  position: relative;
  z-index: 1;
}

.face_flip_ink_dark {
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

.face_flip_ink_light {
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

.label_flip_front_type {
  flex-shrink: 0;
  font-size: 12px;
  opacity: 0.82;
}

.visual_flip_front {
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 6px 0;
}

.tit_flip_front {
  flex-shrink: 0;
  font-size: 21px;
}

.txt_flip_front_emoji {
  font-size: 0.86em;
  margin-right: 2px;
}

.txt_flip_front_name_en {
  display: block;
  font-family: $font-title;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.72;
  margin-top: 2px;
}

.group_flip_front_tags {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-top: 9px;
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
