import React from 'react';
import { Building2, Users, Hash } from 'lucide-react';

interface SearchTypesProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function SearchTypes({ selectedType, onTypeChange }: SearchTypesProps) {
  const types = [
    { id: 'all', icon: Building2, label: 'Alle' },
    { id: 'company', icon: Building2, label: 'Bedrifter' },
    { id: 'person', icon: Users, label: 'Personer' },
    { id: 'orgnr', icon: Hash, label: 'Org.nummer' },
  ];

  return (
    <div className="flex gap-4 text-sm">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id)}
          className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
            selectedType === id
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon size={16} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}