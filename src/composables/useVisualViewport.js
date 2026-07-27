import { onBeforeUnmount, onMounted } from 'vue'

// ─────────────────────────────────────────────
//  모바일 키보드 대응
//
//  페이지 전체가 overflow: hidden 이라 키보드가 올라와도 스크롤이 불가능하고,
//  입력창이 키보드 뒤로 가려진다.
//  → visualViewport 의 resize 를 구독해 --app-height 를 실제 보이는 높이로 보정한다.
//    .wrap_app 가 height: var(--app-height, 100dvh) 를 쓰므로
//    컨테이너가 줄어들고 내부 flex 비율로 입력창이 다시 화면 안에 들어온다.
// ─────────────────────────────────────────────

const KEYBOARD_THRESHOLD = 0.85 // 뷰포트가 이 비율 미만이면 키보드가 올라온 것으로 판단

export function useVisualViewport() {
  const root = () => document.documentElement

  function apply() {
    const vv = window.visualViewport
    if (!vv) return

    const full = window.innerHeight
    const visible = vv.height

    if (visible < full * KEYBOARD_THRESHOLD) {
      // 키보드 노출 — 보이는 높이로 컨테이너를 줄인다
      root().style.setProperty('--app-height', `${Math.round(visible)}px`)
      root().dataset.keyboard = 'open'
    } else {
      // 키보드 내려감 — dvh 기본값으로 복귀
      root().style.removeProperty('--app-height')
      delete root().dataset.keyboard
    }
  }

  function onScroll() {
    // iOS 는 키보드가 뜰 때 페이지 자체를 밀어올린다 → 원위치로 되돌림
    if (window.scrollY !== 0) window.scrollTo(0, 0)
    apply()
  }

  onMounted(() => {
    const vv = window.visualViewport
    if (!vv) return
    vv.addEventListener('resize', apply)
    vv.addEventListener('scroll', onScroll)
    apply()
  })

  onBeforeUnmount(() => {
    const vv = window.visualViewport
    if (!vv) return
    vv.removeEventListener('resize', apply)
    vv.removeEventListener('scroll', onScroll)
    root().style.removeProperty('--app-height')
    delete root().dataset.keyboard
  })
}
