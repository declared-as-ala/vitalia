'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  onRatingChange,
  size = 20,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const currentDisplayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center space-x-1" id="star-rating-container">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= currentDisplayRating;

        return (
          <button
            key={index}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(null)}
            className={`transition-transform duration-150 ${
              interactive ? 'cursor-pointer hover:scale-110 focus:outline-none' : 'cursor-default'
            }`}
            aria-label={`${starValue} Star`}
            id={`star-item-${starValue}`}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
