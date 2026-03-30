"use client";
import React, { useState } from "react";
// 👉 1. Import your beautiful PDF Preview Component
// Assuming it's in the components/containers folder based on earlier setup
import PDFPreviewModal from "../containers/PDFPreviewModal"; 

export default function SupplierListModal({ isOpen, onClose, onSubmit, vesselId }) {
  // 👉 2. Add state to control the PDF Preview visibility
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  if (!isOpen) return null;

  // 👉 3. Create a structured data object to feed the PDF Preview
  // This ensures the PDF looks official and matches the ship's actual data
  const manifestData = {
    id: vesselId || "KRG-44102",
    location: "Terminal 4A • Manifest Verification Loop",
    supplier: {
      name: "Global Maritime Freight",
      type: "Mixed Industrial Cargo",
      notes: "Routine audit completed. Discrepancies noted in powertrain and safety systems. Shortages flagged for review."
    },
    personnel: {
      name: "System Auto-Audit",
      id: "SYS-990"
    },
    // Matches the rows in your Bookings UI!
    inventoryList: [
      { sku: "PX-2900-A", name: "Industrial Grade Steel Casings", quantity: 450 },
      { sku: "TR-8812-K", name: "Precision Torque Converters", quantity: 115 },
      { sku: "MN-4401-Z", name: "Hydraulic Fluid Sealant (4L)", quantity: 80 },
      { sku: "BK-1022-M", name: "Heavy Duty Braking Assemblies", quantity: 41 },
      { sku: "EL-9920-X", name: "Circuit Controller Boards", quantity: 526 }
    ]
  };

  // 👉 4. Update the download handler to open the PDF instead of an alert
  const handleDownload = () => {
    setIsPdfOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop - Clicking this closes the modal */}
        <div 
          className="absolute inset-0 bg-[#142026]/60 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        ></div>

        {/* Modal Container */}
        <div className="relative w-full max-w-5xl bg-white shadow-[0px_12px_32px_rgba(26,28,28,0.2)] flex flex-col max-h-[90vh] overflow-hidden rounded-lg animate-in fade-in zoom-in-95 duration-200">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#460003] flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-[#142026] leading-none">
                  Container Manifest: {vesselId || "KRG-44102"}
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Manifest Verification Loop // Terminal 4A</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <span className="font-bold text-sm text-[#142026]">Close</span>
              <span className="material-symbols-outlined text-[#142026] group-active:scale-90 transition-transform">close</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-0">
            
            {/* Summary Quick-View */}
            <div className="grid grid-cols-4 bg-[#142026] px-8 py-4">
              <div className="border-r border-slate-700/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total SKUs</p>
                <p className="text-xl font-bold text-white">142</p>
              </div>
              <div className="px-6 border-r border-slate-700/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Qty</p>
                <p className="text-xl font-bold text-white">1,240</p>
              </div>
              <div className="px-6 border-r border-slate-700/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actual Qty</p>
                <p className="text-xl font-bold text-[#9fc2fe]">1,212</p>
              </div>
              <div className="px-6">
                <p className="text-[10px] font-bold text-[#ffdad6] uppercase tracking-widest">Discrepancy</p>
                <p className="text-xl font-bold text-[#ffdad6]">-28 units</p>
              </div>
            </div>

            {/* Table Header */}
            <div className="sticky top-0 bg-[#e8e8e8] px-8 py-3 grid grid-cols-12 gap-4 z-10">
              <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-600">SKU ID</div>
              <div className="col-span-4 text-[10px] font-black uppercase tracking-widest text-slate-600">Item Name</div>
              <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-600 text-right">Expected</div>
              <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-600 text-right">Actual</div>
              <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-600 text-right">Status</div>
            </div>

            {/* Manifest List */}
            <div className="divide-y divide-slate-200">
              {/* Row 1 */}
              <div className="px-8 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-2 font-bold text-sm text-[#142026]">PX-2900-A</div>
                <div className="col-span-4">
                  <p className="font-bold text-sm text-slate-900">Industrial Grade Steel Casings</p>
                  <p className="text-[10px] text-slate-500">Category: Structural Hardware</p>
                </div>
                <div className="col-span-2 text-right font-medium text-sm">450</div>
                <div className="col-span-2 text-right font-medium text-sm">450</div>
                <div className="col-span-2 flex justify-end">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase tracking-tighter">Verified</span>
                </div>
              </div>

              {/* Row 2 (Mismatch) */}
              <div className="px-8 py-5 grid grid-cols-12 gap-4 items-center bg-red-50 hover:bg-red-100 transition-colors">
                <div className="col-span-2 font-bold text-sm text-[#460003]">TR-8812-K</div>
                <div className="col-span-4">
                  <p className="font-bold text-sm text-slate-900">Precision Torque Converters</p>
                  <p className="text-[10px] text-slate-500">Category: Powertrain Components</p>
                </div>
                <div className="col-span-2 text-right font-medium text-sm">120</div>
                <div className="col-span-2 text-right font-bold text-sm text-[#ba1a1a]">115</div>
                <div className="col-span-2 flex justify-end">
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full tracking-tighter">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'wght' 700" }}>warning</span>
                    SHORTAGE -5
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="px-8 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-2 font-bold text-sm text-[#142026]">MN-4401-Z</div>
                <div className="col-span-4">
                  <p className="font-bold text-sm text-slate-900">Hydraulic Fluid Sealant (4L)</p>
                  <p className="text-[10px] text-slate-500">Category: Consumables</p>
                </div>
                <div className="col-span-2 text-right font-medium text-sm">80</div>
                <div className="col-span-2 text-right font-medium text-sm">80</div>
                <div className="col-span-2 flex justify-end">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase tracking-tighter">Verified</span>
                </div>
              </div>

              {/* Row 4 (Mismatch) */}
              <div className="px-8 py-5 grid grid-cols-12 gap-4 items-center bg-red-50 hover:bg-red-100 transition-colors">
                <div className="col-span-2 font-bold text-sm text-[#460003]">BK-1022-M</div>
                <div className="col-span-4">
                  <p className="font-bold text-sm text-slate-900">Heavy Duty Braking Assemblies</p>
                  <p className="text-[10px] text-slate-500">Category: Safety Systems</p>
                </div>
                <div className="col-span-2 text-right font-medium text-sm">64</div>
                <div className="col-span-2 text-right font-bold text-sm text-[#ba1a1a]">41</div>
                <div className="col-span-2 flex justify-end">
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full tracking-tighter">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'wght' 700" }}>warning</span>
                    SHORTAGE -23
                  </span>
                </div>
              </div>

              {/* Row 5 */}
              <div className="px-8 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-2 font-bold text-sm text-[#142026]">EL-9920-X</div>
                <div className="col-span-4">
                  <p className="font-bold text-sm text-slate-900">Circuit Controller Boards</p>
                  <p className="text-[10px] text-slate-500">Category: Electronics</p>
                </div>
                <div className="col-span-2 text-right font-medium text-sm">526</div>
                <div className="col-span-2 text-right font-medium text-sm">526</div>
                <div className="col-span-2 flex justify-end">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase tracking-tighter">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3a5f94] rounded-full"></div>
                <span className="text-[10px] font-bold uppercase text-slate-600">Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ba1a1a] rounded-full"></div>
                <span className="text-[10px] font-bold uppercase text-slate-600">Discrepancy Found</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleDownload}
                className="px-6 py-3 bg-white border border-slate-300 text-[#142026] font-bold text-sm hover:bg-slate-50 transition-all rounded-lg"
              >
                Download PDF Manifest
              </button>
              <button 
                onClick={onSubmit} 
                className="px-8 py-3 bg-[#460003] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg rounded-lg"
              >
                Submit Audit Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 👉 5. Render the PDF Preview Component on top! */}
      <PDFPreviewModal 
        isOpen={isPdfOpen} 
        onClose={() => setIsPdfOpen(false)} 
        data={manifestData} 
      />
    </>
  );
}