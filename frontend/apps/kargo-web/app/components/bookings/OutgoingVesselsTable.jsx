export default function OutgoingVesselsTable({ vessels }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#460003]/10 p-2 rounded">
          <span className="material-symbols-outlined text-[#460003]">directions_boat</span>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-[#142026]">Outgoing Vessels</h3>
      </div>
      
      <div className="bg-[#f3f3f3] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-200/50 text-[#142026]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Vessel Name</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Departure Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Time Till Out</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Items</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Manifest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {vessels.map((vessel, idx) => (
              <tr key={idx} className="hover:bg-white transition-colors">
                <td className="px-6 py-5">
                  <div className="font-bold text-[#142026] uppercase text-sm">{vessel.name}</div>
                  <div className="text-[10px] text-slate-400 uppercase">{vessel.bay}</div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                    vessel.status === 'Departing' ? 'bg-amber-100 text-amber-700' :
                    vessel.status === 'Loading' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {vessel.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-black text-sm text-[#142026]">{vessel.departureDate}</div>
                  <div className={`text-[10px] ${vessel.confirmed ? 'text-green-600 font-bold uppercase' : 'text-slate-400'}`}>
                    {vessel.departureStatus}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-black text-sm text-[#142026]">{vessel.timeOut}</div>
                  <div className="text-[10px] text-slate-400">{vessel.timeOutStatus}</div>
                </td>
                <td className="px-6 py-5 font-black text-[#3a5f94]">{vessel.items}</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-[#142026] hover:text-[#460003] transition-colors">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}