import React from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface Address {
  kommune?: string;
  adresse?: string[];
  postnummer?: string;
  poststed?: string;
  land?: string;
}

interface ContactInfoProps {
  forretningsadresse?: Address;
  epostadresse?: string;
  telefon?: string;
  hjemmeside?: string;
}

export function ContactInfo({ forretningsadresse, epostadresse, telefon, hjemmeside }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontaktinformasjon</h2>
      
      {forretningsadresse && (
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
          <div>
            <div className="font-medium text-gray-700">Adresse</div>
            <div className="text-gray-600">
              {[
                ...(forretningsadresse.adresse || []),
                forretningsadresse.postnummer,
                forretningsadresse.poststed,
                forretningsadresse.kommune,
                forretningsadresse.land,
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
          </div>
        </div>
      )}

      {epostadresse && (
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">E-post</div>
            <a href={`mailto:${epostadresse}`} className="text-blue-600 hover:text-blue-700">
              {epostadresse}
            </a>
          </div>
        </div>
      )}

      {telefon && (
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">Telefon</div>
            <a href={`tel:${telefon}`} className="text-blue-600 hover:text-blue-700">
              {telefon}
            </a>
          </div>
        </div>
      )}

      {hjemmeside && (
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-700">Nettside</div>
            <a 
              href={hjemmeside.startsWith('http') ? hjemmeside : `https://${hjemmeside}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              {hjemmeside}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}