# CSS Naming Guide

CSS 클래스 네이밍 가이드.

## 네이밍 철칙
- snake_case로 형태_의미 형식(ex. tit_txt, box_desc, area_form). _는 1회 권장, 유니크한 네이밍이 필요한 경우 최대 2회까지 허용
- 아래 샘플 네이밍을 최대한 준수하고 없는 부분은 형태_상태(또는 의미) 형식에 맞춰 자유롭게 작성
- 클래스 네이밍은 프로젝트 전역에서 유니크하게 작성. list_, area_, wrap_ 등 범용 접두사 + 일반 단어 조합의 짧은 네이밍은 서브 페이지 확장 시 충돌 위험이 있으므로 섹션/도메인 컨텍스트를 포함해 구체적으로 작성(ex. .list_use (X) → .list_main_use (O)). 특히 셀렉터 1뎁스(단일 셀렉터)로 사용하는 클래스는 유니크한 네이밍 필수

## 샘플 네이밍

### Prefix — 요소의 형태 표현, 네이밍 앞에 사용
- 레이아웃: wrap·area·group·container·layout·section(영역/레이아웃), main(메인), cont(콘텐츠), page(페이지), inner(컨테이너 안쪽 폭 제한), side(사이드), grid·col·row(그리드/컬럼), box·frame(박스/프레임)
- 헤더/푸터: header, footer
- 내비게이션: menu·nav(메뉴), gnb(global nav), lnb(local nav), snb(side nav), breadcrumb(브레드크럼), paging(페이징), quick(퀵메뉴)
- UI 컴포넌트: btn(버튼), ico(아이콘), img·thumb(이미지), logo, list, tbl(테이블), form·field(폼), inp·select·chk(입력 요소), label, link, visual(비주얼 영역), card(카드형 모듈), noti·alarm(공지/알림), accordion, tooltip, progress, bnr(배너), search(검색), cmt·reply(댓글), tag, toggle
- 모달/팝업: modal·layer(모달/레이어), popup(팝업)
- 미디어/콘텐츠: slide(슬라이드), vod(비디오), aud(오디오), gal(갤러리), txt(텍스트), tit(제목), desc(상세 설명), bg(배경)
- 기타: util·help(유틸), hide(숨김), err·warn(에러), load(로딩), info(정보)

### Suffix — 요소를 꾸며주는 용도, 중간 또는 마지막에 작성
- 크기/레이아웃: xsm·sm·md·lg·xl·xxl(크기), full(전체), half(반), auto(오토), fix·fixed(고정)
- 위치: top·bottom·left·right(상하좌우), center(중앙), start(시작), end(끝), vert(수직), horz(수평)
- 유형/컴포넌트: txt(텍스트), ico(아이콘), item(아이템), tit(제목), desc(설명), label(라벨), media(미디어), thumb(썸네일), info(정보)
- 기타: fst(첫번째), lst(마지막), child(자식 요소), parent(부모 요소), nested(중첩됨), bg(배경), del(삭제)

### Modifier — 요소의 상태 표현, 기본 클래스에 체이닝으로 추가
- active(활성화), disabled(비활성화), on(토글 상태), selected(선택됨), hover·hovered(호버), focus·focused(포커스), open(열림), close(닫힘), expand·expanded(확장됨), err(에러), press·pressed(눌림), fix·fixed(고정됨)

가이드에 없는 Prefix/Suffix/Modifier는 각 역할(형태 표현/꾸밈/상태)에 맞춰 자유롭게 작성.
