// ─────────────────────────────────────────────
//  목적 · 취지 캐러셀 — 더미 콘텐츠
//
//  구조:
//  { id, step, title, body, accent, image }
//   - accent : 1:1 카드 배경 톤 (팔레트 기반)
//   - image  : 비어 있으면 SCSS 도형 placeholder 로 대체
// ─────────────────────────────────────────────

export const PURPOSE_SLIDES = [
  {
    id: 'p1',
    step: 'About 01',
    title: '왜 원두 성향을\n물어보게 되었나',
    body: '사람마다 좋아하는 맛이 다른데,\n커피는 늘 같은 이름으로만 불렸습니다.\n취향을 언어로 만들어보고 싶었어요.',
    image: '/images/purpose1.jpg',
  },
  {
    id: 'p2',
    step: 'About 02',
    title: '아홉 가지 성향으로\n나눈 이유',
    body: '너무 좁으면 나를 담지 못하고,\n너무 넓으면 아무 말도 되지 않습니다.\n그 사이의 균형점을 찾았습니다.',
    image: '/images/purpose2.jpg',
  },
  {
    id: 'p3',
    step: 'About 03',
    title: '이 진단이\n닿았으면 하는 곳',
    body: '결과가 정답이 되기보다는,\n다음 한 잔을 고르는 작은 힌트가 되기를\n바라며 만들었습니다.',
    image: '/images/purpose3.jpg',
  },
  {
    id: 'p4',
    step: 'About 04',
    title: '함께 만들어가는\n취향의 기록',
    body: '응답 하나하나가 다음 시즌의 원두를\n고르는 기준이 됩니다.\n당신의 취향이 곧 재료입니다.',
    image: '/images/purpose4.jpg',
  },
]
