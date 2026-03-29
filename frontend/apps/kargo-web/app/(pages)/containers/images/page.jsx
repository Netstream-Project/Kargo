import Link from "next/link";

export default function ImageGalleryPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto bg-[#F8F9FA] min-h-[calc(100vh-120px)]">
      
      {/* 1. Header & Actions */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
            <span>Shipments</span>
            <span className="mx-2">/</span>
            <span className="text-[#460003]">KRG-44102</span>
          </nav>
          <h2 className="text-4xl font-black text-[#142026] tracking-tight">
            Cargo Inspection Manifest
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-[#142026] border border-slate-300 font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-sm">download</span> Export PDF
          </button>
          <button className="px-6 py-3 bg-[#460003] text-white font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 hover:brightness-110 transition-all shadow-md">
            <span className="material-symbols-outlined text-sm">add_a_photo</span> Add Photos
          </button>
        </div>
      </div>

      {/* 2. Bento Layout Gallery */}
      <div className="space-y-16">
        
        {/* Group 1: Structural Steel I-Beams */}
        <section>
          <div className="flex items-center justify-between mb-6 border-l-4 border-[#460003] pl-4">
            <div>
              <h3 className="text-xl font-black text-[#142026]">Structural Steel I-Beams</h3>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">ASTM A36 Standard • Loading Phase</p>
            </div>
            <span className="text-xs font-bold bg-[#29353b] text-white px-3 py-1 rounded tracking-widest">08 PHOTOS</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-slate-800 aspect-square md:aspect-auto">
               {/* Main Large Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-slate-600 text-6xl">construction</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#142026]/90 via-[#142026]/20 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-sm">Full Stack View - Bay 04</p>
                <p className="text-white/70 text-xs mt-1">Oct 24, 2023 • 14:22</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-500 text-4xl">precision_manufacturing</span>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-slate-600 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-400 text-4xl">architecture</span>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-500 text-4xl">engineering</span>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl bg-[#e2e2e2] flex items-center justify-center cursor-pointer hover:bg-[#d1d1d1] transition-colors aspect-square">
              <div className="text-center">
                <span className="text-3xl font-black text-[#142026]">+3</span>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">View All</p>
              </div>
            </div>
          </div>
        </section>

        {/* Group 2: Hydraulic Cylinder Assemblies */}
        <section>
          <div className="flex items-center justify-between mb-6 border-l-4 border-[#3a5f94] pl-4">
            <div>
              <h3 className="text-xl font-black text-[#142026]">Hydraulic Cylinder Assemblies</h3>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">Series-X Heavy Duty • Quality Assurance</p>
            </div>
            <span className="text-xs font-bold bg-[#29353b] text-white px-3 py-1 rounded tracking-widest">05 PHOTOS</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-4xl">plumbing</span>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-slate-600 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400 text-4xl">settings</span>
            </div>
            <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-slate-800 aspect-[2/1] flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-600 text-4xl">factory</span>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-4xl">valve</span>
            </div>
          </div>
        </section>

        {/* Group 3: Precision Grade 8 Bolts */}
        <section>
          <div className="flex items-center justify-between mb-6 border-l-4 border-slate-400 pl-4">
            <div>
              <h3 className="text-xl font-black text-[#142026]">Precision Grade 8 Bolts</h3>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">Zinc Plated High-Tensile • Inventory Check</p>
            </div>
            <span className="text-xs font-bold bg-[#29353b] text-white px-3 py-1 rounded tracking-widest">12 PHOTOS</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-500 text-4xl">hardware</span>
            </div>
            <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-slate-600 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-400 text-4xl">build</span>
            </div>
            
            {/* Blue Compliance Card */}
            <div className="md:col-span-3 relative group overflow-hidden rounded-xl bg-[#3a5f94] flex flex-col justify-center p-8 shadow-sm">
              <span className="material-symbols-outlined text-white text-4xl mb-4">inventory_2</span>
              <h4 className="text-white font-black text-2xl tracking-tight">Batch Compliance Verified</h4>
              <p className="text-white/80 text-sm mt-2 leading-relaxed">
                All 450 units inspected for thread integrity and tensile strength. Compliance certificate attached to manifest.
              </p>
            </div>
            
            <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-slate-700 aspect-square flex items-center justify-center">
               <span className="material-symbols-outlined text-slate-500 text-4xl">category</span>
            </div>
          </div>
        </section>

      </div>

      {/* 3. Footer Meta */}
      <footer className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 pb-10">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Container ID</p>
          <p className="text-sm font-black text-[#142026] mt-1">KRG-44102-MANIFEST-SEC-A</p>
        </div>
        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Updated</p>
            <p className="text-sm font-black text-[#142026] mt-1">Oct 25, 2023 • 09:45 AM</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inspector Name</p>
            <p className="text-sm font-black text-[#460003] mt-1">Marcus Chen</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}