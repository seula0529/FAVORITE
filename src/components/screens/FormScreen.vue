<template>
  <section class="section_common section_form" :class="screenClass">
    <ScreenHeader
      :can-back="canBack"
      :label="currentQuestion.label"
      :progress="{ current: step + 1, total: questions.length }"
      @back="$emit('back')"
    />

    <div class="cont_screen cont_form">
      <!-- 진행 게이지 -->
      <div class="progress_form" aria-hidden="true">
        <span class="progress_form_fill" :style="{ width: gaugeWidth }" />
      </div>

      <!-- 문항 스택: 화면 전환과 같은 방식(아래→위)으로 문항이 올라온다 -->
      <div class="area_q_stack">
        <article
          v-for="(q, qi) in questions"
          :key="q.id"
          class="card_q"
          :class="cardClass(qi)"
          :aria-hidden="qi !== step"
        >
          <h2 class="tit_q tit_txt">{{ q.text }}</h2>

          <div class="group_q_options" role="radiogroup" :aria-label="q.text">
            <button
              v-for="(opt, oi) in q.options"
              :key="opt.value"
              type="button"
              class="btn_q_option"
              :class="{ selected: answers[qi] === opt.value }"
              role="radio"
              :aria-checked="answers[qi] === opt.value"
              :tabindex="qi === step ? 0 : -1"
              @click="$emit('select', qi, opt.value)"
            >
              <span class="label_q_key">{{ keyOf(oi) }}</span>
              <span class="txt_q_label">{{ opt.label }}</span>
            </button>
          </div>
        </article>
      </div>
    </div>

    <footer class="footer_screen footer_form">
      <AppButton variant="primary" block :disabled="!hasAnswer" @click="$emit('next')">
        {{ isLast ? '결과 확인하기' : '다음' }}
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps({
  screenClass: { type: String, default: '' },
  questions: { type: Array, required: true },
  answers: { type: Array, required: true },
  step: { type: Number, default: 0 },
  canBack: { type: Boolean, default: true },
})

defineEmits(['select', 'next', 'back'])

const currentQuestion = computed(
  () => props.questions[props.step] ?? props.questions[0],
)

// 선택 전에는 다음 버튼 비활성
const hasAnswer = computed(() => !!props.answers[props.step])
const isLast = computed(() => props.step === props.questions.length - 1)

const gaugeWidth = computed(
  () => `${((props.step + 1) / props.questions.length) * 100}%`,
)

const keyOf = (i) => String.fromCharCode(65 + i)

const cardClass = (qi) => {
  if (qi === props.step) return 'active'
  return qi < props.step ? 'above' : 'below'
}
</script>

<style scoped lang="scss">
.cont_form {
  padding-top: 4px;
}

.progress_form {
  flex-shrink: 0;
  height: 3px;
  border-radius: $r-pill;
  background: $espresso-line;
  overflow: hidden;
}
.progress_form_fill {
  display: block;
  height: 100%;
  border-radius: $r-pill;
  background: $caramel;
  transition: width $dur-slide $ease-slide;
}

.area_q_stack {
  position: relative;
  flex: 1;
  min-height: 0;
  // 비활성 문항의 translateY 가 스크롤 영역을 넓히지 않도록 잘라낸다
  // (clip 은 스크롤 컨테이너를 만들지 않는다 — 미지원 브라우저는 hidden 으로 폴백)
  overflow: hidden;
  overflow: clip;
}

.card_q {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  transition:
    transform $dur-slide $ease-slide,
    opacity $dur-slide ease;

  &.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  &.above {
    transform: translateY(-24%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
  &.below {
    transform: translateY(24%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
}

.tit_q {
  flex-shrink: 0;
  white-space: pre-line;
  font-size: clamp(19px, 5.6vw, 23px);
  color: $espresso;
  margin-bottom: 18px;

  @include small-device {
    font-size: 18px;
    margin-bottom: 12px;
  }
}

// 옵션은 남는 높이를 나눠 갖는다 → 어떤 화면에서도 스크롤이 생기지 않음
.group_q_options {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn_q_option {
  flex: 1 1 0;
  min-height: 48px;
  max-height: 72px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  border: 1px solid $espresso-line;
  border-radius: $r-md;
  background: rgba(250, 247, 242, 0.6);
  text-align: left;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.12s ease;

  &:active {
    transform: scale(0.99);
  }

  &.selected {
    background: $espresso;
    border-color: $espresso;

    .label_q_key {
      background: $caramel;
      border-color: $caramel;
      color: $roasted-black;
    }
    .txt_q_label {
      color: $milk-foam;
      font-weight: 600;
    }
  }
}

.label_q_key {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $espresso-line;
  border-radius: 7px;
  font-family: $font-title;
  font-size: 11px;
  font-weight: 500;
  color: $caramel;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.txt_q_label {
  min-width: 0;
  font-size: 14px;
  line-height: 1.4;
  color: $espresso;

  @include small-device {
    font-size: 13px;
  }
}
</style>
