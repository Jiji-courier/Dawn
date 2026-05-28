function SearchBar(onSearch, onType) {
    return (
        <div>
            <input 
                type="text" 
                placeholder = "Search for a book name" 
                onChange={(e) => onType(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default SearchBar;