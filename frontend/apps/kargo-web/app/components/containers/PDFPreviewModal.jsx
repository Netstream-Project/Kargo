"use client";
import React from 'react';

export default function PDFPreviewModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#142026]/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-200">
        
        {/* Modal Toolbar */}
        <div className="bg-[#142026] px-8 py-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
            <h2 className="font-headline font-bold uppercase tracking-tight text-sm">Document Preview: {data.id}_MANIFEST.pdf</h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-xs font-bold transition-all">
              <span className="material-symbols-outlined text-sm">print</span> Print
            </button>
            <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* The "Paper" Area */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-12 flex justify-center">
          <div id="printable-area" className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-16 text-black font-serif relative overflow-hidden">
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 text-slate-100 text-9xl font-black pointer-events-none uppercase">
              Verified
            </div>

            {/* Document Header */}
            <div className="flex justify-between items-start border-b-4 border-black pb-8 mb-10">
              <div>
                <h1 className="text-4xl font-black tracking-tighter mb-1">KARGO LOGISTICS</h1>
                <p className="text-xs font-sans font-bold uppercase tracking-[0.3em]">Official Cargo Manifest</p>
              </div>
              <div className="text-right font-sans text-[10px] leading-tight">
                <p>REF: {data.id}-SEC-A</p>
                <p>DATE: {new Date().toLocaleDateString()}</p>
                <p>TERMINAL: Alpha-9 / Port of Rotterdam</p>
              </div>
            </div>

            {/* Document Body */}
            <div className="font-sans space-y-8">
              <div className="grid grid-cols-2 gap-12">
                <section>
                  <h3 className="text-[10px] font-black border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">Container Details</h3>
                  <p className="text-sm font-bold">ID: <span className="font-normal">{data.id}</span></p>
                  <p className="text-sm font-bold">TYPE: <span className="font-normal">{data.supplier.type}</span></p>
                  <p className="text-sm font-bold">LOCATION: <span className="font-normal">{data.location}</span></p>
                </section>
                <section>
                  <h3 className="text-[10px] font-black border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">Registry Information</h3>
                  <p className="text-sm font-bold">SUPPLIER: <span className="font-normal">{data.supplier.name}</span></p>
                  <p className="text-sm font-bold">INSPECTOR: <span className="font-normal">{data.personnel.name} (ID: {data.personnel.id})</span></p>
                  <p className="text-sm font-bold">STATUS: <span className="font-normal uppercase text-green-600">Verified & Approved</span></p>
                </section>
              </div>

              <section className="mt-12">
                <h3 className="text-[10px] font-black border-b border-slate-300 pb-1 mb-4 uppercase tracking-widest">Inventory Manifest</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-black">
                      <th className="py-2 px-2">SKU REFERENCE</th>
                      <th className="py-2 px-2">DESCRIPTION</th>
                      <th className="py-2 px-2 text-right">QTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-2 font-mono">IRN-882-01</td>
                      <td className="py-3 px-2">Structural Steel I-Beams (4m)</td>
                      <td className="py-3 px-2 text-right">142</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-2 font-mono">IRN-411-92</td>
                      <td className="py-3 px-2">Hydraulic Cylinder Assemblies</td>
                      <td className="py-3 px-2 text-right">56</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 px-2 font-mono">PNL-220-B</td>
                      <td className="py-3 px-2">Insulated Control Panels</td>
                      <td className="py-3 px-2 text-right">4</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Signature Area */}
              <div className="pt-20 grid grid-cols-2 gap-20">
                <div className="border-t border-black pt-2">
                  <p className="text-[8px] font-bold uppercase tracking-widest">Authorized Signature</p>
                  <p className="font-serif italic text-lg mt-4">{data.personnel.name}</p>
                </div>
                <div className="border-t border-black pt-2">
                  <p className="text-[8px] font-bold uppercase tracking-widest">Terminal Stamp</p>
                  <div className="w-16 h-16 border-4 border-red-800 rounded-full flex items-center justify-center text-red-800 font-black text-[8px] rotate-12 mt-2 opacity-60">
                    APPROVED
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Barcode */}
            <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end border-t border-slate-200 pt-4 opacity-40">
               <p className="text-[8px]">This is a system-generated document. Unauthorized alteration is a violation of maritime security protocol.</p>
               <div className="h-8 w-32 bg-black"></div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-200 flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Close Preview</button>
            <button onClick={() => alert('Downloading File...')} className="bg-[#460003] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">Download Manifest</button>
        </div>
      </div>
    </div>
  );
}