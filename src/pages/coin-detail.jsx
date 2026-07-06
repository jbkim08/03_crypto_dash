import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../components/Spinner";

// .env 파일에서 코인 상세 API URL을 가져옴
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("코인 데이터를 가져오는데 실패했습니다.");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="error">에러가 발생했습니다: {error}</div>;
  if (!coin) return null;

  // 한국어 설명이 있으면 한국어 설명을 사용하고, 없으면 영어 설명을 기본값으로 사용
  const description =
    coin.description?.ko ||
    coin.description?.en ||
    "설명이 제공되지 않는 코인입니다.";

  return (
    <div className="coin-details-container">
      <Link to="/" className="back-link">
        ← 목록으로 돌아가기
      </Link>
      <h1 className="coin-details-title">
        {coin.name} ({coin.symbol?.toUpperCase()})
      </h1>
      {coin.image?.large && (
        <img
          src={coin.image.large}
          alt={coin.name}
          className="coin-details-image"
        />
      )}

      <div className="coin-details-info">
        <h3>
          <span>현재 가격</span>
          <span className="price">
            {coin.market_data?.current_price?.krw?.toLocaleString()} 원
          </span>
        </h3>
        <h4>
          <span>24시간 변동률</span>
          <span
            className={
              coin.market_data?.price_change_percentage_24h >= 0
                ? "positive"
                : "negative"
            }
          >
            {coin.market_data?.price_change_percentage_24h >= 0 ? "+" : ""}
            {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </h4>
        <h4>
          <span>24시간 최고가</span>
          {coin.market_data.high_24h.krw.toLocaleString()}
        </h4>
        <h4>
          <span>24시간 최저가</span>
          {coin.market_data.low_24h.krw.toLocaleString()}
        </h4>
        <h4>
          <span>시가총액</span>
          <span>{coin.market_data?.market_cap?.krw?.toLocaleString()} 원</span>
        </h4>
        <h4>
          <span>24시간 거래량</span>
          <span>
            {coin.market_data?.total_volume?.krw?.toLocaleString()} 원
          </span>
        </h4>
        <h4>
          <span>마지막 업데이트</span>
          {new Date(coin.last_updated).toLocaleDateString()}
        </h4>
      </div>

      <div
        className="coin-details-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {coin.links?.homepage?.[0] && (
        <div className="coin-details-links">
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            공식 홈페이지 방문하기
          </a>
        </div>
      )}
    </div>
  );
};

export default CoinDetailsPage;
