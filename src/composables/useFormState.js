import { computed, ref } from 'vue'
import { QUESTIONS, QUESTION_TOTAL } from '@/data/questions.js'

// ─────────────────────────────────────────────
//  폼지 체크형 질문 상태 관리
//  (기존 yourFavoriteBean / coffeeGacha 의 useFormState 구조를 따름)
//
//  화면 이동 자체는 App.vue 의 히스토리 스택이 담당하고,
//  여기서는 "답변 수집"만 책임진다.
// ─────────────────────────────────────────────

export function useFormState() {
  // 문항별 선택값. 단일 선택이므로 문자열, 미선택은 ''
  const answers = ref(QUESTIONS.map(() => ''))

  const isSelected = (qIndex, value) => answers.value[qIndex] === value

  const select = (qIndex, value) => {
    answers.value[qIndex] = value
  }

  const hasAnswer = (qIndex) => !!answers.value[qIndex]

  // 진행 표시 (현재/전체)
  const progressOf = (qIndex) => ({
    current: qIndex + 1,
    total: QUESTION_TOTAL,
  })

  const answeredCount = computed(
    () => answers.value.filter((a) => !!a).length,
  )

  const isComplete = computed(() => answeredCount.value === QUESTION_TOTAL)

  const reset = () => {
    answers.value = QUESTIONS.map(() => '')
  }

  // 결과 판정에 넘길 형태: [{ id, value }]
  const payload = computed(() =>
    QUESTIONS.map((q, i) => ({ id: q.id, value: answers.value[i] })),
  )

  return {
    QUESTIONS,
    QUESTION_TOTAL,
    answers,
    isSelected,
    select,
    hasAnswer,
    progressOf,
    answeredCount,
    isComplete,
    payload,
    reset,
  }
}
