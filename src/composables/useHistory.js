import { computed, ref } from 'vue'

// ─────────────────────────────────────────────
//  화면 히스토리 스택
//  Vue Router 를 쓰지 않고 최상위 컴포넌트에서 상태로만 관리한다.
//
//  스택 엔트리는 문자열이며, 서브 스텝이 있는 화면은 'form:2' 처럼 콜론으로 구분한다.
//  → 폼지 문항 이동도 같은 스택에 쌓이므로 back 이 이전 문항으로 돌아간다.
// ─────────────────────────────────────────────

// 전환 방향(above/below) 계산용 화면 순서
export const SCREEN_ORDER = [
  'cover',
  'form',
  'result',
  'purpose',
  'beans',
  'reservation',
]

export const screenOf = (entry) => String(entry).split(':')[0]
export const stepOf = (entry) => {
  const step = String(entry).split(':')[1]
  return step === undefined ? null : Number(step)
}

export function useHistory(initial = 'cover') {
  const history = ref([initial])

  const current = computed(() => history.value[history.value.length - 1])
  const currentScreen = computed(() => screenOf(current.value))
  const currentStep = computed(() => stepOf(current.value))
  const canGoBack = computed(() => history.value.length > 1)

  // 전환 방향: push=forward(아래→위), pop=reverse(위→아래)
  const direction = ref('forward')

  const go = (screen) => {
    if (screen === current.value) return
    direction.value = 'forward'
    history.value.push(screen)
  }

  const back = () => {
    if (history.value.length > 1) {
      direction.value = 'reverse'
      history.value.pop()
    }
  }

  const reset = () => {
    direction.value = 'reverse'
    history.value = [initial]
  }

  // 화면 스택 위치 클래스 (기존 프로젝트의 slideClass 와 동일한 규칙)
  const screenClass = (screen) => {
    if (screen === currentScreen.value) return 'active'
    const a = SCREEN_ORDER.indexOf(screen)
    const b = SCREEN_ORDER.indexOf(currentScreen.value)
    return a < b ? 'above' : 'below'
  }

  return {
    history,
    current,
    currentScreen,
    currentStep,
    canGoBack,
    direction,
    go,
    back,
    reset,
    screenClass,
  }
}
