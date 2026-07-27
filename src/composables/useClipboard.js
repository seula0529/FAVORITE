import { ref } from 'vue'

// ─────────────────────────────────────────────
//  클립보드 복사
//  navigator.clipboard 우선, 실패 시 textarea + execCommand('copy') fallback
// ─────────────────────────────────────────────

function legacyCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  // 화면 밖으로 밀되 스크롤/레이아웃에 영향을 주지 않도록
  ta.setAttribute('readonly', '')
  ta.style.position = 'absolute'
  ta.style.top = '0'
  ta.style.left = '-9999px'
  ta.style.opacity = '0'
  document.body.appendChild(ta)

  // iOS Safari 대응: setSelectionRange 필요
  const selection = document.getSelection()
  const savedRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  ta.select()
  ta.setSelectionRange(0, ta.value.length)

  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }

  document.body.removeChild(ta)
  if (savedRange && selection) {
    selection.removeAllRanges()
    selection.addRange(savedRange)
  }
  return ok
}

export function useClipboard() {
  const copied = ref(false)

  async function copy(text) {
    if (!text) return false

    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        copied.value = true
        return true
      } catch {
        // 권한 거부 / 비활성 문서 등 → fallback 으로 계속 진행
      }
    }

    const ok = legacyCopy(text)
    copied.value = ok
    return ok
  }

  return { copy, copied }
}
