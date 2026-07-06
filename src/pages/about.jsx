const AboutPage = () => {
  return (
    <div className="about">
      <h1>크립토 대시 소개</h1>
      <p>
        크립토 대시(Crypto Dash)는 코인게코(CoinGecko) API를 사용하여 실시간
        암호화폐 데이터를 보여주는 간단한 리액트 애플리케이션입니다.
      </p>
      <p>
        시가총액 기준 상위 암호화폐들을 둘러볼 수 있으며, 이름이나 심볼로
        검색하고 가격, 시가총액, 24시간 변동률 기준으로 정렬할 수 있습니다.
      </p>
      <p>
        이 프로젝트는 리액트 튜토리얼의 일환으로 제작되었으며 훅(Hooks),
        컴포넌트(Components), 상태 관리(State Management), 그리고 외부 API
        연동을 이해하는 데 도움을 줍니다.
      </p>
      <p>
        🚀 향후 추가될 기능에는 코인 상세 정보 보기, 즐겨찾기, 페이지네이션 등이
        포함될 예정입니다!
      </p>
    </div>
  );
};

export default AboutPage;
