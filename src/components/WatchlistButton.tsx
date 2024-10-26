import React from 'react';
import { Star } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';

interface WatchlistButtonProps {
  company: {
    organisasjonsnummer: string;
    navn: string;
  };
}

export function WatchlistButton({ company }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatched = isInWatchlist(company.organisasjonsnummer);

  const handleClick = () => {
    if (isWatched) {
      removeFromWatchlist(company.organisasjonsnummer);
    } else {
      addToWatchlist({
        id: company.organisasjonsnummer,
        name: company.navn,
        orgNumber: company.organisasjonsnummer
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isWatched
          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
      <span>{isWatched ? 'Fjern fra watchlist' : 'Legg til i watchlist'}</span>
    </button>
  );
}