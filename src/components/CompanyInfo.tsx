import React from 'react';
import { Briefcase, Building2, Calendar, FileText, Users } from 'lucide-react';

interface CompanyInfoProps {
  naeringskode1?: {
    beskrivelse: string;
    kode: string;
  };
  institusjonellSektorkode?: {
    beskrivelse: string;
    kode: string;
  };
  antallAnsatte?: number;
  stiftelsesdato?: string;
  registreringsdatoEnhetsregisteret?: string;
}

export function CompanyInfo({ 
  naeringskode1,
  institusjonellSektorkode,
  antallAnsatte,
  stiftelsesdato,
  registreringsdatoEnhetsregisteret
}: CompanyInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Bedriftsinformasjon</h2>

      {naeringskode1 && (
        <div className="flex items-start">
          <Briefcase className="w-5 h-5 text-gray-400 mr-3 mt-1" />
          <div>
            <div className="font-medium text-gray-700">Næringskode</div>
            <div className="text-gray-600">
              {naeringskode1.beskrivelse} ({naeringskode1.kode})
            </div>
          </div>
        </div>
      )}

      {institusjonellSektorkode && (
        <div className="flex items-start">
          <Building2 className="w-5 h-5 text-gray-400 mr-3 mt-1" />
          <div>
            <div className="font-medium text-gray-700">Sektorkode</div>
            <div className="text-gray-600">
              {institusjonellSektorkode.beskrivelse} ({institusjonellSektorkode.kode})
            </div>
          </div>
        </div>
      )}

      {antallAnsatte !== undefined && (
        <div className="flex items-center">
          <Users className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">Antall ansatte</div>
            <div className="text-gray-600">{antallAnsatte}</div>
          </div>
        </div>
      )}

      {stiftelsesdato && (
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">Stiftelsesdato</div>
            <div className="text-gray-600">
              {new Date(stiftelsesdato).toLocaleDateString('no-NO')}
            </div>
          </div>
        </div>
      )}

      {registreringsdatoEnhetsregisteret && (
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">Registrert i Enhetsregisteret</div>
            <div className="text-gray-600">
              {new Date(registreringsdatoEnhetsregisteret).toLocaleDateString('no-NO')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}