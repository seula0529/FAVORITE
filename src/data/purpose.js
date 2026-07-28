// ─────────────────────────────────────────────
//  목적 · 취지 캐러셀
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
    title: '광주의 새로운 카페 문화',
    body: '광주에는 없던 카페 경험을 만들고 싶었습니다.\n원두 한 잔에 담긴 이야기로 새로운 문화를 제안합니다.',
    image: '/images/img_purpose3.jpg',
  },
  {
    id: 'p2',
    step: 'About 02',
    title: '이색 컨셉 벤치마킹',
    body: '성수, 제주 등 전국의 특색 있는 카페를 직접 찾아다니며\n우리만의 오마카세 경험을 구상했습니다.',
    image: '/images/img_purpose2.jpg',
  },
  {
    id: 'p3',
    step: 'About 03',
    title: '다양한 콘텐츠 실험',
    body: '방송, SNS 등 다양한 채널의 이야기를 참고하며\n원두 진단이라는 새로운 콘텐츠를 실험했습니다.',
    image: '/images/img_purpose1.jpg',
  },
  {
    id: 'p4',
    step: 'About 04',
    title: '지속적인 도전과 검증',
    body: '광주에 없던 카페 경험을 만들기 위해\n끊임없이 벤치마킹하고 도전하며 검증을 거듭합니다.',
    image: '/images/img_purpose4.jpg',
  },
]
