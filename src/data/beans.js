// ─────────────────────────────────────────────
//  원두 9종 (확정 콘텐츠)
//
//  구조:
//  { id, typeNo, emoji, subtitle, nameKo, nameEn, image,
//    gradient: [색1, 색2], ink, tags: ['','',''], pursuit }
//
//   - subtitle : 유형 이름 → 카드 상단 `Type 01. 개혁가`
//   - nameKo/En: 캐릭터 이름 → 카드 하단 `밸런서 Balancer`
//   - image    : 캐릭터 플랫 그래픽. 빈 문자열이면 SCSS 도형 placeholder 가 렌더된다.
//   - gradient : 카드 배경 2톤 대각선 그라데이션 [시작, 끝]
//   - ink      : 그 배경 위에 얹을 글자색 계열. 'dark' | 'light'
//                밝은 그라데이션(케어러·챌린저 등)에 흰 글자를 쓰면 안 읽히므로
//                유형별로 명시한다. Pill Badge · 캐릭터 톤도 이 값을 따라간다.
//   - tags     : 카드 최하단 Pill Badge 3개 (대표향 / 보조향 / 추구미)
//   - pursuit  : 추구미 원문 — 결과 화면 설명 문구로 사용
// ─────────────────────────────────────────────

export const BEANS = [
  {
    id: 'balancer',
    typeNo: '01',
    emoji: '🌰',
    subtitle: '개혁가',
    nameKo: '밸런서',
    nameEn: 'Balancer',
    image: '/images/bean_type1.png',
    // Warm Taupe → Soft Chocolate : 느림과 차분함, 균형 잡힌 딥 브라운 톤
    gradient: ['#D7CCC8', '#8D6E63'],
    ink: 'dark',
    tags: ['대표향 · 너티', '보조향 · 초콜릿 캐러멜 우디', '추구미 · 균형 잡힌 한 잔'],
    pursuit: '균형 잡힌 한 잔을 추구하는 사람',
  },
  {
    id: 'carer',
    typeNo: '02',
    emoji: '🍯',
    subtitle: '조력가',
    nameKo: '케어러',
    nameEn: 'Carer',
    image: '/images/bean_type2.png',
    // Sweet Honey Yellow → Warm Peach : 따뜻하고 달콤한 파스텔 옐로우 오렌지
    gradient: ['#FFF59D', '#FFCC80'],
    ink: 'dark',
    tags: ['대표향 · 허니', '보조향 · 플로럴 캐러멜 복숭아', '추구미 · 따뜻한 온기를 나누는 한 잔'],
    pursuit: '따뜻한 온기를 나누는 한 잔을 추구하는 사람',
  },
  {
    id: 'challenger',
    typeNo: '03',
    emoji: '🍋',
    subtitle: '성취가',
    nameKo: '챌린저',
    nameEn: 'Challenger',
    image: '/images/bean_type3.png',
    // Bright Citrus Yellow → Vivid Red Orange : 톡 쏘는 에너지와 생기
    gradient: ['#FFEE58', '#FF7043'],
    ink: 'dark',
    tags: ['대표향 · 시트러스', '보조향 · 오렌지 사과 레드베리', '추구미 · 활력을 채워주는 한 잔'],
    pursuit: '활력을 채워주는 한 잔을 추구하는 사람',
  },
  {
    id: 'creator',
    typeNo: '04',
    emoji: '🌼',
    subtitle: '예술가',
    nameKo: '크리에이터',
    nameEn: 'Creator',
    image: '/images/bean_type4.png',
    // Soft Lavender → Berry Purple : 감성적이고 감각적인 보랏빛 플로럴 톤
    gradient: ['#E1BEE7', '#AB47BC'],
    ink: 'dark',
    tags: ['대표향 · 플로럴', '보조향 · 자스민 복숭아 블루베리', '추구미 · 나만의 개성을 담은 한 잔'],
    pursuit: '나만의 개성을 담은 한 잔을 추구하는 사람',
  },
  {
    id: 'deep-diver',
    typeNo: '05',
    emoji: '🍫',
    subtitle: '사색가',
    nameKo: '딥다이버',
    nameEn: 'Deep Diver',
    image: '/images/bean_type5.png',
    // Deep Espresso → Dark Slate Gray : 깊이감 있고 지적인 묵직한 다크 톤
    gradient: ['#4E342E', '#37474F'],
    ink: 'light',
    tags: ['대표향 · 다크초콜릿', '보조향 · 우디 허브 아몬드', '추구미 · 깊이 있는 풍미'],
    pursuit: '깊이 있는 풍미를 음미하는 사람',
  },
  {
    id: 'guardian',
    typeNo: '06',
    emoji: '🌲',
    subtitle: '충성가',
    nameKo: '가디언',
    nameEn: 'Guardian',
    image: '/images/bean_type6.png',
    // Muted Forest Green → Deep Olive : 안정감과 신뢰를 주는 우디 그린 톤
    gradient: ['#A5D6A7', '#558B2F'],
    ink: 'dark',
    tags: ['대표향 · 너티', '보조향 · 캐러멜 밀크초콜릿 우디', '추구미 · 익숙하고 편안한 한 잔'],
    pursuit: '익숙하고 편안한 한 잔을 찾는 사람',
  },
  {
    id: 'explorer',
    typeNo: '07',
    emoji: '🍓',
    subtitle: '열정가',
    nameKo: '익스플로러',
    nameEn: 'Explorer',
    image: '/images/bean_type7.png',
    // Bright Coral Pink → Tropical Orange : 설렘과 상큼함이 터지는 베리 톤
    gradient: ['#FF8A80', '#FFA726'],
    ink: 'dark',
    tags: ['대표향 · 베리', '보조향 · 열대과일 레몬 망고', '추구미 · 설렘과 즐거움을 주는 한 잔'],
    pursuit: '설렘과 즐거움을 주는 한 잔을 찾는 사람',
  },
  {
    id: 'leader',
    typeNo: '08',
    emoji: '🌶',
    subtitle: '도전가',
    nameKo: '리더',
    nameEn: 'Leader',
    image: '/images/bean_type8.png',
    // Smoky Crimson → Heavy Charcoal : 강렬한 존재감과 스모키한 딥 레드 블랙
    gradient: ['#EF5350', '#424242'],
    ink: 'light',
    tags: ['대표향 · 스파이시', '보조향 · 다크초콜릿 오크 스모키', '추구미 · 강렬한 존재감'],
    pursuit: '강렬한 존재감을 가진 한 잔을 즐기는 사람',
  },
  {
    id: 'harmony',
    typeNo: '09',
    emoji: '🌿',
    subtitle: '화합가',
    nameKo: '하모니',
    nameEn: 'Harmony',
    image: '/images/bean_type9.png',
    // Soft Sage Green → Soft Sky Blue : 마음이 편안해지는 은은한 자연의 파스텔 톤
    gradient: ['#C8E6C9', '#B3E5FC'],
    ink: 'dark',
    tags: ['대표향 · 허브', '보조향 · 허니 플로럴 배', '추구미 · 마음을 편안하게 하는 한 잔'],
    pursuit: '마음을 편안하게 하는 한 잔을 즐기는 사람',
  },
]

export const findBeanById = (id) => BEANS.find((bean) => bean.id === id) ?? BEANS[0]
