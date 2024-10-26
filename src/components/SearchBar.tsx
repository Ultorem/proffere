import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  loading: boolean;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ query, loading, onQueryChange, onSearch }: SearchBarProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Søk etter bedriftsnavn, personer eller org.nummer..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
      <button
        onClick={onSearch}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
      >
        <Search size={20} />
        {loading ? 'Søker...' : 'Søk'}
      </button>
    </div>
  );
}