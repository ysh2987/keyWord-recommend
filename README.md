## 프로젝트 소개

- 검색어 추천 기능 구현하기
- 기간: 22.03.21~22.03.25

https://user-images.githubusercontent.com/81687138/162781424-65222bde-47b2-4a30-8a34-42958ea7de99.mp4



## 배포링크

[🚀 배포 링크](https://humanscape-ysh.netlify.app/)

## 실행 방법

```
① 해당 레포지토리를 클론한다.
② 프로젝트의 패키지를 설치한다. (npm install)
③ // .env에 api url 추가
REACT_APP_API_URL=https ~ /?name=까지 입력
④ scripts 명령어로 프로젝트를 실행한다. (npm start)
```





## 기술 스택

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
<br/>

## 요구사항

```
- API 호출 최적화
  - 호출별로 로컬 캐싱을 구현합니다. (expire time까지도 있으면 좋음)
  - 입력 마다 호출하지 않고 자신만의 전략으로 API 호출 횟수를 줄입니다. (README.md 에 설명)
- 키보드만으로도 추천 검색어들로 이동이 가능
- 배포하여 웹에서 바로 사용 할 수 있도록 제공 (README.md 에 url 명시)
- 함수형 컴포넌트 사용 필수
```



## 유송현

## 구현 방법

- API 호출 최적화

  - input 검색어에 의존해 api 요청을 하기 때문에 디바운스를 사용해 사용자에 입력이 전부 끝난 뒤 요청을 보내도록 처리하였습니다.
  - Redux Toolkit Query 라이브러리를 사용해 성공, 실패, 로딩처리와 15초에 expire time을 설정하였습니다.
  - API 호출 최적화를 구현하기 위해 localstorage / react query / redux toolkit 세가지 방식중에 고민을 하였습니다.
  - localstorage를 사용해 date Time과 해당 키워드를 local 저장해 api 요청을 하기전 local에 데이터가 있거나 date time이 만료되었을 때만 요청을 하는 방식도 있었지만 redux를 사용하고 있고 간편한 라이브러리들이 많이 있었기 때문에 선택하지 않았습니다.
  - react query로 Server state나 api 중복 호출을 간편하게 처리할 수 있었지만, react query랑 redux를 같이 사용하기엔 둘다 번들링 하는 과정에서 많은 리소스를 차지하기 때문에 전역 상태 관리 라이브러리를 recoil / MobX 비교적 redux 보다 가벼운 상태관리 라이브러리를 사용해야 한다고 판단해 선택하지 않았습니다.
  - Redux Toolkit Query를 선택한 이유는 redux toolkit으로 전역 상태를 관리하고 있었기 때문에 추가적인 설치 없이 toolkit에 내장되어 있으며, 사용하고 있는 reducer에 간편하게 추가해 사용할 수 있으며, api 호출에 성공 / 실패 / 로딩 처리와 중복 호출을 컨트롤 할 수 있기 때문에 선택하였습니다.

```javascript
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  keepUnusedDataFor: 15,
  endpoints: (builder) => ({
    getKeyword: builder.query({
      query: (keyword) => `${keyword}`,
    }),
  }),
});
```

- 추천 검색어 키보드로 제어
  - useRef hook을 사용해 input이 활성화 된 상태에서 arrowDown 입력할 시 추천 list에 첫번째 요소에 focus 한뒤 list 요소에 이벤트를 등록해 해당하는 요소에 index를 이동해 구현하였습니다.
  - Enter를 입력 하거나 요소를 클릭할 시 다시 input에 focus를 주었으며, input에서 Enter를 입력하면 해당 검색어로 이동하게 처리하였습니다.

```javascript
 const onChangeTab = (e, index, name) => {
    const first = listRef.current[0];
    const next = listRef.current[index + 1];
    const prev = listRef.current[index - 1];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (next) next.focus();
      else first.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (prev) prev.focus();
      else inputRef.current.focus();
    }

    if (e.key === 'Enter') {
      onChageKeyword(name);
      inputRef.current.focus();
    }
  };
```

## 어려웠던 점
- RTK-Query를 프로젝트에 적용하는 것은 어렵지 않았지만, isLoading 상태에서 원하지 않는 버그를 발견했습니다.
- 처음 데이터를 불러올때는 isLoading이 정상적으로 동작하지만 그 이후로는 isLoading이 항상 false여서 검색 중인 화면을 사용자에게 보여주지 못했습니다.
- isLoading에 조건에 대해 찾아본 결과 첫 api를 요청만 true를 반환하기 때문에 첫 요청에서만 loading 처리가 가능했습니다. 
- isFetching은 캐시된 데이터가 없는 요청일 경우 true를 반환해 원하는 처리를 할 수 있었습니다.
- isFetching || isLoading 상태일 때 로딩 컴포넌트를 보여주어 처리하였습니다.
```
if (isLoading || isFetching)
    return <p className="suggest">해당 검색어로 검색중입니다.</p>;
```
