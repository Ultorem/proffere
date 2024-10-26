import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Trash2 } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div
      className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-12'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-4 -translate-x-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={`p-4 ${!isOpen && 'hidden'}`}>
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold dark:text-white">Watchlist</h2>
        </div>

        <div className="space-y-2">
          {watchlist.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingen selskaper i watchlist
            </p>
          ) : (
            watchlist.map(company => (
              <div
                key={company.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group"
              >
                <Link
                  to={`/company/${company.orgNumber}`}
                  className="text-sm text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 truncate flex-1"
                >
                  {company.name}
                </Link>
                <button
                  onClick={() => removeFromWatchlist(company.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}