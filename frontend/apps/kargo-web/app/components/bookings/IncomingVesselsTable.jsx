"use client";
import React, { useState } from 'react';
import SupplierListModal from './SupplierListModal';

export default function IncomingVesselsTable({ vessels }) {
  const [activeVesselId, setActiveVesselId] = useState(null);
  
  // 👉 1. State for the success popup
  const [showToast, setShowToast] = useState(false);

  // 👉 2. Function to handle the submission
  const handleAuditSubmit = () => {
    setActiveVesselId(null); // Closes the modal
    setShowToast(true);      // Shows the success popup
    
    // Auto-hide the popup after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <section className="space-y-6 relative">
      
      {/* 👉 3. THE SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#142026] text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">check</span>
            </div>
            <div>
              <p className="font-headline font-black uppercase tracking-tight text-sm">Audit Report Submitted</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manifest Discrepancies Logged</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 opacity-50 hover:opacity-100">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* --- Rest of your Table --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#3a5f94]/10 p-2 rounded">
            <span className="material-symbols-outlined text-[#3a5f94]">anchor</span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-[#142026]">Incoming Vessels</h3>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Refreshed 2m ago</span>
      </div>
      
      <div className="bg-[#f3f3f3] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-200/50 text-[#142026]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Vessel Name</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Arrival Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">ETA</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Items</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Manifest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {vessels.map((vessel, idx) => (
              <tr key={idx} className="hover:bg-white transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-[#142026] uppercase text-sm">{vessel.name}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-tighter">{vessel.id}</div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                    vessel.status === 'Departing' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {vessel.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-semibold text-sm">{vessel.arrivalDate}</div>
                  <div className={`text-[10px] ${vessel.priority ? 'text-[#460003] font-bold uppercase' : 'text-slate-400'}`}>
                    {vessel.arrivalSector}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-black text-sm text-[#142026]">{vessel.eta}</div>
                  <div className="text-[10px] text-slate-400">{vessel.etaStatus}</div>
                </td>
                <td className="px-6 py-5 font-black text-[#3a5f94]">{vessel.items}</td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => setActiveVesselId(vessel.name)}
                    className="text-[#142026] hover:text-[#460003] transition-colors p-2 hover:bg-slate-100 rounded-md"
                  >
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 👉 4. Pass the onSubmit function to the Modal */}
      <SupplierListModal 
        isOpen={activeVesselId !== null} 
        onClose={() => setActiveVesselId(null)}
        onSubmit={handleAuditSubmit}
        vesselId={activeVesselId}
      />
      
    </section>
  );
}