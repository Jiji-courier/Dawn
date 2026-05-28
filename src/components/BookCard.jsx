function BookCard({ title, author, coverUrl, description, onSave}) {
    return (
        <div>
            <img src={coverUrl} alt={title} />
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{description}</p>
            <button onClick={onSave}>Save</button>
        </div>
    )
}

export default BookCard