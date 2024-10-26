import React from 'react';
import { Link } from 'react-router-dom';

interface Role {
  type: {
    beskrivelse: string;
    kode: string;
  };
  person?: {
    navn: {
      fornavn: string;
      mellomnavn?: string;
      etternavn: string;
    };
    fodselsdato?: string;
  };
  enhet?: {
    organisasjonsnummer: string;
    navn: string[];
  };
}

interface RoleGroup {
  type: {
    beskrivelse: string;
    kode: string;
  };
  roller: Role[];
}

interface RolesListProps {
  roles: RoleGroup[];
}

export function RolesList({ roles }: RolesListProps) {
  if (roles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Roller og Personer</h2>
      
      <div className="space-y-8">
        {roles.map((group, groupIndex) => (
          <div key={groupIndex} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {group.type.beskrivelse}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.roller.map((role, roleIndex) => (
                <div key={roleIndex} className="bg-gray-50 rounded-lg p-4">
                  {role.person ? (
                    <>
                      <Link 
                        to={`/person/${encodeURIComponent([
                          role.person.navn.fornavn,
                          role.person.navn.mellomnavn,
                          role.person.navn.etternavn
                        ].filter(Boolean).join(' '))}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {[
                          role.person.navn.fornavn,
                          role.person.navn.mellomnavn,
                          role.person.navn.etternavn
                        ].filter(Boolean).join(' ')}
                      </Link>
                      <div className="text-sm text-gray-600">
                        {role.type.beskrivelse}
                        {role.person.fodselsdato && (
                          <span className="block text-gray-500">
                            Født: {new Date(role.person.fodselsdato).toLocaleDateString('no-NO')}
                          </span>
                        )}
                      </div>
                    </>
                  ) : role.enhet ? (
                    <>
                      <Link
                        to={`/company/${role.enhet.organisasjonsnummer}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {role.enhet.navn.join(' ')}
                      </Link>
                      <div className="text-sm text-gray-600">
                        {role.type.beskrivelse}
                        <span className="block text-gray-500">
                          Org.nr: {role.enhet.organisasjonsnummer}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-600">{role.type.beskrivelse}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}