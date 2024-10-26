import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';
import { SEO } from '../components/SEO';

interface CompanyRole {
  company: {
    navn: string;
    organisasjonsnummer: string;
    organisasjonsform: {
      beskrivelse: string;
    };
  };
  role: string;
}

export function PersonDetails() {
  const { name } = useParams<{ name: string }>();
  const [roles, setRoles] = useState<CompanyRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const companiesResponse = await fetch('https://data.brreg.no/enhetsregisteret/api/enheter?size=50');
        const companiesData = await companiesResponse.json();
        
        const allRoles: CompanyRole[] = [];
        
        for (const company of companiesData._embedded?.enheter || []) {
          const rolesResponse = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${company.organisasjonsnummer}/roller`);
          if (rolesResponse.ok) {
            const rolesData = await rolesResponse.json();
            
            rolesData.rollegrupper?.forEach((group: any) => {
              group.roller.forEach((role: any) => {
                const fullName = [
                  role.person?.navn.fornavn,
                  role.person?.navn.mellomnavn,
                  role.person?.navn.etternavn
                ].filter(Boolean).join(' ');
                
                if (fullName === decodeURIComponent(name || '')) {
                  allRoles.push({
                    company,
                    role: role.type.beskrivelse
                  });
                }
              });
            });
          }
        }
        
        setRoles(allRoles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchRoles();
    }
  }, [name]);

  const decodedName = decodeURIComponent(name || '');

  return (
    <>
      <SEO 
        title={`${decodedName} - Roller i norske selskaper`}
        description={`Se alle roller og verv for ${decodedName} i norske selskaper.`}
        keywords={`${decodedName}, roller, verv, styremedlem, daglig leder, norge`}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake til søk
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{decodedName}</h1>
              <p className="text-blue-100">
                <Building2 className="inline-block w-4 h-4 mr-2" />
                Roller i norske selskaper
              </p>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Selskapsroller</h2>
              
              {loading ? (
                <div className="text-center text-gray-600 py-12">
                  Laster roller...
                </div>
              ) : roles.length > 0 ? (
                <div className="grid gap-4">
                  {roles.map((role, index) => (
                    <Link
                      key={index}
                      to={`/company/${role.company.organisasjonsnummer}`}
                      className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{role.company.navn}</div>
                      <div className="text-sm text-gray-600">
                        {role.role}
                        <span className="text-gray-500 ml-2">
                          ({role.company.organisasjonsform.beskrivelse})
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">
                  Ingen roller funnet for denne personen.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}