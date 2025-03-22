# Todo List
- 할 일 목록을 관리 할 수 있는 웹 어플리케이션입니다. 
- 할 일을 추가, 수정, 삭제하거나 완료된 일을 다시 해야 할 일로 변경 가능합니다. 
- 할 일을 추가 한 뒤에서 상세페이지에서 이름을 변경, 메모 추가, 사진 업로드가 가능합니다. 
- 모바일, 태블릿, 데스크탑에 따른 반응형 처리가 되어있습니다. 

## 디자인
- tailwind 사용
- 반응형 : 헤더 사이즈에 맞춰 커스텀 반응형 적용
  - 타블렛: 745px
  - 모바일: 376px

## 설치 가이드
- Next.js + TypeScript 
- node version : 23.7.0
- package manager : npm

1. 깃헙 클론
 https://github.com/hjleee93/todo-list.git

2. npm 설치
```
npm install
```
3. .env파일 생성

```
NEXT_PUBLIC_API_URL=api 주소
```

4. 로컬 환경 시작
```
npm run dev
```
