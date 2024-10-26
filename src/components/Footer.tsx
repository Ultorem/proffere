import React from 'react';
import { Building2, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Proffere</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Norsk bedriftssøk med data fra Brønnøysund
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Datakilde
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="https://data.brreg.no/enhetsregisteret/api/docs/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Brønnøysund API
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Kontakt
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="mailto:lars@hallaraaker.no"
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="h-4 w-4 mr-2" />
                lars@hallaraaker.no
              </a>
              <a
                href="https://github.com/ultorem/proffere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {currentYear} Proffere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}