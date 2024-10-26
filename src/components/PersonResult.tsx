import React from 'react';

interface PersonResultProps {
  result: {
    navn: {
      fornavn: string;
      mellomnavn?: string;
      etternavn: string;
    };
    rolle: {
      type: {
        beskrivelse: string;
      };
    };
    enhet: {
      organisasjonsnummer: string;
      navn: string[];
    };
  };
}

export function PersonResult({ result }: PersonResultProps) {
  const fullName = [
    result.navn.fornavn,
    result.navn.mellomnavn,
    result.navn.etternavn,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{fullName}</h2>
      <div className="text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Rolle:</span> {result.rolle.type.beskrivelse}
        </p>
        <p>
          <span className="font-medium">Bedrift:</span> {result.enhet.navn.join(' ')}
        </p>
        <p>
          <span className="font-medium">Org.nummer:</span> {result.enhet.organisasjonsnummer}
        </p>
      </div>
    </div>
  );
}