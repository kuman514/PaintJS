# PaintJS
VanillaJS를 사용하여 만든, 간단한 그림을 그리는 웹 앱입니다.   
[웹 앱 사용해보기](https://kuman514.github.io/PaintJS/)

# Features (구현 요소)
- `CanvasRenderingContext2D.arc()`를 사용한, 선 그리기.
- `CanvasRenderingContext2D.drawImage()`를 사용한, 외부 이미지 불러오기.
- `<input type="range">`를 사용한, 점 크기 조절.
- `<input type="color">`를 사용한, 자유로운 색상 선택.
- 이미지 저장 기능 (PNG 파일)
- `CanvasRenderingContext2D.clearRect()` 또는 `CanvasRenderingContext2D.globalCompositeOperation = 'destination-out'`을 이용한, 그렸던 그림 지우기.

# Principle (작동 원리)
1. `canvas`에서 가장 최근에 있었던 마우스 포인터 위치 `prevCoord`를 기억
2. `canvas` 위에서 `onmouseover`가 발생한 위치 `layerX`, `layerY`에서 점을 우선 그림
3. `(prevCoord[0], prevCoord[1])` 위치에서 `(layerX, layerY)` 위치로 선을 그림
4. 1번 항목으로 되돌아가 반복

# Updates (업데이트)
- 04-22-2021: 기본 기능 구현
- 04-23-2021: 레이아웃 모양 개선, 점 크기를 더 자유롭게 조절
- 04-25-2021: 마우스를 빨리 움직여도 선이 끊기지 않음
- 04-26-2021: 지우기 모드, 초기화(전체 지우기) 기능 추가

# Issues (오류)
- ~~마우스를 빨리 움직일 때 뚝뚝 끊기는 점으로 그려지는 문제~~ (해결됨)