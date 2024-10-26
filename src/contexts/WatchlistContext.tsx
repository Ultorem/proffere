import React, { createContext, useContext, useEffect, useState } from 'react';

interface WatchlistCompany {
  id: string;
  name: string;
  orgNumber: string;
}

interface WatchlistContextType {
  watchlist: WatchlistCompany[];
  addToWatchlist: (company: WatchlistCompany) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistCompany[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (company: WatchlistCompany) => {
    setWatchlist(prev => {
      if (prev.some(c => c.id === company.id)) return prev;
      return [...prev, company];
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(company => company.id !== id));
  };

  const isInWatchlist = (id: string) => {
    return watchlist.some(company => company.id === id);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}