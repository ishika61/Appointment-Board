// Controls for filtering the board by date and/or status.
// Purely presentational — the parent owns the actual filter state.
function FilterBar({ date, status, onDateChange, onStatusChange, onClear }) {
  const hasActiveFilters = date || status;

  return (
    <div className="filter-bar">
      <div className="filter-bar__field">
        <label htmlFor="filter-date">Date</label>
        <input
          id="filter-date"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button className="btn btn--ghost filter-bar__clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
