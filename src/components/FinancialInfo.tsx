import React from 'react';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface FinancialData {
  regnskapsperiode?: {
    fraDato: string;
    tilDato: string;
  };
  resultatregnskapResultat?: {
    driftsresultat?: number;
    ordinaertResultatFoerSkattekostnad?: number;
    aarsresultat?: number;
  };
  balanse?: {
    sumEiendeler?: number;
    sumEgenkapitalGjeld?: number;
  };
  egenkapitalGjeld?: {
    sumEgenkapital?: number;
    sumGjeld?: number;
  };
}

interface FinancialInfoProps {
  financialData: FinancialData[];
}

export function FinancialInfo({ financialData }: FinancialInfoProps) {
  if (!financialData || financialData.length === 0) return null;

  // Sort by date descending and get latest
  const latestData = financialData.sort((a, b) => {
    return new Date(b.regnskapsperiode?.tilDato || '').getTime() - 
           new Date(a.regnskapsperiode?.tilDato || '').getTime();
  })[0];

  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
        Finansiell Informasjon
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 font-medium">Driftsresultat</div>
            <div className="text-2xl font-bold text-blue-900">
              {formatNumber(latestData.resultatregnskapResultat?.driftsresultat)}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium">Årsresultat</div>
            <div className="text-2xl font-bold text-green-900">
              {formatNumber(latestData.resultatregnskapResultat?.aarsresultat)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 font-medium">Sum Eiendeler</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatNumber(latestData.balanse?.sumEiendeler)}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="text-sm text-indigo-600 font-medium">Egenkapital</div>
            <div className="text-2xl font-bold text-indigo-900">
              {formatNumber(latestData.egenkapitalGjeld?.sumEgenkapital)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        Regnskapsperiode: {new Date(latestData.regnskapsperiode?.fraDato || '').toLocaleDateString('nb-NO')} - 
        {new Date(latestData.regnskapsperiode?.tilDato || '').toLocaleDateString('nb-NO')}
      </div>
    </div>
  );
}