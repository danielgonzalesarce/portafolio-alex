
import React from 'react';

const SecurityOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] border-[2px] border-red-marvel/10 select-none">
      {/* HUD-like corner markers */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-red-marvel/40"></div>
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-red-marvel/40"></div>
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-red-marvel/40"></div>
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-red-marvel/40"></div>
      
      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-marvel/10 to-transparent animate-[scan_4s_linear_infinite]"></div>
      
      <style>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SecurityOverlay;
