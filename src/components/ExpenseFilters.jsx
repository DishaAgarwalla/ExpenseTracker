function ExpenseFilters({ 
  filterCategory, 
  setFilterCategory, 
  sortBy, 
  setSortBy, 
  searchTerm, 
  setSearchTerm,
  categories 
}) {
  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="🔍 Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div className="filter-controls">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="date">Sort by Date (Newest)</option>
          <option value="amount">Sort by Amount (Highest)</option>
          <option value="title">Sort by Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default ExpenseFilters;