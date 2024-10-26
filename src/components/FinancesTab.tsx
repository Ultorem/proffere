import React, { useEffect, useState } from 'react';
import { Building2, AlertTriangle, TrendingUp, Wallet } from 'lucide-react';

interface FinancesTabProps {
  organisasjonsnummer: string;
}

interface FinancialData {
  regnskapsperiode: {
    fraDato: string;
    tilDato: string;
  };
  resultatregnskapResultat: number;
  eiendeler: number;
  egenkapitalGjeld: number;
  driftsinntekter: number;
  driftskostnader: number;
}

export function FinancesTab({ organisasjonsnummer }: FinancesTabProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Finansiell Informasjon</h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Building2 className="w-6 h-6 text-blue-500 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Se fullstendig regnskapsinformasjon
              </h3>
              <p className="text-blue-700 mb-3">
                For detaljert regnskapsinformasjon og nøkkeltall, besøk:
              </p>
              <div className="space-y-2">
                <a 
                  href={`https://w2.brreg.no/regnskapsregisteret/${organisasjonsnummer}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Brønnøysund Regnskapsregister →
                </a>
                <br />
                <a 
                  href={`https://proff.no/regnskap/${organisasjonsnummer}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Proff.no Regnskapsanalyse →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Merk: For mest oppdatert og detaljert finansiell informasjon, vennligst besøk lenkene ovenfor.
            Der finner du fullstendig regnskapshistorikk, nøkkeltall og analyser.
          </p>
        </div>
      </div>
    </div>
  );
}