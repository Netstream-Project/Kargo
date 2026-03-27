import Link from "next/link";

// --- MOCK DATA ---
const reportDetails = {
  id: "KRG-44102",
  location: "DOCK 14 • PORT OF ROTTERDAM",
  condition: "External Condition: Structural Intact",
  tags: ["Heavy Load", "In Transit"],
  personnel: {
    name: "Marcus Chen",
    role: "Lead Safety Officer",
    id: "8829",
    verifiedAt: "OCT 24, 08:42 AM"
  },
  supplier: {
    name: "Nordic Ironworks Ltd.",
    type: "Precision Steel Parts",
    notes: "\"High-precision automotive components destined for assembly line 4. Fragile handling required for internal coatings.\""
  },
  unit: {
    id: "KRG-44102-X",
    seal: "#S-99210-AA",
    entryPoint: "Terminal B, Gate 4"
  },
  carrier: {
    driver: "Elias Thorne",
    license: "Commercial - H1"
  },
  vehicle: {
    plate: "TX-4402-LG",
    model: "Scania G-Series 2023",
    fleet: "Unit 11-B 'Heavy'"
  },
  summary: {
    rawMaterials: 142,
    electronicParts: 4
  }
};

const inventoryList = [
  { sku: "IRN-882-01", name: "Structural Steel I-Beams (4m)", category: "RAW MAT", quantity: 142 },
  { sku: "IRN-411-92", name: "Hydraulic Cylinder Assemblies", category: "FINISHED", quantity: 56 },
  { sku: "FIX-901-X", name: "Precision Grade 8 Bolts (Box 500)", category: "HARDWARE", quantity: 12 },
  { sku: "PNL-220-B", name: "Insulated Control Panels", category: "ELECTRONICS", quantity: 4 },
  { sku: "GKT-993-M", name: "Heavy-Duty Industrial Gaskets", category: "CONSUMABLE", quantity: 240 }
];

const timelineEvents = [
  { type: "completed", time: "08:15 AM", title: "Initial Arrival", status: "Status: Seal #S-99210-AA Verified", hasImage: true },
  { type: "completed", time: "08:42 AM", title: "Container Opened", status: "Status: Load Secure", hasImage: true },
  { type: "completed", time: "09:15 AM", title: "First Item", status: "Status: Pallet A-01 Cleared", hasImage: true },
  { type: "completed", time: "09:32 AM", title: "Second Item", status: "Status: Pallet B-14 Cleared", hasImage: false, altText: "Second Item Photo" },
  { type: "completed", time: "09:55 AM", title: "Third Item", status: "Status: Pallet C-09 Cleared", hasImage: true },
  { type: "completed", time: "10:20 AM", title: "Final Item", status: "Status: Inventory Match Confirmed", hasImage: true },
  { type: "pending", time: "Pending", title: "Empty Container", status: "Awaiting Final Sweeping", hasImage: false },
  { type: "scheduled", time: "Scheduled", title: "Departure", status: "Pending Gate Pass", hasImage: false, altText: "Final Inspection" }
];
// -----------------

export default function ReportPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-[#F8F9FA] min-h-screen">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Reports / Shipment Tracking
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
            {reportDetails.id}
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            {reportDetails.location}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-slate-50">
            Export PDF
          </button>
          <button className="px-6 py-2.5 bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-blue-800">
            Approve Report
          </button>
        </div>
      </div>

      {/* 2. Hero Grid (Image + Side Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Large Container Image Area */}
        <div className="lg:col-span-2 relative bg-slate-800 rounded-xl overflow-hidden min-h-[400px] shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <div className="absolute bottom-6 left-6 z-20">
            <div className="flex gap-2 mb-3">
              <span className="px-2.5 py-1 bg-red-900 text-white text-[10px] font-bold uppercase rounded">{reportDetails.tags[0]}</span>
              <span className="px-2.5 py-1 bg-blue-700 text-white text-[10px] font-bold uppercase rounded">{reportDetails.tags[1]}</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{reportDetails.condition}</h2>
          </div>
        </div>

        {/* Right Side Info Cards */}
        <div className="flex flex-col gap-6">
          {/* Inspection Personnel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-red-900 flex-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Inspection Personnel</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shrink-0"></div>
              <div>
                <div className="font-bold text-slate-900 text-lg">{reportDetails.personnel.name}</div>
                <div className="text-xs font-medium text-slate-500 mb-1">{reportDetails.personnel.role} • ID: {reportDetails.personnel.id}</div>
                <div className="text-[10px] font-bold text-slate-400">VERIFIED: {reportDetails.personnel.verifiedAt}</div>
              </div>
            </div>
          </div>

          {/* Supplier Manifest */}
          <div className="bg-[#111827] p-6 rounded-xl shadow-sm flex-1 text-white">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Supplier Manifest</h3>
            <div className="mb-4">
              <div className="text-[10px] text-slate-400 mb-1 uppercase">Principal Supplier</div>
              <div className="font-bold text-lg tracking-tight">{reportDetails.supplier.name}</div>
            </div>
            <div className="mb-4">
              <div className="text-[10px] text-slate-400 mb-1 uppercase">Cargo Type</div>
              <div className="font-medium text-sm">{reportDetails.supplier.type}</div>
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed">
              {reportDetails.supplier.notes}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Three-Column Logistics Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-red-900">package_2</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Unit Logistics</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 uppercase text-[10px] font-bold">Container ID</span> <span className="font-bold text-slate-900">{reportDetails.unit.id}</span></div>
            <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 uppercase text-[10px] font-bold">Seal Number</span> <span className="font-bold text-slate-900">{reportDetails.unit.seal}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 uppercase text-[10px] font-bold">Entry Point</span> <span className="font-bold text-slate-900">{reportDetails.unit.entryPoint}</span></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-red-900">badge</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Carrier Personnel</h3>
          </div>
          <div className="space-y-4 text-sm mb-4">
            <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 uppercase text-[10px] font-bold">Driver Name</span> <span className="font-bold text-slate-900">{reportDetails.carrier.driver}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 uppercase text-[10px] font-bold">License Number</span> <span className="font-bold text-slate-900">{reportDetails.carrier.license}</span></div>
          </div>
          <div>
             <div className="text-slate-400 uppercase text-[10px] font-bold mb-2">License Verification</div>
             <div className="bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase flex justify-center py-2 items-center gap-2 rounded">
                <span className="material-symbols-outlined text-sm">image</span> Scan Attached
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-red-900">local_shipping</span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Vehicle Asset</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 uppercase text-[10px] font-bold">Truck Plate</span> <span className="font-bold text-slate-900">{reportDetails.vehicle.plate}</span></div>
            <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400 uppercase text-[10px] font-bold">Model</span> <span className="font-bold text-slate-900">{reportDetails.vehicle.model}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 uppercase text-[10px] font-bold">Fleet Unit</span> <span className="font-bold text-slate-900">{reportDetails.vehicle.fleet}</span></div>
          </div>
        </div>
      </div>

      {/* 4. Inventory List & Documentation */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Main Table Area */}
        <div className="bg-white rounded-xl shadow-sm flex-1 overflow-hidden">
          <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
             <h3 className="text-xs font-bold uppercase tracking-widest">Inventory List</h3>
             <span className="text-[10px] text-slate-400 font-bold uppercase">{inventoryList.length} Unique Line Items</span>
          </div>
          <div className="p-6">
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100">
                      <th className="pb-3 w-1/4">SKU Number</th>
                      <th className="pb-3 w-2/5">Item Name</th>
                      <th className="pb-3 w-1/5">Category</th>
                      <th className="pb-3 text-right">Quantity</th>
                   </tr>
                </thead>
                <tbody className="text-sm font-bold text-slate-900">
                   {inventoryList.map((item, index) => (
                     <tr key={index} className={index !== inventoryList.length - 1 ? "border-b border-slate-50" : ""}>
                        <td className={`py-4 text-blue-600 ${index === inventoryList.length - 1 ? "pt-4" : ""}`}>{item.sku}</td>
                        <td className={`py-4 ${index === inventoryList.length - 1 ? "pt-4" : ""}`}>{item.name}</td>
                        <td className={`py-4 ${index === inventoryList.length - 1 ? "pt-4" : ""}`}>
                          <span className="px-2 py-1 bg-slate-100 text-[10px] rounded uppercase">{item.category}</span>
                        </td>
                        <td className={`py-4 text-right text-lg ${index === inventoryList.length - 1 ? "pt-4" : ""}`}>{item.quantity}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Right Documentation Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm w-full lg:w-80 border-l-4 border-l-blue-700 flex flex-col">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex-1">
             <div className="mb-8">Inventory Documentation</div>
             
             <div className="flex flex-col gap-3 mb-8">
                <Link href="/containers/images" className="w-full">
                    <button className="w-full py-3 bg-red-900 text-white rounded flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-red-950">
                    <span className="material-symbols-outlined text-sm">image</span> View All Images
                    </button>
                </Link>
                <Link href="/containers/list" className="w-full">
                    <button className="w-full py-3 bg-red-900 text-white rounded flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-red-950">
                    <span className="material-symbols-outlined text-sm">list_alt</span> View Supplier List
                    </button>
                </Link>
             </div>
           </div>

           <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Summary</div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
                 <span>Raw Materials</span> <span className="font-bold text-slate-900">{reportDetails.summary.rawMaterials} Units</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-600">
                 <span>Electronic Parts</span> <span className="font-bold text-slate-900">{reportDetails.summary.electronicParts} Units</span>
              </div>
           </div>
        </div>
      </div>

      {/* 5. Process Timeline */}
      <div className="mb-10">
         <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-red-900"></div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Process Timeline</h3>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineEvents.map((event, idx) => {
              
              // Styling logic based on timeline event type
              let cardClasses = "p-4 rounded-lg shadow-sm ";
              let timeClasses = "text-[9px] font-bold uppercase ";
              let titleClasses = "font-bold text-sm ";
              let iconClasses = "material-symbols-outlined text-sm ";
              let statusClasses = "text-[9px] font-bold uppercase ";
              
              if (event.type === "completed") {
                cardClasses += "bg-white border-t-2 border-t-blue-700";
                timeClasses += "text-blue-700";
                titleClasses += "text-slate-900";
                iconClasses += "text-slate-300";
                statusClasses += "text-slate-400";
              } else if (event.type === "pending") {
                cardClasses += "bg-slate-50 border-t-2 border-t-slate-200";
                timeClasses += "text-slate-400";
                titleClasses += "text-slate-400";
                iconClasses += "text-slate-300";
                statusClasses += "text-slate-400";
              } else if (event.type === "scheduled") {
                cardClasses = "bg-transparent p-4 rounded-lg border border-dashed border-slate-300"; // Override entirely
                timeClasses += "text-slate-400";
                titleClasses += "text-slate-400";
                iconClasses += "text-slate-300";
                statusClasses = "text-[9px] font-bold text-slate-300 italic uppercase";
              }

              return (
                <div key={idx} className={cardClasses}>
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <div className={timeClasses}>{event.time}</div>
                         <div className={titleClasses}>{event.title}</div>
                      </div>
                      <span className={iconClasses}>
                        {event.type === "scheduled" ? "schedule" : "photo_camera"}
                      </span>
                   </div>
                   
                   {/* Image Box Area */}
                   {event.hasImage ? (
                     <div className="h-24 bg-slate-800 rounded mb-3 w-full"></div>
                   ) : (
                     <div className={`h-24 rounded mb-3 w-full flex items-center justify-center 
                        ${event.type === "scheduled" ? "bg-transparent border border-dashed border-slate-200" 
                        : event.type === "pending" ? "bg-slate-200" 
                        : "bg-slate-100 text-slate-400 text-xs font-medium border border-dashed border-slate-300"}`}>
                        {event.altText ? (
                          event.type === "scheduled" ? 
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{event.altText}</span> 
                            : event.altText
                        ) : (
                          <span className="material-symbols-outlined text-slate-400">image</span>
                        )}
                     </div>
                   )}
                   
                   <div className={statusClasses}>{event.status}</div>
                </div>
              );
            })}
         </div>
      </div>

    </div>
  );
}