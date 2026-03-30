"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewContainerModal() {
  const router = useRouter();
  const close = () => router.back();

  // State for form inputs
  const [formData, setFormData] = useState({ id: "", cargo: "Industrial", supplier: "" });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContainer = {
      id: formData.id.toUpperCase() || "KRG-NEW",
      status: "Manifested",
      updatedAt: "Just now",
      photoCount: 0 // 0 photos, because we only uploaded a CSV/Excel file!
    };

    // Grab existing containers, add the new one, and save
    const saved = localStorage.getItem("kargo_containers");
    const currentContainers = saved ? JSON.parse(saved) : [];
    localStorage.setItem("kargo_containers", JSON.stringify([newContainer, ...currentContainers]));

    // Tell the main page to refresh its grid
    window.dispatchEvent(new Event('kargo_update'));
    
    // Close the modal
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#142026]/70 backdrop-blur-md" onClick={close} />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-[#c3c6d1]/20 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#142026] px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="font-headline text-white text-2xl font-black tracking-tight uppercase">New Entry: Container</h2>
            <p className="text-[#bbc8d0] text-xs font-label uppercase tracking-widest mt-1">Logistics Terminal / Registry</p>
          </div>
          <button onClick={close} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Container ID</label>
              <div className="relative">
                <input 
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-2 focus:ring-[#3a5f94] transition-all placeholder:text-[#737780]/50" 
                  placeholder="KRG-XXXX" 
                  type="text"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#737780] text-sm">qr_code_2</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Cargo Type</label>
              <select 
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-2 focus:ring-[#3a5f94] transition-all appearance-none cursor-pointer"
              >
                <option>Industrial</option>
                <option>Heavy Machinery</option>
                <option>Logistics / Freight</option>
                <option>Hazardous Material</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Principal Supplier</label>
            <input 
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
              className="w-full bg-[#e8e8e8] border-none rounded-lg px-4 py-3 font-body text-[#1a1c1c] focus:ring-2 focus:ring-[#3a5f94] transition-all" 
              placeholder="Enter manufacturer or forwarding agent" 
              type="text"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-headline text-xs font-bold text-[#43474f] uppercase tracking-wider block">Import Supplier List</label>
            <div className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 transition-all group ${file ? 'border-[#3a5f94] bg-white' : 'border-[#c3c6d1]/50 bg-[#e8e8e8]/30 hover:border-[#3a5f94] hover:bg-[#e8e8e8]/50'}`}>
              <span className={`material-symbols-outlined text-4xl transition-colors ${file ? 'text-[#3a5f94]' : 'text-[#737780] group-hover:text-[#3a5f94]'}`}>cloud_upload</span>
              <div className="flex flex-col items-center gap-2">
                <label className="cursor-pointer bg-[#460003] text-white px-6 py-2 rounded-lg font-headline text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#6e0009] transition-all inline-block">
                  {file ? 'Change File' : 'Browse Files'}
                  {/* 👉 Strictly limits uploads to documents (CSV, Excel) */}
                  <input type="file" onChange={handleFileChange} className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                </label>
                <p className="text-xs font-medium text-[#43474f] tracking-wide text-center">
                  {file ? `Selected: ${file.name}` : 'or drag and drop CSV or Excel files here'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-[#c3c6d1]/10">
            <div className="flex items-center gap-2 text-[#737780]">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-[10px] font-medium uppercase tracking-widest">Validating Registry A-12</span>
            </div>
            <div className="flex gap-4">
              <button onClick={close} type="button" className="px-6 py-3 font-headline text-xs font-bold uppercase tracking-widest text-[#43474f] hover:bg-[#f3f3f3] transition-colors rounded-lg">
                Cancel
              </button>
              <button className="bg-[#460003] text-white px-10 py-3 rounded-lg font-headline text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-[#6e0009] transition-all flex items-center gap-3" type="submit">
                <span className="material-symbols-outlined text-base">add_box</span>
                Add Container
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}