function SearchBar({onSearch, onType}) {
    function handleKeyDown(e) {
        if (e.key == 'Enter') {
            onSearch()
        }
    }
    return (
        <div>
            <input 
                type="text" 
                placeholder = "Search for a book name" 
                onChange={(e) => onType(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default SearchBar;