import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Spinner } from "@/components/ui/spinner"

import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [savedBooks, setSavedBooks] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  async function searchBooks(query) {
    setLoading(true)
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`)
    const data = await response.json()
    setResults(data.docs)
    setLoading(false)
    setHasSearched(true)
  }

  function saveBook(book) {
    setSavedBooks([...savedBooks, book])
  }

  function clearSaved() {
    setSavedBooks([])
  }
  
  let loadingMessage = null
  if (loading) {
    <Spinner />
    loadingMessage = <p>Searching...</p>
  }

  let noResultsMessage = null
  if (!loading && hasSearched && results?.length == 0) {
    noResultsMessage = <p> We searched far and wide but found nothing. You should write the book!</p>
  }

  let savedSection = null
  if (savedBooks.length > 0) {
    savedSection = (
      <div>
        <h2>Saved Books</h2>
        <Button onClick={clearSaved}>Clear Saved</Button>
        {savedBooks.map((book, _) => (
          <Card
            key={book.key}
            className="bg-blue-100/20 backdrop-blur-sm rounded-lg p-4 text-white"
          >
            <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : ''} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.author_name?.[0]}</p>
            <p>{book.first_sentence?.[0]}</p>
          </Card>
        ))}
      </div>
    )
  }


  return (
    <>
      <section id="center">
        <Input onInput={(e) => searchBooks(e.currentTarget.value)} />
        {loading && <>
          <Spinner />
          <p>Searching...</p></>
        }
        {noResultsMessage}
        {results?.map((book) => (
          <Card
            key={book.key}
            className="bg-blue-100/20 backdrop-blur-sm rounded-lg p-4 text-white"
          >
            <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : ''} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.author_name?.[0]}</p>
            <p>{book.first_sentence?.[0]}</p>
            <Button onClick={() => saveBook(book)}>Save This</Button>
          </Card>
        ))}
        {savedSection}
      </section>
    </>
  )
}

export default App
