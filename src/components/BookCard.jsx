function BookCard({ title, author, coverUrl, description}) {
    return (
        <div>
            <img src={coverUrl} alt={title} />
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{description}</p>
        </div>
    )
}

export default BookCard