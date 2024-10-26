import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  registrertIMvaregisteret: boolean;
  konkurs: boolean;
  underAvvikling: boolean;
}

export function StatusIndicator({ registrertIMvaregisteret, konkurs, underAvvikling }: StatusIndicatorProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
      <div className="flex flex-wrap gap-4">
        <div className={`flex items-center ${registrertIMvaregisteret ? 'text-green-700' : 'text-gray-500'}`}>
          <CheckCircle className={`w-5 h-5 mr-2 ${registrertIMvaregisteret ? 'text-green-500' : 'text-gray-400'}`} />
          MVA-registrert
        </div>
        <div className={`flex items-center ${konkurs ? 'text-red-700' : 'text-gray-500'}`}>
          <AlertCircle className={`w-5 h-5 mr-2 ${konkurs ? 'text-red-500' : 'text-gray-400'}`} />
          {konkurs ? 'Konkurs' : 'Ikke konkurs'}
        </div>
        <div className={`flex items-center ${underAvvikling ? 'text-orange-700' : 'text-gray-500'}`}>
          <XCircle className={`w-5 h-5 mr-2 ${underAvvikling ? 'text-orange-500' : 'text-gray-400'}`} />
          {underAvvikling ? 'Under avvikling' : 'Aktiv'}
        </div>
      </div>
    </div>
  );
}