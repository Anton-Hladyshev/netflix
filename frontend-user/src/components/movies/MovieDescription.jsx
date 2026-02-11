import { useState } from 'react';

function MovieDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div>
            <p className={isExpanded ? '' : 'line-clamp-2'}>{description} </p>
            <button onClick={toggleDescription}>{isExpanded ? 'Voir moins' : 'Voir plus'}</button>
        </div>
    );
}

export default MovieDescription;