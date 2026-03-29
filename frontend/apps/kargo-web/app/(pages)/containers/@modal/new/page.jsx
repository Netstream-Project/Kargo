"use client";
import { useRouter } from "next/navigation";

export default function NewContainerModal() {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-tertiary/70 backdrop-blur-md" 
        onClick={close}
      />
      
      {/* Modal Container */}
      <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-outline-variant/20 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-tertiary px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="font-headline text-white text-2xl font-black tracking-tight uppercase">New Entry: Container</h2>
            <p className="text-tertiary-fixed-dim text-xs font-label uppercase tracking-widest mt-1">Logistics Terminal / Registry</p>
          </div>
          <button onClick={close} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Container ID</label>
              <div className="relative">
                <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 font-body text-on-surface focus:ring-2 focus:ring-secondary transition-all placeholder:text-outline/50" placeholder="KRG-XXXX" type="text"/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-sm">qr_code_2</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Cargo Type</label>
              <select className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 font-body text-on-surface focus:ring-2 focus:ring-secondary transition-all appearance-none cursor-pointer">
                <option>Industrial</option>
                <option>Heavy Machinery</option>
                <option>Logistics / Freight</option>
                <option>Hazardous Material</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Principal Supplier</label>
            <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 font-body text-on-surface focus:ring-2 focus:ring-secondary transition-all" placeholder="Enter manufacturer or forwarding agent" type="text"/>
          </div>

          <div className="space-y-2">
            <label className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Import Supplier List</label>
            <div className="border-2 border-dashed border-outline-variant/50 bg-surface-container-high/30 rounded-xl p-10 flex flex-col items-center justify-center gap-4 transition-all hover:border-secondary hover:bg-surface-container-high/50 group">
              <span className="material-symbols-outlined text-4xl text-outline group-hover:text-secondary transition-colors">cloud_upload</span>
              <div className="flex flex-col items-center gap-2">
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-headline text-xs font-bold uppercase tracking-widest shadow-md hover:bg-primary-container transition-all" type="button">
                  Browse Files
                </button>
                <p className="text-xs font-medium text-on-surface-variant tracking-wide">or drag and drop CSV or Excel files here</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-outline-variant/10">
            <div className="flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-[10px] font-medium uppercase tracking-widest">Validating Registry A-12</span>
            </div>
            <div className="flex gap-4">
              <button onClick={close} type="button" className="px-6 py-3 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg">
                Cancel
              </button>
              <button className="bg-primary text-on-primary px-10 py-3 rounded-lg font-headline text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-3" type="submit">
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