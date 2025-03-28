const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="mr-0.5">
                    {i < fullStars ? (
                        <svg className="w-4 h-4 text-golden-brown-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    ) : hasHalfStar && i === fullStars ? (
                        <svg className="w-4 h-4 text-golden-brown-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                            <path fill="rgba(209, 213, 219, 0.5)" d="M12 17.27V2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    )}
                </span>
            ))}
            <span className="ml-1 text-sm font-medium text-cambridge-blue-50">{rating}</span>
        </div>
    );
};

export default StarRating;