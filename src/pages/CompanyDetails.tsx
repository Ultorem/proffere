import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { TabNavigation } from '../components/TabNavigation';
import { InfoTab } from '../components/InfoTab';
import { FinancesTab } from '../components/FinancesTab';
import { WatchlistButton } from '../components/WatchlistButton';

interface Company {
  navn: string;
  organisasjonsnummer: string;
  organisasjonsform: {
    beskrivelse: string;
  };
  hjemmeside?: string;
  forretningsadresse?: {
    adresse: string[];
    poststed: string;
    postnummer: string;
    land: string;
  };
  naeringskode1?: {
    beskrivelse: string;
    kode: string;
  };
  antallAnsatte?: number;
  stiftelsesdato?: string;
  telefon?: string;
  epostadresse?: string;
  registrertIMvaregisteret: boolean;
  konkurs: boolean;
  underAvvikling: boolean;
  institusjonellSektorkode?: {
    beskrivelse: string;
    kode: string;
  };
  registreringsdatoEnhetsregisteret?: string;
}

interface RoleGroup {
  type: {
    beskrivelse: string;
    kode: string;
  };
  roller: any[];
}

export function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [roles, setRoles] = useState<RoleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const [companyResponse, rolesResponse] = await Promise.all([
          fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${id}`),
          fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${id}/roller`)
        ]);

        if (!companyResponse.ok) throw new Error('Kunne ikke hente bedriftsinformasjon');
        const companyData = await companyResponse.json();
        
        const rolesData = await rolesResponse.ok ? await rolesResponse.json() : { rollegrupper: [] };
        
        setCompany(companyData);
        setRoles(rolesData.rollegrupper || []);
      } catch (err) {
        setError('Det oppstod en feil ved henting av bedriftsinformasjon');
        console.error('Error fetching company details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-gray-600 dark:text-gray-400">Laster...</div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-200">
            {error || 'Fant ikke bedriften'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${company.navn} - Bedriftsinformasjon`}
        description={`Se detaljert informasjon om ${company.navn}. Organisasjonsnummer: ${company.organisasjonsnummer}`}
        keywords={`${company.navn}, bedriftsinformasjon, norge, organisasjonsnummer ${company.organisasjonsnummer}`}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake til søk
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-800 px-6 py-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{company.navn}</h1>
                  <p className="text-blue-100">
                    <Building2 className="w-4 h-4 mr-2 inline" />
                    {company.organisasjonsform.beskrivelse}
                  </p>
                  <div className="mt-4">
                    <WatchlistButton company={company} />
                  </div>
                </div>
                <div className="text-right text-blue-100">
                  <div>Org.nr: {company.organisasjonsnummer}</div>
                  {company.stiftelsesdato && (
                    <div>Stiftet: {new Date(company.stiftelsesdato).toLocaleDateString('no-NO')}</div>
                  )}
                </div>
              </div>
            </div>

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'info' ? (
              <InfoTab company={company} roles={roles} />
            ) : (
              <FinancesTab organisasjonsnummer={company.organisasjonsnummer} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}