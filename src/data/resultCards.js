// ─────────────────────────────────────────────
//  폼지 결과 카드 — 원두 성향 9종과 무관한 별도의 결과 이미지 (4종)
//
//  ResultScreen 의 뽑기 카드에 쓰인다. 텍스트/패턴 없이 이미지만 노출되며,
//  어떤 원두 성향이 나오든 이 4종 중 하나가 무작위로 뽑힌다.
//
//  카드 한 장은 앞면/뒷면 이미지 한 쌍으로 구성된다.
//   - frontImage : 카드 앞면. 화면 진입 시 뒤집기 전 바로 보이는 면
//   - backImage  : 카드 뒷면. 클릭/터치로 카드를 뒤집으면 보이는 면
// ─────────────────────────────────────────────

export const RESULT_CARDS = [
  {
    id: 1,
    frontImage: '/images/summ_bean_type11.jpg',
    backImage: '/images/summ_bean_type12.jpg',
  },
  {
    id: 2,
    frontImage: '/images/summ_bean_type21.jpg',
    backImage: '/images/summ_bean_type22.jpg',
  },
  {
    id: 3,
    frontImage: '/images/summ_bean_type31.jpg',
    backImage: '/images/summ_bean_type32.jpg',
  },
  {
    id: 4,
    frontImage: '/images/summ_bean_type41.jpg',
    backImage: '/images/summ_bean_type42.jpg',
  },
]

export const pickResultCard = () =>
  RESULT_CARDS[Math.floor(Math.random() * RESULT_CARDS.length)]
