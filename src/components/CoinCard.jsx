const CoinCard = ({ coin }) => {
  return (
    <div className="coin-card">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />
        <div>
          <h2>{coin.name}</h2>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>현재가격: {coin.current_price.toLocaleString()} 원</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
        }
      >
        {coin.price_change_percentage_24h?.toFixed(2)} %
      </p>
      <p>시가총액: {coin.market_cap.toLocaleString()} 원</p>
    </div>
  );
};

export default CoinCard;
