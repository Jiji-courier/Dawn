function BookCard({ title, author, coverUrl, description, onSave}) {
    let saveButton = null
    if (onSave) {
        saveButton = <button onClick={onSave}>Save</button>
    }
    return (
        <div>
            <img src={coverUrl} alt={title} />
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{description}</p>
            {saveButton}
        </div>
    )
}

export default BookCard