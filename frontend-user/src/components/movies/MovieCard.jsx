function MovieCard({ movie }) {
    return (
        <div className="card">
            <img src={movie.poster} />
            <h3>{movie.title}</h3>
            <Button onClick={() => console.log(`Clicked on ${movie.title}`)}>Louer</Button>
        </div>
    )
}

export default MovieCard;