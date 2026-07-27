# 폰트 파일 배치 위치

CDN을 쓰지 않으므로 아래 파일들을 **이 폴더에 그대로** 넣어주세요.
`src/styles/_fonts.scss` 가 참조하는 파일명과 정확히 일치해야 합니다.

## 본문 — Pretendard

- `Pretendard-Regular.woff2` (400)
- `Pretendard-Medium.woff2` (500)
- `Pretendard-SemiBold.woff2` (600)
- `Pretendard-Bold.woff2` (700)

## 타이틀 / 강조 — Spoqa Han Sans Neo

- `SpoqaHanSansNeo-Regular.otf` (400)
- `SpoqaHanSansNeo-Medium.otf` (500)
- `SpoqaHanSansNeo-Bold.otf` (700)

---

## 왜 `src/assets/fonts/` 가 아니라 `public/fonts/` 인가

`src/assets` 아래 경로는 Vite가 번들링 시점에 실제 파일을 찾습니다.
아직 파일이 없는 상태라 그대로 두면 `Failed to resolve` 로 빌드가 깨집니다.
`public/` 은 가공 없이 그대로 서빙되므로, **파일이 없어도 빌드가 통과하고
파일을 넣는 순간 바로 적용**됩니다.

파일이 없는 동안에는 `_fonts.scss` 의 `local()` → 시스템 폰트 순으로
폴백되므로 레이아웃 검증에는 지장이 없습니다.

## 배포 경로 주의

`vite.config.js` 의 `base` 를 `'/'` 이외의 값(예: `'/FAVORITE/'`)으로 바꾸면
`_fonts.scss` 안의 `url('/fonts/...')` 도 `url('/FAVORITE/fonts/...')` 로
함께 바꿔야 합니다.
