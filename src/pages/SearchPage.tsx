import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchTypes } from '../components/SearchTypes';
import { CompanyResult } from '../components/CompanyResult';
import { PersonResult } from '../components/PersonResult';
import { SEO } from '../components/SEO';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResults([]);

    try {
      let searchResults = [];

      if (searchType === 'orgnr' || searchType === 'all') {
        if (/^\d{9}$/.test(query.trim())) {
          const response = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${query.trim()}`);
          if (response.ok) {
            const data = await response.json();
            searchResults.push({ type: 'company', data });
          }
        }
      }

      if (searchType === 'company' || searchType === 'all') {
        const response = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data._embedded?.enheter) {
          searchResults.push(...data._embedded.enheter.map((company: any) => ({ type: 'company', data: company })));
        }
      }

      if (searchType === 'person' || searchType === 'all') {
        const response = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter?size=50`);
        const data = await response.json();
        
        if (data._embedded?.enheter) {
          const companies = data._embedded.enheter;
          for (const company of companies) {
            const rolesResponse = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${company.organisasjonsnummer}/roller`);
            if (rolesResponse.ok) {
              const rolesData = await rolesResponse.json();
              if (rolesData.rollegrupper) {
                for (const group of rolesData.rollegrupper) {
                  const matchingRoles = group.roller.filter((role: any) => {
                    const fullName = [
                      role.person?.navn.fornavn,
                      role.person?.navn.mellomnavn,
                      role.person?.navn.etternavn
                    ].filter(Boolean).join(' ').toLowerCase();
                    return fullName.includes(query.toLowerCase());
                  });
                  
                  if (matchingRoles.length > 0) {
                    searchResults.push(...matchingRoles.map((role: any) => ({
                      type: 'person',
                      data: { ...role, enhet: company }
                    })));
                  }
                }
              }
            }
          }
        }
      }

      setResults(searchResults);
      
      if (searchResults.length === 0) {
        setError('Ingen resultater funnet');
      }
    } catch (err) {
      setError('Det oppstod en feil under søket. Vennligst prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Proffere
            </h1>
            <p className="text-gray-600">
              Søk etter bedrifter, personer eller organisasjonsnumre
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <SearchBar
              query={query}
              loading={loading}
              onQueryChange={setQuery}
              onSearch={handleSearch}
            />
            <SearchTypes selectedType={searchType} onTypeChange={setSearchType} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => (
                result.type === 'company' ? (
                  <CompanyResult key={`${result.data.organisasjonsnummer}-${index}`} result={result.data} />
                ) : (
                  <PersonResult key={`person-${index}`} result={result.data} />
                )
              ))}
            </div>
          )}

          {loading && (
            <div className="text-center text-gray-600 py-12">
              Søker...
            </div>
          )}
        </div>
      </div>
    </>
  );
}