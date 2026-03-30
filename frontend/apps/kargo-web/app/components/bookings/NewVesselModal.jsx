"use client";
import { useState } from "react";

export default function NewVesselModal({ isOpen, onClose, onAddVessel }) {
  const [vesselType, setVesselType] = useState("incoming");
  
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    status: "In Port",
    date: "",
    time: "",
  });

  // State for adding containers to the manifest
  const [containerInput, setContainerInput] = useState("");
  const [containers, setContainers] = useState([
    "CNTR-8821-XP", "CNTR-0943-LX", "CNTR-1122-ZA"
  ]);

  if (!isOpen) return null;

  const handleAddContainer = (e) => {
    e.preventDefault();
    if (containerInput.trim()) {
      setContainers([...containers, containerInput.toUpperCase()]);
      setContainerInput("");
    }
  };

  const handleRemoveContainer = (indexToRemove) => {
    setContainers(containers.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    // Basic validation
    if(!formData.name || !formData.date || !formData.time) {
        alert("Please fill out Vessel Name, Date, and Time.");
        return;
    }

    // Format the new vessel to match the table's structure
    const newVessel = {
      name: formData.name.toUpperCase(),
      id: `IMO-${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate random IMO
      status: formData.status,
      // Map properties based on incoming/outgoing tables
      ...(vesselType === 'incoming' ? {
        arrivalDate: formData.date,
        arrivalSector: "Sector A-9",
        priority: true,
        eta: formData.time,
        etaStatus: "On Schedule",
      } : {
        bay: "Bay 4",
        departureDate: formData.date,
        departureStatus: "Confirmed",
        confirmed: true,
        timeOut: formData.time,
        timeOutStatus: "Loading...",
      }),
      items: containers.length
    };

    // Pass the new vessel and its type to the parent page
    onAddVessel(newVessel, vesselType);
    
    // Reset and close
    setFormData({ name: "", status: "In Port", date: "", time: "" });
    setContainers(["CNTR-8821-XP", "CNTR-0943-LX", "CNTR-1122-ZA"]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1a1c1c]/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      <div className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden relative border-t-8 border-[#460003] z-10">
        
        <div className="px-8 pt-8 pb-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#460003] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">factory</span>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-[#460003]">NEW VESSEL MANIFEST</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entry Protocol Alpha-9</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-[#1a1c1c] transition-colors p-1 relative z-20">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-8 pb-8 space-y-8 relative z-10">
          
          <div className="flex p-1 bg-[#e8e8e8] w-full rounded">
            <button 
              onClick={() => { setVesselType("incoming"); setFormData({...formData, status: "In Port"}); }}
              className={`flex-1 py-3 text-xs font-bold tracking-widest flex items-center justify-center gap-2 rounded-sm transition-all ${
                vesselType === "incoming" ? "bg-white shadow-sm text-[#142026]" : "text-slate-500 hover:text-[#1a1c1c]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vesselType === "incoming" ? "bg-[#3a5f94]" : "bg-slate-300"}`}></span>
              INCOMING
            </button>
            <button 
              onClick={() => { setVesselType("outgoing"); setFormData({...formData, status: "Departing"}); }}
              className={`flex-1 py-3 text-xs font-bold tracking-widest flex items-center justify-center gap-2 rounded-sm transition-all ${
                vesselType === "outgoing" ? "bg-white shadow-sm text-[#142026]" : "text-slate-500 hover:text-[#1a1c1c]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vesselType === "outgoing" ? "bg-[#3a5f94]" : "bg-slate-300"}`}></span>
              OUTGOING
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vessel Name</label>
              <div className="relative">
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-3 text-sm font-bold tracking-tight outline-none transition-colors rounded-t" 
                  placeholder="e.g. OCEANIC VOYAGER" 
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operational Status</label>
              <div className="relative">
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-3 text-sm font-bold tracking-tight appearance-none outline-none transition-colors rounded-t"
                >
                  {vesselType === "incoming" ? (
                    <>
                      <option value="In Port">In Port</option>
                      <option value="Departing">Departing</option>
                      <option value="Maintenance">Maintenance</option>
                    </>
                  ) : (
                    <>
                      <option value="Departing">Departing</option>
                      <option value="Loading">Loading</option>
                      <option value="Ready for Departure">Ready for Departure</option>
                    </>
                  )}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {vesselType === "incoming" ? "Arrival Date & Time" : "Departure Date & Time"}
              </label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-3 text-sm font-bold tracking-tight outline-none transition-colors rounded-t" 
                    type="date"
                  />
                </div>
                <div className="flex-1 relative">
                  <input 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-3 text-sm font-bold tracking-tight outline-none transition-colors rounded-t" 
                    type="time"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Container Manifest Inventory</label>
              <span className="text-[10px] font-bold text-[#3a5f94]">{containers.length} CONTAINERS ADDED</span>
            </div>
            
            <div className="bg-[#f3f3f3] p-4 space-y-3 max-h-40 overflow-y-auto rounded">
              <div className="flex flex-wrap gap-2">
                {containers.map((cntr, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#c3c6d1]/30 rounded-sm">
                    <span className="text-[11px] font-black tracking-tighter text-[#142026]">{cntr}</span>
                    <button type="button" onClick={() => handleRemoveContainer(idx)} className="text-slate-400 hover:text-[#ba1a1a] transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <input 
                value={containerInput}
                onChange={(e) => setContainerInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddContainer(e)}
                className="flex-1 bg-[#e8e8e8] border-none border-b-2 border-transparent focus:border-[#3a5f94] focus:ring-0 px-4 py-3 text-sm font-bold tracking-tight outline-none transition-colors rounded-t" 
                placeholder="Enter Container ID..." 
                type="text"
              />
              <button type="button" onClick={handleAddContainer} className="bg-[#3a5f94] text-white px-6 py-3 font-bold text-xs tracking-widest flex items-center gap-2 hover:bg-[#1f477b] transition-colors rounded-sm">
                <span className="material-symbols-outlined text-sm">add</span> ADD
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button onClick={onClose} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#1a1c1c] transition-colors">
              Cancel Entry
            </button>
            <button onClick={handleSubmit} className="bg-[#460003] text-white px-10 py-4 font-black text-sm tracking-widest uppercase hover:bg-[#6e0009] transition-all active:scale-[0.98] shadow-xl shadow-[#460003]/20 rounded-sm">
              Add Vessel Manifest
            </button>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 opacity-[0.03] pointer-events-none z-0">
          <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>anchor</span>
        </div>
      </div>
    </div>
  );
}