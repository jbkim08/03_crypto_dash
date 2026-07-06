import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";

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

  return (
    <>
      <Header />
      <Routes>
        {/* 루트 주소(/)로 접속했을 때 HomePage 컴포넌트를 보여주고 필요한Props 전달 */}
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};

export default App;
