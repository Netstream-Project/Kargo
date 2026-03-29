import React from 'react';

export default function TopHeader() {
  return (
    <div className="w-full mb-12">
      {/* Header Title & System Status */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-headline font-extrabold text-5xl tracking-tighter text-tertiary">Dashboard</h2>
          <p className="font-label text-outline uppercase tracking-widest text-sm mt-2">Real-time Logistics Overview</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-label text-[10px] text-outline font-bold uppercase">System Status</p>
            <p className="text-secondary font-bold flex items-center justify-end gap-2 text-sm mt-1">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              ACTIVE CLUSTER
            </p>
          </div>
        </div>
      </header>

      {/* KPI Bento Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: In Transit */}
        <div className="relative overflow-hidden bg-white p-8 rounded-lg shadow-sm flex flex-col justify-between h-64 border-b-4 border-secondary-fixed group">
          <div className="flex justify-between items-start z-10">
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>directions_boat</span>
            <span className="font-headline text-xs font-bold text-outline-variant bg-surface-container-low px-2 py-1 tracking-widest uppercase rounded">Global Flow</span>
          </div>
          <div className="z-10">
            <h3 className="font-label text-outline uppercase tracking-[0.2em] text-xs font-bold mb-1">In Transit Now</h3>
            <p className="font-headline font-black text-6xl text-tertiary tracking-tighter">1,248</p>
            <p className="font-body text-xs text-secondary mt-2 font-bold tracking-tight">+12.4% vs Previous Cycle</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[180px]">local_shipping</span>
          </div>
        </div>

        {/* KPI 2: At Port */}
        <div className="relative overflow-hidden bg-white p-8 rounded-lg shadow-sm flex flex-col justify-between h-64 border-b-4 border-tertiary-fixed group">
          <div className="flex justify-between items-start z-10">
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>dock</span>
            <span className="font-headline text-xs font-bold text-outline-variant bg-surface-container-low px-2 py-1 tracking-widest uppercase rounded">Holding</span>
          </div>
          <div className="z-10">
            <h3 className="font-label text-outline uppercase tracking-[0.2em] text-xs font-bold mb-1">At Port</h3>
            <p className="font-headline font-black text-6xl text-tertiary tracking-tighter">412</p>
            <p className="font-body text-xs text-outline mt-2 font-bold tracking-tight">Avg. Dwell: 14.2 hrs</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[180px]">warehouse</span>
          </div>
        </div>

        {/* KPI 3: Delayed (Error State) */}
        <div className="relative overflow-hidden bg-primary p-8 rounded-lg shadow-xl flex flex-col justify-between h-64 border-b-4 border-on-primary-container group">
          <div className="flex justify-between items-start z-10">
            <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>warning</span>
            <span className="font-headline text-xs font-bold text-on-primary-container bg-primary-container px-2 py-1 tracking-widest uppercase rounded">Critical</span>
          </div>
          <div className="z-10">
            <h3 className="font-label text-primary-fixed uppercase tracking-[0.2em] text-xs font-bold mb-1">Delayed</h3>
            <p className="font-headline font-black text-6xl text-white tracking-tighter">14</p>
            <p className="font-body text-xs text-on-primary-container mt-2 font-bold tracking-tight">Needs Immediate Action</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.1] pointer-events-none text-white transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[180px]">schedule</span>
          </div>
        </div>

      </section>
    </div>
  );
}