# CSS writing Guide
CSS 작성 가이드(셀렉터·값 표기·포맷·속성 선언 순서).

## 셀렉터 규칙
- 공통 클래스(ex. .tit_main, .txt_err)와 컴포넌트/섹션 최상위 클래스(ex. .section_main)는 셀렉터 1개로 작성
- 2뎁스 권장, 구조상 필요시 3~4뎁스 허용(ex. .section_main .tit_main, .footer_main .dl_info dt)
- 타입/상태 모디파이어 클래스는 기본 클래스에 체이닝(ex. .tag_sort.tag_type1, .tag_approval.on)
- ID 선택자 금지

## 값 표기
- !important 금지
- 0 뒤 단위 생략: padding: 0 (예외: flex 축약속성은 단위 유지 → flex: 1 1 0px)
- 소수점 앞 0 생략: opacity: 0.6 (X) → opacity: .6 (O), rgba(0, 0, 0, .6)
- 색상 hex 값은 소문자로 작성하고, 6자리가 모두 같은 문자일 때만 3자리로 축약: #FFFFFF (X) → #fff (O), #ff0000 → #f00으로 축약하지 않고 그대로 사용
- 색상 값이 해당 요소의 글자색과 동일하면 currentColor 사용(ex. color: #121212;border: 1px solid currentColor)
- 크기 단위는 px, % 등 상황에 맞게 판단해 사용
- background 이미지 경로에 따옴표 금지: background: url(https://placehold.co/400x200) 0 0 no-repeat
- font 축약속성 금지, 개별 작성: font: 700 24px/1.4 Pretendard (X) → font-weight: 700;font-size: 24px;line-height: 34px;font-family: Pretendard (O)
- line-height는 배수 금지, px 값 사용: 1.4 (X) → 34px (O)

## 포맷
- 속성은 개행 없이 1줄로 작성: .tit_main{display: flex;align-items: center;padding-bottom: 10px}
- 개행하여 작성된 속성/변수는 값 뒤에 항상 세미콜론을 붙인다
- 쉼표로 셀렉터 그룹핑 시 셀렉터마다 개행
- 섹션/컴포넌트 시작마다 /* 섹션명 */ 주석 작성
- CSS 변수는 다음 경우에 작성
  - 하나의 값 변경 시 여러 곳이 함께 변경되어야 하는 의미적으로 연결된 값(대략 3곳 이상 기준, 함께 바뀌는 값이면 2곳도 허용)
  - 미디어쿼리·테마·모디파이어에서 값이 재정의되는 경우(사용 횟수 무관)
  - 우연히 같은 값이 반복될 뿐인 경우는 변수화하지 않는다
- CSS 변수는 컴포넌트 최상위 선택자와 동일한 셀렉터를 하나 더 선언하여 변수 전용 블록으로 분리해 작성. 변수 전용 블록은 일반 속성 블록 바로 위에 두고, 변수는 한 줄에 하나씩 개행
  ```css
  .section_visual{
    --visual-gap: 20px;
    --visual-color: #1a1a1a;
  }
  .section_visual{position: relative;padding: 60px 0;background: #f7f8fa}
  ```
- 미디어쿼리·테마·모디파이어에서 값이 바뀔 때는 일반 속성을 재선언하지 않고 같은 변수명을 재정의(오버라이딩)하는 방식을 기본으로 한다
  ```css
  @media (min-width: 768px){
    .section_visual{--visual-gap: 32px}
  }
  ```
- 미디어쿼리는 min-width 사용(모바일 first), 브레이크포인트는 768, 1200, 1400 세 개만 사용. 섹션/컴포넌트 단위로 작성하며, 각 섹션의 일반 셀렉터들 바로 아래에 해당 섹션의 분기만 오름차순으로 작성하고, 여러 섹션의 분기를 파일 하단 하나의 미디어쿼리에 모아 작성하지 않는다(X). 미디어쿼리 블록 안에도 /* 섹션명 */ 주석을 작성해 가독성을 확보한다. 블록 내부 속성도 1줄 규칙 동일 적용
  ```css
  /* 이용안내 */
  .section_use{padding: 32px 0}
  .section_use .tit_use{font-size: 18px;line-height: 26px}

  @media (min-width: 768px){
    /* 이용안내 */
    .section_use{padding: 44px 0}
  }
  @media (min-width: 1200px){
    /* 이용안내 */
    .section_use .tit_use{font-size: 22px;line-height: 32px}
  }

  /* 미술관소식 */
  .section_news{padding: 48px 0}

  @media (min-width: 1200px){
    /* 미술관소식 */
    .section_news{padding: 72px 0}
  }
  ```
- 콘텐츠 컨테이너는 시안 콘텐츠 너비를 max-width로 고정하고 box-sizing: content-box로 작성해, 좌우 여백은 분기별 padding 오버라이딩으로만 처리한다. 모바일 기본 padding은 시안 기준, 768/1200 분기는 해당 분기 시안의 여백에 맞게 조절, 1400 분기는 스크롤바 폭을 감안해 padding: 0 10px로 오버라이딩
  ```css
  .inner_comm{max-width: 1400px;margin: 0 auto;padding: 0 15px;box-sizing: content-box}

  @media (min-width: 768px){
    .inner_comm{padding: 0 30px}
  }
  @media (min-width: 1400px){
    .inner_comm{padding: 0 10px}
  }
  ```

## 속성 선언 순서
flex 축약·order → display → flex-direction·flex-wrap·gap·justify-*·align-* → grid-template-* → overflow → float → position·top/right/bottom/left·z-index → width → height → min/max-width → min/max-height → margin → padding → border·border-radius → font(weight → size → line-height → family 순) → color → background → ETC(transform, opacity, visibility, text-overflow, white-space 등) → content
