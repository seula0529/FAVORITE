// ─────────────────────────────────────────────
//  진단 폼지 문항 (확정 문구)
//  한 화면에 한 문항씩 노출된다.
//
//  구조:
//  { id, label, text, options: [{ value, label }] }
//   - value 는 보기 순서 기준의 고정 키(a~d).
//     문구가 바뀌어도 키는 그대로 유지되므로,
//     결과 판정(getResultType)에서 이 키에 가중치를 붙이면 된다.
// ─────────────────────────────────────────────

export const QUESTIONS = [
  {
    id: 'q1',
    label: 'Question 01',
    text: '새로운 카페를 발견한 나는?',
    options: [
      { value: 'a', label: '원두, 추출방식, 후기부터 찾아본다' },
      { value: 'b', label: '일단 들어가본다' },
      { value: 'c', label: '사람이 많으면 다음에 간다' },
      { value: 'd', label: '익숙한 단골 카페로 간다' },
    ],
  },
  {
    id: 'q2',
    label: 'Question 02',
    text: '쉬는 날 가장 끌리는 시간은?',
    options: [
      { value: 'a', label: '혼자 조용히 보내기' },
      { value: 'b', label: '친구들과 수다 떨기' },
      { value: 'c', label: '새로운 곳 가보기' },
      { value: 'd', label: '집에서 푹 쉬기' },
    ],
  },
  {
    id: 'q3',
    label: 'Question 03',
    text: '카페에서 가장 중요한 것은?',
    options: [
      { value: 'a', label: '원두와 추출 방식' },
      { value: 'b', label: '분위기와 새로운 메뉴' },
      { value: 'c', label: '익숙한 공간과 편안함' },
      { value: 'd', label: '함께 갈 사람' },
    ],
  },
  {
    id: 'q4',
    label: 'Question 04',
    text: '커피 마시는 이유는?',
    options: [
      { value: 'a', label: '맛과 향을 즐기기 위해' },
      { value: 'b', label: '기분 전환' },
      { value: 'c', label: '휴식' },
      { value: 'd', label: '사람들과 이야기하기 위해' },
    ],
  },
  {
    id: 'q5',
    label: 'Question 05',
    text: '새로운 메뉴를 보면',
    options: [
      { value: 'a', label: '리뷰를 먼저 찾아본다' },
      { value: 'b', label: '무조건 도전' },
      { value: 'c', label: '익숙한 메뉴 주문' },
      { value: 'd', label: '추천받은 메뉴 선택' },
    ],
  },
]

export const QUESTION_TOTAL = QUESTIONS.length
