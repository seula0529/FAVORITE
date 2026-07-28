// ─────────────────────────────────────────────
//  예약문자 입력 화면 — 더미 콘텐츠
//
//  ⚠️ TEMPLATE 은 실제 TM 문자 양식이 확정되면 그대로 갈아끼우면 된다.
//     치환부는 {이름} {연락처} {나이} {MBTI} 토큰만 유지할 것.
// ─────────────────────────────────────────────

export const FIELDS = [
  {
    key: 'name',
    label: '이름',
    placeholder: '홍길동',
    type: 'text',
    inputmode: 'text',
    autocomplete: 'name',
    maxlength: 20,
  },
  {
    key: 'phone',
    label: '연락처',
    placeholder: '010-0000-0000',
    type: 'tel',
    inputmode: 'tel',
    autocomplete: 'tel',
    maxlength: 13,
  },
  {
    key: 'age',
    label: '나이',
    placeholder: '28',
    type: 'text',
    inputmode: 'numeric',
    autocomplete: 'off',
    maxlength: 3,
  },
  {
    key: 'mbti',
    label: 'MBTI',
    placeholder: 'ENFP',
    type: 'text',
    inputmode: 'text',
    autocomplete: 'off',
    maxlength: 4,
  },
]

// 입력 필드 key ↔ 템플릿 토큰 매핑
export const TOKEN_MAP = {
  name: '{이름}',
}

// TODO: 실제 TM 문자 양식 원문으로 교체
export const TEMPLATE = `[페이보릿 예약 안내]

{이름}님, 안녕하세요.
FAVORITE 원두 시향에 참여해 주셔서 감사합니다.

· 일시 : 
· 장소 : 

문자 확인 시 회신 부탁드립니다.
회신 시 예약이 확정됩니다.

문의는 본 번호로 부탁드립니다.
감사합니다.`

// 미입력 시 프리뷰에 표시할 값
export const EMPTY_MARK = '—'

export const NOTICE = '저장·전송되지 않습니다'

// 개인정보 수집·이용 동의 — 동의해야 전송 버튼이 활성화된다
export const CONSENT = {
  text: '입력하신 이름, 연락처, 나이, MBTI는 원두 시향 예약 안내 목적으로만 사용되며, 시향 이후 개인정보는 즉시 파기됩니다. 본 개인정보 수집·이용에 동의하지 않으실 수 있으나, 미동의 시 예약 문자 전송이 제한됩니다.',
  label: '개인정보 수집 및 이용에 동의합니다.',
}
