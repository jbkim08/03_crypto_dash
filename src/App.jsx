import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]); //코인데이터[비트코인,이더리움,..]
  const [loading, setLoading] = useState(true); //서버에서 데이터 가져오는 로딩
  const [error, setError] = useState(null); //에러메세지
  const [limit, setLimit] = useState(10); //코인갯수
  const [filter, setFilter] = useState(""); //필터검색어
  const [sortBy, setSortBy] = useState("market_cap_desc"); //정렬 (시가총액순 초기값)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]); //리밋이 바뀔때마다
  //입력한 문자열이 코인의 심볼 또는 이름에 포함되어 있으면 남음(필터링)
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <div>
      <h1>🚀 크립토 대시 보드</h1>
      {loading && <p>로딩중...</p>}
      {error && <div className="error">{error}</div>}
      {/* 입력창과 선택창을 한줄에 정렬 */}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>일치하는 코인이 없습니다.</p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
