const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className="controls">
      <label htmlFor="sort">정렬:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="market_cap_desc">시가총액 (높은순)</option>
        <option value="market_cap_asc">시가총액 (낮은순)</option>
        <option value="price_desc">가격 (높은순)</option>
        <option value="price_asc">가격 (낮은순)</option>
        <option value="change_desc">24시간 변화율 (높은순)</option>
        <option value="change_asc">24시간 변화율 (낮은순)</option>
      </select>
    </div>
  );
};

export default SortSelector;
