# @DanbiEduCorp/axios 1.5.1 → 1.21.1 업그레이드

## 방식

- upstream `v1.21.1` 트리로 통째로 교체한 뒤 사내 커스터마이징만 다시 얹음 (1.5.1 업그레이드 `fdca18f3` 과 같은 방식).
- 머지 방식은 쓰지 않음: 사내 이력이 squash 커밋이라 upstream 과 공통 조상이 맞지 않아 충돌이 대량으로 남.

## 커스터마이징 목록과 처리

| 1.5.1 커스터마이징 | 의도 | 1.21.1 처리 |
| --- | --- | --- |
| `cookies.read` 가 같은 이름 쿠키 중 **마지막 값** 반환 (`896453a8`, `f9935376`) | 상위/하위 도메인에 같은 이름 쿠키(XSRF-TOKEN 등)가 여러 개 있을 때 첫 번째(오래된) 값 대신 마지막 값을 쓰기 위함 | `read` 를 마지막 비어있지 않은 값 반환으로 변경 |
| (신규) | 1.21.1 에서 XHR 어댑터가 `window.cookieStore.get()`(첫 번째 값)으로 XSRF 를 읽는 경로가 추가됨 → 그대로 두면 Chrome 등에서 커스터마이징이 무력화됨 | `readAsync` 가 `cookieStore.getAll()` 결과의 마지막 비어있지 않은 값을 쓰도록 변경 (`getAll` 은 `document.cookie` 와 같은 순서) |
| `package.json` name/repository/bugs/publishConfig | GitHub Packages 사내 배포 | 동일 적용, lockfile 루트 name 도 맞춤 |
| `publish.yml` 레지스트리·토큰 | GitHub Packages 배포 | upstream 의 `npm run build` → publish 구조 유지, 레지스트리/토큰/권한만 교체. provenance·`npm stage publish` 는 npmjs 전용이라 제거. 트리거는 **수동 실행(workflow_dispatch)만** 둠: upstream `v1.*.*` 태그와 이름이 겹쳐 태그 push 시 upstream 커밋의 npmjs workflow 가 돌기 때문 |
| upstream 전용 workflow·템플릿·dependabot 삭제 | 사내 저장소에서 불필요한 CI/봇 실행 방지 | 1.21.1 에 새로 생긴 것(CODEOWNERS, run-ci 등)까지 같은 기준으로 삭제 |
| husky `prepare` 스크립트 제거 | 설치 시 husky 실행 방지 | 1.21.1 `.npmrc` 의 `ignore-scripts=true` 로 이미 실행되지 않으므로 손대지 않음 |
| `dist/` 커밋 | 배포물 포함 | 1.21.1 은 `dist/` 를 gitignore 하고 publish workflow 에서 빌드하므로 커밋하지 않음 |

## 1.5.1 과 의도적으로 달라진 동작

1.5.1 구현(`match.split('=')[1]`)의 부수 동작은 옮기지 않음. 둘 다 `matchAll` 호환 수정 때 생긴 것으로 보이며, 원래 의도(마지막 값)와는 관계없음.

- **URI 디코딩**: 1.5.1 은 디코딩하지 않은 원문 반환 → 1.21.1 은 upstream 처럼 `decodeURIComponent` 적용 (잘못된 인코딩이면 원문). 0.26.0 사내 최초 구현(`896453a8`)도 디코딩했음.
- **`=` 포함 값**: 1.5.1 은 첫 `=` 뒤에서 잘림 → 전체 값 반환.
- 이름 매칭: RegExp 보간(부분 일치·ReDoS 가능) → upstream 의 정확한 이름 비교.
- 디코딩·`=` 차이는 XSRF 쿠키 값에 `%`·`=` 가 있을 때만 드러남. 백엔드 토큰 형식 확인 필요.
- "마지막 값"은 브라우저의 `document.cookie` 정렬을 따름. WebKit 은 생성 순서가 아닌 도메인 기준으로 정렬하므로 "가장 최근 값"이 보장되지는 않음 (1.5.1 도 동일).

## upstream 기여 절차 미적용

- `PRE_RELEASE_CHANGELOG.md`, PR 템플릿, run-ci 등 AGENTS.md 가 언급하는 upstream 기여 절차는 사내 fork 에 적용하지 않음 (upstream 파일과 섞이지 않게 하기 위함).

## 검증

- `tests/browser/duplicateCookies.browser.test.js`: upstream 원본 `cookies.js` 로는 7건 실패, 커스텀 적용 후 통과 (chromium/firefox/webkit).
- 기존 실패 2건(`fetch.test.js` Symbol.iterator, webkit `defaults.browser.test.js` Date Link)은 순수 v1.21.1 에서도 동일하게 재현됨.
