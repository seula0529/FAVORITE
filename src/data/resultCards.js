// ─────────────────────────────────────────────
//  폼지 결과 카드 — 원두 성향 9종과 무관한 별도의 결과 이미지 (4종)
//
//  ResultScreen 의 뽑기 카드에 쓰인다. 텍스트/패턴 없이 이미지만 노출되며,
//  폼지(questions.js) 응답에 따라 4종 중 하나가 정해진다.
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

// ─────────────────────────────────────────────
//  응답 → 카드 판정
//
//  questions.js 의 보기들은 대부분 [a: 분석형, b: 모험형, c: 안정형, d: 관계형]
//  순서로 쓰여 있다(2번 문항만 b·c 순서가 바뀜). 그 성향을 그대로 카드 4종에
//  대응시켜, 답변마다 해당 성향 카드에 1점씩 쌓고 최다 득점 카드를 결과로 낸다.
//  동점일 때는 카드 번호가 낮은 쪽을 택해 같은 응답엔 항상 같은 카드가 나오게 한다.
//
//  ※ 공식 심리 척도가 아니라 문항 문구를 바탕으로 설계한 임의의 매핑이다.
//    아래 표만 조정하면 판정 로직 전체를 손댈 필요 없다.
// ─────────────────────────────────────────────

const ANSWER_CARD_MAP = {
  q1: { a: 1, b: 3, c: 4, d: 2 }, // 분석 / 즉흥 / 신중 / 익숙함
  q2: { a: 1, b: 2, c: 3, d: 4 }, // 혼자 / 관계 / 새로움 / 안정
  q3: { a: 1, b: 3, c: 4, d: 2 }, // 분석 / 감각·새로움 / 편안함 / 관계
  q4: { a: 1, b: 3, c: 4, d: 2 }, // 음미 / 전환·모험 / 휴식·안정 / 관계
  q5: { a: 1, b: 3, c: 4, d: 2 }, // 검증 / 도전 / 익숙함 / 추천(관계)
}

export function pickResultCard(answers = []) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0 }

  for (const { id: questionId, value } of answers) {
    const cardId = ANSWER_CARD_MAP[questionId]?.[value]
    if (cardId) scores[cardId] += 1
  }

  const topId = RESULT_CARDS.reduce(
    (best, card) => (scores[card.id] > scores[best] ? card.id : best),
    RESULT_CARDS[0].id,
  )

  return RESULT_CARDS.find((card) => card.id === topId) ?? RESULT_CARDS[0]
}
