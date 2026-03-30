"use client";

import { useState } from "react";
import Sidebar from "../../components/global/Sidebar";
import IncomingVesselsTable from "../../components/bookings/IncomingVesselsTable";
import OutgoingVesselsTable from "../../components/bookings/OutgoingVesselsTable";
import InspectionSchedule from "../../components/bookings/InspectionSchedule";
import NewVesselModal from "../../components/bookings/NewVesselModal";

// Schedule can stay static since we aren't adding to it right now
const scheduleTasks = [
  { id: "MSCU-90214", slot: "08:15 — 08:45", inspector: "John Smith", eta: "2h 15m", progress: 0, status: "Scheduled" },
  { id: "ZIMU-11229", slot: "09:30 — 10:15", inspector: "Anya Miller", eta: "45m", progress: 45, status: "In Progress" },
  { id: "HJIN-44021", slot: "11:00 — 11:45", inspector: "Robert Kane", eta: "Delayed", progress: 15, status: "Delayed" },
  { id: "TEXU-88219", slot: "13:00 — 13:30", inspector: "John Smith", eta: "Departed", progress: 100, status: "Completed" }
];

export default function BookingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Move the mock data into React State so it can be updated!
  const [incomingVessels, setIncomingVessels] = useState([
    { name: "MARSK VALIANT", id: "IMO 9733454", status: "Departing", arrivalDate: "Oct 24, 14:30", arrivalSector: "Sector 4A Entry", priority: false, eta: "2h 15m", etaStatus: "On Course", items: "4,200" },
    { name: "APL SINGAPORE", id: "IMO 9345221", status: "In Port", arrivalDate: "Oct 23, 09:15", arrivalSector: "Priority Docking", priority: true, eta: "At Berth", etaStatus: "Moored", items: "1,850" },
    { name: "MSC OSCAR", id: "IMO 9703679", status: "Departing", arrivalDate: "Oct 26, 22:00", arrivalSector: "Deep Sea Corridor", priority: false, eta: "14h 20m", etaStatus: "Delayed", items: "19,224" }
  ]);

  const [outgoingVessels, setOutgoingVessels] = useState([
    { name: "HMM ROTTERDAM", bay: "Bay 12 North", status: "Departing", departureDate: "Oct 24, 2024", departureStatus: "Scheduled", confirmed: false, timeOut: "2h 15m", timeOutStatus: "Clearance Pending", items: "8,450" },
    { name: "ZIM CALIFORNIA", bay: "Bay 09 West", status: "Loading", departureDate: "Oct 26, 2024", departureStatus: "Confirmed", confirmed: true, timeOut: "2 Days 4h", timeOutStatus: "Post-Loading Sync", items: "3,120" },
    { name: "ONE STORK", bay: "Dry Dock 2", status: "Ready for Departure", departureDate: "Oct 25, 2024", departureStatus: "Awaiting Tug", confirmed: false, timeOut: "14h 20m", timeOutStatus: "Cargo Manifesting", items: "12,600" }
  ]);

  // 2. The function that catches the data from the Modal
  const handleAddVessel = (newVessel, type) => {
    if (type === 'incoming') {
      setIncomingVessels([newVessel, ...incomingVessels]);
    } else {
      setOutgoingVessels([newVessel, ...outgoingVessels]);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
          
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black text-[#142026] tracking-tighter uppercase">Bookings</h2>
              <p className="text-[#3a5f94] mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#3a5f94] rounded-full"></span>
                Real-time maritime logistics synchronization
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#142026] text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center gap-2 mr-4"
              >
                <span className="material-symbols-outlined text-sm">add</span> New Vessel
              </button>
              
              {/* Stats Cards - Dynamically tracking active vessels */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#3a5f94] flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Vessels</span>
                <span className="text-2xl font-black text-[#142026]">{incomingVessels.length + outgoingVessels.length}</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#460003] flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Critical ETA</span>
                <span className="text-2xl font-black text-[#460003]">03</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Pass the state to the tables */}
            <IncomingVesselsTable vessels={incomingVessels} />
            <OutgoingVesselsTable vessels={outgoingVessels} />
            <InspectionSchedule schedule={scheduleTasks} />
          </div>

        </div>
      </main>

      {/* 3. Render the Modal and pass down the handler */}
      <NewVesselModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddVessel={handleAddVessel}
      />
    </div>
  );
}