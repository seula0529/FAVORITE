<template>
  <div class="wrap_app" :data-direction="direction">
    <!-- 우측 상단 아이콘 (.wrap_app 기준 absolute): 첫 화면 이동(커버 제외) + 인스타 -->
    <HomeLink v-if="currentScreen !== 'cover'" @click="goHome" />
    <InstagramLink @open="instaOpen = true" />

    <!-- 화면 6개가 겹쳐 쌓이는 무대 -->
    <div class="area_stack">
      <CoverScreen
        :screen-class="screenClass('cover')"
        @start="startForm"
        @reserve="go('reservation')"
      />

      <FormScreen
        :screen-class="screenClass('form')"
        :questions="QUESTIONS"
        :answers="answers"
        :step="formStep"
        :can-back="canGoBack"
        @select="select"
        @next="nextQuestion"
        @back="back"
      />

      <ResultScreen
        :screen-class="screenClass('result')"
        :active="currentScreen === 'result'"
        :bean="resultBean"
        :answers="payload"
        :can-back="canGoBack"
        @next="go('purpose')"
        @back="back"
      />

      <PurposeScreen
        :screen-class="screenClass('purpose')"
        :active="currentScreen === 'purpose'"
        :can-back="canGoBack"
        @next="go('beans')"
        @back="back"
      />

      <BeansScreen
        :screen-class="screenClass('beans')"
        :active="currentScreen === 'beans'"
        :can-back="canGoBack"
        @next="go('reservation')"
        @back="back"
      />

      <ReservationScreen
        :screen-class="screenClass('reservation')"
        :can-back="canGoBack"
        @back="back"
      />
    </div>

    <InstagramModal
      :open="instaOpen"
      :images="INSTAGRAM_IMAGES"
      @close="instaOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import InstagramLink from '@/components/common/InstagramLink.vue'
import InstagramModal from '@/components/common/InstagramModal.vue'
import HomeLink from '@/components/common/HomeLink.vue'
import CoverScreen from '@/components/screens/CoverScreen.vue'
import FormScreen from '@/components/screens/FormScreen.vue'
import ResultScreen from '@/components/screens/ResultScreen.vue'
import PurposeScreen from '@/components/screens/PurposeScreen.vue'
import BeansScreen from '@/components/screens/BeansScreen.vue'
import ReservationScreen from '@/components/screens/ReservationScreen.vue'

import { screenOf, stepOf, useHistory } from '@/composables/useHistory.js'
import { useFormState } from '@/composables/useFormState.js'
import { useVisualViewport } from '@/composables/useVisualViewport.js'
import { getResultType } from '@/logic/getResultType.js'
import { INSTAGRAM_IMAGES } from '@/data/instagram.js'

// ── 화면 전환: Vue Router 없이 히스토리 스택으로만 관리 ──
// 스택 엔트리: 'cover' | 'form:0' … 'form:4' | 'result' | 'purpose' | 'beans' | 'reservation'
const { current, currentScreen, canGoBack, direction, go, back, reset, screenClass } =
  useHistory('cover')

// ── 인스타그램 이미지 팝업 ──
const instaOpen = ref(false)

// ── 폼지 상태 ──
const { QUESTIONS, answers, select, payload, reset: resetForm } = useFormState()

// 화면을 벗어나도 마지막 문항을 유지하기 위해 별도 보관
const formStep = ref(0)
watch(current, (entry) => {
  if (screenOf(entry) !== 'form') return
  const step = stepOf(entry)
  if (step !== null && !Number.isNaN(step)) formStep.value = step
})

const startForm = () => go('form:0')

// 첫 화면으로 이동 시, 이전에 고르던 선택지도 함께 초기화한다
function goHome() {
  reset()
  resetForm()
  formStep.value = 0
}

function nextQuestion() {
  const step = formStep.value
  if (step < QUESTIONS.length - 1) go(`form:${step + 1}`)
  else go('result')
}

// ── 결과 ──
// 판정 로직은 아직 비어 있다 (getResultType 내부 TODO)
const resultBean = computed(() => getResultType(payload.value))

// ── 모바일 키보드 대응 (visualViewport → --app-height) ──
useVisualViewport()
</script>
