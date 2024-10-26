import React from 'react';
import { Link } from 'react-router-dom';

interface CompanyResultProps {
  result: {
    organisasjonsnummer: string;
    navn: string;
    organisasjonsform: {
      beskrivelse: string;
    };
    forretningsadresse?: {
      kommune?: string;
      adresse?: string[];
      postnummer?: string;
      poststed?: string;
    };
  };
}

export function CompanyResult({ result }: CompanyResultProps) {
  return (
    <Link 
      to={`/company/${result.organisasjonsnummer}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{result.navn}</h2>
      <div className="text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Org.nummer:</span> {result.organisasjonsnummer}
        </p>
        <p>
          <span className="font-medium">Type:</span> {result.organisasjonsform.beskrivelse}
        </p>
        {result.forretningsadresse && (
          <p>
            <span className="font-medium">Adresse:</span>{' '}
            {[
              ...(result.forretningsadresse.adresse || []),
              result.forretningsadresse.postnummer,
              result.forretningsadresse.poststed,
              result.forretningsadresse.kommune,
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        )}
      </div>
    </Link>
  );
}