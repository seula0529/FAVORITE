# FAVORITE — 원두 성향 진단 프로모션 페이지

Vue 3 (`<script setup>`) + Vite + 순수 SCSS. 모바일 전용, 1화면 고정(스크롤 없음).

```bash
npm install
npm run dev      # 개발
npm run build    # 빌드
npm run preview  # 빌드 결과 확인
```

## 이번 단계 범위

**화면 전환 골격 + 레이아웃까지.** 결과 판정 로직은 자리만 비워둔 상태다.

- `src/logic/getResultType.js` — 내부는 TODO 주석. 현재는 항상 `BEANS[0]` 반환
- 모든 문구/데이터는 `src/data/` 의 더미 콘텐츠. 컴포넌트에는 하드코딩 없음

## 구조

```
src/
├─ App.vue                    히스토리 스택 + 화면 전환 래퍼
├─ components/
│  ├─ screens/                화면 6개
│  └─ common/                 헤더 · 버튼 · Pill Badge · 캐릭터 · 토스트 · 인스타 링크
├─ composables/
│  ├─ useHistory.js           화면 스택 (Vue Router 미사용)
│  ├─ useFormState.js         폼지 체크형 문항 상태
│  ├─ useClipboard.js         복사 + execCommand 폴백
│  └─ useVisualViewport.js    모바일 키보드 대응
├─ data/                      콘텐츠 더미 (beans / questions / purpose / cover / result / reservation)
├─ logic/getResultType.js     ⚠️ 결과 판정 — 미구현
└─ styles/                    _variables · _fonts · _reset · main
```

## 화면 전환

`cover → form → result → purpose → beans → reservation`

Vue Router 없이 최상위에서 배열 스택으로만 관리한다.
폼지 문항 이동도 같은 스택에 쌓여서(`form:0` … `form:4`) back 이 이전 문항으로 돌아간다.
커버의 두 번째 CTA 는 `reservation` 으로 직행하며, back 한 번에 커버로 복귀한다.

전환 애니메이션은 기존 yourFavoriteBean 방식을 그대로 따랐다.
화면 6개를 모두 마운트해 두고 `active / above / below` 클래스로 `translateY` 시킨다
(`src/styles/main.scss`). 새 화면은 아래에서 위로 올라온다.

스와이프 제스처로는 화면을 넘기지 않는다. Swiper 는 `purpose` · `beans` 내부 캐러셀 전용.

## 채워야 할 것

지시서에서 비어 있던 두 항목은 아래 상태로 남겨두었다.

### 1. 폰트 파일

`public/fonts/README.md` 참고. 파일명만 맞춰 넣으면 바로 적용된다.
`src/assets/` 가 아니라 `public/` 에 둔 이유도 거기 적어두었다.
(파일이 없는 동안은 시스템 폰트로 폴백되며 빌드는 통과한다.)

### 2. TM 문자 양식 원문

`src/data/reservation.js` 의 `TEMPLATE` 이 임시 문구다.
실제 양식으로 통째로 교체하되 `{이름} {연락처} {나이} {MBTI}` 토큰만 유지하면
프리뷰 치환은 그대로 동작한다.

### 3. 캐릭터 이미지

`src/data/beans.js` / `purpose.js` / `cover.js` 의 `image` 가 빈 문자열이면
SCSS 도형 placeholder 가 렌더된다. 경로를 넣으면 `<img>` 로 자동 교체된다
(`src/components/common/BeanCharacter.vue`).

## 배포 경로

`vite.config.js` 의 `base` 를 서브 경로로 바꾸면
`src/styles/_fonts.scss` 의 `url('/fonts/...')` 도 함께 맞춰야 한다.
