# ColdTbrew.github.io

개인 GitHub Pages 홈페이지 저장소입니다.

## 로컬에서 확인

정적 페이지이므로 아래처럼 간단히 실행할 수 있습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## 배포 (GitHub Pages)

1. GitHub 저장소 `Settings` > `Pages` 이동
2. `Build and deployment`에서 `Deploy from a branch` 선택
3. `Branch`를 `main` / `/(root)`로 설정 후 저장
4. 반영 후 `https://coldtbrew.github.io`에서 확인

## 수정 포인트

- 메일 주소: `index.html`의 `hello@example.com`
- 포트폴리오 카드 링크: `index.html`의 `#portfolio` 섹션
- 컬러/타이포/애니메이션: `Style.css`
