import React from 'react';
import { StatusIndicator } from './StatusIndicator';
import { CompanyInfo } from './CompanyInfo';
import { ContactInfo } from './ContactInfo';
import { RolesList } from './RolesList';

interface InfoTabProps {
  company: any;
  roles: any[];
}

export function InfoTab({ company, roles }: InfoTabProps) {
  return (
    <div>
      <StatusIndicator
        registrertIMvaregisteret={company.registrertIMvaregisteret}
        konkurs={company.konkurs}
        underAvvikling={company.underAvvikling}
      />

      <div className="grid md:grid-cols-2 gap-8 p-6">
        <CompanyInfo
          naeringskode1={company.naeringskode1}
          institusjonellSektorkode={company.institusjonellSektorkode}
          antallAnsatte={company.antallAnsatte}
          stiftelsesdato={company.stiftelsesdato}
          registreringsdatoEnhetsregisteret={company.registreringsdatoEnhetsregisteret}
        />

        <ContactInfo
          forretningsadresse={company.forretningsadresse}
          epostadresse={company.epostadresse}
          telefon={company.telefon}
          hjemmeside={company.hjemmeside}
        />
      </div>

      <div className="px-6 pb-6">
        <RolesList roles={roles} />
      </div>
    </div>
  );
}